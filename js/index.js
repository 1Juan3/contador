
let cronometroID;
let segundos = 0;
let minutos = 0;
let tiempoRestante = 0;
let cronometroEnEjecucion = false;
let tiempoSeleccionado = 0;

const cronometroContainer = document.getElementById("cronometro-container");
const cronometro = document.getElementById("cronometro");
const iniciarDetener1Btn = document.getElementById("iniciarDetener1");
const iniciarDetener2Btn = document.getElementById("iniciarDetener2");
const reiniciarBtn = document.getElementById("reiniciar");
const sonido = document.getElementById("sonido");

function actualizarCronometro() {
    if (segundos === 0 && minutos === 0) {
        clearInterval(cronometroID);
        cronometroID = null;
        cronometroEnEjecucion = false;
        resetBotones();
    } else {
        segundos--;
        if (segundos < 0) {
            segundos = 59;
            minutos--;
        }

        const segundosString = segundos < 10 ? `0${segundos}` : `${segundos}`;
        cronometro.innerText = `${minutos}:${segundosString}`;
        // Reproducir el sonido 10 segundos antes de llegar a 0
        if (minutos === 0 && segundos <= 10) {
            sonido.play();
        }
    }

}

function resetBotones() {
    iniciarDetener1Btn.innerText = "Iniciar 1 Minuto";
    iniciarDetener2Btn.innerText = "Iniciar 2 Minutos";
}

iniciarDetener1Btn.addEventListener("click", function () {
    if (!cronometroEnEjecucion) {
        minutos = parseInt(iniciarDetener1Btn.getAttribute("data-minutos")) || 0;
        segundos = 0;
        tiempoSeleccionado = minutos * 60;
        cronometroID = setInterval(actualizarCronometro, 1000);
        cronometroEnEjecucion = true;
        iniciarDetener1Btn.innerText = "Detener";
        iniciarDetener2Btn.disabled = true; // Deshabilita el otro botón mientras se ejecuta uno


    } else {
        clearInterval(cronometroID);
        cronometroID = null;
        tiempoRestante = minutos * 60 + segundos;
        cronometroEnEjecucion = false;
        sonido.pause();
        resetBotones();
        iniciarDetener2Btn.disabled = false; // Habilita el otro botón cuando se detiene uno
    }
});

iniciarDetener2Btn.addEventListener("click", function () {
    if (!cronometroEnEjecucion) {
        minutos = parseInt(iniciarDetener2Btn.getAttribute("data-minutos")) || 0;
        segundos = 0;
        tiempoSeleccionado = minutos * 60;
        cronometroID = setInterval(actualizarCronometro, 1000);
        cronometroEnEjecucion = true;
        iniciarDetener2Btn.innerText = "Detener";
        iniciarDetener1Btn.disabled = true; // Deshabilita el otro botón mientras se ejecuta uno


        const cambiar2 = document.querySelector('.cambiar2');



    } else {
        clearInterval(cronometroID);
        cronometroID = null;
        tiempoRestante = minutos * 60 + segundos;
        cronometroEnEjecucion = false;
        sonido.pause();
        resetBotones();
        iniciarDetener1Btn.disabled = false; // Habilita el otro botón cuando se detiene uno
    }
});

reiniciarBtn.addEventListener("click", function () {
    clearInterval(cronometroID);
    cronometroID = null;
    minutos = Math.floor(tiempoSeleccionado / 60);
    segundos = tiempoSeleccionado % 60;
    const segundosString = segundos < 10 ? `0${segundos}` : `${segundos}`;
    cronometro.innerText = `${minutos}:${segundosString}`;
    cronometroEnEjecucion = false;
    sonido.pause();
    resetBotones();
    iniciarDetener1Btn.disabled = false;
    iniciarDetener2Btn.disabled = false;
});
