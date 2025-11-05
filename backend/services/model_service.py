"""
Advanced Model Management Service
"""
import logging
import time
import asyncio
from datetime import datetime, timedelta
from typing import Dict, List, Optional
from core.predictor import smart_predictor
from core.processor import DataProcessor
import pandas as pd
from pathlib import Path

logger = logging.getLogger(__name__)

class ModelService:
    """Advanced service for managing ML models with monitoring and analytics"""
    
    def __init__(self):
        self.predictor = smart_predictor
        self.processor = DataProcessor()
        self.prediction_cache = {}
        self.performance_metrics = {
            'total_predictions': 0,
            'avg_response_time': 0,
            'cache_hits': 0,
            'error_count': 0,
            'last_updated': datetime.now()
        }
        self.prediction_history = []
    
    async def initialize_models(self):
        """Initialize and load ML models with processor integration"""
        logger.info("🚀 Initializing AmazeWorth Smart Price Engine...")
        
        # Load ML models
        model_success = self.predictor.load_models()
        
        # Initialize data processor
        try:
            model_dir = Path(__file__).parent.parent / 'models'
            tfidf_path = model_dir / 'tfidf_vectorizer.pkl'
            
            if tfidf_path.exists():
                import pickle
                with open(str(tfidf_path), 'rb') as f:
                    self.processor.tfidf_vectorizer = pickle.load(f)
                logger.info("✅ Data processor TF-IDF loaded successfully")
        except Exception as e:
            logger.warning(f"⚠️ Processor loading failed: {e}")
        
        if model_success:
            logger.info("✅ ML Models loaded successfully")
            return True
        else:
            logger.warning("⚠️ Using fallback prediction method")
            return False
    
    async def predict_with_monitoring(self, title: str, description: str = "") -> Dict:
        """Enhanced prediction with performance monitoring and caching"""
        start_time = time.time()
        
        # Create cache key
        cache_key = hash(f"{title}_{description}")
        
        # Check cache
        if cache_key in self.prediction_cache:
            self.performance_metrics['cache_hits'] += 1
            cached_result = self.prediction_cache[cache_key]
            cached_result['cached'] = True
            return cached_result
        
        try:
            # Make prediction
            price = self.predictor.predict_price(title, description)
            confidence = self.predictor.get_confidence(title, description)
            key_features = self.predictor.get_key_features(title, description)
            
            # Calculate response time
            response_time = time.time() - start_time
            
            result = {
                'predicted_price': price,
                'confidence_score': confidence,
                'key_features': key_features,
                'response_time': round(response_time, 3),
                'model_used': 'ML Model' if self.predictor.model_loaded else 'Advanced Heuristics',
                'timestamp': datetime.now().isoformat(),
                'cached': False
            }
            
            # Cache result (keep last 100)
            if len(self.prediction_cache) >= 100:
                oldest_key = next(iter(self.prediction_cache))
                del self.prediction_cache[oldest_key]
            self.prediction_cache[cache_key] = result.copy()
            
            # Update metrics
            self.performance_metrics['total_predictions'] += 1
            self.performance_metrics['avg_response_time'] = (
                (self.performance_metrics['avg_response_time'] * (self.performance_metrics['total_predictions'] - 1) + response_time) /
                self.performance_metrics['total_predictions']
            )
            
            # Add to history (keep last 50)
            self.prediction_history.append({
                'title': title[:50] + '...' if len(title) > 50 else title,
                'price': price,
                'confidence': confidence,
                'timestamp': datetime.now().isoformat()
            })
            if len(self.prediction_history) > 50:
                self.prediction_history.pop(0)
            
            return result
            
        except Exception as e:
            self.performance_metrics['error_count'] += 1
            logger.error(f"Prediction failed: {e}")
            raise
    
    def get_model_status(self):
        """Get comprehensive model status"""
        return {
            "model_loaded": self.predictor.model_loaded,
            "service_status": "active",
            "prediction_method": "ML Model" if self.predictor.model_loaded else "Advanced Heuristics",
            "cache_size": len(self.prediction_cache),
            "performance_metrics": self.performance_metrics,
            "processor_loaded": self.processor.tfidf_vectorizer is not None,
            "trained_models": {
                "lgbm_model": self.predictor.model is not None,
                "tfidf_vectorizer": self.predictor.tfidf_vectorizer is not None,
                "brand_encoder": self.predictor.brand_encoder is not None
            }
        }
    
    async def health_check(self):
        """Comprehensive health check with system diagnostics"""
        try:
            start_time = time.time()
            
            # Test prediction
            test_prediction = self.predictor.predict_price("iPhone 14 Pro Max", "Latest Apple smartphone with advanced features")
            
            # Test processor if available
            processor_status = "loaded" if self.processor.tfidf_vectorizer is not None else "fallback"
            
            response_time = time.time() - start_time
            
            return {
                "status": "healthy",
                "model_loaded": self.predictor.model_loaded,
                "processor_status": processor_status,
                "test_prediction": test_prediction,
                "response_time": round(response_time, 3),
                "service": "AmazeWorth Smart Price Engine",
                "version": "2.1.0",
                "uptime": str(datetime.now() - self.performance_metrics['last_updated']),
                "cache_performance": {
                    "size": len(self.prediction_cache),
                    "hit_rate": round(self.performance_metrics['cache_hits'] / max(1, self.performance_metrics['total_predictions']) * 100, 2)
                }
            }
        except Exception as e:
            logger.error(f"Health check failed: {e}")
            return {
                "status": "unhealthy",
                "error": str(e),
                "service": "AmazeWorth Smart Price Engine",
                "version": "2.1.0"
            }
    
    def get_analytics_data(self):
        """Get comprehensive analytics data"""
        return {
            "performance_metrics": self.performance_metrics,
            "prediction_history": self.prediction_history[-20:],  # Last 20 predictions
            "model_stats": self.predictor.get_model_stats(),
            "feature_importance": self.predictor.get_feature_importance(),
            "performance_comparison": self.predictor.get_performance_data(),
            "system_info": {
                "cache_size": len(self.prediction_cache),
                "processor_loaded": self.processor.tfidf_vectorizer is not None,
                "model_loaded": self.predictor.model_loaded,
                "uptime": str(datetime.now() - self.performance_metrics['last_updated'])
            }
        }
    
    def clear_cache(self):
        """Clear prediction cache"""
        self.prediction_cache.clear()
        logger.info("🧹 Prediction cache cleared")
    
    def reset_metrics(self):
        """Reset performance metrics"""
        self.performance_metrics = {
            'total_predictions': 0,
            'avg_response_time': 0,
            'cache_hits': 0,
            'error_count': 0,
            'last_updated': datetime.now()
        }
        logger.info("📊 Performance metrics reset")

# Global service instance
model_service = ModelService()