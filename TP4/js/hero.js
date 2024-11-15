document.addEventListener("DOMContentLoaded", () => {
    const layers = document.querySelectorAll(".hero .layer");

    // Escalonar la animación de entrada
    layers.forEach((layer, index) => {
        setTimeout(() => {
            layer.classList.add("visible");
        }, index * 100); // Efecto tardio de escalonamiento
    });

    // Efecto parallax
    let lastScrollPosition = 0;
    window.addEventListener("scroll", () => {
        lastScrollPosition = window.scrollY;
        //requestAnimationFrame gestoina animaciones, en este caso la animacion parallax
        requestAnimationFrame(applyParallaxEffect);
    });

    function applyParallaxEffect() {
        layers.forEach((layer, index) => {
            const depth = (index + 1) * 0.01; // profundidad
            const translateY = lastScrollPosition * depth;
            layer.style.transform = `translateY(${translateY}px)`;
        });
    }
});
