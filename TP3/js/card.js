'use strict'
const favoriteStar = document.querySelectorAll('.favoriteStar').forEach(span => {
    span.addEventListener('click', ()=> {
        span.classList.toggle('mdi--star');
        span.classList.toggle('mdi--star-outline');
    });
});

const buttonAddToCart = document.querySelectorAll('.add-to-cart-button').forEach(button => {
    button.addEventListener('click', ()=> {
        button.classList.toggle('remove-to-cart-button');
        if (button.innerHTML === 'Agregar al carrito') {
            button.innerHTML = 'Eliminar del carrito';
        } else {
            button.innerHTML = 'Agregar al carrito';
        }
    });
});

const imageUrls = [
    //Continuar Jugando
    '../assets/img/card-img/estrategia/Portadacuatroenlinea.png', '../assets/img/card-img/deportes/rocketleague.jpg' , '../assets/img/card-img/accion/Counterstrike.jpg', '../assets/img/card-img/estrategia/minecraft2.webp' ,'../assets/img/card-img/deportes/golf.jpg',
    '../assets/img/card-img/accion/gtasa.jpg', '../assets/img/card-img/accion/Fornite.webp', '../assets/img/card-img/accion/starwarsepisodie3.jpg' ,'../assets/img/card-img/accion/warzone.jpg' ,'../assets/img/card-img/accion/Valorant.webp',
    '../assets/img/card-img/superheroes/Legobatman.jpg', '../assets/img/card-img/superheroes/spidermann.webp', '../assets/img/card-img/deportes/FM2024.jpg', '../assets/img/card-img/deportes/f124.jpg', '../assets/img/card-img/deportes/w2k24e.webp',
    '../assets/img/card-img/estrategia/age.jpg', '../assets/img/card-img/estrategia/lol.webp', '../assets/img/card-img/estrategia/Risk.jpg', '../assets/img/card-img/estrategia/amongus.jpg',
    //Accion
    '../assets/img/card-img/accion/gtasa.jpg', "../assets/img/card-img/accion/warzone.jpg", "../assets/img/card-img/accion/pubg.jpg", "../assets/img/card-img/accion/Mortalkombat.jpg", "../assets/img/card-img/accion/Rustt.jpg", "../assets/img/card-img/accion/batman.jpg",
    "../assets/img/card-img/accion/Assasinscreed.jpg", "../assets/img/card-img/accion/liberty.jpg", "../assets/img/card-img/accion/gta5.webp", "../assets/img/card-img/accion/reddead.jpg", "../assets/img/card-img/accion/Thelastofus.jpg", "../assets/img/card-img/accion/Valorant.webp"
    ,"../assets/img/card-img/accion/starwarsepisodie3.jpg", "../assets/img/card-img/accion/diablo4.jpg", "../assets/img/card-img/accion/destiny2.jpg", "../assets/img/card-img/accion/dragonball.jpg", "../assets/img/card-img/accion/wukong.webp", "../assets/img/card-img/accion/dragonballtenkaichi3.jpg", "../assets/img/card-img/accion/apexlegends.jpg",
    //Deportes
    "../assets/img/card-img/deportes/FM2024.jpg", "../assets/img/card-img/deportes/nfsmw.webp", "../assets/img/card-img/deportes/undisputed.jpg", "../assets/img/card-img/deportes/dirtrally.png", "../assets/img/card-img/deportes/efootball.jpg", "../assets/img/card-img/deportes/golf.jpg",
    "../assets/img/card-img/deportes/fifa25.webp", "../assets/img/card-img/deportes/fishingplanet.jpg", "../assets/img/card-img/deportes/forzahorizonoa.jpg", "../assets/img/card-img/deportes/rocketleague.jpg", "../assets/img/card-img/deportes/descenders.jpg", "../assets/img/card-img/deportes/assettocorsa.webp"
    ,"../assets/img/card-img/deportes/Nba2k25.jpg", "../assets/img/card-img/deportes/supercampeones.jpg", "../assets/img/card-img/deportes/f124.jpg", "../assets/img/card-img/deportes/w2k24e.webp", "../assets/img/card-img/deportes/wiisports.jpg", "../assets/img/card-img/deportes/topspin.jpg","../assets/img/card-img/deportes/godofpes.jpg",
    //Estrategia
    "../assets/img/card-img/estrategia/age.jpg", "../assets/img/card-img/estrategia/dota2.jpg", "../assets/img/card-img/estrategia/Portadacuatroenlinea.png","../assets/img/card-img/estrategia/amongus.jpg", "../assets/img/card-img/estrategia/lol.webp", "../assets/img/card-img/estrategia/Risk.jpg", "../assets/img/card-img/estrategia/geometry.webp",
    "../assets/img/card-img/estrategia/Ageofmet.jpg", "../assets/img/card-img/estrategia/portal1.jpg", "../assets/img/card-img/estrategia/portal2.jpg", "../assets/img/card-img/estrategia/planetzoo.jpg", "../assets/img/card-img/estrategia/pvz.jpg", "../assets/img/card-img/estrategia/crusaderkings.jpg"
    ,"../assets/img/card-img/estrategia/stellaris.jpg", "../assets/img/card-img/estrategia/citiesskylines.jpg", "../assets/img/card-img/estrategia/minecraft2.webp", "../assets/img/card-img/estrategia/poly.jpg", "../assets/img/card-img/estrategia/MOD.jpg","../assets/img/card-img/estrategia/yugioh.webp"

    //Superheroes
    //Estrategia
    ,"../assets/img/card-img/superheroes/marvelvscapcom.webp", "../assets/img/card-img/superheroes/Injustice.jpg", "../assets/img/card-img/superheroes/Guardianesdelagalaxia.webp","../assets/img/card-img/superheroes/dragonball.jpg", "../assets/img/card-img/superheroes/legobatman.jpg", "../assets/img/card-img/superheroes/marvelsnap.jpg", "../assets/img/card-img/superheroes/dragonballtenkaichi3.jpg",
    "../assets/img/card-img/superheroes/spidermann.webp", "../assets/img/card-img/superheroes/milesmorales.png", "../assets/img/card-img/superheroes/marvelpuzzle.jpg", "../assets/img/card-img/superheroes/legoadvengers.jpg", "../assets/img/card-img/superheroes/gothamknights.jpg", "../assets/img/card-img/superheroes/batman.jpg"
    ,"../assets/img/card-img/superheroes/dragonballkakarot.jpg", "../assets/img/card-img/superheroes/naruto.jpg", "../assets/img/card-img/superheroes/lego-batman.webp", "../assets/img/card-img/superheroes/legosuperheroes.jpg", "../assets/img/card-img/superheroes/marvelmidnight.png","../assets/img/card-img/superheroes/The-Amazing-Spiderman.jpg"
];


