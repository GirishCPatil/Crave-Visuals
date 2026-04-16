// ══════════════════════════════════════════════════
// CRAVE VISUALS — Ultra-Premium Interactions & Animations
// ══════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

    // ══════════════════════════════════════════════
    // PRELOADER
    // ══════════════════════════════════════════════
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.style.overflow = '';
            triggerHeroAnimations();
        }, 2200);
    });
    // Fallback for slow load
    setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
        triggerHeroAnimations();
    }, 4000);

    // ══════════════════════════════════════════════
    // CUSTOM CURSOR
    // ══════════════════════════════════════════════
    const cursorDot = document.getElementById('cursor-dot');
    const cursorRing = document.getElementById('cursor-ring');
    let cursorX = 0, cursorY = 0;
    let ringX = 0, ringY = 0;

    if (window.matchMedia('(pointer: fine)').matches && cursorDot && cursorRing) {
        document.addEventListener('mousemove', (e) => {
            cursorX = e.clientX;
            cursorY = e.clientY;
            cursorDot.style.left = cursorX + 'px';
            cursorDot.style.top = cursorY + 'px';
        });

        // Smooth lerp for ring
        function animateRing() {
            ringX += (cursorX - ringX) * 0.12;
            ringY += (cursorY - ringY) * 0.12;
            cursorRing.style.left = ringX + 'px';
            cursorRing.style.top = ringY + 'px';
            requestAnimationFrame(animateRing);
        }
        animateRing();

        // Hover effect on interactive elements
        const hoverTargets = document.querySelectorAll('a, button, .compare-handle, .magnetic-btn, .pricing-card, .service-card, .about-card');
        hoverTargets.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });
    }

    // ══════════════════════════════════════════════
    // HERO ANIMATIONS (triggered after loader)
    // ══════════════════════════════════════════════
    let heroAnimated = false;
    function triggerHeroAnimations() {
        if (heroAnimated) return;
        heroAnimated = true;

        document.querySelectorAll('.anim-fade-up').forEach(el => {
            const delay = parseFloat(el.dataset.delay || 0);
            setTimeout(() => el.classList.add('animate'), delay * 1000);
        });

        // Counter animation
        setTimeout(() => animateCounters(), 1200);
    }

    // ══════════════════════════════════════════════
    // COUNTER ANIMATION
    // ══════════════════════════════════════════════
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.target);
            if (!target) return;

            const duration = 2000;
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.round(eased * target);
                counter.textContent = current;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            }
            requestAnimationFrame(updateCounter);
        });
    }

    // ══════════════════════════════════════════════
    // SCROLL REVEAL
    // ══════════════════════════════════════════════
    const revealEls = document.querySelectorAll('.reveal');
    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach((el) => revealObs.observe(el));

    // ══════════════════════════════════════════════
    // STAGGER ANIMATIONS
    // ══════════════════════════════════════════════
    function createStaggerObserver(selector, delayPerItem = 120) {
        const items = document.querySelectorAll(selector);
        if (!items.length) return;

        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    items.forEach((item, i) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, i * delayPerItem);
                    });
                    obs.disconnect();
                }
            });
        }, { threshold: 0.1 });

        items.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(35px)';
            item.style.transition = `opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)`;
        });
        obs.observe(items[0]);
    }

    createStaggerObserver('.service-card', 130);
    createStaggerObserver('.pricing-card', 150);

    // ══════════════════════════════════════════════
    // NAVBAR
    // ══════════════════════════════════════════════
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        navbar.classList.toggle('scrolled', currentScroll > 60);
        lastScroll = currentScroll;
    }, { passive: true });

    // ══════════════════════════════════════════════
    // MOBILE MENU
    // ══════════════════════════════════════════════
    const navToggle = document.getElementById('nav-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ══════════════════════════════════════════════
    // SMOOTH ANCHOR SCROLL
    // ══════════════════════════════════════════════
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const y = target.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        });
    });

    // ══════════════════════════════════════════════
    // PARALLAX GLOW ORBS (Hero)
    // ══════════════════════════════════════════════
    const orbs = document.querySelectorAll('.hero-gradient-orb');
    const hero = document.getElementById('hero');
    if (hero && orbs.length) {
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            orbs.forEach((orb, i) => {
                const speed = (i + 1) * 20;
                orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
            });
        });
    }

    // ══════════════════════════════════════════════
    // PARTICLE SYSTEM (Hero)
    // ══════════════════════════════════════════════
    const particleContainer = document.getElementById('hero-particles');
    if (particleContainer) {
        const particleCount = 40;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            const size = Math.random() * 3 + 1;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const duration = Math.random() * 15 + 10;
            const delay = Math.random() * 10;
            const opacity = Math.random() * 0.4 + 0.1;

            particle.style.cssText = `
                position: absolute;
                width: ${size}px; height: ${size}px;
                background: rgba(212, 175, 55, ${opacity});
                border-radius: 50%;
                left: ${x}%;
                top: ${y}%;
                animation: particleFloat ${duration}s ease-in-out ${delay}s infinite;
                pointer-events: none;
            `;
            particleContainer.appendChild(particle);
        }

        // Add particle animation keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes particleFloat {
                0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
                25% { transform: translate(${Math.random() * 60 - 30}px, ${Math.random() * 60 - 30}px) scale(1.2); opacity: 0.6; }
                50% { transform: translate(${Math.random() * 80 - 40}px, ${Math.random() * 80 - 40}px) scale(0.8); opacity: 0.2; }
                75% { transform: translate(${Math.random() * 60 - 30}px, ${Math.random() * 60 - 30}px) scale(1.1); opacity: 0.5; }
            }
        `;
        document.head.appendChild(style);
    }

    // ══════════════════════════════════════════════
    // COMPARE SLIDERS (Before / After)
    // ══════════════════════════════════════════════
    document.querySelectorAll('.compare-slider').forEach(slider => {
        const handle = slider.querySelector('.compare-handle');
        const before = slider.querySelector('.compare-before');
        let isDragging = false;

        function setPosition(x) {
            const rect = slider.getBoundingClientRect();
            let pos = ((x - rect.left) / rect.width) * 100;
            pos = Math.max(5, Math.min(95, pos));
            before.style.clipPath = `inset(0 ${100 - pos}% 0 0)`;
            handle.style.left = pos + '%';
        }

        // Mouse events
        handle.addEventListener('mousedown', (e) => {
            isDragging = true;
            e.preventDefault();
        });
        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            setPosition(e.clientX);
        });
        window.addEventListener('mouseup', () => {
            isDragging = false;
        });

        // Touch events
        handle.addEventListener('touchstart', (e) => {
            isDragging = true;
            e.preventDefault();
        }, { passive: false });
        window.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            setPosition(e.touches[0].clientX);
        });
        window.addEventListener('touchend', () => {
            isDragging = false;
        });

        // Click anywhere on slider
        slider.addEventListener('click', (e) => {
            setPosition(e.clientX);
        });
    });

    // ══════════════════════════════════════════════
    // TILT EFFECT (3D Card Hover)
    // ══════════════════════════════════════════════
    if (window.matchMedia('(pointer: fine)').matches) {
        document.querySelectorAll('[data-tilt]').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -4;
                const rotateY = ((x - centerX) / centerX) * 4;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                card.style.transition = 'transform 0.6s cubic-bezier(0.16,1,0.3,1)';
                setTimeout(() => card.style.transition = '', 600);
            });

            card.addEventListener('mouseenter', () => {
                card.style.transition = 'none';
            });
        });
    }

    // ══════════════════════════════════════════════
    // MAGNETIC BUTTON EFFECT
    // ══════════════════════════════════════════════
    if (window.matchMedia('(pointer: fine)').matches) {
        document.querySelectorAll('.magnetic-btn').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
                btn.style.transition = 'transform 0.4s cubic-bezier(0.16,1,0.3,1)';
                setTimeout(() => btn.style.transition = '', 400);
            });

            btn.addEventListener('mouseenter', () => {
                btn.style.transition = 'none';
            });
        });
    }

    // ══════════════════════════════════════════════
    // PARALLAX SCROLL EFFECT
    // ══════════════════════════════════════════════
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollY = window.scrollY;

                // Parallax on hero orbs
                orbs.forEach((orb, i) => {
                    const speed = (i + 1) * 0.08;
                    orb.style.transform = `translateY(${scrollY * speed}px)`;
                });

                // Fade hero on scroll
                const heroContent = document.querySelector('.hero-content');
                if (heroContent) {
                    const opacity = Math.max(0, 1 - scrollY / 600);
                    const translateY = scrollY * 0.3;
                    heroContent.style.opacity = opacity;
                    heroContent.style.transform = `translateY(${translateY}px)`;
                }

                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // ══════════════════════════════════════════════
    // SECTION DIVIDER GLOW ANIMATION
    // ══════════════════════════════════════════════
    const sections = document.querySelectorAll('#about, #services, #gallery, #pricing');
    const glowObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.setProperty('--glow-opacity', '1');
            }
        });
    }, { threshold: 0.05 });
    sections.forEach(s => glowObs.observe(s));

    // ══════════════════════════════════════════════
    // TEXT SPLIT ANIMATION (on hero)
    // ══════════════════════════════════════════════
    function splitTextAnimation() {
        const heroTitle = document.querySelector('.hero-title');
        if (!heroTitle) return;

        // Add shimmer effect on gradient text
        const gradientText = heroTitle.querySelector('.gradient-text');
        if (gradientText) {
            gradientText.style.backgroundSize = '200% auto';
            gradientText.style.animation = 'shimmer 3s ease-in-out infinite';

            const shimmerStyle = document.createElement('style');
            shimmerStyle.textContent = `
                @keyframes shimmer {
                    0%, 100% { background-position: 0% center; }
                    50% { background-position: 100% center; }
                }
            `;
            document.head.appendChild(shimmerStyle);
        }
    }
    splitTextAnimation();

    // ══════════════════════════════════════════════
    // SMOOTH SCROLL SPEED / PROGRESS INDICATOR
    // ══════════════════════════════════════════════
    // Progress bar on the navbar
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: absolute; bottom: 0; left: 0; height: 2px;
        background: linear-gradient(90deg, #d4af37, #f0d060, #ffb347);
        width: 0%; transition: width 0.1s linear; z-index: 1001;
    `;
    navbar.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    }, { passive: true });

    // ══════════════════════════════════════════════
    // RIPPLE EFFECT ON BUTTONS
    // ══════════════════════════════════════════════
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute; width: ${size}px; height: ${size}px;
                left: ${x}px; top: ${y}px;
                background: rgba(255,255,255,0.25);
                border-radius: 50%; transform: scale(0);
                animation: rippleEffect 0.6s ease-out forwards;
                pointer-events: none; z-index: 0;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes rippleEffect {
            0% { transform: scale(0); opacity: 1; }
            100% { transform: scale(2.5); opacity: 0; }
        }
    `;
    document.head.appendChild(rippleStyle);

    // ══════════════════════════════════════════════
    // INTERSECTION-BASED COUNTER (About Section)
    // ══════════════════════════════════════════════
    const aboutCounters = document.querySelectorAll('#about .counter');
    if (aboutCounters.length) {
        const counterObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    aboutCounters.forEach(counter => {
                        const target = parseInt(counter.dataset.target);
                        if (!target) return;
                        const duration = 2000;
                        const start = performance.now();
                        function update(now) {
                            const elapsed = now - start;
                            const progress = Math.min(elapsed / duration, 1);
                            const eased = 1 - Math.pow(1 - progress, 3);
                            counter.textContent = Math.round(eased * target);
                            if (progress < 1) requestAnimationFrame(update);
                        }
                        requestAnimationFrame(update);
                    });
                    counterObs.disconnect();
                }
            });
        }, { threshold: 0.3 });
        counterObs.observe(aboutCounters[0].closest('.about-card'));
    }

});
