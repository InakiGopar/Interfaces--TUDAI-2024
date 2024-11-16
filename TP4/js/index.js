window.onload = () => {
    document.body.style.overflow = "hidden";
    const loader = document.getElementById("loader");
    const mainContent = document.querySelector('main');

    mainContent.style.visibility = 'visible';
    mainContent.style.opacity = '1';

    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        document.body.style.overflow = 'auto';
        
        setTimeout(() => {
            loader.style.display = 'none';
            document.dispatchEvent(new Event('loaderComplete'));
        }, 1000);
    }, 5000);

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

window.addEventListener("scroll", () => {
    const logo = document.querySelector(".logo-container");
    
    if (window.scrollY >= 200) {
        logo.classList.add("small-logo");
    } 
    else {
        logo.classList.remove("small-logo");
    }
});
