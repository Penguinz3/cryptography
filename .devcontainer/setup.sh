#!/bin/bash

# Install frontend dependencies
cd /workspace/frontend
npm install

# Install backend dependencies
cd /workspace/backend
python -m pip install --upgrade pip
pip install -r requirements.txt

# Start development servers
cd /workspace
echo "To start the development servers, run:"
echo "1. Backend: cd backend && uvicorn main:app --reload --host 0.0.0.0 --port 8000"
echo "2. Frontend: cd frontend && npm run dev" 