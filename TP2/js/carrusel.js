const carousel = document.querySelector('.carrusel');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let scrollPosition = 0;
const cardWidth = document.querySelector('.card').offsetWidth + 10; // ancho de cada card más margen
const visibleCards = 5; 

const maxScroll = (carousel.children.length * cardWidth) - (cardWidth * visibleCards);
console.log(maxScroll);

// Desplazar 2 cards hacia la derecha
nextBtn.addEventListener('click', () => {
    if (scrollPosition < maxScroll) {
        scrollPosition += cardWidth * 2;
        carousel.style.transform = `translateX(-${scrollPosition}px)`;
    }
});

// Desplazar 2 cards hacia la izquierda
prevBtn.addEventListener('click', () => {
    if (scrollPosition > 0) {
        scrollPosition -= cardWidth * 2;
        carousel.style.transform = `translateX(-${scrollPosition}px)`;
    }
});