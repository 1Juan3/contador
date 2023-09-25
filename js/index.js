let cronometroID;
let segundos = 0;
let minutos = 0;
let minutosIniciales = 0;
let segundosIniciales = 0;
let tiempoRestante = 0; // Variable para guardar el tiempo restante
let cronometroEnEjecucion = false; // Para controlar si el cronómetro está en ejecución

const cronometroContainer = document.getElementById("cronometro-container");
const cronometro = document.getElementById("cronometro");
const minutosInput = document.getElementById("minutos");
const segundosInput = document.getElementById("segundos");
const iniciarDetenerBtn = document.getElementById("iniciarDetener");
const reiniciarBtn = document.getElementById("reiniciar");
const sonido = document.getElementById("sonido");

function actualizarCronometro() {
    if (segundos === 0 && minutos === 0) {
        clearInterval(cronometroID);
        cronometroID = null;
        iniciarDetenerBtn.innerText = "Iniciar";
        cronometroEnEjecucion = false;
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

iniciarDetenerBtn.addEventListener("click", function () {
    if (!cronometroEnEjecucion) {
        if (tiempoRestante === 0) { // Si es la primera vez, obtén los valores iniciales
            minutos = parseInt(minutosInput.value) || 0;
            segundos = parseInt(segundosInput.value) || 0;
            minutosIniciales = minutos;
            segundosIniciales = segundos;
        } else {
            minutos = Math.floor(tiempoRestante / 60);
            segundos = tiempoRestante % 60;
        }

        cronometroID = setInterval(actualizarCronometro, 1000);
        iniciarDetenerBtn.innerText = "Detener";
        cronometroEnEjecucion = true;

    } else {
        clearInterval(cronometroID);
        cronometroID = null;
        iniciarDetenerBtn.innerText = "Iniciar";
        tiempoRestante = minutos * 60 + segundos; // Guarda el tiempo restante al detener
        cronometroEnEjecucion = false;
        sonido.pause();
    }
});

reiniciarBtn.addEventListener("click", function () {
    clearInterval(cronometroID);
    cronometroID = null;
    minutos = minutosIniciales;
    segundos = segundosIniciales;
    cronometro.innerText = `${minutos}:${segundos < 10 ? `0${segundos}` : segundos}`;
    minutosInput.value = minutosIniciales;
    segundosInput.value = segundosIniciales;
    iniciarDetenerBtn.innerText = "Iniciar";
    tiempoRestante = 0; // Restaurar el tiempo restante
    cronometroEnEjecucion = false;
});