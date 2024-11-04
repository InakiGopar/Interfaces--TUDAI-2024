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
        this.skinPositionXRight = canvas.width / 2 + 200;
        this.skinPositionXLeft = canvas.width / 2 - 400;
        this.skinPositionY = 280;
        this.skinSpacing =  this.skinRadius * 3 //Espacio entre los distintos skins
        this.selectedSkinIndex = null;
        //variable para las imagenes
        this.logo = new Image();
        this.logo.src = "../assets/img/game/linea-de-cuatro-logo.png"; 
        this.logoX = (this.canvas.width) / 2 -123;
        this.logoY = -45;
        this.argentinaTitle = new Image();
        this.argentinaTitle.src = "../assets/img/game/argentina-title.png";
        this.franciaTitle = new Image();
        this.franciaTitle.src = "../assets/img/game/francia-title.png";
        this.countryTitlesY = this.logoY + 100; // Posición para los countryTitulos en y
        this.argentinaTitleX = (this.canvas.width) / 2 - 470;
        this.franciaTitleX = (this.canvas.width) / 2 + 120;
    }

    async loadResources() {
        // Cargar imágenes principales y skins
        await Promise.all([
            this.loadImage(this.logo),
            this.loadImage(this.argentinaTitle),
            this.loadImage(this.franciaTitle),
            this.loadSkins()
        ]);

        // Cargar la fuente de manera asincrónica si no está ya disponible
        await document.fonts.load("13px 'Press Start 2P'");
    }

    loadImage(image) {
        return new Promise((resolve, reject) => {
            image.onload = resolve;
            image.onerror = reject;
        });
    }

    async loadSkins() {
        const skinsPromises = this.reglas.skins.map(skin => this.loadImage(skin));
        await Promise.all(skinsPromises);
    }


    draw() {
        this.ctx.font = this.btnFuente;
        this.ctx.textAlign = "center";

        // Logo 
        this.ctx.drawImage(this.logo, this.logoX, this.logoY, 250, 250); 

        // Bandera de Argentina
        this.ctx.drawImage(this.argentinaTitle, this.argentinaTitleX, this.countryTitlesY , 350, 250); 

        // Bandera de Francia
        this.ctx.drawImage(this.franciaTitle, this.franciaTitleX, this.countryTitlesY , 350, 250); 
    
        // Mostrar mensaje central
        this.ctx.fillStyle = "#FFF";
        this.ctx.font = "15px 'Press Start 2P'"; // Fuente para el mensaje
        this.ctx.fillText("Selecciona tu estadio", this.canvas.width / 2, 550);
        this.ctx.strokeStyle = "#000000"; // Color negro para el borde
        this.ctx.lineWidth = 1; // Ancho del borde
        this.ctx.strokeText("Selecciona tu estadio", this.canvas.width / 2, 550);


        // Mostrar mensaje seleccionar jugador arg
        this.ctx.fillStyle = "#FFF";
        this.ctx.font = "14px 'Press Start 2P'"; // Fuente para el mensaje
        this.ctx.fillText("Selecciona tu jugador", 210, 250);
        this.ctx.strokeStyle = "#000000"; // Color negro para el borde
        this.ctx.lineWidth = 1; // Ancho del borde
        this.ctx.strokeText("Selecciona tu jugador", 210, 250);

        // Mostrar mensaje seleccionar jugador francia
        this.ctx.fillStyle = "#FFF";
        this.ctx.font = "14px 'Press Start 2P'"; // Fuente para el mensaje
        this.ctx.fillText("Selecciona tu jugador", 810, 250);
        this.ctx.strokeStyle = "#000000"; // Color negro para el borde
        this.ctx.lineWidth = 1; // Ancho del borde
        this.ctx.strokeText("Selecciona tu jugador", 810, 250);

        // Dibujar botones y skins
        this.drawButtons();
        this.drawSkins();
    }

    drawButtons() {
        this.reglas.gameRules.forEach((opcion, index) => {
            const x = (this.canvas.width - this.btnAncho) / 2;
            const y = this.posY + index * (this.btnAlto + this.marginVertical) + 50;

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

                if (clickX > x && clickX < x + this.btnAncho && clickY > y && clickY < y + this.btnAlto && this.player1Skin && this.player2Skin) {
                    this.startGame(this.canvas, this.ctx, opcion.columnas, opcion.filas, opcion.cellSize, opcion.tamFicha, opcion.fichasToWin);
                }
            });
        });
    }

    drawSkins(){   
        this.reglas.skins.forEach((skin, index) => {
            const x = index < 3 ? this.skinPositionXLeft + (index % 3) * this.skinSpacing : this.skinPositionXRight + (index % 3) * this.skinSpacing;
            const y = this.skinPositionY;
            
            // Dibuja el skin
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.arc(x + this.skinRadius, y + this.skinRadius, this.skinRadius, 0, Math.PI * 2);
            this.ctx.closePath();
            this.ctx.clip();
            this.ctx.drawImage(skin, x, y, this.skinRadius * 2, this.skinRadius * 2);
            this.ctx.restore();
        });
        // Agrega un solo listener para seleccionar las skins
        this.canvas.addEventListener("click", this.seleccionarSkin.bind(this));
    }


    seleccionarSkin(event) {
        const rect = this.canvas.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;
    
        this.reglas.skins.forEach((skin, index) => {
            const y = this.skinPositionY ;  
            const x = index < 3 ? this.skinPositionXLeft + (index % 3) * this.skinSpacing : this.skinPositionXRight + (index % 3) * this.skinSpacing;

            if (
                clickX > x &&
                clickX < x + this.skinRadius * 2 &&
                clickY > y &&
                clickY < y + this.skinRadius * 2
            ) {
    
                // Marcar el borde del skin seleccionado
                this.ctx.strokeStyle = "yellow";
                this.ctx.lineWidth = 2;
                this.ctx.beginPath();
                this.ctx.arc(x + this.skinRadius, y + this.skinRadius, this.skinRadius + 4, 0, Math.PI * 2);
                this.ctx.stroke();
    
                // Asignar el skin al jugador actual 
                if (index < 3) {
                    this.player1Skin = skin;
                }
                if ( index >= 3) {
                    this.player2Skin = skin;
                }
                
                this.selectedSkinIndex = index; 
            }
        });
    }


    chooseNickname() {
        this.player1Nickname = prompt("Ingrese el nickname para el Jugador 1");
        this.player2Nickname = prompt("Ingrese el nickname para el Jugador 2");
    }

    startGame(canvas, context, columns, rows, cellSize, tamFicha, fichasToWin) {
        this.btnAlto = 0;
        this.btnAncho = 0;
        this.skinRadius = 0;

        const tablero = new Tablero(0, 0, context, columns, rows, cellSize, canvas);
        const juego = new Juego(
                canvas,
                tablero,
                fichasToWin,
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
