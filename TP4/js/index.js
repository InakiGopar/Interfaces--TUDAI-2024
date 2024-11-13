
window.onload = () => {

    //el usuario no puede scrollear mientras la pagina esta cargando
    document.body.style.overflow = "hidden";

    const loader = document.getElementById("loader");

    // Quitar el loader después de 5 segundos
    setTimeout(() => {
        loader.style.display = "none"; // Oculta el loader
        document.body.style.overflow = 'auto'; //Habilitar el scroll
    }, 5000);


    // Agregar efecto de seguimiento de ojos
    const eyes = document.querySelectorAll(".eye");
    document.addEventListener("mousemove", (event) => {
        eyes.forEach(eye => {
            const pupil = eye.querySelector(".pupil");
            const rect = eye.getBoundingClientRect();
            const eyeCenterX = rect.left + rect.width / 2;
            const eyeCenterY = rect.top + rect.height / 2;

            const deltaX = event.clientX - eyeCenterX;
            const deltaY = event.clientY - eyeCenterY;
            const angle = Math.atan2(deltaY, deltaX);

            const maxRadius = 10;
            const pupilX = maxRadius * Math.cos(angle);
            const pupilY = maxRadius * Math.sin(angle);

            pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
        });
    });
};


//Se achica el logo cuando la posicion es menor o igual a 200
window.addEventListener("scroll", () => {
    const logo = document.querySelector(".logo-container");
    
    if (window.scrollY >= 200) {
        logo.classList.add("small-logo");
    } 
    else {
        logo.classList.remove("small-logo");
    }
});
