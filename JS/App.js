// ==========================================
// CONTADOR
// ==========================================

const fechaEvento = new Date("2026-12-15T18:00:00-05:00").getTime();

function actualizarContador() {

    const ahora = Date.now();

    const diferencia = fechaEvento - ahora;

    // Si ya llegó el día del evento
    if (diferencia <= 0) {
        document.getElementById("dias").textContent = "0";
        document.getElementById("horas").textContent = "0";
        document.getElementById("minutos").textContent = "0";
        document.getElementById("segundos").textContent = "0";
        return;
    }

    const dias = Math.floor(
        diferencia / (1000 * 60 * 60 * 24)
    );

    const horas = Math.floor(
        (diferencia / (1000 * 60 * 60)) % 24
    );

    const minutos = Math.floor(
        (diferencia / (1000 * 60)) % 60
    );

    const segundos = Math.floor(
        (diferencia / 1000) % 60
    );

    document.getElementById("dias").textContent = dias;
    document.getElementById("horas").textContent = horas;
    document.getElementById("minutos").textContent = minutos;
    document.getElementById("segundos").textContent = segundos;
}

// Ejecutar inmediatamente
actualizarContador();

// Actualizar cada segundo
setInterval(actualizarContador, 1000);


// ==========================================
// GALERÍA DE FOTOS
// ==========================================

function abrirFoto(foto) {

    const visor = document.getElementById("visorFoto");
    const fotoGrande = document.getElementById("fotoGrande");

    fotoGrande.src = foto.src;

    visor.style.display = "flex";
}


function cerrarFoto() {

    const visor = document.getElementById("visorFoto");

    visor.style.display = "none";
}


// ==========================================
// MÚSICA
// ==========================================

const musica = document.getElementById("musica");
const botonMusica = document.getElementById("botonMusica");

function controlarMusica() {

    if (musica.paused) {

        musica.play();

        botonMusica.textContent = "⏸️ Pausar música";

    } else {

        musica.pause();

        botonMusica.textContent = "▶️ Escuchar música";
    }
}