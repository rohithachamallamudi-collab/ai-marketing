from pydantic import BaseModel, Field
from typing import List, Optional

class CampaignBase(BaseModel):
    campaign_id: str
    budget: float = Field(..., gt=0, description="Allocated budget")
    ad_spend: float = Field(..., ge=0, description="Money spent so far")
    ctr: float = Field(..., ge=0, description="Click through rate in percentage")
    cpc: float = Field(..., gt=0, description="Cost per click")

class CampaignCreate(CampaignBase):
    pass

class CampaignInDB(CampaignBase):
    conversions: Optional[int] = None

class IngestionRequest(BaseModel):
    campaigns: List[CampaignCreate]

class SinglePredictionRequest(BaseModel):
    budget: float
    ad_spend: float
    ctr: float
    cpc: float

class OptimizationRequest(BaseModel):
    total_budget: float = Field(..., gt=0)
    campaigns: List[CampaignBase]

class OptimizedCampaignInfo(BaseModel):
    campaign_id: str
    original_budget: float
    optimized_budget: float
    predicted_conversions: float

class OptimizationResponse(BaseModel):
    total_budget_allocated: float
    total_predicted_conversions: float
    campaigns: List[OptimizedCampaignInfo]
