class Tablero extends Dibujable {
    constructor(posX, posY, context, columns, rows, cellSize, canvas) {
        super(posX, posY, context);
        this.columns = columns;
        this.rows = rows;
        this.cellSize = cellSize; // Tamaño de cada celda
        this.tableroWidth = columns * cellSize;
        this.tableroHeight = rows * cellSize;
        this.canvas = canvas;
        this.celdas = Array.from({ length: rows }, () => Array(columns).fill(null)); // Matriz para almacenar las fichas
        this.calculateMean();
    }


    //funcion para que el tablero quede centrado en el canvas
    calculateMean() {
        this.posX = (this.canvas.width - this.tableroWidth) / 2;
        this.posY = (this.canvas.height - this.tableroHeight) / 2 + 30;
    }

    isOcupado(columna, fila) {
        return this.celdas[fila][columna] !== null;
    }

    putFicha(columna, fila, ficha) {
        this.celdas[fila][columna] = ficha;
        this.draw(); // Redibuja el tablero con la ficha en su lugar
    }

    // Método para obtener la columna en función de la posición x de la ficha
    obtenerColumnaPorPosicion(posX) {
        const columna = Math.floor((posX - this.posX) / this.cellSize);
        return columna >= 0 && columna < this.columns ? columna : null;
    }

    // Método para colocar la ficha en la columna más baja disponible
    soltarFichaEnColumna(ficha, columna) {
        for (let fila = this.rows - 1; fila >= 0; fila--) {
            if (!this.isOcupado(columna, fila)) {
                this.putFicha(columna, fila, ficha);
                ficha.setPosition(
                    this.posX + columna * this.cellSize + this.cellSize / 2,
                    this.posY + fila * this.cellSize + this.cellSize / 2
                );
                break;
            }
        }
    }

    obtenerFilaPorColumna(columna) {
        for (let fila = 0; fila <= this.rows -1; fila++) {
            if (this.celdas[fila][columna] ) {
                return fila; // Retorna la fila ocupada
            }
        }
        return null; // Si la columna está vacía
    }

    draw() {
    const ctx = this.ctx;
    
    // Degradado de fondo para el tablero
    const gradient = ctx.createLinearGradient(0, 0, this.tableroWidth, this.tableroHeight);
    gradient.addColorStop(0, "#0069d9"); 
    gradient.addColorStop(1, "#007bff"); 
    ctx.fillStyle = gradient;
    ctx.fillRect(this.posX, this.posY, this.tableroWidth, this.tableroHeight);

    // Sombra para dar efecto tridimensional al tablero
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;

    // Dibujar las celdas circulares
    for (let col = 0; col < this.columns; col++) {
        for (let row = 0; row < this.rows; row++) {
            ctx.beginPath();
            const x = this.posX + col * this.cellSize + this.cellSize / 2;
            const y = this.posY + row * this.cellSize + this.cellSize / 2;
            const radius = (this.cellSize / 2) - 10; // Tamaño ajustado del círculo

            // Sombra para las celdas
            ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
            ctx.shadowBlur = 5;
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;

            ctx.arc(x, y, radius, 0, 2 * Math.PI); // Dibujar el círculo

            // Colorear las celdas, o dibujar en blanco si están vacías
            ctx.fillStyle = this.celdas[row][col] ? this.celdas[row][col].color : "#fff";
            ctx.fill();

            // Borde del círculo para que resalte más
            ctx.lineWidth = 2;
            ctx.strokeStyle = "#0056b3"; // Borde azul oscuro
            ctx.stroke();

            ctx.closePath();
        }
    }

    // Restablecer sombra después de dibujar para evitar aplicarla en otros elementos
    ctx.shadowColor = "transparent";
}

}