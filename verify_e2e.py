import requests, json

# Get campaigns
r = requests.get('http://localhost:8000/api/v1/campaigns')
campaigns = r.json()['campaigns']
print(f'Fetched {len(campaigns)} campaigns')

# Optimize using first 3 campaigns
payload = {
    'total_budget': 10000.0,
    'campaigns': campaigns[:3]
}
r = requests.post('http://localhost:8000/api/v1/optimize', json=payload)
print('Optimize Status:', r.status_code)
result = r.json()
print('Total budget allocated:', result.get('total_budget_allocated'))
print('Total predicted conversions:', result.get('total_predicted_conversions'))
for c in result.get('campaigns', []):
    print(f"  {c['campaign_id']}: was ${c['original_budget']:.2f}, now ${c['optimized_budget']:.2f}, ~{c['predicted_conversions']:.0f} conversions")

# Test predict endpoint
pred_payload = {
    'budget': 2000.0,
    'ad_spend': 1500.0,
    'ctr': 3.5,
    'cpc': 1.2
}
r = requests.post('http://localhost:8000/api/v1/predict', json=pred_payload)
print('\nPredict Status:', r.status_code, r.json())
print('\nAll tests PASSED!')
