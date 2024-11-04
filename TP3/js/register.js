"use strict"

document.querySelectorAll('.input-validate').forEach(input => {
    input.addEventListener('input', function() {
        if (input.type === 'text') {
            validateText(input);
        } else if (input.type === 'number') {
            validateAge(input);
        } else if (input.type === 'email') {
            validateEmail(input);
        } else if (input.type === 'password') {
            validatePassword(input);
        }
    });
});


function validateText(input) {
    let isValid = input.value.trim() !== '';
    let text_msg = document.querySelector('.text-msg');

    input.classList.toggle('success', isValid); //borde verde  
    input.classList.toggle('denied', !isValid); //borde rojo

    text_msg.classList.toggle('disabled', isValid);  
    text_msg.classList.toggle('activated', !isValid);
}

function validateAge(input) {
    let isValid = input.value > 6; 
    let age_msg = document.querySelector('.age-msg');

    input.classList.toggle('success', isValid); //borde verde  
    input.classList.toggle('denied', !isValid); //borde rojo

    age_msg.classList.toggle('disabled', isValid);  
    age_msg.classList.toggle('activated', !isValid);
}

function validateEmail(input) {
    let regex = /\S+@\S+\.\S+/; //caracteres esperados para un email
    let isValid = regex.test(input.value);
    let email_msg = document.querySelector('.email-msg');

    input.classList.toggle('success', isValid); //borde verde  
    input.classList.toggle('denied', !isValid); //borde rojo

    email_msg.classList.toggle('disabled', isValid);  
    email_msg.classList.toggle('activated', !isValid);
}

function validatePassword(input) {
    let regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    let isValid = regex.test(input.value);
    let password_msg = document.querySelector('.password-msg');

    input.classList.toggle('success', isValid); //borde verde  
    input.classList.toggle('denied', !isValid); //borde rojo

    password_msg.classList.toggle('disabled', isValid);
    password_msg.classList.toggle('activated', !isValid);
}

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault(); 
    loading(); 
});

function loading() {
    document.querySelector('.spinner').style.display = 'block';
    document.querySelector('.main-content').classList.add('blur'); //difuminar el fondo

    let loadingPercent = document.querySelector('.loading-percent');
    loadingPercent.style.display = 'block';

    let percent = 0;
    let interval = setInterval(() => {
        percent += 1; // Incrementar porcentaje
        loadingPercent.innerHTML = `${percent}%`; // Actualizar el porcentaje en el html

        if (percent === 100) {
            clearInterval(interval); // Detener el intervalo al llegar al 100%
        }
    }, 20);

    setTimeout(() => {
        window.location.href = '../templates/home.html'; 
    }, 2000); // Simulamos 2 segundos de carga
}


window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        // Si la página está cargada desde el caché, no ejecutar el efecto
        document.querySelector('.spinner').style.display = 'none';
        document.querySelector('.main-content').classList.remove('blur');
        document.querySelector('.loading-percent').style.display = 'none';
    }
});
