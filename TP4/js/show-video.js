const moves = document.querySelectorAll(".move");

// Efecto parallax sutil
let lastScrollPosition = 0;

window.addEventListener("scroll", () => {
    lastScrollPosition = window.scrollY;
    requestAnimationFrame(applyParallaxEffect);
});

function applyParallaxEffect() {
    moves.forEach((move, index) => {
        const depth = (index + 1) * 0.0010; // Profundidad ajustada para un efecto más sutil
        const translateY = lastScrollPosition * depth;
        move.style.transform = `translateY(${translateY}px)`;
    });
}