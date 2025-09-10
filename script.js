// Arabic Car Service Website JavaScript
// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Phone number tracking
    const phoneButtons = document.querySelectorAll('a[href^="tel:"]');
    phoneButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            console.log('تم الاتصال بالرقم: 0553628999 - ونش أبوظبي');
            // يمكن إضافة تتبع Google Analytics هنا
        });
    });

    // WhatsApp button tracking
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');
    whatsappButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            console.log('تم فتح واتساب - ونش أبوظبي');
            // يمكن إضافة تتبع Google Analytics هنا
        });
    });

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe service cards and area cards
    const animatedElements = document.querySelectorAll('.service-card, .area-card, .feature');
    animatedElements.forEach(function(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Emergency contact highlight
    const emergencyButtons = document.querySelectorAll('.emergency-call, .emergency-whatsapp');
    emergencyButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            // Flash effect for emergency buttons
            this.style.animation = 'flash 0.5s';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
    });

    // Add flash animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes flash {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
        
        .nav-menu a.active {
            color: #ffd700 !important;
            background-color: rgba(255,255,255,0.1);
        }
    `;
    document.head.appendChild(style);

    // Highlight active navigation item
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
        
        let current = '';
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    // Update active nav on scroll
    window.addEventListener('scroll', updateActiveNav);
    
    // Mobile menu toggle (if needed in future)
    function createMobileMenu() {
        const nav = document.querySelector('.nav-container');
        const menuToggle = document.createElement('button');
        menuToggle.innerHTML = '☰';
        menuToggle.className = 'mobile-menu-toggle';
        menuToggle.style.display = 'none';
        menuToggle.style.background = 'none';
        menuToggle.style.border = 'none';
        menuToggle.style.color = 'white';
        menuToggle.style.fontSize = '1.5em';
        menuToggle.style.cursor = 'pointer';
        
        // Add mobile styles
        const mobileStyle = document.createElement('style');
        mobileStyle.textContent = `
            @media (max-width: 768px) {
                .mobile-menu-toggle {
                    display: block !important;
                }
                .nav-menu {
                    display: none;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: #1e3c72;
                    flex-direction: column;
                    padding: 20px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }
                .nav-menu.active {
                    display: flex !important;
                }
            }
        `;
        document.head.appendChild(mobileStyle);
        
        nav.appendChild(menuToggle);
        
        menuToggle.addEventListener('click', function() {
            const navMenu = document.querySelector('.nav-menu');
            navMenu.classList.toggle('active');
        });
    }
    
    createMobileMenu();
});
