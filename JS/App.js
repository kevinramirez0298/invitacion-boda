// ==========================================
// DATOS DE LA INVITACIÓN
// ==========================================

const datosGuardados = localStorage.getItem("datosBoda");

const datosBoda = datosGuardados
    ? JSON.parse(datosGuardados)
    : {
        // NOVIOS
        novio: "Nombre del Novio",
        novia: "Nombre de la Novia",

        // PADRES
        padreNovio: "Nombre del padre del novio",
        madreNovio: "Nombre de la madre del novio",

        padreNovia: "Nombre del padre de la novia",
        madreNovia: "Nombre de la madre de la novia",

        // FECHA Y HORAS
        fecha: "2026-12-15",
        horaCeremonia: "18:00",
        horaCelebracion: "19:30",

        // CEREMONIA
        capilla: "Nombre de la capilla",
        direccionCeremonia: "Dirección de la capilla",

        // CELEBRACIÓN
        lugarCelebracion: "Nombre del lugar",
        direccionCelebracion: "Dirección del lugar",

        // UBICACIÓN
        ciudad: "Cali, Colombia"
    };


// ==========================================
// CONTADOR
// ==========================================

const fechaEvento = new Date(
    datosBoda.fecha +
    "T" +
    datosBoda.horaCeremonia +
    ":00-05:00"
).getTime();


function actualizarContador() {

    const ahora = Date.now();

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


// ==========================================
// GALERÍA DE FOTOS
// ==========================================

function abrirFoto(foto) {

    const visor =
        document.getElementById("visorFoto");

    const fotoGrande =
        document.getElementById("fotoGrande");


    fotoGrande.src = foto.src;

    visor.style.display = "flex";
}


function cerrarFoto() {

    const visor =
        document.getElementById("visorFoto");

    visor.style.display = "none";
}


// ==========================================
// MÚSICA
// ==========================================

const musica =
    document.getElementById("musica");

const botonMusica =
    document.getElementById("botonMusica");


function controlarMusica() {

    if (musica.paused) {

        musica.play();

        botonMusica.textContent =
            "⏸️ Pausar música";

    } else {

        musica.pause();

        botonMusica.textContent =
            "▶️ Escuchar música";
    }
}


// ==========================================
// MOSTRAR NOMBRES
// ==========================================

document.getElementById("nombreNovio").textContent =
    datosBoda.novio;


document.getElementById("nombreNovia").textContent =
    datosBoda.novia;


// ==========================================
// MOSTRAR PADRES
// ==========================================

document.getElementById("padreNovio").textContent =
    datosBoda.padreNovio;


document.getElementById("madreNovio").textContent =
    datosBoda.madreNovio;


document.getElementById("padreNovia").textContent =
    datosBoda.padreNovia;


document.getElementById("madreNovia").textContent =
    datosBoda.madreNovia;


// ==========================================
// FORMATEAR FECHA
// ==========================================

function formatearFecha(fecha) {

    const fechaObjeto =
        new Date(fecha + "T00:00:00");


    return fechaObjeto.toLocaleDateString(
        "es-CO",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );
}


document.getElementById("fechaBoda").textContent =
    formatearFecha(datosBoda.fecha);


document.getElementById("fechaCelebracionBoda").textContent =
    formatearFecha(datosBoda.fecha);


// ==========================================
// FORMATEAR HORA
// ==========================================

function formatearHora(hora) {

    if (!hora) {
        return "";
    }


    const [horas, minutos] =
        hora.split(":");


    const fecha =
        new Date();


    fecha.setHours(horas);

    fecha.setMinutes(minutos);


    return fecha.toLocaleTimeString(
        "es-CO",
        {
            hour: "numeric",
            minute: "2-digit",
            hour12: true
        }
    );
}


document.getElementById("horaCeremoniaBoda").textContent =
    formatearHora(datosBoda.horaCeremonia);


document.getElementById("horaCelebracionBoda").textContent =
    formatearHora(datosBoda.horaCelebracion);


// ==========================================
// MOSTRAR CEREMONIA
// ==========================================

document.getElementById("capillaBoda").textContent =
    datosBoda.capilla;


document.getElementById("direccionBoda").textContent =
    datosBoda.direccionCeremonia;


// ==========================================
// MOSTRAR CELEBRACIÓN
// ==========================================

document.getElementById("lugarCelebracionBoda").textContent =
    datosBoda.lugarCelebracion;


document.getElementById("direccionCelebracionBoda").textContent =
    datosBoda.direccionCelebracion;


// ==========================================
// GOOGLE MAPS
// ==========================================

const direccionCeremonia =
    datosBoda.direccionCeremonia +
    ", " +
    datosBoda.ciudad;


const direccionCelebracion =
    datosBoda.direccionCelebracion +
    ", " +
    datosBoda.ciudad;


document.getElementById("mapaCeremonia").href =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(direccionCeremonia);


document.getElementById("mapaCelebracion").href =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(direccionCelebracion);


// ==========================================
// FOTOS PERSONALIZADAS
// ==========================================


// FOTO PRINCIPAL

if (datosBoda.fotoPrincipal) {

    document.getElementById("inicio").style.backgroundImage =
        `url("${datosBoda.fotoPrincipal}")`;

}


// ==========================================
// FOTOS DE GALERÍA
// ==========================================

if (datosBoda.fotoGaleria1) {

    document.getElementById("fotoGaleria1").src =
        datosBoda.fotoGaleria1;
}


if (datosBoda.fotoGaleria2) {

    document.getElementById("fotoGaleria2").src =
        datosBoda.fotoGaleria2;
}


if (datosBoda.fotoGaleria3) {

    document.getElementById("fotoGaleria3").src =
        datosBoda.fotoGaleria3;
}


if (datosBoda.fotoGaleria4) {

    document.getElementById("fotoGaleria4").src =
        datosBoda.fotoGaleria4;
}


if (datosBoda.fotoGaleria5) {

    document.getElementById("fotoGaleria5").src =
        datosBoda.fotoGaleria5;
}