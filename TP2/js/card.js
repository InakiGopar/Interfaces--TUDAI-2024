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

