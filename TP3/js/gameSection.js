"use strict"

const playButton = document.getElementById('play-game')

playButton.addEventListener('click', async () => {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const game = document.querySelector(".game");

    canvas.classList.remove("disabled");
    game.classList.add("disabled");

    const menu = new Menu(0, 180, context, canvas, 200, 50, "#007bff", "13px  'Press Start 2P'", 20);

    // Espera a que todos los recursos estén cargados antes de dibujar
    await menu.loadResources();
    menu.draw();
});

home.addEventListener('click', ()=> {

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
    }, 5000); // Simulamos 5 segundos de carga
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
    }, 5000); // Simulamos 5 segundos de carga
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