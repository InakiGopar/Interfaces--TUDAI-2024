"use strict"

//Las imagenes de la app mas divertida del mundo
const images = [
    "../assets/img/app-funny/app-mas-divertida-img-1.png",
    "../assets/img/app-funny/app-mas-divertida-img-2.png",
    "../assets/img/app-funny/app-mas-divertida-img-3.png",
    "../assets/img/app-funny/app-mas-divertida-img-4.png"
];

//elementos del DOM
const imageContainer = document.getElementById("funny-app-img");
let currentIndexImg = 0;
let intervalId = null;

// Función para inicializar las imágenes
function initializeImages() {
    if (imageContainer) {
        // Forzar la visibilidad del contenedor
        imageContainer.style.opacity = '1';
        imageContainer.style.visibility = 'visible';
        imageContainer.style.display = 'block';
        
        // Establecer la primera imagen
        imageContainer.style.backgroundImage = `url("${images[0]}")`;
        
        // Iniciar el intervalo solo si no existe
        if (!intervalId) {
            intervalId = setInterval(changeImg, 3000);
        }
    }
}

function changeImg() {
    currentIndexImg = (currentIndexImg + 1) % images.length;
    // Asegurar que el contenedor siga visible
    imageContainer.style.opacity = '1';
    imageContainer.style.visibility = 'visible';
    imageContainer.style.display = 'block';
    imageContainer.style.backgroundImage = `url("${images[currentIndexImg]}")`;
}

// Inicializar después de que el loader termine
document.addEventListener('loaderComplete', () => {
    setTimeout(initializeImages, 50);  // Reducimos el tiempo de espera
});

// Elementos para el efecto parallax
const title = document.querySelector('.funny-app .title');
const text = document.querySelector('.funny-app .text');
const character4 = document.querySelector('.character4');
const character5 = document.querySelector('.character5');

// Función para manejar el efecto parallax
function handleParallax() {
    const scrolled = window.scrollY;
    const funnyAppSection = document.querySelector('.funny-app');
    const sectionTop = funnyAppSection.offsetTop;
    const sectionHeight = funnyAppSection.offsetHeight;
    
    // Solo aplicar el efecto cuando la sección está visible
    if (scrolled >= sectionTop - window.innerHeight && 
        scrolled <= sectionTop + sectionHeight) {
        
        const relativeScroll = scrolled - sectionTop;
        
        title.style.transform = `translateX(${relativeScroll * 0.02}px)`;
        text.style.transform = `translateX(${relativeScroll * -0.015}px)`;
        imageContainer.style.transform = `translateY(${relativeScroll * 0.025}px)`;
        character4.style.transform = `scaleX(-1) translateY(${relativeScroll * 0.035}px)`;
        character5.style.transform = `translateY(${relativeScroll * -0.03}px)`;
    }
}

// Agregar el evento de scroll
window.addEventListener('scroll', handleParallax);