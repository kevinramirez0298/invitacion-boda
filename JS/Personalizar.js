// ==========================================
// ITINERARIO EDITABLE DE LA BODA
// ==========================================

// Actividades que aparecerán inicialmente
const actividadesIniciales = [
{ icono: "⛪", nombre: "Ceremonia", hora: "18:00", descripcion: "Ceremonia de matrimonio" },
{ icono: "📸", nombre: "Sesión de fotos", hora: "19:00", descripcion: "Fotos con familiares e invitados" },
{ icono: "🥂", nombre: "Recepción", hora: "19:30", descripcion: "Bienvenida a los invitados" },
{ icono: "🍽️", nombre: "Cena", hora: "20:30", descripcion: "Cena de los invitados" },
{ icono: "💃", nombre: "Celebración", hora: "21:30", descripcion: "Celebración de la boda" }
];

// ==========================================
// MOSTRAR ACTIVIDADES EN EL EDITOR
// ==========================================

function agregarActividad(actividad = {}) {


const contenedor = document.getElementById("editorItinerario");

if (!contenedor) {
    console.error("No se encontró editorItinerario");
    return;
}

// Crear tarjeta
const tarjeta = document.createElement("div");
tarjeta.className = "actividad-editor";

// Función para crear campos
function crearCampo(etiqueta, tipo, propiedad, valor, requerido = false) {

    const grupo = document.createElement("label");
    grupo.textContent = etiqueta;

    const campo = document.createElement("input");
    campo.type = tipo;
    campo.dataset.campo = propiedad;
    campo.value = valor || "";

    if (requerido) {
        campo.required = true;
    }

    grupo.appendChild(campo);
    tarjeta.appendChild(grupo);
}

crearCampo("Icono (emoji)", "text", "icono", actividad.icono || "💍");
crearCampo("Nombre de la actividad", "text", "nombre", actividad.nombre || "", true);
crearCampo("Hora", "time", "hora", actividad.hora || "", true);
crearCampo("Descripción", "text", "descripcion", actividad.descripcion || "");

// Botón para eliminar actividad
const botonEliminar = document.createElement("button");
botonEliminar.type = "button";
botonEliminar.textContent = "🗑️ Eliminar actividad";

botonEliminar.addEventListener("click", function () {
    tarjeta.remove();
});

tarjeta.appendChild(botonEliminar);
contenedor.appendChild(tarjeta);


}

// ==========================================
// RECUPERAR ACTIVIDADES DEL EDITOR
// ==========================================

function obtenerActividades() {


const tarjetas = document.querySelectorAll(
    "#editorItinerario .actividad-editor"
);

return Array.from(tarjetas).map(function (tarjeta) {

    function obtenerValor(propiedad) {
        const campo = tarjeta.querySelector(
            '[data-campo="' + propiedad + '"]'
        );

        return campo ? campo.value.trim() : "";
    }

    return {
        icono: obtenerValor("icono"),
        nombre: obtenerValor("nombre"),
        hora: obtenerValor("hora"),
        descripcion: obtenerValor("descripcion")
    };

}).filter(function (actividad) {
    return actividad.nombre !== "";
});


}

// ==========================================
// CARGAR ITINERARIO GUARDADO
// ==========================================

function cargarItinerario() {


const contenedor = document.getElementById("editorItinerario");

if (!contenedor) {
    return;
}

let datosGuardados = {};

try {
    datosGuardados = JSON.parse(
        localStorage.getItem("datosBoda") || "{}"
    );
} catch (error) {
    console.error("No se pudieron leer los datos guardados.", error);
}

const actividades = Array.isArray(datosGuardados.itinerario)
    ? datosGuardados.itinerario
    : actividadesIniciales;

contenedor.replaceChildren();

actividades.forEach(function (actividad) {
    agregarActividad(actividad);
});


}

// Cargar el editor cuando se abra la página
document.addEventListener("DOMContentLoaded", cargarItinerario);


// ==========================================
// GUARDAR DATOS DE LA INVITACIÓN
// ==========================================

async function guardarInvitacion() {

    // ==========================================
    // RECUPERAR DATOS ANTERIORES
    // ==========================================

    const datosAnteriores = JSON.parse(
        localStorage.getItem("datosBoda") || "{}"
    );


    // ==========================================
    // DATOS DE LA BODA
    // ==========================================

    const datosBoda = {

        ...datosAnteriores,


        // NOVIOS

        novio: document.getElementById("novio").value,

        novia: document.getElementById("novia").value,


        // PADRES

        padreNovio:
            document.getElementById("padreNovio").value,

        madreNovio:
            document.getElementById("madreNovio").value,

        padreNovia:
            document.getElementById("padreNovia").value,

        madreNovia:
            document.getElementById("madreNovia").value,


        // CEREMONIA

        capilla:
            document.getElementById("capilla").value,

        horaCeremonia:
            document.getElementById("horaCeremonia").value,

        direccionCeremonia:
            document.getElementById("direccionCeremonia").value,


        // CELEBRACIÓN

        lugarCelebracion:
            document.getElementById("lugarCelebracion").value,

        horaCelebracion:
            document.getElementById("horaCelebracion").value,

        direccionCelebracion:
            document.getElementById("direccionCelebracion").value,


        // FECHA

        fecha:
            document.getElementById("fecha").value,


        // CIUDAD

        ciudad:
            document.getElementById("ciudad").value

    };


    // ==========================================
    // FOTO PRINCIPAL
    // ==========================================

    const inputPrincipal =
        document.getElementById("fotoPrincipal");

    if (inputPrincipal.files.length > 0) {

        const archivo =
            inputPrincipal.files[0];

        const fotoPrincipal =
            await convertirImagen(archivo);

        datosBoda.fotoPrincipal =
            fotoPrincipal;
    }


    // ==========================================
    // FOTOS DE GALERÍA
    // ==========================================

    const inputGaleria =
        document.getElementById("fotosGaleria");


    if (inputGaleria.files.length > 0) {

        const fotos = inputGaleria.files;


        // Máximo 5 fotos

        const cantidad =
            Math.min(fotos.length, 5);


        for (let i = 0; i < cantidad; i++) {

            const foto =
                await convertirImagen(fotos[i]);


            datosBoda["fotoGaleria" + (i + 1)] =
                foto;

        }

    }


    // ==========================================
    // GUARDAR EN LOCALSTORAGE
    // ==========================================

    try {

        localStorage.setItem(
            "datosBoda",
            JSON.stringify(datosBoda)
        );

        alert("✅ Invitación guardada correctamente");


    } catch (error) {

        alert(
            "❌ Las fotos son demasiado grandes. " +
            "Prueba con imágenes más pequeñas."
        );

        console.error(error);

        return;
    }


    // ==========================================
    // ACTUALIZAR VISTA PREVIA
    // ==========================================

    const vistaPrevia =
        document.getElementById("vistaPrevia");


    if (vistaPrevia) {

        vistaPrevia.src =
            "index.html?actualizado=" + Date.now();

    }

}


// ==========================================
// CONVERTIR IMAGEN
// ==========================================

function convertirImagen(archivo) {

    return new Promise((resolve, reject) => {

        const lector =
            new FileReader();


        lector.onload = function () {

            resolve(lector.result);

        };


        lector.onerror = function () {

            reject(lector.error);

        };


        lector.readAsDataURL(archivo);

    });

}


// ==========================================
// VER INVITACIÓN
// ==========================================

function verInvitacion() {

    // Abrir la invitación
    window.open(
        "index.html",
        "_blank"
    );

}