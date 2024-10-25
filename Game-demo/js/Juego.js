class Juego {
    constructor(canvas, tablero, context, canvasWidth, canvasHeight, fichaSize) {
        this.canvas = canvas;
        this.tablero = tablero;
        this.ctx = context;
        this.fichasJugador1 = [];
        this.fichasJugador2 = [];
        this.canvasWidth = canvasWidth;
        this.canvasheight = canvasHeight;
        this.fichaSize = fichaSize;
        this.fichaArrastrada = null;
        this.zonaLanzar = new ZonaLanzar(tablero.getPosX(), tablero.getPosY() - 100, context, tablero, tablero.tableroWidth, 100); // Zona sobre el tablero
    }



    iniciarJuego() {
        const fichaOffsetY = this.canvasheight / 2; // Ubicación de las fichas verticalmente centradas

        //creo 10 objetos fichas 
        for (let i = 0; i < 10; i++) {

                this.fichasJugador1.push( new Ficha(
                this.tablero.getPosX() - this.fichaSize * 3, //para ubicar la ficha a la izquierda del tablero
                fichaOffsetY,
                this.fichaSize,
                '#FF0000', // Color de jugador 1
                this.ctx,
                '' // Ruta de imagen 
            ));

            this.fichasJugador2.push(
                new Ficha(
                    this.tablero.getPosX() + this.tablero.columns * 80 + this.fichaSize * 3, //para ubicar la ficha a la derecha del tablero
                    fichaOffsetY,
                    this.fichaSize,
                    '#0000FF', // Color de jugador 2
                    this.ctx,
                    '' // Ruta de imagen 
                ));
        }

        this.addEventListeners();
        this.drawGame();
    }


    drawGame() {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasheight); // Limpiar canvas
        this.tablero.draw();

        for (const ficha of this.fichasJugador1) {
            ficha.draw()
        }

        for (const ficha of this.fichasJugador2) {
            ficha.draw()
        }

    }


    handleFichaDrop(ficha) {
        if (this.zonaLanzar.isFichaEnZona(ficha)) {
            const columna = this.tablero.obtenerColumnaPorPosicion(ficha.posX);
            if (columna !== null) {
                this.tablero.soltarFichaEnColumna(ficha, columna);
                this.drawGame();
            }
        }
    }


    addEventListeners() {
        // Detectar el clic inicial
        this.canvas.addEventListener("mousedown", (e) => this.onMouseDown(e));
        // Detectar el movimiento del mouse
        this.canvas.addEventListener("mousemove", (e) => this.onMouseMove(e));
        // Detectar cuando se suelta el mouse
        this.canvas.addEventListener("mouseup", () => this.onMouseUp());
    }

    onMouseDown(e) {
        const { offsetX, offsetY } = e;

        for (const ficha of this.fichasJugador1) {
            if (ficha.isPointInside(offsetX, offsetY)) {
                ficha.setDragging(true);
                this.fichaArrastrada = ficha;
            } 
        }

        for (const ficha of this.fichasJugador2) {
            if (ficha.isPointInside(offsetX, offsetY)) {
                ficha.setDragging(true);
                this.fichaArrastrada = ficha;
            }
        }
    }

    onMouseMove(e) {
        if (this.fichaArrastrada && this.fichaArrastrada.isDragging()) {
            const { offsetX, offsetY } = e;
            this.fichaArrastrada.setPosition(offsetX, offsetY);
            this.drawGame(); // Redibuja para reflejar el movimiento
        }
    }

    onMouseUp() {
        if (this.fichaArrastrada) {
            this.fichaArrastrada.setDragging(false);
            this.handleFichaDrop(this.fichaArrastrada);
            this.fichaArrastrada = null;
        }
    }
}