
window.onload = function () {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    // Definir el número de columnas y filas del tablero (Debe ser dinamico)
    const columns = 7;
    const rows = 6;
    const cellSize = 80; // Tamaño de las celdas (mismo valor que en Tablero.js)


    // Crea el tablero centrado 
    const tablero = new Tablero(0, 0, context, columns, rows, cellSize, canvas);

    const juego = new Juego(
        canvas,
        tablero,
        context,
        canvas.width,
        canvas.height,
        30
    );

    juego.iniciarJuego();
};
