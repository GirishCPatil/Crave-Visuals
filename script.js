// ══════════════════════════════════════════════════
// CRAVE VISUALS — Interactions
// ══════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

    // ── Scroll Reveal ───────────────────────────
    const revealEls = document.querySelectorAll('.reveal');
    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el) => revealObs.observe(el));

    // ── Stagger BA pairs on scroll ──────────────
    const baPairs = document.querySelectorAll('.ba-pair');
    const pairObs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                baPairs.forEach((pair, i) => {
                    setTimeout(() => {
                        pair.style.opacity = '1';
                        pair.style.transform = 'translateY(0)';
                    }, i * 140);
                });
                pairObs.disconnect();
            }
        });
    }, { threshold: 0.15 });

    if (baPairs.length) {
        baPairs.forEach((pair) => {
            pair.style.opacity = '0';
            pair.style.transform = 'translateY(28px)';
            pair.style.transition = 'opacity 0.65s cubic-bezier(0.16,1,0.3,1), transform 0.65s cubic-bezier(0.16,1,0.3,1)';
        });
        pairObs.observe(baPairs[0]);
    }

    // ── Pricing card stagger ────────────────────
    document.querySelectorAll('.pricing-card.reveal').forEach((card, i) => {
        card.style.transitionDelay = `${i * 0.12}s`;
    });

    // ── Problem card stagger ────────────────────
    const problemCards = document.querySelectorAll('.problem-card');
    const probObs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                problemCards.forEach((card, i) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, i * 150);
                });
                probObs.disconnect();
            }
        });
    }, { threshold: 0.2 });

    if (problemCards.length) {
        problemCards.forEach((card) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)';
        });
        probObs.observe(problemCards[0]);
    }

    // ── Navbar scroll ───────────────────────────
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

    // ── Smooth anchor scroll ────────────────────
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
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

    // ── Parallax glow on hero ───────────────────
    const glow1 = document.querySelector('.hero-glow-1');
    const glow2 = document.querySelector('.hero-glow-2');
    window.addEventListener('mousemove', (e) => {
        if (!glow1 || !glow2) return;
        const x = (e.clientX / window.innerWidth - 0.5) * 30;
        const y = (e.clientY / window.innerHeight - 0.5) * 30;
        glow1.style.transform = `translate(${x}px,${y}px)`;
        glow2.style.transform = `translate(${-x}px,${-y}px)`;
    });

});
