document.addEventListener('DOMContentLoaded', () => {
    // Select all elements with the 'reveal' class
    const reveals = document.querySelectorAll('.reveal');

    // Create a new IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Once the element is visible, add the 'active' class
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Unobserve element after it's been revealed to keep it visible
                observer.unobserve(entry.target);
            }
        });
    }, {
        // Trigger the observer when the element is 15% visible
        threshold: 0.15,
        // Root margin to start the animation slightly before it comes into full view
        rootMargin: "0px 0px -50px 0px"
    });

    // Observe each reveal element
    reveals.forEach(reveal => {
        observer.observe(reveal);
    });
});
