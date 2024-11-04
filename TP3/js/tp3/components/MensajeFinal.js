class MensajeFinal extends Dibujable {
    constructor(posX, posY, ctx, canvasWidth, canvasHeight, imagen) {
        super(posX, posY, ctx);
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.imagen = imagen; 
    }

    draw() {
        if (this.imagen) {
            const imgWidth = 300;
            const imgHeight = 150;
            this.ctx.drawImage(this.imagen, this.canvasWidth / 2 - imgWidth / 2, this.canvasHeight / 2 + 40 - imgHeight, imgWidth, imgHeight);
        }
    }
}