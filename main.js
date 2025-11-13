 // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Smooth scrolling for navigation links
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

        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Add floating animation to skill tags
        document.querySelectorAll('.skill-tag').forEach((tag, index) => {
            tag.style.animationDelay = `${index * 0.1}s`;
        });

        // Add stagger effect to timeline items
        document.querySelectorAll('.timeline-item').forEach((item, index) => {
            item.style.animationDelay = `${index * 0.2}s`;
        });

        // Add hover sound effect simulation
        document.querySelectorAll('.btn, .social-link, .achievement-card').forEach(element => {
            element.addEventListener('mouseenter', function() {
                this.style.transform = this.style.transform || '';
                if (this.classList.contains('btn')) {
                    this.style.transform += ' scale(1.05)';
                }
            });
        });

        // Parallax effect for hero section
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });

        // Add typewriter effect to subtitle
        function typeWriter(element, text, speed = 100) {
            let i = 0;
            element.innerHTML = '';
            function typing() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(typing, speed);
                }
            }
            typing();
        }

        // Initialize typewriter effect when page loads
        window.addEventListener('load', function() {
            const subtitle = document.querySelector('.hero .subtitle');
            if (subtitle) {
                const originalText = subtitle.textContent;
                setTimeout(() => {
                    typeWriter(subtitle, originalText, 50);
                }, 1000);
            }
        });
   // Certificate images - Replace with your actual image paths
        const certificateImages = [
            '20.jpg',
            '16.png',
            '9.png',
            '12.png',
            '13.jpg',
            '24.jpg',
            '14.png',
            '22.jpg',
            '8.jpg',
            '21.jpg',
            '29.png',
            '27.png',
            '25.jpg',
            '28.jpg',
            '1.jpeg',
            '18.png',
            '15.jpg',
            '26.jpg',
            '3.png',
            '5.png',
            '23.jpg',
            '6.jpg',
            '7.png',
            '30.png',
            '2.jpg',
            '4.jpg',
            '11.jpg',
            '17.jpg',
            '19.jpg'

        ];

        // Configuration
        let currentIndex = 0;
        const cardsPerView = {
            mobile: 1,
            tablet: 2,
            desktop: 3
        };

        // Get current cards per view based on screen size
        function getCardsPerView() {
            const width = window.innerWidth;
            if (width < 769) return cardsPerView.mobile;
            if (width < 1025) return cardsPerView.tablet;
            return cardsPerView.desktop;
        }

        const track = document.getElementById('carouselTrack');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const dotsContainer = document.getElementById('carouselDots');
        const counter = document.getElementById('counter');
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.getElementById('lightboxImage');
        const lightboxClose = document.getElementById('lightboxClose');

        // Populate certificates with images
        function populateCertificates() {
            const fragment = document.createDocumentFragment();
            
            certificateImages.forEach((imgSrc, index) => {
                const card = document.createElement('div');
                card.className = 'certificate-card loading';
                
                const img = document.createElement('img');
                img.className = 'certificate-image';
                img.src = imgSrc;
                img.alt = `Certificate ${index + 1}`;
                img.loading = 'lazy'; // Native lazy loading for performance
                
                // Remove loading state when image loads
                img.onload = () => {
                    card.classList.remove('loading');
                };
                
                // Handle image errors
                img.onerror = () => {
                    card.classList.remove('loading');
                    img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23667eea22" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23667eea" font-size="20" font-family="Arial"%3ECertificate ' + (index + 1) + '%3C/text%3E%3C/svg%3E';
                };
                
                // Click to view full size
                card.addEventListener('click', () => openLightbox(imgSrc));
                
                card.appendChild(img);
                fragment.appendChild(card);
            });
            
            track.appendChild(fragment);
        }

        // Lightbox functions
        function openLightbox(imgSrc) {
            lightboxImage.src = imgSrc;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }

        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        // ESC key to close lightbox
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeLightbox();
        });

        // Create dots
        function createDots() {
            const cardsPerViewCount = getCardsPerView();
            const totalPages = Math.ceil(certificateImages.length / cardsPerViewCount);
            const fragment = document.createDocumentFragment();
            
            for (let i = 0; i < totalPages; i++) {
                const dot = document.createElement('div');
                dot.className = 'dot';
                dot.addEventListener('click', () => goToSlide(i));
                fragment.appendChild(dot);
            }
            
            dotsContainer.innerHTML = '';
            dotsContainer.appendChild(fragment);
        }

        // Update carousel position
        function updateCarousel() {
            const cardsPerViewCount = getCardsPerView();
            const cardWidth = track.children[0].offsetWidth;
            const gap = 24;
            const offset = currentIndex * (cardWidth + gap) * cardsPerViewCount;
            
            track.style.transform = `translateX(-${offset}px)`;
            updateDots();
            updateCounter();
            updateButtons();
        }

        // Update active dot
        function updateDots() {
            const dots = dotsContainer.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        // Update counter
        function updateCounter() {
            const cardsPerViewCount = getCardsPerView();
            const totalPages = Math.ceil(certificateImages.length / cardsPerViewCount);
            counter.textContent = `${currentIndex + 1} / ${totalPages}`;
        }

        // Update button states
        function updateButtons() {
            const cardsPerViewCount = getCardsPerView();
            const totalPages = Math.ceil(certificateImages.length / cardsPerViewCount);
            
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex >= totalPages - 1;
        }

        // Navigation functions
        function goToSlide(index) {
            const cardsPerViewCount = getCardsPerView();
            const totalPages = Math.ceil(certificateImages.length / cardsPerViewCount);
            currentIndex = Math.max(0, Math.min(index, totalPages - 1));
            updateCarousel();
        }

        function nextSlide() {
            const cardsPerViewCount = getCardsPerView();
            const totalPages = Math.ceil(certificateImages.length / cardsPerViewCount);
            if (currentIndex < totalPages - 1) {
                currentIndex++;
                updateCarousel();
            }
        }

        function prevSlide() {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        }

        // Event listeners
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (lightbox.classList.contains('active')) return;
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        });

        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            if (touchStartX - touchEndX > 50) nextSlide();
            if (touchEndX - touchStartX > 50) prevSlide();
        }

        // Debounced resize handler
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                createDots();
                currentIndex = 0;
                updateCarousel();
            }, 250);
        });

        // Initialize carousel
        populateCertificates();
        createDots();
        updateCarousel();