const cards = document.querySelectorAll('.card');

// Iterar sobre cada tarjeta y asignarles una imagen
cards.forEach((card, index) => {
    if (index < imageUrls.length) {
        card.style.backgroundImage = `url(${imageUrls[index]})`;
    }
});



//simulamos la carga desde el home al juego
const games = document.querySelectorAll('#game');
games.forEach(game=>game.addEventListener('click', ()=> {
    document.querySelector('.spinner').style.display = 'block';
    document.querySelector('.main-content').classList.add('blur'); 
    document.querySelector('header').classList.add('blur');   //difuminar el header
    document.querySelector('.menu').classList.add('blur'); //difuminar le menu principal
    document.querySelector('.user-menu').classList.add('blur'); //difuminar el menu de usuario
    document.querySelector('footer').classList.add('blur'); //difuminar el footer

    let loadingPercent = document.querySelector('.loading-percent');
    loadingPercent.style.display = 'block';

    let percent = 0;
    let interval = setInterval(() => {
        percent += 1; 
        loadingPercent.innerHTML = `${percent}%`; 

        if (percent === 100) {
            clearInterval(interval); 
        }
    }, 20);

    setTimeout(() => {
        window.location.href = 'game.html'; 
    }, 2000); // Simulamos 2 segundos de carga
}));

