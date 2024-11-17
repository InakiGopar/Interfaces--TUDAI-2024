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
        this.flechaActiva = null; // Almacena el índice de la columna activa

        this.imgCentro = new Image();
        this.imgCentro.src = "../assets/img/game/celda-azul.png";

        this.imgEsquinaSuperiorIzquierda = new Image();
        this.imgEsquinaSuperiorIzquierda.src = '../assets/img/game/celda-azul.png';

        this.imgEsquinaSuperiorDerecha = new Image();
        this.imgEsquinaSuperiorDerecha.src = '../assets/img/game/celda-azul.png';

        this.imgEsquinaInferiorIzquierda = new Image();
        this.imgEsquinaInferiorIzquierda.src = '../assets/img/game/celda-azul.png';

        this.imgEsquinaInferiorDerecha = new Image();
        this.imgEsquinaInferiorDerecha.src = '../assets/img/game/celda-azul.png';

        this.imgLadoDerecho = new Image();
        this.imgLadoDerecho.src = '../assets/img/game/celda-azul.png';

        this.imgLadoIzquierdo = new Image();
        this.imgLadoIzquierdo.src = '../assets/img/game/celda-azul.png';

        this.imgLadoSuperior = new Image();
        this.imgLadoSuperior.src = '../assets/img/game/celda-azul.png';

        this.imgLadoInferior = new Image();
        this.imgLadoInferior.src = '../assets/img/game/celda-azul.png';


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

    isColumnaLlena(columna) {
        // Verificamos la posición más alta de la columna (fila 0)
        return this.celdas[0][columna] !== null;
    }

    // Método para colocar la ficha en la columna más baja disponible
    soltarFichaEnColumna(ficha, columna, callback) {
        if (this.isColumnaLlena(columna)) {
            return false;
        }

        for (let fila = this.rows - 1; fila >= 0; fila--) {
            if (!this.isOcupado(columna, fila)) {
                this.animarCaidaFicha(ficha, columna, 0, fila, callback);
                return true;
            }
        }
        return false;
    }
    
    animarCaidaFicha(ficha, columna, filaActual, filaFinal, callback) {
        const posX = this.posX + columna * this.cellSize + this.cellSize / 2;
        const posYInicial = this.posY + filaActual * this.cellSize + this.cellSize / 2;
        const posYFinal = this.posY + filaFinal * this.cellSize + this.cellSize / 2;
        
        let velocidad = 0; 
        const gravedad = 0.5; // Factor de gravedad 
        let posYActual = posYInicial;
        let rebote = 0.5;
        let rebotesRestantes = 3;

        ficha.enAnimacion = true;
    
        const animar = () => {
            velocidad += gravedad; // Incrementa la velocidad con la gravedad
            posYActual += velocidad;

            ficha.setPosition(posX, posYActual);
    
            if (posYActual >= posYFinal) {
            // La ficha alcanzó el punto final de caída
            posYActual = posYFinal;
            velocidad = -velocidad * rebote; 

            rebotesRestantes -= 1;
            if (rebotesRestantes <= 0) {
                // Si ya no quedan rebotes, finaliza la animación
                ficha.setPosition(posX, posYFinal);
                ficha.enAnimacion = false;
                this.putFicha(columna, filaFinal, ficha);
                if (callback) callback(columna, filaFinal);
                return;
            }
        }
        ficha.setPosition(posX, posYActual);
        
        requestAnimationFrame(animar);
    };
    
        requestAnimationFrame(animar);
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
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.columns; col++) {
                const x = this.posX + col * this.cellSize;
                const y = this.posY + row * this.cellSize;
    
                // Esquinas
                if (row === 0 && col === 0) {
                    // Esquina superior izquierda
                    this.ctx.drawImage(this.imgEsquinaSuperiorIzquierda, x, y, this.cellSize, this.cellSize);
                } else if (row === 0 && col === this.columns - 1) {
                    // Esquina superior derecha
                    this.ctx.drawImage(this.imgEsquinaSuperiorDerecha, x, y, this.cellSize, this.cellSize);
                } else if (row === this.rows - 1 && col === 0) {
                    // Esquina inferior izquierda
                    this.ctx.drawImage(this.imgEsquinaInferiorIzquierda, x, y, this.cellSize, this.cellSize);
                } else if (row === this.rows - 1 && col === this.columns - 1) {
                    // Esquina inferior derecha
                    this.ctx.drawImage(this.imgEsquinaInferiorDerecha, x, y, this.cellSize, this.cellSize);
                } 
                // Lados sin esquinas
                else if (row === 0) {
                    // Lado superior
                    this.ctx.drawImage(this.imgLadoSuperior, x, y, this.cellSize, this.cellSize);
                } else if (row === this.rows - 1) {
                    // Lado inferior
                    this.ctx.drawImage(this.imgLadoInferior, x, y, this.cellSize, this.cellSize);
                } else if (col === 0) {
                    // Lado izquierdo
                    this.ctx.drawImage(this.imgLadoIzquierdo, x, y, this.cellSize, this.cellSize);
                } else if (col === this.columns - 1) {
                    // Lado derecho
                    this.ctx.drawImage(this.imgLadoDerecho, x, y, this.cellSize, this.cellSize);
                } 
                // Celdas centrales
                else {
                    this.ctx.drawImage(this.imgCentro, x, y, this.cellSize, this.cellSize);
                }
            }
        }
    }

    drawArrows() {
        if (this.flechaActiva !== null) {
            const flechaPosX = this.posX + this.flechaActiva * this.cellSize + this.cellSize / 2;
            const flechaPosY = this.posY - 5; // Ajusta la posición Y de la flecha
            this.ctx.fillStyle = "#FFFF00"; // Color de la flecha
            this.ctx.beginPath();
            this.ctx.moveTo(flechaPosX, flechaPosY);
            this.ctx.lineTo(flechaPosX - 10, flechaPosY -10); // Flecha a la izquierda
            this.ctx.lineTo(flechaPosX + 10, flechaPosY -10); // Flecha a la derecha
            this.ctx.closePath();
            this.ctx.fill();
        }
    }

    setFlechaActiva(columna) {
        this.flechaActiva = columna;
    }
}