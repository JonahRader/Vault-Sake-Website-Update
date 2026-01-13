// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 50
});

// Ensure video plays on mobile (iOS fix)
const heroVideo = document.getElementById('heroVideo');
if (heroVideo) {
    // Try to play video on load
    heroVideo.play().catch(() => {
        // If autoplay fails, play on first user interaction
        document.addEventListener('touchstart', function playVideo() {
            heroVideo.play();
            document.removeEventListener('touchstart', playVideo);
        }, { once: true });
    });
}

// Navigation scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 100);
});

// Mobile nav toggle
document.getElementById('navToggle').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Video toggle
const videoIcon = document.getElementById('videoIcon');
document.getElementById('videoToggle').addEventListener('click', () => {
    if (heroVideo.paused) {
        heroVideo.play();
        videoIcon.classList.replace('fa-play', 'fa-pause');
    } else {
        heroVideo.pause();
        videoIcon.classList.replace('fa-pause', 'fa-play');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
        // Close mobile nav if open
        document.querySelector('.nav-links').classList.remove('active');
    });
});

// Contact form submission
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thanks for reaching out! We\'ll get back to you soon.');
    e.target.reset();
});

// Counter Animation
const counters = document.querySelectorAll('.counter');
const speed = 100;

const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const increment = target / speed;
    let current = 0;

    const updateCount = () => {
        current += increment;
        if (current < target) {
            counter.innerText = Math.ceil(current);
            requestAnimationFrame(updateCount);
        } else {
            counter.innerText = target;
        }
    };
    updateCount();
};

// Intersection Observer to trigger counters when visible
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            animateCounter(counter);
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));
