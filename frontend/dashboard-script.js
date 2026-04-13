// Check if user is logged in
function checkAuth() {
    const user = localStorage.getItem('user');
    if (!user) {
        window.location.href = 'login.html';
        return;
    }
}

checkAuth();

// Sidebar Toggle
const toggleSidebar = document.getElementById('toggleSidebar');
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.querySelector('.sidebar');
const mainContent = document.querySelector('.main-content');

toggleSidebar?.addEventListener('click', () => {
    sidebar.classList.remove('active');
});

menuToggle?.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

// Section Navigation
const navLinks = document.querySelectorAll('.nav-link');
const contentSections = document.querySelectorAll('.content-section');
const pageTitle = document.querySelector('.page-title');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // Hide all sections
        contentSections.forEach(section => section.classList.remove('active'));
        
        // Show selected section
        const sectionId = link.getAttribute('data-section');
        const section = document.getElementById(sectionId);
        section.classList.add('active');
        
        // Update page title
        pageTitle.textContent = link.textContent.trim();
        
        // Close sidebar on mobile
        if (window.innerWidth < 768) {
            sidebar.classList.remove('active');
        }
    });
});

// Logout
const logoutBtn = document.getElementById('logoutBtn');
logoutBtn?.addEventListener('click', () => {
    localStorage.removeItem('user');
    window.location.href = 'login.html';
});

// Chart Configuration
let distributionChart = null;
let trendChart = null;
let gestureChart = null;
let accuracyChart = null;
let gestureCounts = { 'Open Palm': 25, 'Fist': 18, 'Thumbs Up': 12, 'Peace': 15, 'OK': 20 };

function initializeCharts() {
    // Distribution Chart
    const distributionCtx = document.getElementById('distributionChart')?.getContext('2d');
    if (distributionCtx && !distributionChart) {
        distributionChart = new Chart(distributionCtx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(gestureCounts),
                datasets: [{
                    data: Object.values(gestureCounts),
                    backgroundColor: [
                        '#667eea',
                        '#764ba2',
                        '#f093fb',
                        '#4facfe',
                        '#43e97b'
                    ],
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { color: '#fff', usePointStyle: true }
                    }
                }
            }
        });
    }

    // Trend Chart
    const trendCtx = document.getElementById('trendChart')?.getContext('2d');
    if (trendCtx && !trendChart) {
        trendChart = new Chart(trendCtx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Recognitions',
                    data: [65, 75, 70, 85, 90, 88, 92],
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 3
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { labels: { color: '#fff' } }
                },
                scales: {
                    y: { ticks: { color: '#fff' }, grid: { color: 'rgba(255,255,255,0.1)' } },
                    x: { ticks: { color: '#fff' }, grid: { color: 'rgba(255,255,255,0.1)' } }
                }
            }
        });
    }

    // Gesture Frequency Chart
    const gestureCtx = document.getElementById('gestureChart')?.getContext('2d');
    if (gestureCtx && !gestureChart) {
        gestureChart = new Chart(gestureCtx, {
            type: 'bar',
            data: {
                labels: Object.keys(gestureCounts),
                datasets: [{
                    label: 'Frequency',
                    data: Object.values(gestureCounts),
                    backgroundColor: [
                        'linear-gradient(135deg, #667eea, #764ba2)',
                        'linear-gradient(135deg, #f093fb, #f5576c)',
                        'linear-gradient(135deg, #4facfe, #00f2fe)',
                        'linear-gradient(135deg, #43e97b, #38f9d7)',
                        'linear-gradient(135deg, #fa709a, #fee140)'
                    ],
                    borderRadius: 5,
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                indexAxis: 'y',
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: { ticks: { color: '#fff' }, grid: { color: 'rgba(255,255,255,0.1)' } },
                    y: { ticks: { color: '#fff' }, grid: { display: false } }
                }
            }
        });
    }

    // Accuracy Chart
    const accuracyCtx = document.getElementById('accuracyChart')?.getContext('2d');
    if (accuracyCtx && !accuracyChart) {
        accuracyChart = new Chart(accuracyCtx, {
            type: 'radar',
            data: {
                labels: ['Open Palm', 'Fist', 'Thumbs Up', 'Peace', 'OK'],
                datasets: [{
                    label: 'Recognition Rate %',
                    data: [95, 92, 88, 91, 90],
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.2)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { labels: { color: '#fff' } }
                },
                scales: {
                    r: {
                        ticks: { color: '#fff' },
                        grid: { color: 'rgba(255,255,255,0.1)' }
                    }
                }
            }
        });
    }
}

// Handle main index.html camera functionality
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const startCamera = document.getElementById('startCamera');
const stopCamera = document.getElementById('stopCamera');
const captureScreenshot = document.getElementById('captureScreenshot');
const cameraStatus = document.getElementById('cameraStatus');
const gestureDisplay = document.getElementById('gestureDisplay');
const handStatus = document.getElementById('handStatus');
const confidenceFill = document.getElementById('confidenceFill');
const confidenceText = document.getElementById('confidenceText');
const resetAnalytics = document.getElementById('resetAnalytics');

let cameraStream = null;

// Start Camera
if (startCamera) {
    startCamera.addEventListener('click', async () => {
        try {
            cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (video) {
                video.srcObject = cameraStream;
            }
            if (cameraStatus) {
                cameraStatus.innerHTML = '<i class="fas fa-circle" style="color: #43e97b;"></i> Camera ON';
            }
        } catch (error) {
            console.error('Error accessing camera:', error);
            if (cameraStatus) {
                cameraStatus.textContent = 'Camera Error';
            }
        }
    });
}

// Stop Camera
if (stopCamera) {
    stopCamera.addEventListener('click', () => {
        if (cameraStream) {
            cameraStream.getTracks().forEach(track => track.stop());
            if (cameraStatus) {
                cameraStatus.innerHTML = '<i class="fas fa-circle"></i> Camera OFF';
            }
        }
    });
}

// Capture Screenshot
if (captureScreenshot) {
    captureScreenshot.addEventListener('click', () => {
        if (canvas && video) {
            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const link = document.createElement('a');
            link.href = canvas.toDataURL();
            link.download = `gesture-${Date.now()}.png`;
            link.click();
        }
    });
}

// Reset Analytics
if (resetAnalytics) {
    resetAnalytics.addEventListener('click', () => {
        gestureCounts = { 'Open Palm': 0, 'Fist': 0, 'Thumbs Up': 0, 'Peace': 0, 'OK': 0 };
        if (gestureChart) {
            gestureChart.data.datasets[0].data = Object.values(gestureCounts);
            gestureChart.update();
        }
    });
}

// Initialize on page load
window.addEventListener('load', () => {
    initializeCharts();
    console.log('Dashboard loaded');
});

// Responsive adjustments
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        sidebar.classList.remove('active');
    }
});
