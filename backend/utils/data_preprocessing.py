import pandas as pd
from typing import List, Dict, Any

def preprocess_campaigns_for_prediction(campaigns: List[Dict[str, Any]]) -> pd.DataFrame:
    """
    Converts a list of campaign dictionaries into a pandas DataFrame ready for the ML model.
    Expected features for the model: 'Budget', 'Ad_Spend', 'CTR', 'CPC'
    """
    data = []
    for c in campaigns:
        data.append({
            'Budget': c['budget'],
            'Ad_Spend': c['ad_spend'],
            'CTR': c['ctr'],
            'CPC': c['cpc']
        })
    df = pd.DataFrame(data)
    return df
