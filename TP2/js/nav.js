"use strict"
//variables del DOM
const menu = document.querySelector('.menu');
const hamburger_menu = document.querySelector('.hamburger-icon');
const main = document.querySelector('main');
const logo = document.querySelector('.logo');


const search_input = document.getElementById('search');
const search_cancel = document.getElementById('cancel');

const profile_picture = document.querySelector('.profile-logo');
const user_menu = document.querySelector('.user-menu');

//muestra el menu
hamburger_menu.addEventListener('click', ()=> {
    menu.classList.toggle('active');    
});

//esconde el menu
main.addEventListener('click', ()=> {
    menu.classList.remove('active');
});

//elimina contenido de la barra de busqueda
search_cancel.addEventListener('click', ()=> {
    search_input.value = '';
});

//Mostrar/ocultar el menú al hacer clic en la foto de perfil
profile_picture.addEventListener('click', () => {
    user_menu.classList.toggle('active');
});

//ocultar el menú al hacer clic en la pantalla principal
main.addEventListener('click', ()=> {
    user_menu.classList.remove('active');
});

//redirige al home al hacer click en el logo
logo.addEventListener('click', ()=> {
    window.location.href = '../templates/home.html'
})

//cerrar sesion
const exit = document.getElementById('exit');
const home = document.getElementById('home');




exit.addEventListener('click', ()=> {
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
    }, 5000); // Simulamos 5 segundos de carga
});





