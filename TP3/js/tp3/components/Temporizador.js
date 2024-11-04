class Temporizador extends Dibujable {
    constructor(posX, posY, ctx, tiempoMaximo) {
        super(posX, posY, ctx);
        this.tiempoMaximo = tiempoMaximo; // Tiempo máximo en segundos
        this.tiempoRestante = tiempoMaximo; // Inicializar el tiempo restante
        this.intervalo = null; // Almacenar la referencia del intervalo
    }

    iniciar() {
        if (this.intervalo) {
            clearInterval(this.intervalo);
        }

        this.intervalo = setInterval(() => {
            this.tiempoRestante--;
            if (this.tiempoRestante <= 0) {
                this.tiempoRestante = 0;
                clearInterval(this.intervalo);
            }
        }, 1000); 
        
    }

    draw() {
        // Calcular minutos y segundos
        const minutos = Math.floor(this.tiempoRestante / 60);
        const segundos = this.tiempoRestante % 60;
        
        // Formatear el tiempo con ceros a la izquierda si es necesario
        const tiempoFormateado = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
        
        // Dibujar el fondo
        this.ctx.fillStyle = '#86B700';
        this.ctx.fillRect(this.posX, this.posY, 150, 50);
        
        // Dibujar el texto
        this.ctx.fillStyle = '#fff';
        this.ctx.font = "20px 'Press Start 2P'";
        this.ctx.textAlign = 'center';
        this.ctx.fillText(tiempoFormateado, this.posX + 76, this.posY + 36);
    }

    reiniciar() {
        clearInterval(this.intervalo);
        this.tiempoRestante = this.tiempoMaximo;
        this.iniciar();
    }
}