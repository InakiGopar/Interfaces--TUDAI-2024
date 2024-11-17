class ZonaLanzar {
    constructor(posX, posY, context, tablero, width, height) {
        this.posX = posX;
        this.posY = posY;
        this.width = width; 
        this.height = height; 
        this.context = context;
        this.tablero = tablero;
    }

    isFichaEnZona(ficha) {
        const fichaPosX = ficha.getPosX();
        const fichaPosY = ficha.getPosY();
        return (
            fichaPosX > this.posX &&
            fichaPosX < this.posX + this.width &&
            fichaPosY > this.posY &&
            fichaPosY < this.posY + this.height
        );
    }

    soltarFichaEnColumna(ficha) {
        // Obtener la columna correspondiente basándose en la posición X de la ficha
        const columna = Math.floor((ficha.getPosX() - this.tablero.getPosX()) / this.tablero.cellSize);
        if (columna < 0 || columna >= this.tablero.columns) return; // Verifica si la ficha está fuera de los límites del tablero

        const filaFinal = this.encontrarPosicionFinal(columna);
        if (filaFinal !== -1) {
            this.animarCaidaFicha(ficha, columna, filaFinal);
        }
    }

    encontrarPosicionFinal(columna) {
        for (let fila = this.tablero.rows - 1; fila >= 0; fila--) {
            if (!this.tablero.isOcupado(columna, fila)) {
                return fila;
            }
        }
        return -1; // Columna llena
    }


    animarCaidaFicha(ficha, columna, filaFinal) {
        const destinoY = this.tablero.getPosY() + filaFinal * this.tablero.cellSize + this.tablero.cellSize / 2;
        const intervalo = setInterval(() => {
            if (ficha.getPosY() < destinoY) {
                ficha.setPosition(ficha.getPosX(), ficha.getPosY() + 5); // Ajusta la velocidad de caída
                this.tablero.draw(); // Redibuja el tablero para actualizar la animación
                ficha.draw();
            } else {
                clearInterval(intervalo);
                this.tablero.putFicha(columna, filaFinal, ficha); // Coloca la ficha en la posición final
            }
        }, 16); // 60 fps
    }
}