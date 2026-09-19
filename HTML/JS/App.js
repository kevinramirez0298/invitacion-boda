const fechaEvento = new Date("2026-12-15T18:00:00").getTime();

function actualizarContador() {

    const ahora = new Date().getTime();

    const diferencia = fechaEvento - ahora;

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

actualizarContador();

setInterval(actualizarContador, 1000);

// ABRIR FOTO

function abrirFoto(foto) {

    const visor = document.getElementById("visorFoto");
    const fotoGrande = document.getElementById("fotoGrande");

    fotoGrande.src = foto.src;

    visor.style.display = "flex";
}


// CERRAR FOTO

function cerrarFoto() {

    const visor = document.getElementById("visorFoto");

    visor.style.display = "none";
}

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