"use strict"

//Las imagenes de la app mas divertida del mundo
const images = [
    "/assets/img/app-funny/app-mas-divertida-img-1.png",
    "/assets/img/app-funny/app-mas-divertida-img-2.png",
    "/assets/img/app-funny/app-mas-divertida-img-3.png",
    "/assets/img/app-funny/app-mas-divertida-img-4.png"
];

//elementos del DOM
const imageContainer = document.getElementById("funny-app-img");

//Indice con el cual vamos a seleccionar la imagen
let currentIndexImg = 0;

function changeImg() {
    currentIndexImg = (currentIndexImg + 1) % images.length;
    //cambia la imagen del contenedor en base al currentIndexImg
    imageContainer.style.backgroundImage = `url("${images[currentIndexImg]}")`;
}

//Cambia la imagen cada 3 segundos (3000 ms)
setInterval(changeImg, 3000);