import pandas as pd
import numpy as np
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(BASE_DIR, 'data', 'sample_campaign_data.csv')

np.random.seed(42)

# Generate synthetic campaign data
n_samples = 1000

campaign_ids = [f"CMP_{i:04d}" for i in range(n_samples)]
budgets = np.random.uniform(500, 5000, n_samples).round(2)
ad_spend = budgets * np.random.uniform(0.7, 1.0, n_samples)
ad_spend = ad_spend.round(2)

# Generate features
ctr = np.random.beta(2, 20, n_samples) * 100  # CTR in percentage
cpc = np.random.uniform(0.5, 5.0, n_samples).round(2)

# Simulate conversions (higher budget and CTR -> more conversions, higher CPC -> fewer)
base_conversion_rate = 0.05
conversions = (ad_spend / cpc) * base_conversion_rate * (1 + ctr/5) * np.random.uniform(0.8, 1.2, n_samples)
conversions = conversions.astype(int)

df = pd.DataFrame({
    'Campaign_ID': campaign_ids,
    'Budget': budgets,
    'Ad_Spend': ad_spend,
    'CTR': ctr,
    'CPC': cpc,
    'Conversions': conversions
})

df.to_csv(DATA_PATH, index=False)
print(f"Generated {n_samples} records in {DATA_PATH}")
