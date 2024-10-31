class Regla {
    constructor() {
        this.gameRules = [
            { texto: "4 en línea", columnas: 7, filas: 6 , cellSize: 80, tamFicha: 30},
            { texto: "5 en línea", columnas: 8, filas: 7, cellSize: 70 , tamFicha: 25},
            { texto: "6 en línea", columnas: 9, filas: 8 , cellSize: 60 , tamFicha: 20},
            { texto: "7 en línea", columnas: 10, filas: 9 , cellSize: 60 , tamFicha: 20}
        ];
        this.skins = [
                    this.createImage("img/ficha-messi-animada1.jpg"),
                    this.createImage("img/ficha-dimaria-animada2.jpg"),
                    this.createImage("img/ficha-maradona-animada.jpg"),
                    this.createImage("img/ficha-mbappe-animada.jpg"),
                    this.createImage("img/ficha-griezmann-animada.jpg"),
                    this.createImage("img/ficha-zidane-animada2.jpg")
                ]
    }

    createImage(src) {
        const img = new Image();
        img.src = src;
        return img;
    }
}