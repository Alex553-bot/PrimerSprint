//const { connect } = require('http2');

// Importamos la librería
//const Typo = require('typo-js');
// funcion para crear nuevo documento - es mas para empezar el guardado
async function crearArchivo() {
  var mysql = require('mysql');

  var con = mysql.createConnection({
    host: "18.189.51.11",
    user: "sis2",
    password: "Gat0235!52", database: "primersprint"
  });

  const fileName = 'nuevo_documento.txt';

  const attributes = {
    name: "",
    persona: "",
    desire: "",
  }


  await con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    const query = `INSERT INTO UserStory (Name, Persona, Desire) VALUES ('${attributes.name}', '${attributes.persona}', '${attributes.desire}')`;
    con.query(query, (error, results, fields) => {
      if (error) {
        console.error(error);
        return;
      }
      console.log(`archivo creado`);
      con.end();
    });
  });

}

const diccionario = {

  //el fomrato para añadir palabra redundante es palabraRedundante: ["sugerencia1", "sugerencia2", ...],

  'repetir': ['reiterar', 'retroalimentar', 'duplicar', 'copiar', 'reforzar', 'persistir', 'redundar', 'insistir', 'recapitular'],
  'comenzar': ['iniciar', 'empezar', 'arrancar', 'encender', 'establecer', 'abrir', 'despertar', 'activar', 'fundar'],
  'bello': ['hermoso', 'lindo', 'bonito', 'atractivo', 'agradable', 'gracioso', 'encantador', 'precioso', 'radiante'],
  'pequeño': ['chico', 'menudo', 'diminuto', 'minúsculo', 'exiguo', 'escaso', 'reducido', 'limitado', 'insignificante'],
  'gordo': ['obeso', 'corpulento', 'obeso mórbido', 'voluminoso', 'llenito', 'fofo', 'abultado', 'panzón', 'rollizo'],
  'delgado': ['flaco', 'fino', 'esbelto', 'elegante', 'estrecho', 'escaso', 'débil', 'frágil', 'menudo'],
  'interesante': ['atractivo', 'apasionante', 'sorprendente', 'apetitoso', 'fascinante', 'divertido', 'emocionante', 'entretenido', 'estimulante'],
  'aburrido': ['monótono', 'tedioso', 'insípido', 'cansino', 'soporífero', 'fastidioso', 'pesado', 'plomizo', 'molesto'],
  'triste': ['melancólico', 'abatido', 'desolado', 'doloroso', 'desdichado', 'infeliz', 'angustiado', 'apenado', 'deprimido'],
  'feliz': ['contento', 'alegre', 'gozoso', 'divertido', 'satisfecho', 'encantado', 'radiante', 'triunfante', 'animado'],
  'sabroso': ['delicioso', 'rico', 'exquisito', 'apetitoso', 'gustoso', 'agridulce', 'picante', 'salado', 'dulce'],
  'duro': ['rígido', 'sólido', 'firme', 'resistente', 'tenaz', 'incorruptible', 'inflexible', 'severo', 'difícil'],
  'suave': ['blando', 'dulce', 'sedoso', 'ternura', 'tranquilo', 'relajado', 'cálido', 'fino', 'plácido'],
  'rápido': ['veloz', 'ligero', 'ágil', 'pronto', 'acelerado', 'inmediato', 'presto', 'deprisa', 'expedito'],
  'lento': ['perezoso', 'tardo', 'despacio', 'lerdo', 'calmado', 'remolón', 'pausado', 'sosiego', 'relajado'],
  "coche": ["automóvil", "carro", "vehículo"],
  "comer": ["alimentarse", "degustar", "ingerir"],

}
const palabrasProhibidas = ['sistema', 'aplicacion', 'integrar'];

// funcion semantica
// sugiere correcciones para problemas de redundancia y palabras prohibidas en un texto
function verificadordeSemantica(texto) {
  texto = texto.replace('<b>', '');
  texto = texto.replace('</b>', '');
  texto = texto.replace('<br>', '');
  texto = texto.replace('</br>', '');
  console.log(texto);
  // Separamos el texto en palabras
  const palabras = texto.split(" ");
  console.log(palabras);

  // Objeto para almacenar las palabras redundantes encontradas y sus sugerencias de corrección
  let sugerencias = ["sugerencias: "];

  // Recorremos todas las palabras del texto
  for (let i = 0; i < palabras.length; i++) {
    const palabra = palabras[i].toLowerCase();

    // Verificamos si la palabra se encuentra en la lista de palabras prohibidas
    if (palabrasProhibidas.includes(palabra)) {
      // Si la palabra es prohibida, sugerimos una corrección
      sugerencias.push("usaste la palabra " + palabra + "este tipo de terminos no se deberian usar");
    } else {
      // Si la palabra no es prohibida, verificamos si es redundante
      if (palabra in sugerencias) {
        // Si ya encontramos la palabra anteriormente, sugerimos su corrección
        palabras[i] = sugerencias[palabra];
      } else {
        // Si es la primera vez que encontramos la palabra, verificamos si es redundante
        let k = 0;
        for (let j = i + 1; j < palabras.length; j++) {
          const otraPalabra = palabras[j].toLowerCase();
          if (otraPalabra === palabra) {
            // Si encontramos una palabra redundante, sugerimos su corrección
            if (diccionario[palabra]& diccionario[palabra].length > k) {
              palabras[j] = diccionario[palabra][k];
              k++;
            }
          }
        }
      }
    }
  }

  // Unimos las palabras sugeridas en un nuevo texto
  const textoSugerido = palabras.join(" ");
  const textoextra = sugerencias.join("\n");
  // Retornamos el texto sugerido y las correcciones realizadas
  return textoSugerido + "\n" + textoextra;
}