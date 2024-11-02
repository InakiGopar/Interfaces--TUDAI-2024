
class BotonVolverMenu extends Dibujable {
    constructor(posX, posY, ctx, width, height, label) {
        super(posX, posY, ctx);
        this.width = width;
        this.height = height;
        this.label = label;
        this.isHovered = false; // Para detectar si el mouse está sobre el botón

    }

    draw() {
        // Cambiar el color del botón si está siendo hovered
        this.ctx.fillStyle = this.isHovered ? '#4CD406' : '#86B700';
        this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
        this.ctx.fillStyle = '#fff';
        this.ctx.font = '20px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(this.label, this.posX + this.width / 2, this.posY + this.height / 1.5);
    }

    isPointInside(x, y) {
        return x >= this.posX && x <= this.posX + this.width && y >= this.posY && y <= this.posY + this.height;
    }

    setHovered(isHovered) {
        this.isHovered = isHovered;
    }
}
