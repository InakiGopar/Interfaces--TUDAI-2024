document.addEventListener('DOMContentLoaded', function() {
    const modelViewer = document.querySelector('model-viewer');

    // Verifica si el modelo se cargó correctamente
    modelViewer.addEventListener('load', function() {
        console.log('Modelo 3D cargado correctamente');
    });

    // Verifica si hay errores en la carga
    modelViewer.addEventListener('error', function(error) {
        console.error('Error al cargar el modelo 3D:', error);
    });

    document.addEventListener("mousemove", (event) => {
        const { clientX, clientY } = event;
        const xRotation = (clientX / window.innerWidth - 0.5) * 20;
        const yRotation = (clientY / window.innerHeight - 0.5) * 20;
        
        requestAnimationFrame(() => {
            modelViewer.style.transform = `rotateY(${xRotation}deg) rotateX(${yRotation}deg)`;
        });
    });
});