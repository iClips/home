const slider = document.getElementById("projectSlider");
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
const aboutUsSection = document.querySelector('.about-us');

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

    // if (Math.abs(deltaX) > Math.abs(deltaY)) {
    //     // Horizontal movement
    //     aboutUsSection.style.animation = 'wobble-side 0.5s infinite alternate';
    // } else {
    //     // Vertical movement
    //     aboutUsSection.style.animation = 'wobble-up 0.5s infinite alternate';
    // }

    lastX = x;
    lastY = y;
}

// Function to remove the animations
function removeAnimation() {
    aboutUsSection.style.animation = ''; // Reset animation
}

// Event listeners for mouse and touch events
aboutUsSection.addEventListener('mousemove', animateBackground);
aboutUsSection.addEventListener('mouseleave', removeAnimation);
aboutUsSection.addEventListener('touchmove', animateBackground);
aboutUsSection.addEventListener('touchend', removeAnimation);

