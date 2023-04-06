// funcion 1 para corregir ortograficamente las historias de usuario

// Importamos la librería
const Typo = requirte('typo-js');

// Creamos un objeto con el diccionario del idioma deseado
const dictionary = new Typo('es_ES');

// Función para corregir el texto
function corregirTexto(texto) {
  // Separamos el texto en palabras
  const palabras = texto.split(' ');

  // Recorremos cada palabra y corregimos la ortografía
  for (let i = 0; i < palabras.length; i++) {
    // Verificamos si la palabra está mal escrita
    if (!dictionary.check(palabras[i])) {
      // Obtenemos sugerencias de corrección
      const sugerencias = dictionary.suggest(palabras[i]);

      // Si hay sugerencias, reemplazamos la palabra por la primera sugerencia
      if (sugerencias.length > 0) {
        palabras[i] = sugerencias[0];
      }
    }
  }

  // Unimos las palabras corregidas en un solo texto
  return palabras.join(' ');
}

// funcion para crear nuevo documento
function crearArchivo() {
  let contenido = "";


  let archivo = new File([contenido], "nuevodocumento.txt", {
    type: "text/plain",
  });

  console.log("Archivo creado: ", archivo);

}

// funcion semantica
// Definición de la función que sugiere correcciones para problemas de redundancia en un texto
function verificadordeSemantica(texto, palabrasProhibidas, diccionario) {
  // Separamos el texto en palabras
  const palabras = texto.split(" ");

  // Objeto para almacenar las palabras redundantes encontradas y sus sugerencias de corrección
  const sugerencias = {};

  // Recorremos todas las palabras del texto
  for (let i = 0; i < palabras.length; i++) {
    const palabra = palabras[i].toLowerCase();

    // Verificamos si la palabra se encuentra en la lista de palabras prohibidas
    if (palabrasProhibidas.includes(palabra)) {
      // Si la palabra es prohibida, sugerimos una corrección
      if (diccionario[palabra]) {
        sugerencias[palabra] = diccionario[palabra];
      }
    } else {
      // Si la palabra no es prohibida, verificamos si es redundante
      if (palabra in sugerencias) {
        // Si ya encontramos la palabra anteriormente, sugerimos su corrección
        palabras[i] = sugerencias[palabra];
      } else {
        // Si es la primera vez que encontramos la palabra, verificamos si es redundante
        for (let j = i + 1; j < palabras.length; j++) {
          const otraPalabra = palabras[j].toLowerCase();
          if (otraPalabra === palabra) {
            // Si encontramos una palabra redundante, sugerimos su corrección
            if (diccionario[palabra]) {
              sugerencias[palabra] = diccionario[palabra];
              palabras[i] = diccionario[palabra];
              palabras[j] = diccionario[palabra];
            }
          }
        }
      }
    }
  }

  // Unimos las palabras sugeridas en un nuevo texto
  const textoSugerido = palabras.join(" ");

  // Retornamos el texto sugerido y las correcciones realizadas
  return {
    texto: textoSugerido,
    correcciones: sugerencias
  };
}