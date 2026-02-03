@echo off
cls
echo ========================================
echo   Stay Home Game - Dev Server
echo ========================================
echo.
echo [INFO] Installing dependencies if needed...
if not exist "node_modules" npm install
echo.
echo [INFO] Starting server...
echo [INFO] Server will be at: http://localhost:5173
echo.
echo +-----------------------------------------+
echo ^|  OPEN YOUR BROWSER AND GO TO:          ^|
echo ^|  http://localhost:5173                 ^|
echo +-----------------------------------------+
echo.
echo Press Ctrl+C to stop the server
echo.
npm run dev
