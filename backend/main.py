from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import optimize

app = FastAPI(
    title="AI Marketing Optimization Platform",
    description="API for predicting and optimizing marketing campaigns",
    version="1.0.0"
)

# Allow requests from frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For development, allow all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(optimize.router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {"message": "Welcome to the AI Marketing Optimization Platform API"}
