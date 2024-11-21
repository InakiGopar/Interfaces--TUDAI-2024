const videoWrapper = document.querySelector('.video-wrapper');
const characterContent = document.querySelector('.character-content');

// Variables para el efecto parallax
let lastScrollY = window.scrollY;
const parallaxSpeed = {
    video: 2,    
    character: 1.5
};

// Función para aplicar el efecto parallax
function updateParallax() {
    const scrollY = window.scrollY;
    const scrollDiff = scrollY - lastScrollY;

    // Calcular las nuevas posiciones
    const videoOffset = scrollDiff * parallaxSpeed.video;
    const characterOffset = scrollDiff * parallaxSpeed.character;

    // Aplicar las transformaciones
    if (videoWrapper) {
        videoWrapper.style.transform = `translateY(${videoOffset}px)`;
    }
    if (characterContent) {
        characterContent.style.transform = `translateY(${characterOffset}px)`;
    }

    lastScrollY = scrollY;
}

// Escuchar el evento scroll y usar requestAnimationFrame para optimizar el rendimiento
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateParallax();
            ticking = false;
        });
        ticking = true;
    }
});