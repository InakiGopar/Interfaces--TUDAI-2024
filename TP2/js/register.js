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
    let regex = /\S+@\S+\.\S+/;
    let isValid = regex.test(input.value);
    let email_msg = document.querySelector('.email-msg');

    input.classList.toggle('success', isValid); //borde verde  
    input.classList.toggle('denied', !isValid); //borde rojo

    email_msg.classList.toggle('disabled', isValid);  
    email_msg.classList.toggle('activated', !isValid);

}


