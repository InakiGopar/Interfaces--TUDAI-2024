"use strict"

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault(); 
    loading(); 
});

function loading() {
    document.querySelector('.spinner').style.display = 'block';
    document.querySelector('.main-content').classList.add('blur');

    setTimeout(() => {
        window.location.href = '../templates/home.html'; 
    }, 2000); // Simulamos 2 segundos de carga
}
