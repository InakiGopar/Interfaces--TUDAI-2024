class Dibujable {
    constructor( posX, posY, context) {
        this.posX = posX;
        this.posY = posY;
        this.ctx = context;
    }

    setPosition(x, y) {
        this.posX = x;
        this.posY = y;
    }


    getPosition() {
        return {
            x: this.posX,
            y: this.posY
        };
    }

    setPosition(x, y) {
        this.posX = x;
        this.posY = y;
    }

    getPosX() {
        return this.posX;
    }

    getPosY() {
        return this.posY
    }


    draw() {}

}