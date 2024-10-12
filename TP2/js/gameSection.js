"use strict"

const playButton = document.getElementById('play-game')

playButton.addEventListener('click', ()=> {

    const rect = playButton.getBoundingClientRect();

    for (let i = 0; i < 30; i++) { // Generar 30 partículas

        const particle = document.createElement('span');
        particle.classList.add('particle');
        
        // Calcular las posiciones aleatorias para cada partícula
        const x = Math.random() * rect.width - rect.width / 2;
        const y = Math.random() * rect.height - rect.height / 2;

        particle.style.setProperty('--x', `${x}px`);
        particle.style.setProperty('--y', `${y}px`);

        playButton.appendChild(particle);

        // Eliminar la partícula después de la animación
        setTimeout(() => {
            particle.remove();
        }, 800); // Tiempo de la animación
    }
});