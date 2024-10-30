class Menu extends Dibujable {
    constructor(posX, posY, ctx, canvas, btnAncho, btnAlto, btnColor, btnFuente, marginVertical) {
        super(posX, posY, ctx);
        this.canvas = canvas;
        this.ctx = ctx;
        this.btnAncho = btnAncho;
        this.btnAlto = btnAlto;
        this.btnColor = btnColor;
        this.btnFuente = btnFuente;
        this.marginVertical = marginVertical;
        this.reglas = new Regla();
    }

    draw() {
        this.ctx.font = this.btnFuente;
        this.ctx.textAlign = "center";

        this.reglas.gameRules.forEach((opcion, index) => {
            const x = (this.canvas.width - this.btnAncho) / 2;
            const y = this.posY + index * (this.btnAlto + this.marginVertical);

            // Dibujar el botón
            this.ctx.fillStyle = this.btnColor;
            this.ctx.fillRect(x, y, this.btnAncho, this.btnAlto);

            // Dibujar el texto del botón
            this.ctx.fillStyle = "#FFF";
            this.ctx.fillText(opcion.texto, x + this.btnAncho / 2, y + this.btnAlto / 2 + 7);

            // condicion para desaparecer los eventListener cuando se esta jugando
            this.canvas.addEventListener("click", (event) => {
                const rect = this.canvas.getBoundingClientRect();
                const clickX = event.clientX - rect.left;
                const clickY = event.clientY - rect.top;

                if (clickX > x && clickX < x + this.btnAncho && clickY > y && clickY < y + this.btnAlto) {
                    this.startGame(this.canvas, this.ctx, opcion.columnas, opcion.filas, opcion.cellSize, opcion.tamFicha);
                }
            });
        });
    }

    startGame(canvas, context, columns, rows, cellSize, tamFicha) {
        //elimino los botones cuando el juego se inicia
        this.btnAlto = 0;
        this.btnAncho = 0;
        const tablero = new Tablero(0, 0, context, columns, rows, cellSize, canvas);
        const juego = new Juego(canvas, tablero, context, canvas.width, canvas.height, tamFicha, cellSize);
        juego.iniciarJuego();
    }
}
