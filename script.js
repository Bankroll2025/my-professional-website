// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Handle subscription form
const subscribeForm = document.getElementById('subscribeForm');
subscribeForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    
    // Here you would typically send this to your backend server
    // For now, we'll just show an alert
    alert(`Thank you for subscribing with: ${email}`);
    subscribeForm.reset();
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.background = '#ffffff';
    }
});

// Add loading animation for social buttons
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'translateY(-3px)';
        }, 200);
    });
});

// Remove custom cursor code
const cursor = document.querySelector('.custom-cursor');
if (cursor) {
    cursor.style.display = 'none';
}

// Remove cursor event listeners
document.removeEventListener('mousemove', cursorMove);
document.querySelectorAll('a, button').forEach(element => {
    element.removeEventListener('mouseenter', cursorEnter);
    element.removeEventListener('mouseleave', cursorLeave);
});

// Enhanced hover effect for interactive elements
document.querySelectorAll('a, button').forEach(element => {
    element.addEventListener('mouseenter', () => {
        // cursor.style.width = '40px';
        // cursor.style.height = '40px';
        // cursor.style.background = 'radial-gradient(circle, rgba(255, 0, 0, 0.9) 0%, rgba(139, 0, 0, 0.4) 50%, transparent 70%)';
        // cursor.style.filter = 'drop-shadow(0 0 15px rgba(255, 0, 0, 1))';
    });
    
    element.addEventListener('mouseleave', () => {
        // cursor.style.width = '20px';
        // cursor.style.height = '20px';
        // cursor.style.background = 'radial-gradient(circle, rgba(255, 0, 0, 0.8) 0%, rgba(255, 0, 0, 0) 70%)';
        // cursor.style.filter = 'drop-shadow(0 0 5px rgba(255, 0, 0, 0.8))';
    });
});

// Add glow effect on hover over interactive elements
document.querySelectorAll('a, button').forEach(element => {
    element.addEventListener('mouseenter', () => {
        // cursor.style.width = '40px';
        // cursor.style.height = '40px';
        // cursor.style.background = 'radial-gradient(circle, rgba(255, 215, 0, 0.9) 0%, rgba(255, 215, 0, 0) 70%)';
    });
    
    element.addEventListener('mouseleave', () => {
        // cursor.style.width = '20px';
        // cursor.style.height = '20px';
        // cursor.style.background = 'radial-gradient(circle, rgba(255, 215, 0, 0.8) 0%, rgba(255, 215, 0, 0) 70%)';
    });
});
