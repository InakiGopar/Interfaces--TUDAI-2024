//Seleccionar la sección y la imagen
const section = document.querySelector('.discover-the-game');
const charactersImage = document.querySelector('.characters');

// Variables para guardar la última posición del mouse
let lastMouseX = 0;
let lastMouseY = 0;

// Configurar la posición inicial centrada
charactersImage.style.transform = 'translate(-50%, -50%)';

// Agregar el evento de movimiento del mouse solo dentro de la sección
section.addEventListener('mousemove', (event) => {
    // Obtener las coordenadas del mouse relativas a la sección
    const rect = section.getBoundingClientRect();
    const mouseX = event.clientX - rect.left; // X relativa
    const mouseY = event.clientY - rect.top; // Y relativa

    // Calcular el movimiento en función del desplazamiento del mouse
    const deltaX = (mouseX - rect.width / 2) * 0.02; // Factor reducido para movimiento sutil
    const deltaY = (mouseY - rect.height / 2) * 0.02;

    // Aplicar la transformación (movimiento sutil y centrado)
    charactersImage.style.transform = `translate(calc(-50% + ${-deltaX}px), calc(-50% + ${-deltaY}px))`;
});