"use strict"

//variables del DOM
let btnHamburger = document.getElementById("btn-hamburger");
let menu = document.getElementById("menu");


//eventListenners
btnHamburger.addEventListener("click", () => {

    btnHamburger.classList.toggle("active");
    menu.classList.toggle("active");
});