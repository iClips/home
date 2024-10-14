const slider = document.getElementById("projectSlider");

/********* Welcome Anim */
let lastScrollTop = 0;
let timer = null;
let hasMoved = false;
let initialPosition = { top: 100, left: 50 };

const welcome_show = document.getElementById('welcome_show');

function checkMovement() {
    const currentPosition = {
    top: slider.offsetTop,
    left: slider.offsetLeft
    };
    return currentPosition.top !== initialPosition.top || currentPosition.left !== initialPosition.left;
}

// Trigger animation when page is scrolled 100px and slider is stationary for 2 seconds
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
    if (checkMovement()) {
        hasMoved = true;
        clearTimeout(timer);
        timer = setTimeout(() => {
        if (hasMoved) {
            welcome_show.classList.remove('responsive');
            welcome_show.classList.add('show-welcome');
            hasMoved = false;
        }
        }, 2000); // 2 second delay after movement stops
    }
    }
});
/********* /Welcome Anim */

const progressValue = document.getElementById("progressValue");
const stages = document.querySelectorAll(".project-stage");

slider.addEventListener("input", () => {
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
console.log('accordion count: ' + accordions.length);
accordions.forEach(item => {
    const button = item.querySelector('.accordion-button');
    const content = item.querySelector('.accordion-content');
    console.log('button count: ' + button.length);
    button.addEventListener('click', () => {
        console.log('clicked ');
        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        
        // Toggle the clicked accordion content only
        if (!isExpanded) {
            button.setAttribute('aria-expanded', 'true');
            content.style.display = 'block';  // Show the clicked content
            console.log('show content');

        } else {
            button.setAttribute('aria-expanded', 'false');
            content.style.display = 'none';  // Hide the clicked content
            console.log('Hide content');
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

// Function to handle the hover/touch effect
function animateBackground(event) {
    const rect = aboutUsSection.getBoundingClientRect();
    const x = event.clientX - rect.left; // X position relative to the element
    const y = event.clientY - rect.top; // Y position relative to the element

    // Set the background based on mouse position
    aboutUsSection.style.backgroundPosition = `${x}px ${y}px`;

    // Determine direction of movement
    const deltaX = x - lastX;
    const deltaY = y - lastY;

    strongTags.forEach(tag => {
        const tagRect = tag.getBoundingClientRect();
        const tagX = tagRect.left - rect.left; // X relative to the section
        const tagY = tagRect.top - rect.top; // Y relative to the section

        // Check if the <strong> is in the top-left quadrant
        console.log(`tagRect.left: ${tagRect.left}, tagRect.top: ${tagRect.top}, x: ${x}, y: ${y}` );
        if (tagRect.left <= x && tagRect.top <= y) {
            tag.style.color = 'var(--accent-color-dark)';
        } else {
            tag.style.color = ''; // Reset to default
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
aboutUsSection.addEventListener('touchmove', animateBackground);
aboutUsSection.addEventListener('touchend', removeAnimation);


/****************** Log Events ********************/
const sessionId = generateUniqueId();

// Initialize an array to hold user events
let userEvents = [];

// Function to log an event
function logEvent(event) {
    const eventDescription = analyzeEvent(event);

    userEvents.push({
        id: sessionId,
        type: event.type,
        timestamp: new Date().toISOString(),
        details: {
            clientX: event.clientX || null,
            clientY: event.clientY || null,
            key: event.key || null,
            touchPoints: event.touches ? Array.from(event.touches).map(touch => ({
                clientX: touch.clientX,
                clientY: touch.clientY
            })) : null, 
            target: event.target.tagName,
            description: eventDescription
        }
    });
}

function analyzeEvent(event) {
    switch (event.type) {
        case 'click':
            return 'User clicked on the page';
        case 'mousemove':
            return 'User moved the mouse';
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

function generateUniqueId() {
    return 'session-' + Math.random().toString(36).substr(2, 9);
}

// Event listeners for user interactions
document.addEventListener('click', logEvent);
document.addEventListener('mousemove', logEvent);
    document.addEventListener('keydown', logEvent);
    document.addEventListener('touchstart', logEvent); 
    document.addEventListener('touchmove', logEvent);  
    document.addEventListener('touchend', logEvent);   

// Function to send user events to the server
function sendEvents() {
    if (userEvents.length > 0) {
        const logData = JSON.stringify(userEvents);
        
        // Replace 'YOUR_SERVER_ENDPOINT' with your actual server endpoint
        fetch('api/log_user_events.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: logData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json(); // Parse JSON if the response is okay
        })
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error logging events:', error);
        });
    }
}

setInterval(sendEvents, 60 * 1000);

/****************** /Log Events ********************/