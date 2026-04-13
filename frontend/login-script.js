// Login Form Handling
const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Basic validation
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }

    // Simulate login process
    console.log('Logging in with:', email);
    
    // Store user info in localStorage
    localStorage.setItem('user', JSON.stringify({ email, loggedIn: true }));
    
    // Redirect to dashboard
    window.location.href = 'dashboard.html';
});

// Social Login Buttons
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const provider = btn.classList.contains('google-btn') ? 'Google' : 'GitHub';
        alert(`Sign in with ${provider} - Integration required`);
    });
});

// Forgot Password Link
document.querySelector('.forgot-password').addEventListener('click', (e) => {
    e.preventDefault();
    alert('Password reset link sent to your email');
});

// Sign Up Link
document.querySelector('.signup-link').addEventListener('click', (e) => {
    e.preventDefault();
    alert('Sign up page - Under development');
});

// Add animation on load
window.addEventListener('load', () => {
    document.querySelector('.login-box').classList.add('fade-in');
});
