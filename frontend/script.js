const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const startCameraButton = document.getElementById('start-camera');
const stopCameraButton = document.getElementById('stop-camera');
const cameraStatus = document.getElementById('camera-status');
const gestureDisplay = document.getElementById('gesture');
const handStatus = document.getElementById('hand-status');
const resetAnalyticsButton = document.getElementById('reset-analytics');
const gestureChartCtx = document.getElementById('gesture-chart').getContext('2d');

let cameraStream = null;
let gestureCounts = { 'Open Palm': 0, 'Fist': 0, 'Thumbs Up': 0, 'Peace': 0, 'OK': 0 };
let chart = null;
let camera = null;
let hands = null;
let isDetecting = false;

// Check if required libraries are loaded
console.log('Checking libraries...');
console.log('Hands available:', typeof Hands !== 'undefined');
console.log('Camera available:', typeof Camera !== 'undefined');

// Set canvas dimensions
function setCanvasDimensions() {
    if (video.videoWidth && video.videoHeight) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        console.log('Canvas set to:', canvas.width, 'x', canvas.height);
    } else {
        canvas.width = 640;
        canvas.height = 480;
        console.log('Using default canvas size:', canvas.width, 'x', canvas.height);
    }
}

// Initialize Chart.js
function initializeChart() {
    chart = new Chart(gestureChartCtx, {
        type: 'bar',
        data: {
            labels: Object.keys(gestureCounts),
            datasets: [{
                label: 'Gesture Counts',
                data: Object.values(gestureCounts),
                backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56', '#4bc0c0']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
            }
        }
    });
}

// Initialize MediaPipe Hands
function initializeHands() {
    try {
        console.log('Initializing MediaPipe Hands...');
        
        if (typeof Hands === 'undefined') {
            console.error('ERROR: Hands library not loaded!');
            cameraStatus.textContent = 'Error: MediaPipe not loaded';
            return false;
        }
        
        hands = new Hands({
            locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
        });
        
        hands.setOptions({
            maxNumHands: 2,
            modelComplexity: 1,
         onsole.log('Requesting camera access...');
        cameraStatus.textContent = 'Requesting camera...';
        
        cameraStream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
                width: { ideal: 640 },
                height: { ideal: 480 },
                facingMode: 'user'
            } 
        });
        
        console.log('✓ Camera stream obtained');
        video.srcObject = cameraStream;
        
        video.onloadedmetadata = () => {
            console.log('Video metadata loaded');
            console.log('Video actual size:', video.videoWidth, 'x', video.videoHeight);
            setCanvasDimensions();
            cameraStatus.textContent = 'Camera ON - Initializing detection...';
            
            if (!isDetecting) {
                startDetection();
            }
        };
        
    } catch (error) {
        console.error('Error accessing camera:', error);
        cameraStatus.textContent = 'Camera Error: ' + error.message;
        alert('Cannot access camera:\n' + error.message + '\n\nPlease check:\n1. Camera is connected\n2. Browser has camera permission\n3. No other app is using camera
                width: { ideal: 640 },
                height: { ideal: 480 },
                facingMode: 'user'
            } 
        });
        video.srcObject = cameraStream;
        video.onloadedmetadata = () => {
            setCanvasDimensions();
            cameraStatus.textContent = 'Camera ON';
            if (!isDetecting) {
                startDetection();
            }
    try {
        if (isDetecting) {
            console.log('Detection already running');
            return;
        }
        
        isDetecting = true;
        console.log('=== STARTING GESTURE DETECTION ===');
        console.log('Canvas:', canvas.width, 'x', canvas.height);
        console.log('Video:', video.videoWidth, 'x', video.videoHeight);
        
        // Check if Camera library is loaded
        if (typeof Camera === 'undefined') {
            console.error('ERROR: Camera library not loaded!');
            cameraStatus.textContent = 'Error: Camera Utils not loaded';
            isDetecting = false;
            return;
        }
        
        // Initialize Hands if needed
        if (!hands) {
            console.log('Initializing Hands...');
            const handsInitialized = initializeHands();
            if (!handsInitialized) {
                isDetecting = false;
                return;
            }
        }
        
        // Create and start camera
        if (!camera) {
            console.log('Creating Camera instance...');
            camera = new Camera(video, {
                onFrame: async () => {
                    try {
                        await hands.send({ image: video });
                    } catch (error) {
                        console.error('Hand detection frame error:', error);
                    }
                }
            });
        }
        
        console.log('Starting camera processing...');
        camera.start();
        console.log('✓ DETECTION STARTED - Show your hand to camera!');
        cameraStatus.textContent = 'Camera ON - Ready to detect';
        
    } catch (error) {
        console.error('Error in startDetection:', error);
        cameraStatus.textContent = 'Error: ' + error.message;
        isDetecting = false;
    } });
                } catch (error) {
                    console.error('Detection error:', error);
                }
            }
        });
    }
    
    console.log('Starting camera...');
    camera.start();
    console.log('✓ Camera and detection started!');
}

