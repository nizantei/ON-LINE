#!/bin/bash

echo "========================================"
echo "  Starting Stay Home Game"
echo "========================================"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    echo ""
    npm install
    echo ""
fi

echo "Starting development server..."
echo ""
echo "The game will open at: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""
npm run dev
