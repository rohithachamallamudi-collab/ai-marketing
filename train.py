import pandas as pd
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(BASE_DIR, 'data', 'sample_campaign_data.csv')
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
import joblib

print("Loading data...")
df = pd.read_csv(DATA_PATH)

features = ['Budget', 'Ad_Spend', 'CTR', 'CPC']
target = 'Conversions'

X = df[features]
y = df[target]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

print("Training RandomForest model...")
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

preds = model.predict(X_test)
mse = mean_squared_error(y_test, preds)
print(f"Model trained. MSE: {mse:.2f}")

MODEL_PATH = os.path.join(BASE_DIR, 'ml_model', 'model.pkl')
joblib.dump(model, MODEL_PATH)
print(f"Model saved to {MODEL_PATH}")
