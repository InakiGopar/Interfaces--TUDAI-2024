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
        this.player1Nickname = "";
        this.player2Nickname = "";
        this.player1Skin = null;
        this.player2Skin = null;
        this.skinRadius = 25;
        this.skinPositionYTop = 70;
        this.skinPositionYBotton = 140;
        this.skinPositionX = 200;
        this.skinSpacing =  this.skinRadius * 3 //Espacio entre los distintos skins
        this.currentPlayer = 1;
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

        this.drawSkins();
    }

    drawSkins() {   

        this.reglas.skins.forEach((skin, index) => {
            const x = this.skinPositionX + (index % 3) * this.skinSpacing;
            const y = index < 3 ? this.skinPositionYTop : this.skinPositionYBotton;

            skin.onload = () => {
                this.ctx.save();
                this.ctx.beginPath();
                this.ctx.arc(x + this.skinRadius, y + this.skinRadius, this.skinRadius, 0, Math.PI * 2);
                this.ctx.closePath();
                this.ctx.clip();
                this.ctx.drawImage(skin, x, y, this.skinRadius * 2, this.skinRadius * 2);
                this.ctx.restore();
            };
        });

        // Agrega un solo listener para seleccionar las skins
        this.canvas.addEventListener("click", this.seleccionarSkin.bind(this));
    }


    seleccionarSkin(event) {
        const rect = this.canvas.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;

    
        this.reglas.skins.forEach((skin, index) => {
            const x = this.skinPositionX + (index % 3) * this.skinSpacing;
            const y = index < 3 ? this.skinPositionYTop : this.skinPositionYBotton;
    
            if (
                clickX > x &&
                clickX < x + this.skinRadius * 2 &&
                clickY > y &&
                clickY < y + this.skinRadius * 2
            ) {
                // Asigna la skin al jugador actual
                if (this.currentPlayer === 1) {
                    this.player1Skin = skin;
                    const nickname = prompt("Ingrese el nickname para el Jugador 1");
                    this.player1Nickname = nickname;
                } else {
                    this.player2Skin = skin;
                    const nickname = prompt("Ingrese el nickname para el Jugador 2");
                    this.player2Nickname = nickname;
                }
    
                // Alterna al siguiente jugador después de asignar
                this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
            }
        });
    }

    startGame(canvas, context, columns, rows, cellSize, tamFicha) {
        //elimino los botones cuando el juego se inicia
        this.btnAlto = 0;
        this.btnAncho = 0;
        console.log("skin1 " + this.player1Skin);
        console.log("skin2 " + this.playerSkin);
        
        const tablero = new Tablero(0, 0, context, columns, rows, cellSize, canvas);
        const juego = new Juego(
                canvas,
                tablero,
                context, 
                canvas.width,
                canvas.height,
                tamFicha,
                cellSize,
                this.player1Skin,
                this.player2Skin,
                this.player1Nickname,
                this.player2Nickname
            );
        juego.iniciarJuego();
    }
}
