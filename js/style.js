            // =====================================================
            // SMOOTH SCROLLING & ACTIVE NAVIGATION
            // =====================================================
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

            // Active navigation highlighting
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('nav a');

            window.addEventListener('scroll', () => {
                let current = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    if (scrollY >= sectionTop - 200) {
                        current = section.getAttribute('id');
                    }
                });

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').slice(1) === current) {
                        link.classList.add('active');
                    }
                });
            });

            // =====================================================
            // PARALLAX BACKGROUND BLOBS
            // =====================================================
            document.addEventListener('mousemove', (e) => {
                const blobs = document.querySelectorAll('.bg-blob');
                const x = e.clientX / window.innerWidth;
                const y = e.clientY / window.innerHeight;

                blobs.forEach((blob, index) => {
                    const speed = (index + 1) * 20;
                    const xMove = (x - 0.5) * speed;
                    const yMove = (y - 0.5) * speed;
                    blob.style.transform = `translate(${xMove}px, ${yMove}px)`;
                });
            });

            // =====================================================
            // INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
            // =====================================================
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -100px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);

            // Observe project cards and sections
            document.querySelectorAll('.project-card, .expertise-content, .gallery-info').forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            });

            // =====================================================
            // CTA BUTTON & PARALLAX ON SCROLL
            // =====================================================
            document.querySelector('.cta-button').addEventListener('click', function (e) {
                e.preventDefault();
                // Add your navigation logic here
                console.log('More About Me clicked');
            });

            // Optional: Add parallax effect on scroll
            window.addEventListener('scroll', function () {
                const scrolled = window.pageYOffset;
                const profileSection = document.querySelector('.profile-section');
                if (profileSection) {
                    profileSection.style.transform = `translateY(${scrolled * 0.1}px)`;
                }
            });

            // =====================================================
            // SKILLS ANIMATION
            // =====================================================
            window.addEventListener('load', () => {
                // Animate progress bars
                const skillBars = document.querySelectorAll('.my-skill-bar');
                skillBars.forEach(bar => {
                    const progress = bar.getAttribute('data-progress');
                    setTimeout(() => {
                        bar.style.width = progress + '%';
                    }, 100);
                });

                // Animate circular progress
                const circleProgress = document.querySelectorAll('.my-circle-progress');
                circleProgress.forEach(circle => {
                    const progress = circle.getAttribute('data-progress');
                    const circumference = 2 * Math.PI * 65; // 2πr where r=65
                    const offset = circumference - (progress / 100) * circumference;

                    setTimeout(() => {
                        circle.style.strokeDashoffset = offset;
                    }, 100);
                });
            });

            // =====================================================
            // ACHIEVEMENTS CAROUSEL ANIMATION
            // =====================================================
            CustomEase.create("cubic", "0.83, 0, 0.17, 1");

            let isAnimating = false;

            function splitTextIntoSpans(selector) {
                let elements = document.querySelectorAll(selector);
                elements.forEach(element => {
                    let text = element.innerText;
                    let splitText = text
                        .split("")
                        .map(char => `<span>${char === " " ? "&nbsp;&nbsp;" : char}</span>`)
                        .join("");
                    element.innerHTML = splitText;
                });
            }

            function initializeCards() {
                let cards = Array.from(document.querySelectorAll(".card-so1"));
                gsap.to(cards, {
                    y: i => -15 + 15 * i + "%",
                    z: i => 15 * i,
                    duration: 1,
                    ease: "cubic",
                    stagger: -0.1
                });
            }

            function animateNextCard() {
                if (isAnimating) return;
                isAnimating = true;

                let slider = document.querySelector(".slider-so1");
                let cards = Array.from(slider.querySelectorAll(".card-so1"));
                let lastCard = cards.pop();
                let nextCard = cards[cards.length - 1];

                gsap.to(lastCard.querySelectorAll("h1 span"), {
                    y: 200,
                    duration: 0.75,
                    ease: "cubic"
                });

                gsap.to(lastCard, {
                    y: "+=150%",
                    duration: 0.75,
                    ease: "cubic",
                    onComplete: () => {
                        slider.prepend(lastCard);
                        initializeCards();
                        gsap.set(lastCard.querySelectorAll("h1 span"), { y: -200 });

                        setTimeout(() => { isAnimating = false; }, 1000);
                    }
                });

                gsap.to(nextCard.querySelectorAll("h1 span"), {
                    y: 0,
                    duration: 1,
                    ease: "cubic",
                    stagger: 0.05
                });
            }

            document.addEventListener("DOMContentLoaded", () => {
                splitTextIntoSpans(".copy-so1 h1");
                initializeCards();

                gsap.set("h1 span", { y: -200 });
                gsap.set(".slider-so1 .card-so1:last-child h1 span", { y: 0 });

                // ✅ Automatically change cards every 4 seconds
                setInterval(animateNextCard, 4000);
            });

            // =====================================================
            // CONTACT FORM ANIMATIONS
            // =====================================================
            const inputs = document.querySelectorAll(".input-so3");

            function focusFunc() {
                let parent = this.parentNode;
                parent.classList.add("focus-so3");
            }

            function blurFunc() {
                let parent = this.parentNode;
                if (this.value == "") {
                    parent.classList.remove("focus-so3");
                }
            }

            inputs.forEach((input) => {
                input.addEventListener("focus", focusFunc);
                input.addEventListener("blur", blurFunc);
            });