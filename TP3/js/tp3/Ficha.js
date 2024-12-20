class Ficha extends Dibujable {
    constructor( posX, posY, radius, fill, context, imgSrc) {
        super(posX, posY, context);

        this.fill = fill;
        this.radius = radius;
        this.img = new Image(); 
        this.img.src = imgSrc;
        this.dragging = false; //Estado para saber si la ficha esta siendo arrastrada
        this.color = fill; // Almacena el color para verificar el ganador
        this.colocada = false;
        this.enAnimacion = false; 
    }


    draw() {
        // Guarda el contexto de dibujo actual
        this.ctx.save();
    
        // Configura el área circular para la ficha
        this.ctx.beginPath();
        this.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        this.ctx.closePath();
        this.ctx.clip();
    
        // Dibuja la imagen ajustada al círculo
        this.ctx.drawImage(this.img, this.posX - this.radius, this.posY - this.radius, this.radius * 2, this.radius * 2);
    
        // Opcional: agregar borde
        this.ctx.beginPath();
        this.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        this.ctx.closePath();
        this.ctx.strokeStyle = this.fill;
        this.ctx.lineWidth = 3;
        this.ctx.stroke();
    
        // Restaura el contexto de dibujo original
        this.ctx.restore();
    }

    getRadius() {
        return this.radius;
    }

    isPointInside(x, y) {
        let _x = this.posX - x;
        let _y = this.posY - y;
        return Math.sqrt(_x * _x + _y * _y) < this.radius;
    }

    setDragging(isDragging) {
        this.dragging = isDragging;
    }

    isDragging() {
        return this.dragging;
    }
}