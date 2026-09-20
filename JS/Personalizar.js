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