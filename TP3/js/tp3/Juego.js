class Juego {
    constructor
        (
            canvas,
            tablero,
            fichasTotales,
            fichasToWin,
            context,
            canvasWidth,
            canvasHeight,
            fichaSize,
            cellSize,
            playerSkin1,
            playerSkin2,
            playerNickname1,
            playerNickname2
        ) {
        this.canvas = canvas;
        this.tablero = tablero;
        this.fichasTotales = fichasTotales;
        this.fichasToWin = fichasToWin;
        this.fichasToWin = fichasToWin
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
        this.botonReiniciar = new BotonJugarDeNuevo(this.canvasWidth / 2 - 150, canvasHeight / 2 + 50, this.ctx, 300, 50, "Jugar de nuevo");
        this.juegoTerminado = false; // Variable para controlar el estado del juego
        this.temporizador = new Temporizador(this.canvasWidth / 2 - 80, 5, this.ctx, 150); // 30 segundos como tiempo máximo
        this.imagenGanadorArgentina = new Image();
        this.imagenGanadorArgentina.src = '../assets/img/game/Cartel-ganador-argentina.png';
        this.imagenGanadorFrancia = new Image();
        this.imagenGanadorFrancia.src = '../assets/img/game/Cartel-ganador-francia.png';
        this.imagenEmpate = new Image();
        this.imagenEmpate.src = '../assets/img/game/empate.jpg';
        this.botonVolverAlMenu = new BotonVolverMenu(this.canvasWidth / 2 - 150, canvasHeight / 2 + 110, this.ctx, 300, 50, "Volver al Menu");
        this.botonVolverDesdeJuego = new VolverMenuEnJuego(this.canvasWidth / 2 - 480, 5, this.ctx, 40, 40, "<");
        this.soundTrack = new Audio('../assets/sounds/game-soundtrack.mp3');
        this.animacionEnCurso = false; // Nueva bandera para controlar la animación
    }

    iniciarJuego() {
        const offsetY = 200; // Ajuste para la posición vertical inicial de las pilas
        const offsetXJugador1 = this.tablero.getPosX() - this.fichaSize * 5; // Posición de Jugador 1
        const offsetXJugador2 = this.tablero.getPosX() + this.tablero.columns * this.cellSize + this.fichaSize * 3; // Posición de Jugador 2

        const numFichasPorPila = (this.fichasTotales / 2) / 2; 
        const espacioEntrePilas = 20;

        // Crear fichas para Jugador 1 - Primera Pila
        for (let i = 0; i < numFichasPorPila; i++) {
            this.fichasJugador1.push(new Ficha(
                offsetXJugador1,
                offsetY + i * this.fichaSize, // Espaciado vertical entre fichas
                this.fichaSize,
                '#FF0000', // Color de Jugador 1
                this.ctx,
                this.playerSkin1.src // Skin de la ficha
            ));
        }

        // Crear fichas para Jugador 1 - Segunda Pila
        for (let i = 0; i < numFichasPorPila; i++) {
            this.fichasJugador1.push(new Ficha(
                offsetXJugador1 + espacioEntrePilas + this.fichaSize * 2, // Mover la segunda pila a la derecha
                offsetY + i * this.fichaSize, // Espaciado vertical entre fichas
                this.fichaSize,
                '#FF0000', // Color de Jugador 1
                this.ctx,
                this.playerSkin1.src // Skin de la ficha
            ));
        }

        // Crear fichas para Jugador 2 - Primera Pila
        for (let i = 0; i < numFichasPorPila; i++) {
            this.fichasJugador2.push(new Ficha(
                offsetXJugador2,
                offsetY + i * this.fichaSize, // Espaciado vertical entre fichas
                this.fichaSize,
                '#0000FF', // Color de Jugador 2
                this.ctx,
                this.playerSkin2.src // Skin de la ficha
            ));
        }

        // Crear fichas para Jugador 2 - Segunda Pila
        for (let i = 0; i < numFichasPorPila; i++) {
            this.fichasJugador2.push(new Ficha(
                offsetXJugador2 + espacioEntrePilas + this.fichaSize * 2, // Mover la segunda pila a la derecha
                offsetY + i * this.fichaSize, // Espaciado vertical entre fichas
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
            this.soundTrack.play();
            this.drawGame();
            requestAnimationFrame(() => this.loop());
        }
    }


    drawGame() {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        
        // Primero dibujamos las fichas que están en animación (detrás del tablero)
        for (const ficha of this.fichasJugador1) {
            if (ficha.enAnimacion) {
                ficha.draw();
            }
        }
        for (const ficha of this.fichasJugador2) {
            if (ficha.enAnimacion) {
                ficha.draw();
            }
        }
    
        // Dibujamos el tablero
        this.tablero.draw();
        this.tablero.drawArrows(this.zonaLanzar);

        //Dibujamos Boton Reiniciar
        this.botonVolverDesdeJuego.draw();
    
        // Dibujamos las fichas que NO están en animación (por encima del tablero)
        for (const ficha of this.fichasJugador1) {
            if (!ficha.enAnimacion) {
                ficha.draw();
            }
        }
        for (const ficha of this.fichasJugador2) {
            if (!ficha.enAnimacion) {
                ficha.draw();
            }
        }
    
        // El resto permanece igual
        if (this.juegoTerminado) {
            this.mostrarGanador();
            this.botonReiniciar.draw();
            this.botonVolverAlMenu.draw();
        }
    
        if (this.temporizador.tiempoRestante === 0 && !this.juegoTerminado) {
            this.juegoTerminado = true;
            this.mostrarEmpate();
            this.botonReiniciar.draw();
            this.botonVolverAlMenu.draw();
        }
    
        if (!this.juegoTerminado) {
            this.temporizador.draw();
        }

        this.drawTurno();
    }

    handleFichaDrop(ficha) {
        if (this.zonaLanzar.isFichaEnZona(ficha)) {
            const columna = this.tablero.obtenerColumnaPorPosicion(ficha.getPosX());
            if (columna !== null && !this.tablero.isColumnaLlena(columna)) {
                // Activar la bandera de animación
                this.animacionEnCurso = true;
                
                ficha.colocada = true;
                this.tablero.soltarFichaEnColumna(ficha, columna, (columna, fila) => {
                    if (this.verificarGanador(columna, ficha)) {
                        this.juegoTerminado = true;
                    }
                    this.turno = !this.turno;
                    // Desactivar la bandera cuando la animación termina
                    this.animacionEnCurso = false;
                    this.drawGame();
                });
            } else {
                ficha.setPosition(ficha.posicionInicial.x, ficha.posicionInicial.y);
                ficha.colocada = false;
            }
        }
    }


    mostrarGanador() {
        
        const imagenGanador = !this.turno ? this.imagenGanadorArgentina : this.imagenGanadorFrancia;
        const mensajeGanador = new MensajeFinal(0, 0, this.ctx, this.canvasWidth, this.canvasHeight, imagenGanador);
        mensajeGanador.draw();
    }

    mostrarEmpate() {

        const mensajeEmpate = new MensajeFinal(0, 0, this.ctx, this.canvasWidth, this.canvasHeight, this.imagenEmpate)
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
                if (count === this.fichasToWin) return true;
            } else {
                count = 0;
            }
        }
        return false;
    }

    verificarHorizontal(columna, fila, ficha) {
        let count = 0;
        for (let c = 0; c < this.tablero.columns; c++) {
            if (this.tablero.celdas[fila][c] && this.tablero.celdas[fila][c].color === ficha.color) {
                count++;
                if (count === this.fichasToWin) return true;
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
            if (count === this.fichasToWin) return true;
            c++;
            f++;
        }

        // Verifica hacia arriba a la izquierda
        c = columna - 1;
        f = fila - 1;
        while (c >= 0 && f >= 0 && this.tablero.celdas[f][c] && this.tablero.celdas[f][c].color === ficha.color) {
            count++;
            if (count === this.fichasToWin) return true;
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
            if (count === this.fichasToWin) return true;
            c--;
            f++;
        }

        // Verifica hacia arriba a la derecha
        c = columna + 1;
        f = fila - 1;
        while (c < this.tablero.columns && f >= 0 && this.tablero.celdas[f][c] && this.tablero.celdas[f][c].color === ficha.color) {
            count++;
            if (count === this.fichasToWin) return true;
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
        
        // Agregar eventos para el hover del botón
        this.canvas.addEventListener("mousemove", (e) => {
            const { offsetX, offsetY } = e;
            this.botonVolverDesdeJuego.setHovered(
                this.botonVolverDesdeJuego.isPointInside(offsetX, offsetY)
            );
            this.drawGame(); // Redibujar para mostrar el efecto hover
        });
    }


    onMouseDown(e) {
        if (this.juegoTerminado || this.animacionEnCurso) return;

        const { offsetX, offsetY } = e;
        const fichasActuales = this.turno ? this.fichasJugador1 : this.fichasJugador2;

        // Solo permitir arrastrar fichas del jugador actual
        for (let i = fichasActuales.length - 1; i >= 0; i--) {
            const ficha = fichasActuales[i];
            if (!ficha.colocada && ficha.isPointInside(offsetX, offsetY)) {
                ficha.setDragging(true);
                this.fichaArrastrada = ficha;
                ficha.posicionInicial = { x: ficha.posX, y: ficha.posY };
                break;
            }
        }
    }

    onMouseMove(e) {

        if (this.juegoTerminado || !this.fichaArrastrada || !this.fichaArrastrada.isDragging()) return;

        const { offsetX } = e;
        this.fichaArrastrada.setPosition(offsetX, e.offsetY);

        // Actualiza la flecha activa solo si la columna no está llena
        const columna = this.tablero.obtenerColumnaPorPosicion(offsetX);
        if (this.zonaLanzar.isFichaEnZona(this.fichaArrastrada) &&
            columna !== null &&
            !this.tablero.isColumnaLlena(columna)) {
            this.tablero.setFlechaActiva(columna);
        } else {
            this.tablero.setFlechaActiva(null);
        }

        this.drawGame();
    }

    onMouseUp() {
        if (this.juegoTerminado || !this.fichaArrastrada) return;

        this.fichaArrastrada.setDragging(false);

        if (this.zonaLanzar.isFichaEnZona(this.fichaArrastrada)) {
            this.handleFichaDrop(this.fichaArrastrada);
        }
        else {
            this.fichaArrastrada.setPosition(this.fichaArrastrada.posicionInicial.x, this.fichaArrastrada.posicionInicial.y);
        }

        this.tablero.setFlechaActiva(null);
        this.fichaArrastrada = null;
        this.drawGame();
    }

    onClick(e) {
        const { offsetX, offsetY } = e;
        
        // Verificar el botón de volver al menú primero, independiente del estado del juego
        if (this.botonVolverDesdeJuego.isPointInside(offsetX, offsetY)) {
            this.soundTrack.pause(); // Detener la música antes de volver al menú
            this.soundTrack.currentTime = 0;
            this.backToMenu();
            return;
        }

        // Verificar los otros botones solo si el juego terminó
        if (this.juegoTerminado || this.temporizador.tiempoRestante == 0) {
            if (this.botonReiniciar.isPointInside(offsetX, offsetY)) {
                this.reiniciarJuego();
            }
            if (this.botonVolverAlMenu.isPointInside(offsetX, offsetY)) {
                this.backToMenu();
            }
        }
    }

    backToMenu() {
        // Detener todos los sonidos antes de volver al menú
        this.soundTrack.pause();
        this.soundTrack.currentTime = 0;
        
        this.canvas.parentNode.removeChild(this.canvas);
        const nuevoCanvas = document.createElement('canvas');
        nuevoCanvas.id = 'canvas'; 
        nuevoCanvas.width = 1000; 
        nuevoCanvas.height = 650; 
        
        const gameSection = document.getElementById('game_section');
        gameSection.appendChild(nuevoCanvas);
        
        const nuevoCtx = nuevoCanvas.getContext('2d');
        const menu = new Menu(0, 180, nuevoCtx, nuevoCanvas, 200, 50, "#007bff", "13px 'Press Start 2P'", 20);
        menu.draw();
    }

    reiniciarJuego() {
        // Reiniciar el tablero y las fichas
        this.tablero.celdas = Array.from({ length: this.tablero.rows }, () => Array(this.tablero.columns).fill(null));
        this.fichasJugador1 = [];
        this.fichasJugador2 = [];
        this.juegoTerminado = false; // Restablecer el estado del juego
        this.temporizador.reiniciar();
        this.soundTrack.pause();
        this.iniciarJuego(); // Reiniciar el juego
    }

    drawTurno() {
        // Configuración del texto
        this.ctx.font = "bold 16px 'Press Start 2P'";
        this.ctx.textAlign = "center";
        
        // Posición del texto (ajusta estos valores según tu layout)
        const x = this.canvas.width / 2;
        const y = 630;  // Altura desde la parte superior
        
        // Determinar el mensaje según el turno
        const mensaje = this.turno ? "Turno de Argentina" : "Turno de Francia";
        
        // Color según el equipo
        this.ctx.fillStyle = this.turno ? "#75AADB" : "#002654"; // Colores de las banderas
        
        // Dibujar un fondo para el texto
        const medidas = this.ctx.measureText(mensaje);
        const padding = 10;
        this.ctx.fillRect(
            x - medidas.width/2 - padding,
            y - 25,
            medidas.width + (padding * 2),
            35
        );
        
        // Dibujar el texto
        this.ctx.fillStyle = "#FFFFFF"; // Texto en blanco
        this.ctx.fillText(mensaje, x, y);
    }
}