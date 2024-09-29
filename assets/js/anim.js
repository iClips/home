// Select all tag elements with specific slide-in classes
const tags = document.querySelectorAll('.tag');

// Options for the Intersection Observer
const options = {
    root: null, // use the viewport as the root
    rootMargin: '0px',
    threshold: 0.1 // Trigger when 10% of the target is visible
};

// Callback function to execute when the target intersects
const callback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add the 'show' class to animate
            entry.target.classList.add('show');
            // Unobserve the element after it has been shown
            // observer.unobserve(entry.target);
        } else {            
            entry.target.classList.remove('show');            
        }
    });
};

// Create an Intersection Observer
const observer = new IntersectionObserver(callback, options);

// Observe each tag element
tags.forEach(tag => {
    observer.observe(tag);
});