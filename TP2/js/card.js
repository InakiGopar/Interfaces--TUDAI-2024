'use strict'
const favoriteStar = document.querySelectorAll('.favoriteStar').forEach(span => {
    span.addEventListener('click', ()=> {
        span.classList.toggle('mdi--star');
        span.classList.toggle('mdi--star-outline');
    });
});

const buttonAddToCart = document.querySelectorAll('.add-to-cart-button').forEach(button => {
    button.addEventListener('click', ()=> {
        button.classList.toggle('remove-to-cart-button');
        if (button.innerHTML === 'Agregar al carrito') {
            button.innerHTML = 'Eliminar del carrito';
        } else {
            button.innerHTML = 'Agregar al carrito';
        }
    });
});

const imageUrls = [
    '../assets/img/card-img/Portadacuatroenlinea.png', '../assets/img/card-img/rocketleague.jpg' , '../assets/img/card-img/Counterstrike.jpg', '../assets/img/card-img/minecraft.jpg' ,'../assets/img/card-img/gta5.webp',
    '../assets/img/card-img/gtasa.jpg', '../assets/img/card-img/Fornite.webp', '../assets/img/card-img/starwarsepisodie3.jpg' ,'../assets/img/card-img/warzone.jpg' ,'../assets/img/card-img/Valorant.webp',
    '../assets/img/card-img/fifa25.jpg', '../assets/img/card-img/2k25.jpg', '../assets/img/card-img/FM2024.jpg', '../assets/img/card-img/f124.jpg', '../assets/img/card-img/w2k24e.webp',
    '../assets/img/card-img/age.jpg', '../assets/img/card-img/lol.webp', '../assets/img/card-img/Risk.jpg', '../assets/img/card-img/amongus.jpg', '../assets/img/card-img/Ageofmet.jpg'
];


const cards = document.querySelectorAll('.card');

// Iterar sobre cada tarjeta y asignarles una imagen
cards.forEach((card, index) => {
    if (index < imageUrls.length) {
        card.style.backgroundImage = `url(${imageUrls[index]})`;
    }
});



// Selecciona la imagen principal
const mainImage = document.getElementById('img-main');
// Selecciona todas las miniaturas
const hoverImages = document.querySelectorAll('#img-hover');
// Guarda la fuente original de la imagen principal
const originalSrc = mainImage.src;

// Añade eventos a cada miniatura
hoverImages.forEach((hoverImg) => {
  // Cambia la imagen principal al hacer hover
  hoverImg.addEventListener('mouseover', () => {
    mainImage.src = hoverImg.src;
  });

  // Restaura la imagen principal cuando se quita el hover
  hoverImg.addEventListener('mouseout', () => {
    mainImage.src = originalSrc;
  });
});
