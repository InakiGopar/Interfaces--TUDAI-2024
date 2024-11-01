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
        this.skinPositionY = 200;
        this.skinSpacing =  this.skinRadius * 3 //Espacio entre los distintos skins
        this.selectedSkinIndex = null; // Índice de la skin seleccionada
        this.logo = new Image();
        this.logo.src = "img/logo-linea-de4.png"; // Asigna la fuente de la imagen del logo
        this.banderaArg = new Image();
        this.banderaArg.src = "img/bandera-argentina.jpg";
        this.banderaFrancia = new Image();
        this.banderaFrancia.src = "img/bandera-francia.jpg";

       this.blinkVisible = true; // Controla la visibilidad del texto titilante
        this.blinkInterval = setInterval(() => {
            this.blinkVisible = !this.blinkVisible; // Cambia la visibilidad cada intervalo
            this.draw(); // Redibuja para actualizar el texto titilante
        }, 500); // Intervalo en milisegundos (500 ms para titilar cada medio segundo)
    }
    

    draw() {

        // Dibujar el logo en la parte superior del canvas
        const logoX = (this.canvas.width) / 2 -100; // Ajusta el tamaño según sea necesario
        const logoY = -30; // Posición Y del logo
        this.ctx.drawImage(this.logo, logoX, logoY, 200, 200); // Dibuja el logo (ajusta el tamaño)

        // const argX = (this.canvas.width) / 2 -200; // Ajusta el tamaño según sea necesario
        // const argY = 80; // Posición Y del logo
        // this.ctx.drawImage(this.banderaArg, argX, argY, 70, 50); // Dibuja el logo (ajusta el tamaño)

        // const fraX = (this.canvas.width) / 2 + 200; // Ajusta el tamaño según sea necesario
        // const fraY = 80; // Posición Y del logo
        // this.ctx.drawImage(this.banderaFrancia, fraX, fraY, 70, 50); // Dibuja el logo (ajusta el tamaño)

        
        this.ctx.font = "20px Arial";
      
        this.ctx.textAlign = "center";

        // Posición para los nombres y las banderas debajo del logo
        const countryY = logoY + 200; // Espacio debajo del logo

        // Dibujar "Argentina" y su bandera
        const argX = (this.canvas.width) / 2 -400;
        this.ctx.fillStyle = "#FFF"; // Color del texto
        this.ctx.fillText("Argentina", argX, countryY); // Dibuja el nombre

        // Dibuja la bandera de Argentina
        const banderaArgX = argX +50; // Ajusta la posición de la bandera
        this.ctx.drawImage(this.banderaArg, banderaArgX, countryY - 30, 60, 40); // Ajusta el tamaño de la bandera

        // Dibujar "Francia" y su bandera
        const fraX = (this.canvas.width) / 2 + 200;
        this.ctx.fillText("Francia", fraX, countryY); // Dibuja el nombre

        // Dibuja la bandera de Francia
        const banderaFraX = fraX  +40; // Ajusta la posición de la bandera
        this.ctx.drawImage(this.banderaFrancia, banderaFraX, countryY - 30, 60, 40); // Ajusta el tamaño de la bandera

        if (this.blinkVisible) {
            this.ctx.fillStyle = "#FFD700"; // Color dorado para resaltar el mensaje
            this.ctx.font = "bold 20px Arial"; // Fuente para el mensaje
            this.ctx.fillText("Selecciona tu jugador", this.canvas.width / 2, countryY + 60);
        }

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

                if (clickX > x && clickX < x + this.btnAncho && clickY > y && clickY < y + this.btnAlto && this.player1Skin && this.player2Skin) {
                    this.startGame(this.canvas, this.ctx, opcion.columnas, opcion.filas, opcion.cellSize, opcion.tamFicha);
                }
            });
        });

        this.drawSkins();
    }

    drawSkins(){   

        this.reglas.skins.forEach((skin, index) => {
            const y = this.skinPositionY ;  
            const x = index < 3 ? this.skinPositionXLeft + (index % 3) * this.skinSpacing : this.skinPositionXRight + (index % 3) * this.skinSpacing;

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
                this.ctx.lineWidth = 3;
                this.ctx.beginPath();
                this.ctx.arc(x + this.skinRadius, y + this.skinRadius, this.skinRadius + 4, 0, Math.PI * 2);
                this.ctx.stroke();
    
                // Asignar el skin al jugador actual y pedir el nickname
                if (index < 3) {
                    this.player1Skin = skin;
                }
                if ( index >= 3) {
                    this.player2Skin = skin;
                }
    
                this.selectedSkinIndex = index; // Actualizar el índice del skin seleccionado
    
                this.draw(); // Redibujar para reflejar los cambios
            }
        });
    }


    chooseNickname() {
        this.player1Nickname = prompt("Ingrese el nickname para el Jugador 1");
        this.player2Nickname = prompt("Ingrese el nickname para el Jugador 2");
    }

    startGame(canvas, context, columns, rows, cellSize, tamFicha) {
        clearInterval(this.blinkInterval); // Detener el parpadeo cuando comience el juego

        this.btnAlto = 0;
        this.btnAncho = 0;
        this.skinRadius = 0;
        
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
