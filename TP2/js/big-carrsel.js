"use strict"

const bigCards = document.querySelectorAll('.big-card');
const prevButton = document.querySelector('.prev-btn-big');
const nextButton = document.querySelector('.next-btn-big');
const dots = document.querySelectorAll('.puntitos span');


let currentIndex = 0;

// Función para actualizar la tarjeta activa y el punto activo
function updateCarousel() {
  bigCards.forEach((cardBig, index) => {
    cardBig.classList.toggle('active', index === currentIndex);
  });
  
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentIndex);
  });
}

// Añade eventos de clic a los puntos para permitir la navegación directa
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentIndex = index;
    updateCarousel();
  });
});

// Funcionalidad de los botones de navegación
prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex > 0) ? currentIndex - 1 : bigCards.length - 1;
  updateCarousel();
});

nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex < bigCards.length - 1) ? currentIndex + 1 : 0;
  updateCarousel();
});

// Inicializa el carrusel para que muestre la primera tarjeta y el punto activo
updateCarousel();