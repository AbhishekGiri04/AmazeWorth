"""
AmazeWorth Smart Price Engine - Application Entry Point
"""
import uvicorn
from main import app
from config.settings import HOST, PORT, DEBUG, LOG_LEVEL, API_TITLE

if __name__ == "__main__":
    print(f"🚀 Starting {API_TITLE}...")
    print(f"📡 API Server: http://localhost:{PORT}")
    print(f"🌐 Frontend: http://localhost:3000") 
    print(f"📚 API Docs: http://localhost:{PORT}/docs")
    print(f"🔧 Debug Mode: {'ON' if DEBUG else 'OFF'}")
    
    uvicorn.run(
        "main:app",
        host=HOST,
        port=PORT,
        reload=DEBUG,
        log_level=LOG_LEVEL
    )