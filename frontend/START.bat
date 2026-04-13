@echo off
cd /d "%~dp0"
echo.
echo ========================================
echo   Hand Gesture Recognition System
echo ========================================
echo.
echo Opening http://localhost:8000/app.html
echo.
timeout /t 2
start http://localhost:8000/app.html
cd /d "%~dp0"
python run_server.py
pause