// Stop Camera
stopCameraButton.addEventListener('click', () => {
    if (cameraStream) {
        isDetecting = false;
        const tracks = cameraStream.getTracks();
        tracks.forEach(track => track.stop());
        if (camera) {
            camera.stop();
        }
        video.srcObject = null;
        cameraStatus.textContent = 'Camera OFF';
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        handStatus.textContent = 'Hand Not Detected';
        gestureDisplay.textContent = 'None';
    }
});

// Reset Analytics
resetAnalyticsButton.addEventListener('click', () => {
    Object.keys(gestureCounts).forEach(key => gestureCounts[key] = 0);
    updateChart();
    console.log('Analytics reset');
});

// Update Chart
function updateChart() {
    if (chart) {
        chart.data.datasets[0].data = Object.values(gestureCounts);
        chart.update();
    }
}

// Handle detection results
let detectionCount = 0;
let lastLogTime = 0;

function onResults(results) {
    try {
        // Clear canvas
        ctx.save();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
            detectionCount++;
            handStatus.textContent = '✓ Hand Detected!';
            handStatus.style.color = '#43e97b';
            
            // Log every 30 frames
            if (Date.now() - lastLogTime > 1000) {
                console.log(`Hand detected! Count: ${detectionCount}`);
                lastLogTime = Date.now();
            }
            
            // Process the first hand
            const landmarks = results.multiHandLandmarks[0];
            drawLandmarks(landmarks);
            detectGesture(landmarks);
        } else {
            if (detectionCount > 0 && Date.now() - lastLogTime > 1000) {
                console.log(`No hand detected. Total detections: ${detectionCount}`);
                lastLogTime = Date.now();
            }
            handStatus.textContent = '✗ No Hand';
            handStatus.style.color = '#ff6384';
            gestureDisplay.textContent = 'None';
        }
        ctx.restore();
    } catch (error) {
        console.error('Error in onResults:', error);
    }
}

