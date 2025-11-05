#!/bin/bash

echo "Starting AmazeWorth Smart Price Engine v2.1"
echo "============================================"

# Kill existing processes
echo "Cleaning up processes..."
pkill -f "python.*app.py" 2>/dev/null || true
pkill -f "uvicorn" 2>/dev/null || true
pkill -f "npm start" 2>/dev/null || true
pkill -f "react-scripts" 2>/dev/null || true
lsof -ti:5000 | xargs kill -9 2>/dev/null || true
lsof -ti:3000 | xargs kill -9 2>/dev/null || true
lsof -ti:5001 | xargs kill -9 2>/dev/null || true
echo "Waiting 5 seconds for cleanup..."
sleep 5

# Check system requirements
echo "Checking system requirements..."
python3 --version || { echo "ERROR: Python 3 not found"; exit 1; }
node --version || { echo "ERROR: Node.js not found"; exit 1; }

# Install dependencies if needed
INSTALL_DEPS=false

if ! python3 -c "import fastapi, uvicorn, lightgbm" 2>/dev/null; then
    INSTALL_DEPS=true
fi

if [ ! -d "frontend/node_modules" ]; then
    INSTALL_DEPS=true
fi

if [ "$INSTALL_DEPS" = true ]; then
    echo "Installing dependencies..."
    
    # Python dependencies
    echo "  Installing Python packages..."
    pip3 install --upgrade pip --quiet
    pip3 install -r requirements.txt --no-cache-dir --quiet
    
    # Node dependencies
    echo "  Installing Node packages..."
    cd frontend
    npm install --silent
    cd ..
else
    echo "All dependencies are installed"
fi

# Check if models exist
echo "Checking AI models..."
if [ -f "backend/models/lgbm_final_model.pkl" ]; then
    echo "LightGBM model found"
else
    echo "WARNING: LightGBM model not found - will use heuristics"
fi

if [ -f "backend/models/tfidf_vectorizer.pkl" ]; then
    echo "TF-IDF vectorizer found"
else
    echo "WARNING: TF-IDF vectorizer not found - will use fallback"
fi

# Start backend server
echo "Starting backend server on port 5001..."
cd backend
PORT=5001 python3 app.py &
BACKEND_PID=$!
cd ..
echo "Backend PID: $BACKEND_PID"

# Wait for backend to start
echo "Waiting for backend to initialize..."
for i in {1..30}; do
    if curl -s http://localhost:5001/health > /dev/null 2>&1; then
        echo "Backend server is ready"
        break
    fi
    if [ $i -eq 30 ]; then
        echo "ERROR: Backend failed to start within 30 seconds"
        kill $BACKEND_PID 2>/dev/null
        exit 1
    fi
    sleep 1
done

# Test API endpoints
echo "Testing API endpoints..."
if curl -s http://localhost:5001/ > /dev/null; then
    echo "Main API ready"
else
    echo "ERROR: Main API failed"
fi

if curl -s http://localhost:5001/health > /dev/null; then
    echo "Health check ready"
else
    echo "ERROR: Health check failed"
fi

if curl -s http://localhost:5001/predict -X POST -H "Content-Type: application/json" -d '{"title":"test"}' > /dev/null; then
    echo "Prediction endpoint ready"
else
    echo "ERROR: Prediction endpoint failed"
fi

# Start frontend
echo "Starting frontend..."
cd frontend
npm start &
FRONTEND_PID=$!
cd ..
echo "Frontend PID: $FRONTEND_PID"

# Wait for frontend
echo "Waiting for frontend to start..."
for i in {1..20}; do
    if curl -s http://localhost:3000 > /dev/null 2>&1; then
        echo "Frontend server is ready"
        break
    fi
    if [ $i -eq 20 ]; then
        echo "WARNING: Frontend taking longer than expected"
    fi
    sleep 2
done

# Final status
echo ""
echo "AmazeWorth Smart Price Engine v2.1 is running"
echo "============================================"
echo "Frontend UI:        http://localhost:3000"
echo "Backend API:        http://localhost:5001"
echo "API Documentation:  http://localhost:5001/docs"
echo "Health Check:       http://localhost:5001/health"
echo "Prediction API:     http://localhost:5001/predict"
echo ""
echo "Features:"
echo "  - AI-powered price prediction"
echo "  - Real-time analytics dashboard"
echo "  - LightGBM + TF-IDF models"
echo "  - Performance monitoring"
echo "  - RESTful API with documentation"
echo ""
echo "Open http://localhost:3000 in your browser"
echo "Press Ctrl+C to stop all servers"

# Wait for user interrupt
trap "echo 'Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT
wait