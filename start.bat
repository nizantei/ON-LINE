@echo off
echo ========================================
echo   Starting Stay Home Game
echo ========================================
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    echo.
    call npm install
    echo.
)

echo Starting development server...
echo.
echo Opening browser in 5 seconds...
echo.
echo Press Ctrl+C to stop the server
echo.

REM Start dev server in background and wait a bit
start /B npm run dev

REM Wait 5 seconds for server to start, then open browser
timeout /t 5 /nobreak >nul
start http://localhost:5173

REM Keep the window open to show server logs
pause
