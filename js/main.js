// ===================================
// Navigation & Menu Toggle
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ===================================
    // Smooth Scrolling for Navigation Links
    // ===================================
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===================================
    // Scroll to Top Button
    // ===================================
    const scrollTopBtn = document.getElementById('scrollTop');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ===================================
    // Contact Form Handling
    // ===================================
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            company: document.getElementById('company').value,
            country: document.getElementById('country').value,
            bagType: document.getElementById('bagType').value,
            quantity: document.getElementById('quantity').value,
            message: document.getElementById('message').value
        };

        // Validate required fields
        if (!formData.name || !formData.email || !formData.country || !formData.message) {
            showFormMessage('Please fill in all required fields.', 'error');
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate form submission (in production, this would send to a backend)
        // For now, we'll show a success message and log the data
        console.log('Form submitted with data:', formData);
        
        // Show success message
        showFormMessage('Thank you for your inquiry! We will contact you within 24-48 hours.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // Optional: Create mailto link as fallback
        createMailtoLink(formData);
    });

    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Hide message after 10 seconds
        setTimeout(function() {
            formMessage.style.display = 'none';
        }, 10000);
    }

    function createMailtoLink(data) {
        // Create a mailto link as a backup contact method
        const subject = encodeURIComponent(`Inquiry from ${data.name} - ${data.company || 'Individual'}`);
        const body = encodeURIComponent(
            `Name: ${data.name}\n` +
            `Email: ${data.email}\n` +
            `Phone: ${data.phone || 'Not provided'}\n` +
            `Company: ${data.company || 'Not provided'}\n` +
            `Country: ${data.country}\n` +
            `Bag Type: ${data.bagType || 'Not specified'}\n` +
            `Quantity: ${data.quantity || 'Not specified'}\n\n` +
            `Message:\n${data.message}`
        );
        
        // Note: In production, you would send this to your actual email
        const mailtoLink = `mailto:info@ecoexportindia.com?subject=${subject}&body=${body}`;
        
        // Optional: Open email client (commented out to not interrupt user experience)
        // window.location.href = mailtoLink;
        
        console.log('Mailto link created:', mailtoLink);
    }

    // ===================================
    // Intersection Observer for Animations
    // ===================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animate elements on scroll
    const animateElements = document.querySelectorAll(
        '.product-card, .benefit-card, .use-case-card, .branding-feature, .contact-item'
    );

    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // ===================================
    // Active Navigation Link Highlighting
    // ===================================
    function highlightActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const navHeight = navbar.offsetHeight;
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active-link');
            }
        });
    }

    window.addEventListener('scroll', highlightActiveSection);

    // ===================================
    // Hero Button Smooth Scroll
    // ===================================
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    const navHeight = navbar.offsetHeight;
                    const targetPosition = targetSection.offsetTop - navHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ===================================
    // Form Input Enhancements
    // ===================================
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    
    formInputs.forEach(input => {
        // Add focus effect
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });

        // Add filled class when input has value
        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.parentElement.classList.add('filled');
            } else {
                this.parentElement.classList.remove('filled');
            }
        });
    });

    // ===================================
    // Product Card Click to Scroll to Contact
    // ===================================
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function() {
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = contactSection.offsetTop - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Optionally pre-fill the bag type in the form
                const productTitle = this.querySelector('h3').textContent;
                const bagTypeSelect = document.getElementById('bagType');
                
                // Try to match the product title with a select option
                const options = bagTypeSelect.options;
                for (let i = 0; i < options.length; i++) {
                    if (productTitle.toLowerCase().includes(options[i].text.toLowerCase())) {
                        bagTypeSelect.value = options[i].value;
                        break;
                    }
                }
            }
        });
    });

    // ===================================
    // Add Hover Tooltip for Product Cards
    // ===================================
    productCards.forEach(card => {
        card.setAttribute('title', 'Click to inquire about this product');
    });

    // ===================================
    // Statistics Counter Animation (for future enhancement)
    // ===================================
    function animateCounter(element, target, duration) {
        let start = 0;
        const increment = target / (duration / 16); // 60 FPS
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }

    // ===================================
    // Lazy Loading for Images (Performance Enhancement)
    // ===================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ===================================
    // Print Functionality (Optional)
    // ===================================
    window.addEventListener('beforeprint', function() {
        // Expand all collapsed sections before printing
        navMenu.classList.remove('active');
    });

    // ===================================
    // WhatsApp Integration
    // ===================================
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Optional: Track WhatsApp clicks
            console.log('WhatsApp link clicked');
        });
    });

    // ===================================
    // Console Welcome Message
    // ===================================
    console.log('%cEcoExport India', 'color: #2d5f3f; font-size: 24px; font-weight: bold;');
    console.log('%cPremium Eco-Friendly Bags Export Agency', 'color: #4a8c61; font-size: 14px;');
    console.log('Website loaded successfully!');

    // ===================================
    // Performance Monitoring (Development)
    // ===================================
    if (performance && performance.timing) {
        window.addEventListener('load', function() {
            const loadTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
            console.log(`Page loaded in ${loadTime}ms`);
        });
    }
});

// ===================================
// Global Helper Functions
// ===================================

// Function to format phone numbers (if needed)
function formatPhoneNumber(phoneNumber) {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{5})$/);
    if (match) {
        return '+' + match[1] + ' ' + match[2] + ' ' + match[3];
    }
    return phoneNumber;
}

// Function to validate form in real-time
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Function to create notification (for future use)
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4a8c61' : '#e74c3c'};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 16px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===================================
// Browser Compatibility Checks
// ===================================
(function() {
    // Check for required features
    const requiredFeatures = [
        'querySelector',
        'addEventListener',
        'classList'
    ];
    
    const supported = requiredFeatures.every(feature => feature in document || feature in Element.prototype);
    
    if (!supported) {
        console.warn('Some features may not work properly in this browser. Please update to a modern browser.');
    }
})();

// ===================================
// Keyboard Navigation Enhancement
// ===================================
document.addEventListener('keydown', function(e) {
    // Press 'Escape' to close mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('navMenu');
        const hamburger = document.getElementById('hamburger');
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
    
    // Press 'Ctrl + Home' to scroll to top
    if (e.ctrlKey && e.key === 'Home') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// ===================================
// Accessibility Enhancements
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    // Add ARIA labels to interactive elements
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', `Product ${index + 1}: ${card.querySelector('h3').textContent}`);
        
        // Add keyboard support
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });
});

// ===================================
// Cookie Consent (Placeholder for GDPR)
// ===================================
// Uncomment and customize if needed for EU compliance
/*
function showCookieConsent() {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
        const banner = document.createElement('div');
        banner.className = 'cookie-consent';
        banner.innerHTML = `
            <p>We use cookies to improve your experience. By continuing to visit this site you agree to our use of cookies.</p>
            <button onclick="acceptCookies()">Accept</button>
        `;
        document.body.appendChild(banner);
    }
}

function acceptCookies() {
    localStorage.setItem('cookieConsent', 'true');
    document.querySelector('.cookie-consent').remove();
}

window.addEventListener('load', showCookieConsent);
*/