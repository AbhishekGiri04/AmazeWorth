"""
Application Configuration
"""
import os
from pathlib import Path

# Base directory
BASE_DIR = Path(__file__).parent.parent

# API Configuration
API_TITLE = "AmazeWorth Smart Price Engine API"
API_VERSION = "2.1.0"
API_DESCRIPTION = "AI-powered product price prediction API"

# Server Configuration
HOST = "0.0.0.0"
PORT = int(os.getenv("PORT", 5001))
DEBUG = os.getenv("DEBUG", "false").lower() == "true"
LOG_LEVEL = os.getenv("LOG_LEVEL", "info")

# Model Configuration
MODEL_DIR = BASE_DIR / "models"
DATA_DIR = BASE_DIR / "data"

# CORS Configuration
CORS_ORIGINS = ["*"]  # Allow all origins for development

# ML Model Settings
ML_CONFIG = {
    "model_file": "lgbm_final_model.pkl",
    "vectorizer_file": "tfidf_vectorizer.pkl", 
    "brand_encoder_file": "brand_encoder.pkl",
    "max_features": 10000,
    "confidence_threshold": 0.7
}

# Logging Configuration
LOGGING_CONFIG = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "default": {
            "format": "%(asctime)s - %(name)s - %(levelname)s - %(message)s",
        },
    },
    "handlers": {
        "default": {
            "formatter": "default",
            "class": "logging.StreamHandler",
            "stream": "ext://sys.stdout",
        },
    },
    "root": {
        "level": LOG_LEVEL.upper(),
        "handlers": ["default"],
    },
}