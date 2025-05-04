#!/bin/bash

# Install frontend dependencies
cd /workspace/frontend
npm install

# Install backend dependencies
cd /workspace/backend
python -m pip install --upgrade pip
pip install -r requirements.txt

# Create a script to start both servers
cd /workspace
cat > start-servers.sh << 'EOL'
#!/bin/bash

# Start backend server
cd /workspace/backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!

# Start frontend server
cd /workspace/frontend
npm run dev &
FRONTEND_PID=$!

# Wait for both servers
wait $BACKEND_PID $FRONTEND_PID
EOL

chmod +x start-servers.sh

echo "To start both servers, run:"
echo "./start-servers.sh"
echo ""
echo "Or start them separately:"
echo "1. Backend: cd backend && uvicorn main:app --reload --host 0.0.0.0 --port 8000"
echo "2. Frontend: cd frontend && npm run dev" 