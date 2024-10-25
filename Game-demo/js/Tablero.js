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
        this.posY = (this.canvas.height - this.tableroHeight) / 2 + 10;
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


    draw() {
        // Dibuja el fondo del tablero
        this.ctx.fillStyle = "#007bff"; // Color del tablero
        this.ctx.fillRect(this.posX, this.posY, this.tableroWidth, this.tableroHeight);

        // Dibuja la cuadrícula de celdas, al ser una matriz la recorremos como tal
        for (let col = 0; col < this.columns; col++) {
            for (let row = 0; row < this.rows; row++) {
                // Dibuja cada celda como un círculo
                this.ctx.beginPath();
                const x = this.posX + col * this.cellSize + this.cellSize / 2;
                const y = this.posY + row * this.cellSize + this.cellSize / 2;
                this.ctx.arc(x, y, this.cellSize / 2 - 10, 0, 2 * Math.PI); // Radio ajustado para que los círculos no se toquen
                this.ctx.fillStyle = this.celdas[row][col] ? this.celdas[row][col].color : "#fff"; //si hay una ficha dibujala
                this.ctx.fill();
                this.ctx.closePath();
            }
        }
    }
}
