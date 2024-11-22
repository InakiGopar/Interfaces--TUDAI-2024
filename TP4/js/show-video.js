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

// Función mejorada para verificar si un elemento está parcialmente en el viewport
function isElementPartiallyInViewport(el) {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    // Considera el elemento visible cuando al menos 30% está en el viewport
    const visibleThreshold = windowHeight * 0.3;
    
    return (
        rect.top <= (windowHeight - visibleThreshold) &&
        rect.bottom >= visibleThreshold
    );
}

// Función para manejar la animación de entrada y salida
function handleAnimation() {
    const videoSection = document.querySelector('.video-section');
    const isVideoSectionVisible = isElementPartiallyInViewport(videoSection);

    if (isVideoSectionVisible) {
        videoWrapper.classList.add('visible');
        characterContent.classList.add('visible');
    } else {
        videoWrapper.classList.remove('visible');
        characterContent.classList.remove('visible');
    }
}

// Escuchar el evento scroll
window.addEventListener('scroll', () => {
    handleAnimation();
    
    // El código existente del parallax
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateParallax();
            ticking = false;
        });
        ticking = true;
    }
});

// Ejecutar también al cargar la página
window.addEventListener('load', handleAnimation);