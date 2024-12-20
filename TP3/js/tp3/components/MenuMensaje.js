class MenuMensaje extends Dibujable {
    constructor(posX, posY, ctx, message, canvasWidth, canvasHeight) {
        super(posX, posY, ctx);
        this.message = message;
    }


    draw() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'; // Fondo semi-transparente
        this.ctx.fillRect(this.canvasWidth / 2 - 150, this.canvasHeight / 2 - 60, 300, 100); 
        this.ctx.fillStyle = '#FFF';
        this.ctx.font = '30px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(this.mensaje, this.canvasWidth / 2 , this.canvasHeight / 2 ); 
    }
}