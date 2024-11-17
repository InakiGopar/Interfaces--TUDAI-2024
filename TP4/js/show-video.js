document.addEventListener('DOMContentLoaded', () => {
    const section = document.querySelector('#video-section');
    const videoContent = document.querySelector('.video-content');
    const characterContent = document.querySelector('.character-content');
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Aplica la animación cuando la sección está visible
          videoContent.style.transform = 'translateY(0)';
          characterContent.style.transform = 'translateY(50px)';
        }
      });
    }, { threshold: 0.1 }); // Detecta cuando el 10% de la sección es visible
  
    observer.observe(section);
  });