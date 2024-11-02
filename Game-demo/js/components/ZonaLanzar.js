class ZonaLanzar {
    constructor(posX, posY, context, tablero, width, height) {
        this.posX = posX;
        this.posY = posY;
        this.width = width; 
        this.height = height; 
        this.context = context;
        this.tablero = tablero;
       
    }

    isFichaEnZona(ficha) {
        const fichaPosX = ficha.getPosX();
        const fichaPosY = ficha.getPosY();
        return (
            fichaPosX > this.posX &&
            fichaPosX < this.posX + this.width &&
            fichaPosY > this.posY &&
            fichaPosY < this.posY + this.height
        );
    }

  
}