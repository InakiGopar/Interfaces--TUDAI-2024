"use strict"
//variables del DOM
const menu = document.querySelector('.menu');
const hamburger_menu = document.querySelector('.hamburger-icon');
const main = document.querySelector('main');


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

//ocultar el menú al hacer clic en la pantalla
main.addEventListener('click', ()=> {
    user_menu.classList.remove('active');
});

//cerrar sesion
const exit = document.getElementById('exit');

exit.addEventListener('click', ()=> {
    document.querySelector('.spinner').style.display = 'block';
    document.querySelector('.main-content').classList.add('blur'); //difuminar el fondo

    setTimeout(() => {
        window.location.href = '../index.html'; 
    }, 2000); // Simulamos 2 segundos de carga
});





