let cube = document.querySelector('.cube');
let scene = document.querySelector('.scene');
let isDragging = false;
let startX, startY, rotationX = 30, rotationY = 30;

scene.addEventListener('mouseenter', (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
});

scene.addEventListener('mousemove', (e) => {
    if (isDragging) {
        let deltaX = e.clientX - startX;
        let deltaY = e.clientY - startY;

        rotationY += deltaX * 0.5;
        rotationX -= deltaY * 0.5;

        cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;

        startX = e.clientX;
        startY = e.clientY;
    }
});

scene.addEventListener('mouseup', () => {
    isDragging = false;
});

scene.addEventListener('mouseleave', () => {
    isDragging = false;
});

scene.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
}, { passive: true });

scene.addEventListener('touchmove', (e) => {
    if (isDragging) {
        let deltaX = e.touches[0].clientX - startX;
        let deltaY = e.touches[0].clientY - startY;

        rotationY += deltaX * 0.5;
        rotationX -= deltaY * 0.5;

        cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;

        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }
}, { passive: true });

scene.addEventListener('touchend', () => {
    isDragging = false;
}, { passive: true });