// Draw Landmarks
function drawLandmarks(landmarks) {
    ctx.fillStyle = 'rgba(0, 255, 0, 0.7)';
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 2;
    
    // Draw circles at each landmark
    for (let i = 0; i < landmarks.length; i++) {
        const x = landmarks[i].x * canvas.width;
        const y = landmarks[i].y * canvas.height;
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fill();
    }
    
    // Draw connections between landmarks
    const connections = [
        [0, 1], [1, 2], [2, 3], [3, 4],  // Thumb
        [0, 5], [5, 6], [6, 7], [7, 8],  // Index
        [0, 9], [9, 10], [10, 11], [11, 12],  // Middle
        [0, 13], [13, 14], [14, 15], [15, 16],  // Ring
        [0, 17], [17, 18], [18, 19], [19, 20]   // Pinky
    ];
    
    for (const [start, end] of connections) {
        ctx.beginPath()SIMPLIFIED and RELIABLE logic
let lastGesture = 'None';
let gestureStability = 0;

function detectGesture(landmarks) {
    // Landmarks indices:
    // 0: Wrist, 1-4: Thumb, 5-8: Index, 9-12: Middle, 13-16: Ring, 17-20: Pinky
    // Tip positions: 4, 8, 12, 16, 20
    // DIP (lower joint): 3, 7, 11, 15, 19
    
    const wrist = landmarks[0];
    
    // Finger tips
    const thumbTip = landmarks[4];
    const indexTip = landmarks[8];
    const middleTip = landmarks[12];
    const ringTip = landmarks[16];
    const pinkyTip = landmarks[20];
    
    // PIP joints (middle joint of each finger)
    const thumbPip = landmarks[2];
    const indexPip = landmarks[6];
    const middlePip = landmarks[10];
    const ringPip = landmarks[14];
    const pinkyPip = landmarks[18];
    
    // Calculate average hand height
    const handHeight = Math.max(...landmarks.map(l => l.y)) - Math.min(...landmarks.map(l => l.y));
    const threshold = handHeight * 0.15; // Finger extension threshold
    
    // Check if fingers are extended (tip above PIP joint)
    const thumbExtended = thumbTip.y < (thumbPip.y - threshold);
    const indexExtended = indexTip.y < (indexPip.y - threshold);
    const middleExtended = middleTip.y < (middlePip.y - threshold);
    const ringExtended = ringTip.y < (ringPip.y - threshold);
    const pinkyExtended = pinkyTip.y < (pinkyPip.y - threshold);
    
    // Distance between thumb and index
    const thumbIndexDist = Math.hypot(
        thumbTip.x - indexTip.x,
        thumbTip.y - indexTip.y
    );
    
    // Distance between index and middle
    const indexMiddleDist = Math.hypot(
        indexTip.x - middleTip.x,
        indexTip.y - middleTip.y
    );
    
    const closeFingerDist = handHeight * 0.1; // Distance threshold for "close" fingers
    let gesture = 'Unknown';
    
    // Simple gesture detection
    if (indexExtended && middleExtended && !thumbExtended && !ringExtended && !pinkyExtended) {
        gesture = 'Peace';
    } 
    else if (!indexExtended && !middleExtended && !ringExtended && !pinkyExtended && !thumbExtended) {
        gesture = 'Fist';
    } 
    else if (indexExtended && middleExtended && ringExtended && pinkyExtended && !thumbExtended) {
        gesture = 'Open Palm';
    }
    else if (indexExtended && middleExtended && ringExtended && pinkyExtended && thumbExtended) {
        gesture = 'Open Palm';
    }
    else if (indexExtended && pinkyExtended && !middleExtended && !ringExtended) {
        gesture = 'Rock';
    }
    else if (thumbExtended && !indexExtended && !middleExtended && !ringExtended && !pinkyExtended) {
        gesture = 'Thumbs Up';
    }
    else {
        gesture = 'Open Palm';
    }
    
    // Update display
    gestureDisplay.textContent = gesture;
    gestureDisplay.style.color = '#667eea';
    
    // Count gestures (debounce to avoid spam)
    if (gesture !== lastGesture) {
        lastGesture = gesture;
        gestureStability = 0;
    } else {
        gestureStability++;
        if (gestureStability > 5 && gesture !== 'Unknown') { // Only count after stable for 5 frames
            if (gestureCounts.hasOwnProperty(gesture)) {
                gestureCounts[gesture]++;
                console.log(`Detected: ${gesture}`);
                updateChart();
            }
            gestureStability = 0; // Reset to avoid multiple counts
        }> 0 || gesture === 'Fist') {
        if (gestureCounts.hasOwnProperty(gesture)) {
            gestureCounts[gesture]++;
        } else if (gesture === 'Rock') {
            // Alternative: count as Peace
            gestureCounts['Peace']++;
        }
        updateChart();
    }
}

// Initialize on page load
window.addEventListener('load', () => {
    console.log('========================================');
    console.log('Hand Gesture Recognition System');
    console.log('========================================');
    console.log('Checking environment...');
    console.log('Hands library:', typeof Hands !== 'undefined' ? '✓ Loaded' : '✗ NOT loaded');
    console.log('Camera library:', typeof Camera !== 'undefined' ? '✓ Loaded' : '✗ NOT loaded');
    console.log('Chart.js:', typeof Chart !== 'undefined' ? '✓ Loaded' : '✗ NOT loaded');
    
    initializeChart();
    
    console.log('========================================');
    console.log('Ready! Click "Start Camera" to begin');
    console.log('========================================');
});

// Log for debugging
console.log('script.js loaded successfully');