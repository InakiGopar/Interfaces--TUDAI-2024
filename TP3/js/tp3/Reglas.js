class Regla {
    constructor() {
        this.gameRules = [
            { texto: "4 en línea", columnas: 7, filas: 6 , cellSize: 80, tamFicha: 30, fichasToWin: 4, fichasTotales: 42},
            { texto: "5 en línea", columnas: 8, filas: 7, cellSize: 70 , tamFicha: 25, fichasToWin: 5, fichasTotales: 56},
            { texto: "6 en línea", columnas: 9, filas: 8 , cellSize: 60 , tamFicha: 20, fichasToWin: 6, fichasTotales: 72},
            { texto: "7 en línea", columnas: 10, filas: 8 , cellSize: 60 , tamFicha: 20, fichasToWin: 7, fichasTotales: 80}
        ];
        this.skins = [
            this.createImage("../assets/img/game/messi-animado.jpg"),
            this.createImage("../assets/img/game/lautaro-animado.jpg"),
            this.createImage("../assets/img/game/dimaria-animado.jpg"),
            this.createImage("../assets/img/game/zidane-animado.jpg"),
            this.createImage("../assets/img/game/lloris-animado.jpg"),
            this.createImage("../assets/img/game/pogba-animado.jpg")
        ]
    }

    createImage(src) {
        const img = new Image();
        img.src = src;
        return img;
    }
}