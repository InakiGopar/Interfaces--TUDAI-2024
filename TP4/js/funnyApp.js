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

// Asegúrate de que la primera imagen se cargue al inicio
window.addEventListener('load', () => {
    imageContainer.style.backgroundImage = `url("${images[0]}")`;
});

let currentIndexImg = 0;

function changeImg() {
    currentIndexImg = (currentIndexImg + 1) % images.length;
    imageContainer.style.backgroundImage = `url("${images[currentIndexImg]}")`;
}

setInterval(changeImg, 3000);

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
        
        // Movimiento sutil de los elementos
        title.style.transform = `translateX(${relativeScroll * 0.1}px)`;
        text.style.transform = `translateX(${relativeScroll * -0.08}px)`;
        imageContainer.style.transform = `translateY(${relativeScroll * 0.05}px)`;
        character4.style.transform = `scaleX(-1) translateX(${relativeScroll * -0.15}px)`;
        character5.style.transform = `translateX(${relativeScroll * 0.12}px)`;
    }
}

// Agregar el evento de scroll
window.addEventListener('scroll', handleParallax);