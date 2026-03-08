document.addEventListener('DOMContentLoaded', () => {
    // Select all elements with the 'reveal' class
    const reveals = document.querySelectorAll('.reveal');

    // Create a new IntersectionObserver
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // If the element is visible
            if (entry.isIntersecting) {
                // Add the 'active' class to trigger the animation
                entry.target.classList.add('active');
                // Optional: Stop observing the element once it's revealed
                observer.unobserve(entry.target);
            }
        });
    }, {
        // Trigger the animation when the element is 10% visible
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    // Start observing each element
    reveals.forEach(reveal => {
        observer.observe(reveal);
    });

    // Testimonials Auto-Scroll and Drag Logic
    const slider = document.querySelector('.testimonials-container');
    if (slider) {
        let isDown = false;
        let startX;
        let scrollLeft;
        let autoScrollInterval;
        let isHovered = false;

        // Auto-scroll loop
        const startAutoScroll = () => {
            autoScrollInterval = setInterval(() => {
                if (!isHovered && !isDown) {
                    slider.scrollLeft += 1; // Speed of auto-scroll

                    // Reset if we reach the end of the cloned content
                    if (slider.scrollLeft >= (slider.scrollWidth / 2)) {
                        slider.scrollLeft -= (slider.scrollWidth / 2);
                    }
                }
            }, 20); // 50fps smooth
        };

        const stopAutoScroll = () => {
            clearInterval(autoScrollInterval);
        };

        startAutoScroll();

        // Mouse events for auto-scroll pause
        slider.addEventListener('mouseenter', () => isHovered = true);
        slider.addEventListener('mouseleave', () => {
            isHovered = false;
            isDown = false;
            slider.classList.remove('active');
        });

        // Touch events for mobile
        slider.addEventListener('touchstart', () => isHovered = true);
        slider.addEventListener('touchend', () => {
            isHovered = false;
            isDown = false;
        });

        // Mouse drag logic
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');
        });
        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2; // Scroll-fast
            slider.scrollLeft = scrollLeft - walk;
        });
    }
});
