from motor.motor_asyncio import AsyncIOMotorClient
import os

# Default local connection, but can be overridden (e.g. Atlas URI)
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
try:
    client = AsyncIOMotorClient(MONGO_URI)
    db = client.ai_marketing
    campaigns_collection = db.get_collection("campaigns")
    print(f"Connected to MongoDB at {MONGO_URI}")
except Exception as e:
    print(f"Could not connect to MongoDB: {e}")
    db = None
    campaigns_collection = None
