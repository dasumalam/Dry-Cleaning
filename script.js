tailwind.config = {
    theme: {
        extend: {
            colors: {
                'primary-blue': '#2b96d9',
                'primary-green': '#8ec640'
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Prevent default navigation on slider buttons
    document.querySelectorAll('.swiper-button-prev-custom, .swiper-button-next-custom').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
        });
    });

    // Hero Swiper Initialization
    const heroSwiper = new Swiper('.heroSwiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
        },
    });

    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Postcode validation and booking
    const postcodeInput = document.querySelector('input[placeholder="Enter your full postcode"]');
    const bookNowButton = document.querySelector('.bg-primary-blue.text-white.rounded-r-full');
    
    if (postcodeInput && bookNowButton) {
        bookNowButton.addEventListener('click', function() {
            const postcode = postcodeInput.value.trim();
            if (postcode) {
                // Here you would typically validate the postcode and redirect to booking page
                alert('Booking service for postcode: ' + postcode);
                // window.location.href = '/booking.html?postcode=' + encodeURIComponent(postcode);
            } else {
                alert('Please enter your postcode');
                postcodeInput.focus();
            }
        });

        // Allow pressing enter in the postcode input to trigger booking
        postcodeInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                bookNowButton.click();
            }
        });
    }

    // Pricing section hover effects
    const pricingCards = document.querySelectorAll('.pricing-card');
    if (pricingCards) {
        pricingCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                if (!this.classList.contains('featured')) {
                    this.style.transform = 'translateY(-10px)';
                    this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                if (!this.classList.contains('featured')) {
                    this.style.transform = 'translateY(0)';
                    this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
                }
            });
        });
    }

    // Initialize CSS variables for theme colors
    document.documentElement.style.setProperty('--primary-blue', '#2b96d9');
    document.documentElement.style.setProperty('--primary-green', '#8ec640');

    // Sticky Navigation Enhancement
    const discountBanner = document.querySelector('.sticky.top-0');
    const mainNavigation = document.querySelector('.sticky.top-9');
    
    if (discountBanner && mainNavigation) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                mainNavigation.classList.add('sticky-shadow');
            } else {
                mainNavigation.classList.remove('sticky-shadow');
            }
        });
    }

    // Testimonial Swiper - wait for window load to ensure elements are rendered
    window.addEventListener('load', function() {
        // Check if Swiper is loaded
        if (typeof Swiper === 'undefined') {
            console.error('Swiper library not loaded!');
            return;
        }
        
        // Initialize Testimonial Swiper
        try {
            const testimonialSwiper = new Swiper('.testimonialSwiper', {
                slidesPerView: 1,
                spaceBetween: 30,
                centeredSlides: true,
                loop: true,
                speed: 800,
                effect: 'slide', // Use standard slide effect for better compatibility
                grabCursor: true,
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                on: {
                    init: function() {
                        console.log('Testimonial Swiper initialized');
                        setTimeout(animateTestimonialStars, 500);
                    },
                    slideChangeTransitionStart: function() {
                        animateTestimonialStars();
                    },
                }
            });
            
            // Make swiper controls visible
            document.querySelectorAll('.testimonialSwiper .swiper-button-next, .testimonialSwiper .swiper-button-prev')
                .forEach(el => {
                    el.style.display = 'flex';
                });
                
        } catch (error) {
            console.error('Error initializing testimonial swiper:', error);
        }
    });

    function animateTestimonialStars() {
        const activeSlide = document.querySelector('.testimonialSwiper .swiper-slide-active');
        if (activeSlide) {
            const stars = activeSlide.querySelectorAll('svg');
            stars.forEach((star, index) => {
                star.style.animationDelay = `${index * 0.1}s`;
                star.classList.add('animate-star');
                setTimeout(() => {
                    star.classList.remove('animate-star');
                }, 1500);
            });
        }
    }

    // Initialize GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Header Animations
    gsap.from(".sticky-banner", {
        y: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
    });
    
    gsap.from(".sticky-nav", {
        y: -50,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power2.out"
    });
    
    // Navigation Menu Items Animation
    gsap.from("nav a", {
        opacity: 0,
        y: -20,
        stagger: 0.1,
        duration: 0.5,
        delay: 0.6,
        ease: "power2.out"
    });
    
    // Hero Section Animation
    gsap.from(".hero-content h1", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: 0.8,
        ease: "power2.out"
    });
    
    gsap.from(".hero-content p", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 1.0,
        ease: "power2.out"
    });
    
    gsap.from(".hero-content .postcode-input", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 1.2,
        ease: "power2.out"
    });
    
    gsap.from(".hero-image img", {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        delay: 1.4,
        ease: "power2.out"
    });

    // Testimonial Section Animation
    gsap.from(".testimonialSwiper", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        immediateRender: false,
        onComplete: function() {
            document.querySelector('.testimonialSwiper').style.opacity = '1';
        },
        scrollTrigger: {
            trigger: ".testimonials-section",
            start: "top 70%",
            toggleActions: "play none none none"
        }
    });
    
    // Recent Articles Section
    gsap.from(".article-card", {
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 0.2,
        scrollTrigger: {
            trigger: ".recent-articles-section",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });
    
    // Testimonials Section
    gsap.from(".testimonials-section h2", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
            trigger: ".testimonials-section",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });
    
    gsap.from(".testimonial-card", {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        scrollTrigger: {
            trigger: ".testimonials-section",
            start: "top 70%",
            toggleActions: "play none none none"
        }
    });
    
    // Service Area Section
    gsap.from(".service-area-section h2", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
            trigger: ".service-area-section",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });
    
    gsap.from(".location-btn", {
        opacity: 0,
        scale: 0.9,
        stagger: 0.05,
        duration: 0.5,
        scrollTrigger: {
            trigger: ".service-area-section",
            start: "top 70%",
            toggleActions: "play none none none"
        }
    });
    
    // About Us Section
    gsap.from(".about-section h2", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
            trigger: ".about-section",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });
    
    gsap.from(".about-section .circular-image", {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        scrollTrigger: {
            trigger: ".about-section",
            start: "top 70%",
            toggleActions: "play none none none"
        }
    });
    
    gsap.from(".about-section p", {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.8,
        scrollTrigger: {
            trigger: ".about-section",
            start: "top 70%",
            toggleActions: "play none none none"
        }
    });
    
    // Feature Boxes
    gsap.from(".feature-box", {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        scrollTrigger: {
            trigger: ".feature-box",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });
    
    // Services Section
    gsap.from(".services-heading", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
            trigger: ".services-section",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });
    
    gsap.from(".services-text", {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.8,
        scrollTrigger: {
            trigger: ".services-section",
            start: "top 70%",
            toggleActions: "play none none none"
        }
    });
    
    gsap.from(".service-card", {
        opacity: 0,
        scale: 0.8,
        stagger: 0.1,
        duration: 0.5,
        scrollTrigger: {
            trigger: ".services-grid",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });
    
    // Choose Us Section
    gsap.from(".choose-us-heading", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
            trigger: ".choose-us-section",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });
    
    gsap.from(".reason-tag", {
        opacity: 0,
        scale: 0.8,
        stagger: 0.1,
        duration: 0.5,
        scrollTrigger: {
            trigger: ".reasons-container",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });
    
    // Pricing Section
    gsap.from(".pricing-heading", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
            trigger: ".pricing-section",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });
    
    gsap.from(".pricing-card", {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        scrollTrigger: {
            trigger: ".pricing-cards",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });
    
    // App Section
    gsap.from(".app-content", {
        opacity: 0,
        x: -50,
        duration: 0.8,
        scrollTrigger: {
            trigger: ".app-section",
            start: "top 70%",
            toggleActions: "play none none none"
        }
    });
    
    gsap.from(".app-image img", {
        opacity: 0,
        x: 50,
        duration: 0.8,
        scrollTrigger: {
            trigger: ".app-section",
            start: "top 70%",
            toggleActions: "play none none none"
        }
    });
    
    // How it Works Section
    gsap.from(".how-it-works-heading", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
            trigger: ".how-it-works-section",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });
    
    gsap.from(".process-step", {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        scrollTrigger: {
            trigger: ".process-steps",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });
    
    // Footer Animation
    gsap.from("footer .container > div", {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.8,
        scrollTrigger: {
            trigger: "footer",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });
    
    // Button Hover Animation
    const buttons = document.querySelectorAll('.bg-primary-green');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                scale: 1.05,
                duration: 0.3,
                ease: "power1.out"
            });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                scale: 1,
                duration: 0.3,
                ease: "power1.out"
            });
        });
    });

    // FAQ Section
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const arrow = this.querySelector('.faq-arrow');
            
            // Toggle the current FAQ item
            answer.classList.toggle('hidden');
            arrow.classList.toggle('rotate-180');
            
            // Close other FAQ items (optional)
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question) {
                    const otherAnswer = otherQuestion.nextElementSibling;
                    const otherArrow = otherQuestion.querySelector('.faq-arrow');
                    
                    otherAnswer.classList.add('hidden');
                    otherArrow.classList.remove('rotate-180');
                }
            });
        });
    });
});

// Wait for the page to load
window.addEventListener('load', function() {
    // Initialize GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Root CSS Variables
    document.documentElement.style.setProperty('--primary-blue', '#2b96d9');
    document.documentElement.style.setProperty('--primary-green', '#8ec640');
}); 