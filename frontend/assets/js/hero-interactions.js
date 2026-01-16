/* ============================================
   HERO SECTION INTERACTIONS
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll for all hero CTA buttons
    const ctaButtons = document.querySelectorAll('.btn-primary-hero, .btn-secondary-hero');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Check if it's an internal link (starts with #)
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    // Use the existing switchToSection function from app.js
                    if (typeof switchToSection === 'function') {
                        switchToSection(targetId);
                    } else {
                        // Fallback smooth scroll
                        targetSection.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                    
                    // Update active nav
                    const navLinks = document.querySelectorAll('.nav a');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === href) {
                            link.classList.add('active');
                        }
                    });
                }
            }
        });
    });
    
    // Scroll indicator functionality
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.getElementById('about');
            
            if (aboutSection) {
                // Use the existing switchToSection function
                if (typeof switchToSection === 'function') {
                    switchToSection('about');
                } else {
                    // Fallback smooth scroll
                    aboutSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                
                // Update active nav
                const navLinks = document.querySelectorAll('.nav a');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#about') {
                        link.classList.add('active');
                    }
                });
            }
        });
        
        // Add cursor pointer to indicate it's clickable
        scrollIndicator.style.cursor = 'pointer';
    }
    
    // Social links - ensure they open in new tab
    const socialLinks = document.querySelectorAll('.hero-social .social-link');
    
    socialLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && (href.startsWith('http') || href.startsWith('https'))) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
});
