# 🖐️ GestureAI - Hand Gesture Recognition System

A complete web application for real-time hand gesture detection with login, dashboard, and analytics.

## 📁 Files Overview

### Main Application
- **`app.html`** ⭐ - **START HERE** - Complete integrated application with:
  - Login page (test@test.com / test123)
  - Dashboard with statistics
  - Live hand gesture detection
  - Gesture analytics

### Individual Components (Optional)
- `login.html` - Just the login page
- `dashboard.html` - Full dashboard + detection
- `detect.html` - Simple detection page (for troubleshooting)
- `index.html` - Redirect logic

### Launch Scripts
- **`RUN.bat`** - One-click launcher (recommended for Windows)
- **`START.bat`** - Alternative launcher
- `run_server.py` - Python server starter

## 🚀 How to Run

### Option 1: Double-click RUN.bat (EASIEST)
```
Double-click: RUN.bat
```
This will automatically:
- Start the Python server on port 8000
- Open the app in your browser
- Show the login page

### Option 2: Use START.bat
```
Double-click: START.bat
```
Similar to RUN.bat but uses Python script wrapper.

### Option 3: Manual (Terminal/PowerShell)
```powershell
cd C:\Users\Darshini\Downloads\dma project\hand-gesture-recognition\dma\frontend
python -m http.server 8000
```
Then open browser: `http://localhost:8000/app.html`

## 📝 Login Instructions

When you first open the app:
1. You'll see the **Login Page**
2. Enter any email and password (for demo: `test@test.com` / `test123`)
3. Click **Login** button
4. You'll be redirected to the **Dashboard**

## 🎯 Using the App

### Dashboard Tab
- Shows your statistics:
  - Total Gestures detected
  - Recognition Rate (94.5%)
  - Active Status

### Detection Tab (⭐ Main Feature)
1. Click **"Start Camera"** button
2. Allow camera access when browser asks
3. Show your hand to the camera
4. You'll see:
   - **Green landmarks** on your hand (live tracking)
   - **Camera Status**: ON
   - **Hand Detected**: Yes/No
   - **Confidence**: Detection strength (%)
   - **Current Gesture**: Which gesture is detected

### Analytics Tab
- Shows a chart of gesture frequency
- Updates as you perform gestures

## ✋ Supported Gestures

- **Open Hand** ✋ - All fingers extended
- **Peace Sign** ✌️ - Index + Middle fingers up
- **Fist** ✊ - All fingers closed

## 📋 Gesture Detection Tips

✅ **For best results:**
- Good lighting (well-lit room)
- Camera at arm's length facing you
- Show full hand to camera
- Move hands slowly
- Clear background helps

⚠️ **If detection isn't working:**
1. Check your camera is connected
2. Allow browser camera permissions
3. Check browser console for errors (F12)
4. Try opening `detect.html` for simplified version
5. Ensure Python server is running on port 8000

## 🔧 Troubleshooting

### Application won't open
- Check if port 8000 is in use: `netstat -ano | findstr :8000`
- Kill process using it: `taskkill /PID [PID] /F`
- Or change port in Python command: `python -m http.server 8080`

### Camera not working
- Try restarting browser
- Check browser permissions (Settings → Privacy → Camera)
- Restart computer if camera is busy

### Server won't start
- Check Python is installed: `python --version`
- Try: `python -m http.server --directory . 8000`

### Browser shows blank page
- Hard refresh: `Ctrl + Shift + R`
- Check browser console for errors: `F12`
- Make sure `app.html` exists in this folder

## 📚 File Structure

```
frontend/
├── app.html ⭐ (Main complete app)
├── login.html (Backup)
├── dashboard.html (Backup)
├── detect.html (Simplified detection)
├── index.html (Redirects)
├── style.css (Styling)
├── styles.css (Styling backup)
├── script.js (Detection logic - not used in app.html)
├── login-script.js (Login logic - not used in app.html)
├── dashboard-script.js (Dashboard logic - not used in app.html)
├── RUN.bat (Launcher)
├── START.bat (Alternative launcher)
├── run_server.py (Python server)
└── README.md (This file)
```

## 🎨 Design Features

- **Colorful Gradients**: Purple, Pink, Cyan, Green themes
- **Glass-morphism**: Modern frosted glass UI effects
- **Responsive Design**: Works on desktop and tablets
- **Animations**: Smooth transitions and effects
- **Dark Theme**: Comfortable on the eyes

## 🔐 Security Note

This is a **demo application**. 
- Login doesn't require real authentication
- Data is stored in browser (localStorage)
- Use only for local testing/development

## 📞 Support

If you have issues:
1. Check browser console: `F12 → Console`
2. Check Python is running
3. Verify port 8000 (or your chosen port)
4. Try `detect.html` for simplified testing
5. Restart browser and device if needed

---

**Ready?** Double-click `RUN.bat` and enjoy! 🎉
