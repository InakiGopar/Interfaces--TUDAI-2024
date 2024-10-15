"use strict"

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault(); 
    loading(); 
});

function loading() {
    document.querySelector('.spinner').style.display = 'block';
    document.querySelector('.main-content').classList.add('blur'); //difuminar el fondo

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
        window.location.href = 'templates/home.html'; 
    }, 2000); // Simulamos 2 segundos de carga
}


window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        // Si la página está cargada desde el caché, no ejecutar el efecto
        document.querySelector('.spinner').style.display = 'none';
        document.querySelector('.main-content').classList.remove('blur');
        document.querySelector('.loading-percent').style.display = 'none';
    }
});
