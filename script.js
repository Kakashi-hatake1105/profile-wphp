/* ========================================
   PORTFOLIO SCRIPTS — Krishna Karthikeya J.
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ---------- Element References ---------- */
    const hamburger  = document.getElementById('hamburger');
    const navLinks   = document.getElementById('nav-links');
    const header     = document.getElementById('header');
    const allLinks   = document.querySelectorAll('.nav-links a');
    const sections   = document.querySelectorAll('section');
    const skillBars  = document.querySelectorAll('.skill-progress');
    const form       = document.getElementById('contact-form');


    /* =============================================
       1. HAMBURGER MENU TOGGLE
       ============================================= */
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        hamburger.classList.toggle('active');

        // Animate hamburger bars into X
        const bars = hamburger.querySelectorAll('.bar');
        if (hamburger.classList.contains('active')) {
            bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            bars[1].style.opacity   = '0';
            bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity   = '1';
            bars[2].style.transform = 'none';
        }
    });

    // Close menu when a nav link is clicked
    allLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            hamburger.classList.remove('active');
            const bars = hamburger.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity   = '1';
            bars[2].style.transform = 'none';
        });
    });


    /* =============================================
       2. NAVBAR SHADOW ON SCROLL
       ============================================= */
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.boxShadow = 'none';
        }
    });


    /* =============================================
       3. ACTIVE NAV LINK ON SCROLL
       ============================================= */
    function setActiveLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        allLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', setActiveLink);
    setActiveLink(); // Run once on load


    /* =============================================
       4. SKILL BARS ANIMATION ON SCROLL
       ============================================= */
    let skillsAnimated = false;

    function animateSkillBars() {
        const skillsSection = document.getElementById('skills');
        if (!skillsSection) return;

        const sectionTop    = skillsSection.getBoundingClientRect().top;
        const triggerPoint  = window.innerHeight * 0.8;

        if (sectionTop < triggerPoint && !skillsAnimated) {
            skillsAnimated = true;
            skillBars.forEach(bar => {
                const progress = bar.getAttribute('data-progress');
                // Small delay for stagger effect
                setTimeout(() => {
                    bar.style.width = progress + '%';
                }, 200);
            });
        }
    }

    window.addEventListener('scroll', animateSkillBars);
    animateSkillBars(); // Check on load


    /* =============================================
       5. SCROLL REVEAL ANIMATIONS
       ============================================= */
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.skill-card, .project-card, .contact-item, .about-content, .contact-form');

        reveals.forEach(el => {
            const elTop       = el.getBoundingClientRect().top;
            const triggerPoint = window.innerHeight * 0.88;

            if (elTop < triggerPoint) {
                el.style.opacity   = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    }

    // Set initial hidden state for reveal elements
    function initRevealElements() {
        const reveals = document.querySelectorAll('.skill-card, .project-card, .contact-item, .about-content, .contact-form');
        reveals.forEach(el => {
            el.style.opacity    = '0';
            el.style.transform  = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
    }

    initRevealElements();
    // Small delay so the initial styles apply before first check
    setTimeout(() => {
        revealOnScroll();
    }, 100);

    window.addEventListener('scroll', revealOnScroll);


    /* =============================================
       6. SMOOTH SCROLL FOR ALL ANCHOR LINKS
       ============================================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });


    /* =============================================
       7. CONTACT FORM HANDLING
       ============================================= */
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name    = document.getElementById('name').value.trim();
        const email   = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // Basic validation
        if (!name || !email || !subject || !message) {
            showFormMessage('Please fill in all fields.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate form submission
        const submitBtn = document.getElementById('submit-btn');
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled    = true;

        setTimeout(() => {
            showFormMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
            form.reset();
            submitBtn.textContent = 'Send Message';
            submitBtn.disabled    = false;
        }, 1500);
    });

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showFormMessage(text, type) {
        // Remove any existing message
        const existing = document.querySelector('.form-message');
        if (existing) existing.remove();

        const msg = document.createElement('div');
        msg.className = 'form-message';
        msg.textContent = text;

        // Style the message
        msg.style.padding       = '0.85rem 1rem';
        msg.style.borderRadius  = '6px';
        msg.style.marginTop     = '0.75rem';
        msg.style.fontSize      = '0.9rem';
        msg.style.fontWeight    = '500';
        msg.style.transition    = 'opacity 0.3s ease';

        if (type === 'success') {
            msg.style.background = 'rgba(34, 197, 94, 0.15)';
            msg.style.color      = '#4ade80';
            msg.style.border     = '1px solid rgba(34, 197, 94, 0.3)';
        } else {
            msg.style.background = 'rgba(239, 68, 68, 0.15)';
            msg.style.color      = '#f87171';
            msg.style.border     = '1px solid rgba(239, 68, 68, 0.3)';
        }

        form.appendChild(msg);

        // Auto-remove after 4 seconds
        setTimeout(() => {
            msg.style.opacity = '0';
            setTimeout(() => msg.remove(), 300);
        }, 4000);
    }


    /* =============================================
       8. TYPING EFFECT FOR HERO TITLE
       ============================================= */
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid var(--cyan)';

        let charIndex = 0;

        function typeText() {
            if (charIndex < originalText.length) {
                heroTitle.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeText, 80);
            } else {
                // Remove cursor after typing is done
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 1000);
            }
        }

        // Start typing after a short delay
        setTimeout(typeText, 800);
    }

});
