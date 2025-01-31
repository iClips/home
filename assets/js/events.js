document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('preloader').style.display = 'none';
    
    /********* Welcome Anim ***********************/
    const welcome_show = document.getElementById('welcome_show');
    welcome_show.classList.remove('responsive');
    welcome_show.classList.add('show-welcome');
    /****************** /Welcome Anim **********************/

    const header = document.querySelector("header");
    let initialHeight = header.offsetHeight;

    window.addEventListener("scroll", function () {
        let scrollY = window.scrollY;
        let scale = Math.max(0.7, 1 - scrollY / (initialHeight * 2)); // Scale down to 70%
        let opacity = Math.max(0.5, 1 - (scrollY - initialHeight * 0.3) / (initialHeight * 2));

        header.style.transform = `scale(1, ${scale})`; // Scale only height, keep width unchanged
        header.style.backdropFilter = `blur(${(1 - opacity) * 10}px)`;
        header.style.background = `rgba(0, 0, 0, ${opacity})`; // Adjust transparency
    });
});

const slider = document.getElementById("projectSlider");


const progressValue = document.getElementById("progressValue");
const stages = document.querySelectorAll(".project-stage");

slider.addEventListener("input", () => {
    if (this.value) return;
    
    const value = slider.value;
    let estRand = 0;
    if (value > 0 && value <= 20) {
        estRand = 2000;
    } else if (value > 20 && value <= 40) {
        estRand = 6000;
    } else if (value > 40 && value <= 60) {
        estRand = 12000;
    } else if (value > 60 && value <= 80) {
        estRand = 20000;
    } else if (value > 80 && value <= 100) {
        estRand = 50000;
    }
    progressValue.innerText = estRand;

    // Control the stages' visibility based on slider position
    stages.forEach((stage, index) => {
        if (value >= index * 20) {
            stage.classList.add('active');
        } else {
            stage.classList.remove('active');
        }
    });

    stages.forEach((stage, index) => {
        if (value >= index * 25) {
            stage.style.opacity = 1;
            stage.style.transform = "translateZ(0)";
        } else {
            stage.style.opacity = 0;
            stage.style.transform = "translateZ(-100px)";
        }
    });
});

document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('.nav').classList.toggle('active');
});

const accordions = document.querySelectorAll('.accordion-item');

accordions.forEach(item => {
    const button = item.querySelector('.accordion-button');
    const content = item.querySelector('.accordion-content');
    const indicator = button.querySelector('.indicator');

    button.addEventListener('click', () => {
        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        
        if (!isExpanded) {
            button.setAttribute('aria-expanded', 'true');
            content.classList.add('show');  // Show with transition
            indicator.style.transform = 'rotate(180deg)'; // Arrow rotation
        } else {
            button.setAttribute('aria-expanded', 'false');
            content.classList.remove('show');  // Hide with transition
            indicator.style.transform = 'rotate(0deg)'; // Reset arrow
        }
    });
});


function toggleDetails(index) {
    const details = [
        "We are a diverse team of visionaries, each bringing unique skills and perspectives to the table. Together, we harness our collective imagination to craft solutions that are as unique as our clients.",
        "Innovation is our heartbeat. We stay ahead of the curve, continuously exploring emerging technologies to bring the latest trends to our clients' projects.",
        "We believe in the power of creativity. Our designers and developers work in harmony to create visually stunning and functional applications that captivate users.",
        "We are builders at heart. Every line of code is carefully crafted to ensure stability, scalability, and seamless performance.",
        "Challenges are our playground. We dive deep into understanding our clients' needs, transforming obstacles into opportunities for growth and success.",
        "We value relationships. By partnering with our clients, we create tailored solutions that foster collaboration and achieve shared goals.",
        "Every project is an adventure. We explore uncharted territories of technology, guiding our clients through their digital transformation journeys.",
        "Data drives our decisions. We analyze trends and insights to inform our strategies, ensuring that our solutions are not only creative but also effective.",
        "We celebrate success. Each project we complete is a milestone, showcasing our commitment to excellence and the positive impact we have on our clients’ businesses.",
        "Dream big. At Iclips Tech, we believe that with imagination and determination, anything is possible."
    ];

    document.getElementById('detail-text').innerText = details[index - 1];
}



