from fastapi import APIRouter, HTTPException, Depends
from models.campaign_model import IngestionRequest, SinglePredictionRequest, OptimizationRequest, OptimizationResponse, OptimizedCampaignInfo
from database.mongodb import campaigns_collection
from services.prediction import predict_conversions
from services.optimization import optimize_budgets

router = APIRouter()

@router.post("/ingest")
async def ingest_campaigns(request: IngestionRequest):
    """
    Ingest campaign data into MongoDB.
    """
    if campaigns_collection is None:
        raise HTTPException(status_code=500, detail="Database connection not available")
        
    campaigns = [c.model_dump() for c in request.campaigns]
    
    # Simple insert, in a real app might want to upsert based on campaign_id
    try:
        if campaigns:
            await campaigns_collection.insert_many(campaigns)
        return {"message": f"Successfully ingested {len(campaigns)} campaigns"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/campaigns")
async def get_campaigns():
    """
    Get all ingested campaigns.
    """
    if campaigns_collection is None:
        raise HTTPException(status_code=500, detail="Database connection not available")
    
    cursor = campaigns_collection.find({}, {"_id": 0})
    campaigns = await cursor.to_list(length=1000)
    return {"campaigns": campaigns}

@router.post("/predict")
async def predict_single_campaign(request: SinglePredictionRequest):
    """
    Predict conversions for a single campaign configuration.
    """
    try:
        # Wrap in list as predict_conversions expects a list of dicts
        data = [request.model_dump()]
        prediction = predict_conversions(data)[0]
        return {"predicted_conversions": prediction}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/optimize", response_model=OptimizationResponse)
async def optimize_campaign_budgets(request: OptimizationRequest):
    """
    Optimize budget allocation across multiple campaigns to maximize conversions.
    """
    if not request.campaigns:
        raise HTTPException(status_code=400, detail="No campaigns provided for optimization")
        
    try:
        optimized_budgets, final_conversions = optimize_budgets(request)
        
        optimized_campaigns = []
        total_allocated = 0.0
        total_predicted = 0.0
        
        for i, camp in enumerate(request.campaigns):
            opt_budget = float(optimized_budgets[i])
            pred_conv = float(final_conversions[i])
            
            total_allocated += opt_budget
            total_predicted += pred_conv
            
            optimized_campaigns.append(
                OptimizedCampaignInfo(
                    campaign_id=camp.campaign_id,
                    original_budget=camp.budget,
                    optimized_budget=opt_budget,
                    predicted_conversions=pred_conv
                )
            )
            
        return OptimizationResponse(
            total_budget_allocated=total_allocated,
            total_predicted_conversions=total_predicted,
            campaigns=optimized_campaigns
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
