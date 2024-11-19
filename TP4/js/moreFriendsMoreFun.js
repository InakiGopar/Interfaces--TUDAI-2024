const image = document.getElementById('dynamic-image'); // Imagen dinámica
const sections = document.querySelectorAll('.text-content section'); // Secciones del texto
let currentImage = ''; // Variable para guardar la imagen actual

// Función para detectar cambios al hacer scroll
window.addEventListener('scroll', () => {
  let newimage = ''; // Nueva imagen a mostrar
  const firstSection = sections[0]; // Primera sección (mantendrá la primera imagen)

  // Detectamos si estamos todavía dentro de la primera sección
  const firstRect = firstSection.getBoundingClientRect();
  if (firstRect.bottom > window.innerHeight) {
    newImage = firstSection.getAttribute('data-image'); // Primera imagen sigue activa
  } else {
    // Recorremos las demás secciones para encontrar la visible
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();

      // Detectar si la sección está en el centro del viewport
      if (rect.top <= window.innerHeight / 2  && rect.bottom > window.innerHeight / 2) {
        newImage = section.getAttribute('data-image');
      }
    });
  }

  // Cambiar la imagen solo si es diferente a la actual
  if (newImage && newImage !== currentImage) {
    currentImage = newImage; // Actualizamos la imagen actual
    image.style.opacity = 0; // Desaparecer la imagen actual
    setTimeout(() => {
      image.src = newImage; // Cambiamos la imagen
      image.style.opacity = 1; // Aparecer la nueva imagen
      image.style.transform = 'scale(1.1)'; // Animación suave de zoom
    }, 300);
  }
});