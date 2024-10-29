
window.onload = function () {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    // Muestra la pantalla de selección de tablero
    mostrarPantallaSeleccion(context, canvas);
};

// Función para mostrar la pantalla de selección de tablero
function mostrarPantallaSeleccion(context, canvas) {
    context.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas

    // Configuración de los botones
    const opciones = [
        { texto: "4 en línea", columnas: 7, filas: 6 },
        { texto: "5 en línea", columnas: 8, filas: 7 },
        { texto: "6 en línea", columnas: 9, filas: 8 },
        { texto: "7 en línea", columnas: 10, filas: 9 },
    ];

    const botonAncho = 200;
    const botonAlto = 50;
    const margenVertical = 20;
    const inicioY = canvas.height / 2 - ((opciones.length * (botonAlto + margenVertical)) / 2);

    // Dibujar los botones
    opciones.forEach((opcion, index) => {
        const x = (canvas.width - botonAncho) / 2;
        const y = inicioY + index * (botonAlto + margenVertical);

        context.fillStyle = "#007bff";
        context.fillRect(x, y, botonAncho, botonAlto);

        context.fillStyle = "#FFF";
        context.font = "20px Arial";
        context.textAlign = "center";
        context.fillText(opcion.texto, x + botonAncho / 2, y + botonAlto / 2 + 7);

        // Agregar un listener para los clics
        canvas.addEventListener("click", function seleccionarTablero(event) {
            const rect = canvas.getBoundingClientRect();
            const clickX = event.clientX - rect.left;
            const clickY = event.clientY - rect.top;

            // Verificar si el clic fue dentro del botón
            if (clickX > x && clickX < x + botonAncho && clickY > y && clickY < y + botonAlto) {
                // Quitar el listener después de seleccionar
                canvas.removeEventListener("click", seleccionarTablero);

                // Iniciar el juego con el tamaño de tablero seleccionado
                iniciarJuego(canvas, context, opcion.columnas, opcion.filas);
            }
        });
    });
}

// Función para iniciar el juego con el tamaño de tablero seleccionado
function iniciarJuego(canvas, context, columns, rows) {
    const cellSize = 80; // Tamaño de las celdas

    // Crear el tablero centrado
    const tablero = new Tablero(0, 0, context, columns, rows, cellSize, canvas);

    const juego = new Juego(
        canvas,
        tablero,
        context,
        canvas.width,
        canvas.height,
        30 // Tamaño de la ficha
    );

    juego.iniciarJuego(); // Inicia el juego con el jugador 1 siempre
}