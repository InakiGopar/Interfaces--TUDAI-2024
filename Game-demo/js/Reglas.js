class Regla {
    constructor() {
        this.gameRules = [
            { texto: "4 en línea", columnas: 7, filas: 6 , cellSize: 80, tamFicha: 30, fichasToWin: 4},
            { texto: "5 en línea", columnas: 8, filas: 7, cellSize: 70 , tamFicha: 25, fichasToWin: 5},
            { texto: "6 en línea", columnas: 9, filas: 8 , cellSize: 60 , tamFicha: 20, fichasToWin: 6},
            { texto: "7 en línea", columnas: 10, filas: 9 , cellSize: 60 , tamFicha: 20, fichasToWin: 7}
        ];
        this.skins = [
            this.createImage("img/messi-animado.jpg"),
            this.createImage("img/lautaro-animado.jpg"),
            this.createImage("img/dimaria-animado.jpg"),
            this.createImage("img/zidane-animado.jpg"),
            this.createImage("img/lloris-animado.jpg"),
            this.createImage("img/pogba-animado.jpg")
        ]
    }

    createImage(src) {
        const img = new Image();
        img.src = src;
        return img;
    }
}