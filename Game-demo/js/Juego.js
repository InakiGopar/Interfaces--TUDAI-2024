class Juego {
    constructor
    (
        canvas,
        tablero,
        context,
        canvasWidth,
        canvasHeight,
        fichaSize,
        cellSize,
        playerSkin1,
        playerSkin2,
        playerNickname1,
        playerNickname2   
    ) 
    {
        this.canvas = canvas;
        this.tablero = tablero;
        this.ctx = context;
        this.fichasJugador1 = [];
        this.fichasJugador2 = [];
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.fichaSize = fichaSize;
        this.cellSize = cellSize;
        this.playerSkin1 = playerSkin1;
        this.playerSkin2 = playerSkin2;
        this.playerNickname1 = playerNickname1;
        this.playerNickname2 = playerNickname2;
        this.fichaArrastrada = null;
        this.zonaLanzar = new ZonaLanzar(tablero.getPosX(), tablero.getPosY() - 100, context, tablero, tablero.tableroWidth, 100);
        this.turnoInicial = true; // true para Jugador 1, false para Jugador 2
        this.turno = this.turnoInicial;
        this.botonReiniciar = new BotonJugarDeNuevo(this.canvasWidth / 2 - 150, canvasHeight / 2 + 50 , this.ctx, 300, 50, "Jugar de nuevo" );
        this.juegoTerminado = false; // Variable para controlar el estado del juego
        this.temporizador = new Temporizador(this.canvasWidth / 2 - 80, 10, this.ctx, 150); // 30 segundos como tiempo máximo
        
    }

    iniciarJuego() {
        const fichaOffsetY = this.canvasHeight / 2;
        console.log( "player1: " + this.playerSkin1.src + " player2: " + this.playerSkin2.src);
        
        // Crear fichas de cada jugador
        for (let i = 0; i < 30; i++) {
            this.fichasJugador1.push(new Ficha(
                this.tablero.getPosX() - this.fichaSize * 3, // Posición a la izquierda del tablero
                fichaOffsetY,
                this.fichaSize,
                '#FF0000', // Color de Jugador 1
                this.ctx,
                this.playerSkin1.src // Skin de la ficha
            ));
            
            this.fichasJugador2.push(new Ficha(
                this.tablero.getPosX() + this.tablero.columns * this.cellSize + this.fichaSize * 3, // Posición a la derecha del tablero
                fichaOffsetY,
                this.fichaSize,
                '#0000FF', // Color de Jugador 2
                this.ctx,
                this.playerSkin2.src // Skin de la ficha
            ));
        }

        this.temporizador.iniciar();
    
        this.addEventListeners();
        this.drawGame();
        this.loop(); // Iniciar el bucle de dibujo
    }

    loop() {
        if (!this.juegoTerminado || this.temporizador.tiempoRestante != 0) {
            this.drawGame();
            requestAnimationFrame(() => this.loop());
        }
    }
    

    drawGame() {
        
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight); // Limpiar el canvas
        this.tablero.draw();

        for (const ficha of this.fichasJugador1) {
            ficha.draw();
        }

        for (const ficha of this.fichasJugador2) {
            ficha.draw();
        }

        if (this.juegoTerminado) {
            this.mostrarGanador();
            this.botonReiniciar.draw(); // Dibuja el botón de reinicio si el juego ha terminado
        }

        if(this.temporizador.tiempoRestante === 0){
            
            this.juegoTerminado = true;
            this.mostrarEmpate();
            this.botonReiniciar.draw();
        }

        if(!this.juegoTerminado){
            this.temporizador.draw();
        }
        
    }

    handleFichaDrop(ficha) {
        if (this.zonaLanzar.isFichaEnZona(ficha)) {
            const columna = this.tablero.obtenerColumnaPorPosicion(ficha.posX);
            if (columna !== null) {
                this.tablero.soltarFichaEnColumna(ficha, columna);
                ficha.colocada = true;
                // Verificar si hay un ganador después de soltar la ficha
                if (this.verificarGanador(columna, ficha)) {
                    this.juegoTerminado = true; // Indica que el juego ha terminado
                    
                }
                this.turno = !this.turno; // Cambia el turno después de soltar la ficha
                this.drawGame();
            }
        }
    }


    mostrarGanador() {
        const mensaje = `Ganador:  ${this.turno ? 'Francia' : 'Argentina'}`;
        const mensajeGanador = new MensajeFinal(0, 0, this.ctx, mensaje, this.canvasWidth, this.canvasHeight)
        mensajeGanador.draw();
    }

    mostrarEmpate() {
        const mensaje = "Empate";
        const mensajeEmpate = new MensajeFinal(0, 0, this.ctx, mensaje, this.canvasWidth, this.canvasHeight)
        mensajeEmpate.draw();
    }


    verificarGanador(columna, ficha) {
        
        let fila = this.tablero.obtenerFilaPorColumna(columna); 
        return (
                this.verificarVertical(columna, fila, ficha) ||
                this.verificarHorizontal(columna, fila, ficha) ||
                this.verificarDiagonal(columna, fila, ficha)
            )
    }

    verificarVertical(columna, fila, ficha) {
        let count = 0;
        for (let f = 0; f < this.tablero.rows; f++) {
            if (this.tablero.celdas[f][columna] && this.tablero.celdas[f][columna].color === ficha.color) {
                count++;
                if (count === 4) return true;
            } else {
                count = 0;
            }
        }
        return false;
    }

    verificarHorizontal(columna, fila, ficha) {
        let count = 0;
        console.log(count);
        for (let c = 0; c < this.tablero.columns; c++) {
            if (this.tablero.celdas[fila][c] && this.tablero.celdas[fila][c].color === ficha.color) {
                count++;
                if (count === 4) return true;
            } else {
                count = 0;
            }
        }
        return false;
    }

    verificarDiagonal(columna, fila, ficha) {
        return this.verificarDiagonalAscendente(columna, fila, ficha) || 
                this.verificarDiagonalDescendente(columna, fila, ficha);
    }
    
    verificarDiagonalAscendente(columna, fila, ficha) {
        let count = 1;
    
        // Verifica hacia abajo a la derecha
        let c = columna + 1;
        let f = fila + 1;
        while (c < this.tablero.columns && f < this.tablero.rows && this.tablero.celdas[f][c] && this.tablero.celdas[f][c].color === ficha.color) {
            count++;
            if (count === 4) return true;
            c++;
            f++;
        }
    
        // Verifica hacia arriba a la izquierda
        c = columna - 1;
        f = fila - 1;
        while (c >= 0 && f >= 0 && this.tablero.celdas[f][c] && this.tablero.celdas[f][c].color === ficha.color) {
            count++;
            if (count === 4) return true;
            c--;
            f--;
        }
    
        return false;
    }
    
    verificarDiagonalDescendente(columna, fila, ficha) {
        let count = 1;
    
        // Verifica hacia abajo a la izquierda
        let c = columna - 1;
        let f = fila + 1;
        while (c >= 0 && f < this.tablero.rows && this.tablero.celdas[f][c] && this.tablero.celdas[f][c].color === ficha.color) {
            count++;
            if (count === 4) return true;
            c--;
            f++;
        }
    
        // Verifica hacia arriba a la derecha
        c = columna + 1;
        f = fila - 1;
        while (c < this.tablero.columns && f >= 0 && this.tablero.celdas[f][c] && this.tablero.celdas[f][c].color === ficha.color) {
            count++;
            if (count === 4) return true;
            c++;
            f--;
        }
    
        return false;
    }
    



    addEventListeners() {
        // Detectar clic inicial
        this.canvas.addEventListener("mousedown", (e) => this.onMouseDown(e));
        // Detectar movimiento del mouse
        this.canvas.addEventListener("mousemove", (e) => this.onMouseMove(e));
        // Detectar cuando se suelta el mouse
        this.canvas.addEventListener("mouseup", () => this.onMouseUp());
        // Detectar clic en el botón de reinicio
        this.canvas.addEventListener("click", (e) => this.onClick(e));
    }

    onMouseDown(e) {
        if (this.juegoTerminado) return; // Bloquear si el juego ha terminado
    
        const { offsetX, offsetY } = e;
        const fichas = this.turno ? this.fichasJugador1 : this.fichasJugador2; 
    
        for (const ficha of fichas) {
            if (!ficha.colocada && ficha.isPointInside(offsetX, offsetY)) {
                ficha.setDragging(true);
                this.fichaArrastrada = ficha;
                break;
            }
        }
    }
    
    onMouseMove(e) {
        if (this.juegoTerminado || !this.fichaArrastrada || !this.fichaArrastrada.isDragging()) return;
    
        const { offsetX, offsetY } = e;
        this.fichaArrastrada.setPosition(offsetX, offsetY);
        this.drawGame();
    }
    
    onMouseUp() {
        if (this.juegoTerminado || !this.fichaArrastrada) return;
    
        this.fichaArrastrada.setDragging(false);
        this.handleFichaDrop(this.fichaArrastrada);
        this.fichaArrastrada = null;
    }
    
    onClick(e) {
        if (this.juegoTerminado || this.temporizador.tiempoRestante == 0) {
            const { offsetX, offsetY } = e;
            if (this.botonReiniciar.isPointInside(offsetX, offsetY)) {
                this.reiniciarJuego();
            }
        }
    }

    reiniciarJuego() {
        // Reiniciar el tablero y las fichas
        this.tablero.celdas = Array.from({ length: this.tablero.rows }, () => Array(this.tablero.columns).fill(null));
        this.fichasJugador1 = [];
        this.fichasJugador2 = [];
        this.juegoTerminado = false; // Restablecer el estado del juego
        this.temporizador.reiniciar();
        this.iniciarJuego(); // Reiniciar el juego
    }
}