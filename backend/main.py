"""
AmazeWorth Smart Price Engine - Main Application
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import logging.config

from config.settings import *
from services.model_service import model_service
from routes.analytics import router as analytics_router

# Configure logging
logging.config.dictConfig(LOGGING_CONFIG)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events"""
    # Startup
    logger.info(f"🚀 Starting {API_TITLE}...")
    await model_service.initialize_models()
    yield
    # Shutdown
    logger.info("🛑 Shutting down application...")

# Create FastAPI app
app = FastAPI(
    title=API_TITLE,
    version=API_VERSION,
    description=API_DESCRIPTION,
    lifespan=lifespan
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include analytics router
app.include_router(analytics_router)

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": f"{API_TITLE} is running!",
        "version": API_VERSION,
        "status": "active",
        **model_service.get_model_status()
    }

@app.get("/health")
async def health_check():
    """Health check with model status"""
    return await model_service.health_check()

# ML Model prediction using PKL files
@app.post("/predict")
async def ml_predict(request: dict):
    """ML prediction using trained PKL models"""
    try:
        # Use ML model service with PKL files
        result = await model_service.predict_with_monitoring(
            title=request.get('title', ''),
            description=request.get('description', '')
        )
        
        # Return in expected format
        return {
            'predicted_price': result['predicted_price'],
            'confidence': result['confidence_score'],
            'key_features': result['key_features'],
            'prediction_method': result['model_used'],
            'response_time': result['response_time']
        }
        
    except Exception as e:
        logger.error(f"ML prediction failed: {e}")
        # Fallback only if ML fails
        title = request.get('title', '')
        base_price = len(title) * 15
        multiplier = 2.5 if 'samsung' in title.lower() else 1.5
        
        return {
            'predicted_price': round(base_price * multiplier, 2),
            'confidence': 0.75,
            'key_features': ['Fallback Algorithm'],
            'prediction_method': 'Heuristic Fallback',
            'response_time': 0.1
        }

@app.get("/model-stats")
async def model_stats():
    return model_service.predictor.get_model_stats()

@app.get("/analytics")
async def analytics():
    return model_service.get_analytics_data()

if __name__ == "__main__":
    import uvicorn
    print(f"🚀 Starting {API_TITLE}...")
    print(f"📡 API Server: http://localhost:{PORT}")
    print(f"🌐 Frontend: http://localhost:3000")
    print(f"📚 API Docs: http://localhost:{PORT}/docs")
    
    uvicorn.run(
        "main:app",
        host=HOST,
        port=PORT,
        reload=DEBUG,
        log_level=LOG_LEVEL
    )