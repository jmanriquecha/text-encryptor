// Definición de variables

const texto = obtenerElementoId('texto');
const textShowH2 = obtenerElementoId('text-show-h2');
const textShowP = obtenerElementoId('text-show-p');
const btnEncriptar = obtenerElementoId('btn-encriptar');
const btnDesencriptar = obtenerElementoId('btn-desencriptar');


function obtenerElementoId(elemento) {
    return document.getElementById(elemento);
}

// Focus
texto.focus();

// addEventListener
btnEncriptar.addEventListener('click', function () {
    if (texto.value === '') {
        textoDefecto();
    } else {
        // Modificar estilos
        textShowH2.classList.add('hidden');
        textShowP.classList.remove('text-md');
        textShowP.classList.add('text-lg', 'text-left');

        // Se muestra el texto cifrado
        textShowP.innerHTML = encriptarTexto(texto.value);
    }
});

/**
 * 
 * @param {string} texto 
 * @returns string
 */
function encriptarTexto(texto) {
    let texto_encriptado = '';
    for (let i = 0; i < texto.length; i++) {
        switch (texto[i]) {
            case 'e':
                texto_encriptado += 'enter';
                break;
            case 'i':
                texto_encriptado += 'imes';
                break;
            case 'a':
                texto_encriptado += 'ai';
                break;
            case 'o':
                texto_encriptado += 'ober';
                break;
            case 'u':
                texto_encriptado += 'ufat';
                break;
            default:
                texto_encriptado += texto[i];
                break;
        }
    }

    return texto_encriptado;
}

function textoDefecto() {
    // Estilos
    textShowH2.classList.remove('hidden');
    textShowP.classList.add('text-md');
    textShowP.classList.remove('text-lg', 'text-left');

    // Mensajes
    textShowH2.innerHTML = 'Ningún mensaje fue encontrado';
    textShowP.innerHTML = 'Ingrese el texto que desees encríptar o desencriptar';
}

// Se ejecuta al iniciar el programa
textoDefecto()