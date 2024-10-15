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

home.addEventListener('click', ()=> {
    document.querySelector('.spinner').style.display = 'block';
    document.querySelector('.main-content').classList.add('blur'); //difuminar el fondo
    document.querySelector('header').classList.add('blur');   //difuminar el header
    document.querySelector('.menu').classList.add('blur'); //difuminar le menu principal
    document.querySelector('.user-menu').classList.add('blur'); //difuminar el menu de usuario
    document.querySelector('footer').classList.add('blur'); //difuminar el footer

    let loadingPercent = document.querySelector('.loading-percent');
    loadingPercent.style.display = 'block';

    let percent = 0;
    let interval = setInterval(() => {
        percent += 1; 
        loadingPercent.innerHTML = `${percent}%`; // Actualizar el porcentaje en el html

        if (percent === 100) {
            clearInterval(interval); 
        }
    }, 20);

    setTimeout(() => {
        window.location.href = '../index.html'; 
    }, 2000); // Simulamos 2 segundos de carga
});

document.querySelector('#back').addEventListener('click', () => {
    loading(); 
});

function loading() {
    document.querySelector('.spinner').style.display = 'block';
    document.querySelector('.main-content').classList.add('blur'); //difuminar el fondo
    document.querySelector('header').classList.add('blur');   //difuminar el header
    document.querySelector('.menu').classList.add('blur'); //difuminar le menu principal
    document.querySelector('.user-menu').classList.add('blur'); //difuminar el menu de usuario
    document.querySelector('footer').classList.add('blur'); //difuminar el footer

    let loadingPercent = document.querySelector('.loading-percent');
    loadingPercent.style.display = 'block';

    let percent = 0;
    let interval = setInterval(() => {
        percent += 1; // Incrementar porcentaje
        loadingPercent.innerHTML = `${percent}%`; // Actualizar el porcentaje en el html

        if (percent === 100) {
            clearInterval(interval); // Detener el intervalo al llegar al 100%
        }
    }, 20);

    setTimeout(() => {
        window.location.href = '../templates/home.html'; 
    }, 2000); // Simulamos 2 segundos de carga
}


window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        // Si la página está cargada desde el caché, no ejecutar el efecto
        document.querySelector('.spinner').style.display = 'none';
        document.querySelector('.main-content').classList.remove('blur');
        document.querySelector('.loading-percent').style.display = 'none';
        document.querySelector('header').classList.remove('blur');  
        document.querySelector('.menu').classList.remove('blur'); 
        document.querySelector('.user-menu').classList.remove('blur'); 
        document.querySelector('footer').classList.remove('blur'); 
    
    }
});