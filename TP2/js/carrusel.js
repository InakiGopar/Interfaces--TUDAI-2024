"use strict";

let scrollPosition = 0;

// Función para obtener el ancho del carrusel
const getVisibleCards = () => {
    const carouselContainer = document.querySelector('.carrusel-container'); // El contenedor del carrusel
    const cardWidth = document.querySelector('.card').offsetWidth + 10; // Ancho de cada card más margen
    const containerWidth = carouselContainer.clientWidth; // Ancho del contenedor visible
    return containerWidth / cardWidth; // Número de tarjetas visibles
};

const cardWidth = document.querySelector('.card').offsetWidth + 10; // Ancho de cada card más margen
let visibleCards = getVisibleCards(); // Calculamos las tarjetas visibles dinámicamente

const carousel = document.querySelector(".carrusel");
const totalCards = carousel.children.length;
let maxScroll = (totalCards * cardWidth) - (cardWidth * visibleCards);

// Función para actualizar el número de tarjetas visibles y el valor máximo de scroll al cambiar el tamaño de la ventana
const updateVisibleCards = () => {
    visibleCards = getVisibleCards();
    maxScroll = (totalCards * cardWidth) - (cardWidth * visibleCards);
};

window.addEventListener('resize', updateVisibleCards); 


const carousel1 = document.getElementById("carrusel1");
const prevBtn1 = document.getElementById("pb1");
const nextBtn1 = document.getElementById("nb1");

prevBtn1.addEventListener('click', () => {
    if (scrollPosition > 0) {
        scrollPosition -= cardWidth * 2;
        if (scrollPosition < 0) {
            scrollPosition = 0;
        }
        carousel1.style.transform = `translateX(-${scrollPosition}px)`;
    }
});

nextBtn1.addEventListener('click', () => {
    if (scrollPosition < maxScroll) {
        scrollPosition += cardWidth * 2;
        if (scrollPosition > maxScroll) {
            scrollPosition = maxScroll;
        }
        carousel1.style.transform = `translateX(-${scrollPosition}px)`;
    }
});



const carousel2 = document.getElementById("carrusel2");
const prevBtn2 = document.getElementById("pb2");
const nextBtn2 = document.getElementById("nb2");

prevBtn2.addEventListener('click', () => {
    if (scrollPosition > 0) {
        scrollPosition -= cardWidth * 2;
        if (scrollPosition < 0) {
            scrollPosition = 0;
        }
        carousel2.style.transform = `translateX(-${scrollPosition}px)`;
    }
});

nextBtn2.addEventListener('click', () => {
    if (scrollPosition < maxScroll) {
        scrollPosition += cardWidth * 2;
        if (scrollPosition > maxScroll) {
            scrollPosition = maxScroll;
        }
        carousel2.style.transform = `translateX(-${scrollPosition}px)`;
    }
});



const carousel3 = document.getElementById("carrusel3");
const prevBtn3 = document.getElementById("pb3");
const nextBtn3 = document.getElementById("nb3");

prevBtn3.addEventListener('click', () => {
    if (scrollPosition > 0) {
        scrollPosition -= cardWidth * 2;
        if (scrollPosition < 0) {
            scrollPosition = 0;
        }
        carousel3.style.transform = `translateX(-${scrollPosition}px)`;
    }
});

nextBtn3.addEventListener('click', () => {
    if (scrollPosition < maxScroll) {
        scrollPosition += cardWidth * 2;
        if (scrollPosition > maxScroll) {
            scrollPosition = maxScroll;
        }
        carousel3.style.transform = `translateX(-${scrollPosition}px)`;
    }
});


const carousel4 = document.getElementById("carrusel4");
const prevBtn4 = document.getElementById("pb4");
const nextBtn4 = document.getElementById("nb4");

prevBtn4.addEventListener('click', () => {
    if (scrollPosition > 0) {
        scrollPosition -= cardWidth * 2;
        if (scrollPosition < 0) {
            scrollPosition = 0;
        }
        carousel4.style.transform = `translateX(-${scrollPosition}px)`;
    }
});

nextBtn4.addEventListener('click', () => {
    if (scrollPosition < maxScroll) {
        scrollPosition += cardWidth * 2;
        if (scrollPosition > maxScroll) {
            scrollPosition = maxScroll;
        }
        carousel4.style.transform = `translateX(-${scrollPosition}px)`;
    }
});



const carousel5 = document.getElementById("carrusel5");
const prevBtn5 = document.getElementById("pb5");
const nextBtn5 = document.getElementById("nb5");

prevBtn5.addEventListener('click', () => {
    if (scrollPosition > 0) {
        scrollPosition -= cardWidth * 2;
        if (scrollPosition < 0) {
            scrollPosition = 0;
        }
        carousel5.style.transform = `translateX(-${scrollPosition}px)`;
    }
});

nextBtn5.addEventListener('click', () => {
    if (scrollPosition < maxScroll) {
        scrollPosition += cardWidth * 2;
        if (scrollPosition > maxScroll) {
            scrollPosition = maxScroll;
        }
        carousel5.style.transform = `translateX(-${scrollPosition}px)`;
    }
});
