"use strict"

const cards = document.querySelectorAll('.big-card');
const dotsContainer = document.querySelector('.puntitos');
const prevBtn = document.querySelector('.prev-btn-big');
const nextBtn = document.querySelector('.next-btn-big');

let currentIndex = 0;

// // Función para actualizar las tarjetas visibles y los puntos activos
function updateCarousel() {
  // Actualiza la tarjeta visible
  cards.forEach((card, index) => {
    card.classList.toggle('active', index === currentIndex);
  });
}
//   // Actualiza los puntos
//   dotsContainer.querySelectorAll('.dot').forEach((dot, index) => {
//     dot.classList.toggle('active', index === currentIndex);
//   });
// }

 //Crea los puntos de navegación según la cantidad de tarjetas
// cards.forEach((_, index) => {
//   const dot = document.createElement('div');
//   dot.classList.add('dot');
  
//   dot.addEventListener('click', () => {
//     currentIndex = index;
//     updateCarousel();
//   });
  
//   dotsContainer.appendChild(dot);
// });

// Funcionalidad de los botones
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex > 0) ? currentIndex - 1 : cards.length - 1;
  updateCarousel();
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex < cards.length - 1) ? currentIndex + 1 : 0;
  updateCarousel();
});

// Inicializa el carrusel
updateCarousel();