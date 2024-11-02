
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
        this.ctx.fillStyle = '#86B700';
        this.ctx.fillRect(this.posX, this.posY, 150 , 50 );
        this.ctx.fillStyle = '#fff'; // Color del texto
        this.ctx.font = '20px Arial';
        this.ctx.textAlign = 'center';  
        this.ctx.fillText(`Tiempo: ${this.tiempoRestante}`, this.posX + 72, this.posY + 33);
    }

    reiniciar() {
        clearInterval(this.intervalo);
        this.tiempoRestante = this.tiempoMaximo;
        this.iniciar();
    }
}