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

