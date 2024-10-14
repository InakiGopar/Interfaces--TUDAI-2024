"use strict"

const buttonAddToCartBig = document.querySelectorAll('.add-to-cart-button-big').forEach(button => {
    button.addEventListener('click', ()=> {

        button.classList.toggle('remove-to-cart-button-big');

        if (button.innerHTML === 'Agregar al carrito') {
            button.innerHTML = 'Eliminar del carrito';
        } else {
            button.innerHTML = 'Agregar al carrito';
        }
    });
});


  let bigCardsH = document.querySelectorAll('.big-card');

  bigCardsH.forEach((bigCardH) => {
    const mainImageBc = bigCardH.querySelector('.img-main');
    const hoverImages = bigCardH.querySelectorAll('.img-hover');
    const originalSrcBc = mainImageBc.src;
  
    hoverImages.forEach((hoverImgBc) => {
      hoverImgBc.addEventListener('mouseover', () => {
        mainImageBc.style.opacity = '0'; // Inicia el desvanecimiento
        setTimeout(() => {
          mainImageBc.src = hoverImgBc.src;
          mainImageBc.style.opacity = '1'; // Vuelve a aparecer con la nueva imagen
        }, 500);
        // Tiempo debe coincidir con la duración de la transición CSS
      });
  
      hoverImgBc.addEventListener('mouseout', () => {
        mainImageBc.style.opacity = '0';
        setTimeout(() => {
          mainImageBc.src = originalSrcBc;
          mainImageBc.style.opacity = '1';
        }, 500);
      });
    });
  });