/******************* ABout US ***********************/
/******************* /ABout US ***********************/
const aboutUsSection = document.querySelector('.about-us');
const strongTags = aboutUsSection.querySelectorAll('strong');

let lastX = 0;
let lastY = 0;

function animateBackground(event) {
    const rect = aboutUsSection.getBoundingClientRect();
    const x = event.clientX - rect.left; 
    const y = event.clientY - rect.top; 

    aboutUsSection.style.backgroundPosition = `${x}px ${y}px`;

    const deltaX = x - lastX;
    const deltaY = y - lastY;

    strongTags.forEach(tag => {
        const tagRect = tag.getBoundingClientRect();
        
        if (tagRect.left <= x && tagRect.right <= x && tagRect.top <= y) {
            tag.style.color = 'var(--accent-color-dark)';
        } else {
            tag.style.color = ''; 
        }
    });

    lastX = x;
    lastY = y;
}

function removeAnimation() {
    aboutUsSection.style.animation = ''; // Reset animation
}

aboutUsSection.addEventListener('mousemove', animateBackground);
aboutUsSection.addEventListener('mouseleave', removeAnimation);
aboutUsSection.addEventListener('touchmove', (e) => {
    animateBackground();
}, { passive: true });
aboutUsSection.addEventListener('touchend', (e) => {
    removeAnimation();
}, { passive: true });


/****************** Log Events ********************/
// events.js

// Helper function to get session ID or generate a new one
function getSessionId() {
    let sessionId = localStorage.getItem('sessionId');
    if (!sessionId) {
        sessionId = `session-${Date.now()}`; // Create a new session ID based on timestamp
        localStorage.setItem('sessionId', sessionId);
    }
    return sessionId;
}

// Initialize session variables
const sessionId = getSessionId();
let errorCount = 0; // Track errors
const logEvents = [];

// Helper to log events
function logEvent(type, details = {}) {
    const timestamp = new Date().toISOString();
    const eventLog = { sessionId, timestamp, type, details };
    logEvents.push(eventLog);

    // If error occurs twice, stop logging
    if (type === 'error') {
        errorCount++;
        if (errorCount >= 2) {
            console.error('Error occurred twice. Stopping logging for this session.');
            return;
        }
    }
}

// Send logs to server and save in the appropriate session log file
function sendLogToServer() {
    const logData = {
        sessionId,
        logEvents
    };

    fetch('/api/session-logs/save-log', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(logData),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Log successfully sent to the server:', data);
        })
        .catch(error => {
            console.error('Failed to send log to server:', error);
            logEvent('error', { message: error.message });
        });
}

// Track title bar menu button clicks
const menuButtons = document.querySelectorAll('.menu-button');
menuButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        logEvent('menu-click', { buttonId: e.target.id });
    });
});

// Track slider interactions
const projectSlider = document.getElementById('projectSlider');
if (projectSlider) {
    projectSlider.addEventListener('input', (e) => {
        logEvent('slider-move', { value: e.target.value });
    });
}

// Track link and button clicks
document.querySelectorAll('a, button').forEach(element => {
    element.addEventListener('click', (e) => {
        logEvent('click', { elementType: e.target.tagName, elementId: e.target.id });
    });
});

// Save logs when the user leaves the page
window.addEventListener('beforeunload', () => {
    if (logEvents.length > 0) {
        sendLogToServer(); // Send the log before the user exits
    }
});

// Function to log errors
window.onerror = function (message, source, lineno, colno, error) {
    logEvent('error', {
        message: message,
        source: source,
        line: lineno,
        column: colno,
        error: error ? error.toString() : 'N/A'
    });
};


// Function to analyze the event and return a simple description
function analyzeEvent(event) {
    switch (event.type) {
        case 'click':
            return 'User clicked on the page';
        case 'scroll':
            return 'User scrolled the page';
        case 'keydown':
            return `User pressed the "${event.key}" key`;
        case 'touchstart':
            return 'User touched the screen';
        case 'touchmove':
            return 'User moved a finger on the screen';
        case 'touchend':
            return 'User lifted a finger from the screen';
        default:
            return 'User performed an unknown action';
    }
}

/****************** /Log Events ********************/
