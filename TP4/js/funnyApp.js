"use strict"

//Las imagenes de la app mas divertida del mundo
const images = [
    "assets/img/app-funny/app-mas-divertida-img-1.png",
    "assets/img/app-funny/app-mas-divertida-img-2.png",
    "assets/img/app-funny/app-mas-divertida-img-3.png",
    "assets/img/app-funny/app-mas-divertida-img-4.png"
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


//Cards
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");

    //IntersectionObserver permite detectar cuándo un elemento del DOM entra o sale del área visible del navegador.
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            //si la card está visible
            if (entry.isIntersecting) {
                // Agregar la clase "visible" con un retraso
                setTimeout(() => {
                    entry.target.classList.add("visible");
                }, index * 300); // Retraso de 0.3s por tarjeta
            } 
            else {
                // eliminar la clase "visible" cuando ya no esté visible
                entry.target.classList.remove("visible");
            }
        });
    }, 
    {
        threshold: 0.5 // Se activa cuando el 50% de la card está visible
    });

    // Observa cada tarjeta
    cards.forEach((card) => observer.observe(card));
});