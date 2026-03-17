import joblib
import pandas as pd
import os
from utils.data_preprocessing import preprocess_campaigns_for_prediction

# Locate model relative to this file
# Assuming structure: backend/services/prediction.py -> ../../ml_model/model.pkl
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
MODEL_PATH = os.path.join(BASE_DIR, 'ml_model', 'model.pkl')

try:
    model = joblib.load(MODEL_PATH)
    print(f"Model loaded successfully from {MODEL_PATH}")
except Exception as e:
    print(f"Error loading model from {MODEL_PATH}: {e}")
    model = None

def predict_conversions(campaigns_data: list[dict]) -> list[float]:
    """
    Predicts conversions for a list of campaigns.
    campaigns_data should be a list of dicts with keys: budget, ad_spend, ctr, cpc
    """
    if model is None:
        raise RuntimeError("ML model is not loaded.")
        
    df = preprocess_campaigns_for_prediction(campaigns_data)
    predictions = model.predict(df)
    
    # Conversions can't be negative
    return [max(0.0, float(p)) for p in predictions]
