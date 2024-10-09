const carousel = document.querySelector('.carrusel');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let scrollPosition = 0;
const cardWidth = document.querySelector('.card').offsetWidth + 15; // ancho de cada card más margen
const visibleCards = 4.5; // 4.5 cards visibles
const maxScroll = (carousel.children.length * cardWidth) - (cardWidth * visibleCards);

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