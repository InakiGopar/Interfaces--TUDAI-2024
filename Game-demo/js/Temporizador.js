

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
                console.log(this.tiempoRestante);
                if (this.tiempoRestante <= 0) {
                    this.tiempoRestante = 0;
                    clearInterval(this.intervalo);
                    // Aquí podrías manejar el fin del tiempo, por ejemplo, terminar el juego
                }
            }, 1000); // Cada segundo
            
        }
    
        draw() {
            this.ctx.fillStyle = '#000';
            this.ctx.fillRect(this.posX, this.posY, 150,50 );
            this.ctx.fillStyle = '#fff'; // Color del texto
            this.ctx.font = '20px Arial';
            this.ctx.textAlign = 'center';  
            this.ctx.fillText(`Tiempo: ${this.tiempoRestante}`, this.posX + 72, this.posY + 35);
        }
    
        reiniciar() {
            clearInterval(this.intervalo);
            this.tiempoRestante = this.tiempoMaximo;
            this.iniciar();
        }
    }