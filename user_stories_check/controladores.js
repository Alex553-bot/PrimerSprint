// funcion 1 para corregir ortograficamente las historias de usuario

// Importamos la librería
const Typo = requirte ('typo-js');

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
    let nombreArchivo = prompt("Ingrese el nombre del archivo:");
  
    if (nombreArchivo != null && nombreArchivo != "") {
      let archivo = new File([contenido], nombreArchivo + "nuevodocumento.txt", {
        type: "text/plain",
      });
  
      console.log("Archivo creado: ", archivo);
    }
  }