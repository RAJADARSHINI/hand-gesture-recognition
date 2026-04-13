@echo off
echo.
echo ========================================
echo   Hand Gesture Recognition System
echo ========================================
echo.
echo Starting server...
echo.
echo Opening http://localhost:8000/app.html
echo.
timeout /t 2
start http://localhost:8000/app.html
python -m http.server 8000
