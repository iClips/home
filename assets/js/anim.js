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

// JavaScript to dynamically adjust the speed of the sparkles
const sparkleLeft = document.querySelector('.sparkle-left');
const sparkleRight = document.querySelector('.sparkle-right');


// Calculate the center points of the logos
const leftLogoCenter = { x: 120, y: 100 }; // (x, y) center of left logo
const rightLogoCenter = { x: 680, y: 100 }; // (x, y) center of right logo

// Function to calculate distance between two points
function calculateDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

// Function to calculate the distance between two points
function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  }
  
  function getCenterCoordinates(element) {
    const rect = element.getBoundingClientRect(); // Get the element's bounding rectangle

    // Calculate the center coordinates
    const centerX = rect.left + rect.width / 2; // X coordinate of the center
    const centerY = rect.top + rect.height / 2; // Y coordinate of the center

    return { centerX, centerY };
}

function getCenterCoordinates(element) {
    const rect = element.getBoundingClientRect(); // Get the element's bounding rectangle
    const centerX = rect.left + rect.width / 2; // X coordinate of the center
    const centerY = rect.top + rect.height / 2; // Y coordinate of the center
    return { centerX, centerY };
}

// Function to calculate the distance between two points
function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

function adjustSpeed(event) {
    const lImg = getCenterCoordinates(document.getElementById('l_img'));
    const rImg = getCenterCoordinates(document.getElementById('r_img'));
    console.log(`lLogo: ${lImg.centerX},${lImg.centerY} rLogo: ${rImg.centerX},${rImg.centerY}`);
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    console.log(`mouse: ${mouseX},${mouseY}`);
  
    const distanceToLeftImg = calculateDistance(mouseX, mouseY, lImg.centerX, lImg.centerY);
    const distanceToRightImg = calculateDistance(mouseX, mouseY, rImg.centerX, rImg.centerY);

    // Log distances to the console
    console.log(`Distance to Left Image: ${distanceToLeftImg}`);
    console.log(`Distance to Right Image: ${distanceToRightImg}`);
    
    const maxDistance = 300; // Adjust this based on your layout
    const minDistance = 0; // Minimum distance to start speeding up
  
    if (distanceToLeftImg <= maxDistance && distanceToLeftImg >= minDistance) {
        sparkleLeft.style.animationDuration = `${distanceToLeftImg / 100}s`;
    }
    if (distanceToRightImg <= maxDistance && distanceToRightImg >= minDistance) {
        sparkleRight.style.animationDuration = `${distanceToRightImg / 100}s`;
    }   

    const minDuration = 0.5; // Minimum animation duration (faster flicker)
    const maxDuration = 2; // Maximum animation duration (slower flicker)

    // Calculate animation duration for left logo
    let speedFactor = (maxDistance - distanceToLeftImg) / (maxDistance - minDistance);
    let animationDuration = Math.max(minDuration, speedFactor * maxDuration);
    if (distanceToLeftImg < maxDistance) {
        document.getElementById('l_img').style.animationDuration = `${animationDuration/100}s`;
    }
    console.log(`distanceToLeftImg animationDuration: ${animationDuration}`);

    // Calculate animation duration for right logo
    if (distanceToRightImg < maxDistance) {
        speedFactor = (maxDistance - distanceToRightImg) / (maxDistance - minDistance);
        animationDuration = Math.max(minDuration, speedFactor * maxDuration);
        document.getElementById('r_img').style.animationDuration = `${animationDuration/100}s`;
    }
  }
  
  // Listen for mousemove events to dynamically adjust sparkle speed
  document.addEventListener('mousemove', adjustSpeed);
  