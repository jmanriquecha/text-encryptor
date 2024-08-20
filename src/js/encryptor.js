// Definición de variables

const texto = obtenerElementoId('texto');
const textShowH2 = obtenerElementoId('text-show-h2');
const textShowP = obtenerElementoId('text-show-p');
const btnEncriptar = obtenerElementoId('btn-encriptar');
const btnDesencriptar = obtenerElementoId('btn-desencriptar');
const btnCopy = obtenerElementoId('btn-copy');
const spanExclamation = obtenerElementoId('exclamation');

const arrPalabras = [];

function obtenerElementoId(elemento) {
    return document.getElementById(elemento);
}

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

btnDesencriptar.addEventListener('click', function () {
    if (texto.value === '') {
        textoDefecto();
    } else {
        // Modificar estilos
        textShowH2.classList.add('hidden');
        textShowP.classList.remove('text-md');
        textShowP.classList.add('text-lg', 'text-left');

        // Se muestra el texto cifrado
        textShowP.innerHTML = ''
        textShowP.innerHTML = desencriptarTexto(texto.value);
    }
});

// Activa el evento del boton copiar
btnCopy.addEventListener("click", () => copiarTexto(textShowP.innerHTML));

// Activa el evento para que el texto pase a minúscula y quita acentos
texto.addEventListener('keyup', function () {
    let minusculas = textoEnMinuscula(texto);
    let sinAcentos = eliminarDiacriticosEs(minusculas);
    texto.value = sinAcentos;
});

// Detecta si el boton de Bloq Mayus esta activo
document.addEventListener('keydown', function (event) {
    bloqMayusActivo(event);
});


/**
 * Función para encriptar el texto
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

/**
 * Función para desencriptar el texto
 * @param {string} texto 
 * @returns string
 */
function desencriptarTexto(texto) {
    for (const element of arrPalabras) {
        texto = textoDesencriptado(texto, element.significado, element.letra);
    }
    return texto;
}

/**
 * Busca que la palabra se encuentre en el texto y la remplaza
 * @param {string} texto 
 * @param {string} palabra 
 * @param {string} cambiaPalabra 
 * @returns string
 */
function validaSiPalabraExiste(texto, palabra, cambiaPalabra) {
    if (texto.includes(palabra)) {
        return texto.replaceAll(palabra, cambiaPalabra);
    } else {
        return false;
    }
}

/**
 * Devuelve el nuevo texto
 * @param {string} texto 
 * @param {string} palabra 
 * @param {string} remplazar 
 * @returns string
 */
function textoDesencriptado(texto, palabra, remplazar) {
    if (validaSiPalabraExiste(texto, palabra, remplazar)) {
        texto = validaSiPalabraExiste(texto, palabra, remplazar);
    } else {
        texto = texto;
    }
    return texto;
}

/**
 * Se cargan textos por defecto
 */
function textoDefecto() {
    // Estilos
    textShowH2.classList.remove('hidden');
    textShowP.classList.add('text-md');
    textShowP.classList.remove('text-lg', 'text-left');

    // Mensajes
    textShowH2.innerHTML = 'Ningún mensaje fue encontrado';
    textShowP.innerHTML = 'Ingrese el texto que desees encríptar o desencriptar';

    // Focus
    texto.focus();

    // Agrega palabras 
    listaPlabras();

    // mensaje mayus activado
    spanExclamation.classList.add('show');

}

/**
 * Función para copiar texto
 * @param {string} text 
 */
async function copiarTexto(text) {
    try {
        await navigator.clipboard.writeText(text);
        btnCopy.classList.remove('btn-light');
        btnCopy.classList.add('btn-primary')
        btnCopy.innerHTML = '¡Texto Copiado!';
        setTimeout(() => {
            btnCopy.classList.remove('btn-primary')
            btnCopy.classList.add('btn-light');
            btnCopy.innerHTML = 'Copiar';
        }, 3000);
    } catch (error) {
        console.error(error.message);
    }
}

/**
 * Lista de palabras con su definición
 * Adiciona palabras
 */
function listaPlabras() {
    addPalabraLista('a', 'ai');
    addPalabraLista('e', 'enter');
    addPalabraLista('i', 'imes');
    addPalabraLista('o', 'ober');
    addPalabraLista('u', 'ufat');
}


/**
 * Función que agrega nueva palabra al array arrPalabras[]
 * @param {string} letra 
 * @param {string} significado 
 */
function addPalabraLista(letra, significado) {
    arrPalabras.push({ letra, significado });
}

/**
 * Convierte texto a minúsculas
 * @param {String} input 
 */
function textoEnMinuscula(input) {
    return input.value.toLowerCase();
}

/**
 * Muestra mensaje que solo se permiten letras minusculas y sín acentos
 * @param {string} event 
 */
function bloqMayusActivo(event) {
    let mayus = event.getModifierState && event.getModifierState('CapsLock');
    if (event.key === 'CapsLock') {
        setTimeout(function () {
            if (!mayus) {
                isDisplayElement(spanExclamation);
            } else {
                isDisplayElement(spanExclamation, false);
            }
        }, 100);

    }
}

// Elimina los diacríticos de un texto excepto si es una "ñ" (ES6)
function eliminarDiacriticosEs(texto) {
    return texto
        .normalize('NFD')
        .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi, "$1")
        .normalize();
}

/**
 * Mostrar y ocultar un elemento, display por defecto es true;
 * @param {string} element 
 * @param {string} status 
 */
function isDisplayElement(element, display = true) {
    if (display) {
        element.classList.add('show');
        element.classList.remove('hidden');
    } else {
        element.classList.add('hidden');
        element.classList.remove('show');
    }
}

// Codigo que se ejecuta al iniciar el programa

// 
textoDefecto()