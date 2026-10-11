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

// ==========================================
// MOSTRAR ITINERARIO DE LA BODA
// ==========================================

function mostrarItinerario() {


// Buscar el contenedor en index.html
const contenedor = document.getElementById("itinerarioBoda");

// Verificar que exista
if (!contenedor) {
    console.warn("No se encontró el contenedor itinerarioBoda");
    return;
}

// Actividades predeterminadas de la boda
const itinerarioPredeterminado = [
    {
        icono: "⛪",
        nombre: "Ceremonia",
        hora: "18:00",
        descripcion: "Ceremonia de matrimonio"
    },
    {
        icono: "📸",
        nombre: "Sesión de fotos",
        hora: "19:00",
        descripcion: "Fotografías con familiares e invitados"
    },
    {
        icono: "🥂",
        nombre: "Recepción",
        hora: "19:30",
        descripcion: "Bienvenida a nuestros invitados"
    },
    {
        icono: "🍽️",
        nombre: "Cena",
        hora: "20:30",
        descripcion: "Compartiremos nuestra cena"
    },
    {
        icono: "💃",
        nombre: "Celebración",
        hora: "21:30",
        descripcion: "¡A celebrar nuestro amor!"
    }
];

// Usar las actividades personalizadas si existen
const actividades = Array.isArray(datosBoda.itinerario)
    && datosBoda.itinerario.length > 0
    ? datosBoda.itinerario
    : itinerarioPredeterminado;

// Limpiar el contenedor
contenedor.replaceChildren();

// Crear cada actividad
actividades.forEach(function (actividad) {

    const tarjeta = document.createElement("div");
    tarjeta.className = "momento";

    const icono = document.createElement("span");
    icono.textContent = actividad.icono || "💍";

    const titulo = document.createElement("h3");
    titulo.textContent = actividad.nombre || "Actividad";

    const hora = document.createElement("p");
    hora.textContent = actividad.hora
        ? formatearHora(actividad.hora)
        : "";

    const descripcion = document.createElement("p");
    descripcion.textContent = actividad.descripcion || "";

    tarjeta.append(icono, titulo, hora, descripcion);

    contenedor.appendChild(tarjeta);
});


}

// ==========================================
// INICIAR ITINERARIO
// ==========================================

mostrarItinerario();



// ==========================================
// ACTUALIZAR NOMBRES DEL FOOTER
// ==========================================

function actualizarNombresFooter() {

    // Obtener los datos guardados de la invitación
    const datosGuardados = localStorage.getItem("datosBoda");

    // Si no hay datos guardados, no hacer nada
    if (!datosGuardados) {
        return;
    }

    // Convertir el texto JSON en un objeto JavaScript
    const datosBoda = JSON.parse(datosGuardados);

    // Buscar el elemento del footer
    const nombresFooter = document.getElementById("nombresFooter");

    // Actualizar los nombres si el elemento existe
    if (nombresFooter) {
        nombresFooter.textContent =
            `${datosBoda.novio || "Nombre del Novio"} & ${datosBoda.novia || "Nombre de la Novia"}`;
    }
}

// Ejecutar cuando se cargue la página
document.addEventListener("DOMContentLoaded", actualizarNombresFooter);

