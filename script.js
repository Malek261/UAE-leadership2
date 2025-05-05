document.addEventListener('DOMContentLoaded', () => {
    const readMoreBtn = document.querySelector('.read-more-btn');
    const slider = document.getElementById('slider');
    let currentSlide = 0;

    if (readMoreBtn) {
        readMoreBtn.addEventListener('click', () => {
            window.location.href = 'about.html';
        });
    }

    // Close slider when clicking outside
    document.addEventListener('click', (e) => {
        if (!slider.contains(e.target) && !readMoreBtn.contains(e.target)) {
            slider.classList.remove('open');
        }
    });

    // Set static title and info
    document.getElementById('rulerTitle').textContent = 'UAE Leadership';
    document.getElementById('rulerInfo').textContent = 'Celebrating the vision and unity of the United Arab Emirates.';

    // Button hover effect
    readMoreBtn.addEventListener('mouseenter', () => {
        readMoreBtn.style.transform = 'translateY(-5px)';
    });
    
    readMoreBtn.addEventListener('mouseleave', () => {
        readMoreBtn.style.transform = 'translateY(0)';
    });

    // Carousel slider functionality
    const carousel = document.querySelector('.carousel');
    const leftArrow = document.querySelector('.carousel-arrow.left');
    const rightArrow = document.querySelector('.carousel-arrow.right');
    if (carousel && leftArrow && rightArrow) {
        leftArrow.addEventListener('click', (e) => {
            e.preventDefault();
            carousel.scrollBy({ left: -carousel.offsetWidth * 0.9, behavior: 'smooth' });
        });
        rightArrow.addEventListener('click', (e) => {
            e.preventDefault();
            carousel.scrollBy({ left: carousel.offsetWidth * 0.9, behavior: 'smooth' });
        });
    }

    // Hero background image slideshow with fade + zoom effect
    const heroImages = [
        'images/mbz_new.jpg',
        'images/Sheikh-Mohamed-bin-Zayed-Al-Nahyan.jpg'
    ];
    let heroIndex = 0;
    const heroOverlay = document.querySelector('.hero-overlay');

    // Initialize overlay
    heroOverlay.style.backgroundImage = `url('${heroImages[heroIndex]}')`;
    heroOverlay.classList.add('effect-in');

    function setHeroBgEffect(nextIndex) {
        // Fade/zoom out
        heroOverlay.classList.remove('effect-in');
        heroOverlay.classList.add('effect-out');
        setTimeout(() => {
            heroOverlay.style.backgroundImage = `url('${heroImages[nextIndex]}')`;
            heroOverlay.classList.remove('effect-out');
            heroOverlay.classList.add('effect-in');
        }, 400); // matches transition duration in CSS
    }

    setInterval(() => {
        heroIndex = (heroIndex + 1) % heroImages.length;
        setHeroBgEffect(heroIndex);
    }, 5000);

    // Hero background smooth slideshow
    const heroBg1 = document.querySelector('.hero-bg-1');
    const heroBg2 = document.querySelector('.hero-bg-2');
    let showFirst = true;
    function switchHeroBg() {
        if (showFirst) {
            heroBg1.classList.add('show');
            heroBg2.classList.remove('show');
        } else {
            heroBg1.classList.remove('show');
            heroBg2.classList.add('show');
        }
        showFirst = !showFirst;
    }
    if (heroBg1 && heroBg2) {
        heroBg1.classList.add('show');
        setInterval(switchHeroBg, 5000); // Change every 5 seconds
    }

    // Navbar show/hide on scroll (only show at top)
    const navbar = document.querySelector('.navbar');
    function handleNavbarVisibility() {
        if (window.scrollY === 0) {
            navbar.classList.remove('hide-on-scroll');
        } else {
            navbar.classList.add('hide-on-scroll');
        }
    }
    window.addEventListener('scroll', handleNavbarVisibility);
    handleNavbarVisibility(); // run on load

    // Fade-in effect for all .feature-row on scroll
    function fadeInOnScroll() {
        const featureRows = document.querySelectorAll('.feature-row');
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        featureRows.forEach(row => {
            if (row.classList.contains('fade-in')) return;
            const rect = row.getBoundingClientRect();
            if (rect.top < windowHeight - 80) {
                row.classList.add('fade-in');
            }
        });
    }
    fadeInOnScroll();
    window.addEventListener('scroll', fadeInOnScroll);

    // Samsung-style feature scroll effect
    let samsungFeatureAnimated = false;
    function onScrollSamsungFeature() {
        const section = document.querySelector('.samsung-feature-section');
        if (!section || samsungFeatureAnimated) return;
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        if (rect.top < windowHeight - 100) {
            section.classList.add('visible');
            samsungFeatureAnimated = true;
            window.removeEventListener('scroll', onScrollSamsungFeature);
        }
    }
    window.addEventListener('scroll', onScrollSamsungFeature);
    window.addEventListener('DOMContentLoaded', onScrollSamsungFeature);

    // Samsung-style feature scroll effect for the second section (only once)
    let samsungFeatureAnimated2 = false;
    function onScrollSamsungFeature2() {
        const section2 = document.querySelector('.samsung-feature-section-alt');
        if (!section2 || samsungFeatureAnimated2) return;
        const rect2 = section2.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        if (rect2.top < windowHeight - 100) {
            section2.classList.add('visible');
            samsungFeatureAnimated2 = true;
            window.removeEventListener('scroll', onScrollSamsungFeature2);
        }
    }
    window.addEventListener('scroll', onScrollSamsungFeature2);
    window.addEventListener('DOMContentLoaded', onScrollSamsungFeature2);

    // Improved fade-in on scroll using Intersection Observer
    const fadeEls = document.querySelectorAll('.fade-in-on-scroll');
    fadeEls.forEach(el => el.classList.remove('visible'));
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target); // Only animate once
                }
            });
        }, { threshold: 0.15 });
        fadeEls.forEach(el => observer.observe(el));
    } else {
        // Fallback for old browsers
        function fadeInOnScroll() {
            fadeEls.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight - 80) {
                    el.classList.add('visible');
                }
            });
        }
        window.addEventListener('scroll', fadeInOnScroll);
        window.addEventListener('DOMContentLoaded', fadeInOnScroll);
    }

    // Fade-in effect for portfolio cards
    (function() {
        function revealOnScroll() {
            document.querySelectorAll('.fade-in-on-scroll').forEach(function(el) {
                var rect = el.getBoundingClientRect();
                if(rect.top < window.innerHeight - 60) {
                    el.classList.add('visible');
                }
            });
        }
        window.addEventListener('scroll', revealOnScroll);
        window.addEventListener('DOMContentLoaded', revealOnScroll);
    })();

    // Masonry Gallery Lightbox Logic (scoped to avoid redeclaration)
    (function() {
        const images = document.querySelectorAll('.uae-gallery-masonry img');
        const lightbox = document.getElementById('gallery-lightbox');
        const lightboxImg = document.querySelector('.lightbox-img');
        const closeBtn = document.querySelector('.lightbox-close');
        const leftBtn = document.querySelector('.lightbox-arrow.left');
        const rightBtn = document.querySelector('.lightbox-arrow.right');
        let current = 0;
        function showLightbox(idx) {
            current = idx;
            lightboxImg.src = images[current].src;
            lightboxImg.alt = images[current].alt;
            lightbox.classList.remove('hidden');
        }
        function hideLightbox() {
            lightbox.classList.add('hidden');
        }
        function showNext() {
            current = (current + 1) % images.length;
            showLightbox(current);
        }
        function showPrev() {
            current = (current - 1 + images.length) % images.length;
            showLightbox(current);
        }
        images.forEach((img, idx) => {
            img.addEventListener('click', () => showLightbox(idx));
        });
        closeBtn.addEventListener('click', hideLightbox);
        rightBtn.addEventListener('click', showNext);
        leftBtn.addEventListener('click', showPrev);
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (lightbox.classList.contains('hidden')) return;
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft') showPrev();
            if (e.key === 'Escape') hideLightbox();
        });
        // Click outside image closes
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) hideLightbox();
        });
    })();

    // --- Dark/Light Mode Toggle ---
    function setTheme(mode) {
        if (mode === 'light') {
            document.body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
        }
    }

    function toggleTheme() {
        if (document.body.classList.contains('light-mode')) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }

    // On load, set theme from localStorage
    (function() {
        const saved = localStorage.getItem('theme');
        if (saved === 'light') setTheme('light');
        else setTheme('dark');
    })();
});
