document.addEventListener('DOMContentLoaded', () => {
    // AOS Initialization
    AOS.init({
        duration: 1000,
        once: true
    });

    // Typed.js Implementation (sadece ana sayfada)
    const typedElement = document.querySelector('.typed-text');
    if (typedElement && typeof Typed !== 'undefined') {
        const typed = new Typed('.typed-text', {
            strings: [
                'Frontend Developer',
                'Backend Developer',
                'UI/UX Designer',
                'Problem Solver'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true
        });
    }

    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        follower.style.left = e.clientX + 'px';
        follower.style.top = e.clientY + 'px';
    });

    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    let menuOpen = false;

    menuBtn.addEventListener('click', () => {
        if (!menuOpen) {
            menuBtn.classList.add('open');
            navLinks.classList.add('active');
            menuOpen = true;
        } else {
            menuBtn.classList.remove('open');
            navLinks.classList.remove('active');
            menuOpen = false;
        }
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Aktif menü öğesini güncelle
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');

            if (menuOpen) {
                menuBtn.classList.remove('open');
                navLinks.classList.remove('active');
                menuOpen = false;
            }
        });
    });

    // Scroll pozisyonuna göre aktif menüyü güncelle
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            const scroll = window.scrollY;

            if (scroll >= sectionTop && scroll < sectionTop + sectionHeight) {
                const currentId = section.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Skills Animation
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillsSection = document.querySelector('#skills');

    if (skillBars.length > 0 && skillsSection) {
        const animateSkills = () => {
            skillBars.forEach(bar => {
                const progress = bar.getAttribute('data-progress');
                bar.style.width = progress + '%';
            });
        };

        // Intersection Observer for Skills
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkills();
                }
            });
        });

        skillsObserver.observe(skillsSection);
    }

    // Form Handling
    const form = document.getElementById('contact-form');
    if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gönderiliyor...';

        if (typeof emailjs !== 'undefined') {
            // Email gönderme
            const templateParams = {
                from_name: document.getElementById('name').value,
                from_email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            emailjs.send('service_lyn8hbn', 'template_zfx0agl', templateParams)
                .then(function(response) {
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Gönderildi!';
                    form.reset();

                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                    }, 2000);
                }, function(error) {
                    submitBtn.innerHTML = '<i class="fas fa-times"></i> Hata!';
                    console.error('Email gönderme hatası:', error);

                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                    }, 2000);
                });
        }
    });
    }

    // Navbar Background Change on Scroll
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(25, 42, 86, 0.95)';
            nav.style.backdropFilter = 'blur(10px)';
        } else {
            nav.style.background = 'rgba(25, 42, 86, 0.9)';
            nav.style.backdropFilter = 'blur(10px)';
        }
    });

    // Project Cards Hover Effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});