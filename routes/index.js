let express = require('express');
let router = express.Router();
let path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//router.post('/save', (req, res) =>{
//  const contenido = req.body['txt-content'];
//  console.log(`zi funciona :D ${contenido}`);
//  res.send('Se guardo!!!');
//});
/*
router.get('/semantica/:cont', (req, res)=>{
  const Typo = require('typo-js');
  let texto = decodeURIComponent(req.params.cont);
  const dictionary = new Typo('en_US');
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
  req.params.aux=palabras.join(' ');
  // Unimos las palabras corregidas en un solo texto
  res.send(__dirname+'index.html');

});*/

router.get('/save/:contenidoEditor', (req, res) => {
  let texto = decodeURIComponent(req.params.contenidoEditor);

  let nombre_archivo = texto.split('TITULO')[0];
  texto = texto.split('TITULO')[1];
  texto = eliminarTags(texto);
  const mysql = require('mysql');
  const fs = require('fs');
  const conexion = mysql.createConnection({
    host: '18.189.51.11',
    user: 'sis2',
    password: 'Gat0235!52',
    database: 'primersprint'
  });



  // texto plano:
  fs.writeFile(`${nombre_archivo}.txt`, texto, function(err) {
    if (err) {
      res.status(500).send(`Error con el guardado : ${err}`);
    }
  });

  let parseado = texto.split('Yo como:');
  let personaa = '', desiree = '';

  if (parseado.length>1) {
    parseado = parseado[1].split('Requiero:');
    personaa = parseado[0];
  }

  if (parseado.length>1) {
    parseado = parseado[1].split('Para:');
    desiree = parseado[0];
  }

  const attributes = {
    name: nombre_archivo,
    persona: personaa,
    desire: desiree,
    pid: 1
  }

  // base de datos
  conexion.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    let qaux = `select Name from UserStory where Name like '${attributes.name}' and pid=${attributes.pid}`;
    let queryy;
    conexion.query(qaux, (er, results, fields) => {
      if (err) {res.send(500); return;}
      console.log(results.length===0);
      if (results.length===0) {
        queryy=`INSERT INTO UserStory (Name, Persona, Desire, pid) VALUES ('${attributes.name}', '${attributes.persona}', '${attributes.desire}', ${attributes.pid})`;
      } else {
        console.log('1');
        queryy=`update UserStory set Persona='${attributes.persona}', Desire='${attributes.desire}' where Name like '${attributes.name}' and pid=${attributes.pid}`;
      }
    });
    console.log(queryy);
    conexion.query(queryy, (error, results, fields) => {
      if (error) {
        console.error(error);
        return;
      }
      console.log(`archivo creado`);
      conexion.end();
    });
  });


  const filePath = path.join(`${nombre_archivo}.txt`);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error con la descarga del archivo en texto plano');
    }

    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Disposition', `attachment; filename=${nombre_archivo}.txt`);

    res.send(data);
  });

  //res.send(`Datos recibidos:\n ${texto}`);
});

function eliminarTags(str) {
  let regex = /(<([^>]+)>)/ig;
  return str.replace(regex,'');
}

router.post('/save', function(req, res, next) {
  //const option = req.body.saveOption;
  const option = 'Texto Plano';
  const nombre_archivo='archivo.txt';
  let contenido = req.body.contenidoEditor;
      const mysql = require('mysql');
    let jso = contenido;// AQUI AGREGAR LA FUNCION DE PARSEADO 
    const conexion = mysql.createConnection({
      host: '18.189.51.11',
      //host: 'localhost',
      user: 'sis2',
      password: 'Gat0235!52',
      database: 'primersprint'
      //database: 'ejemplo'
    });

    conexion.connect((err)=>{
      if (err) {
        console.log( `Error no conecto!${err}`);
        return;
      }
      console.log('Conectado!!');
    });

  if (option==='Texto Plano') {
    const fs = require('fs');
    fs.writeFile(`${nombre_archivo}.txt`, contenido, function(err) {
      if (err) {
        console.log(err);
        res.status(500).send(`Error con el guardado : ${contenido}`);
      } else {
        //. correo electronico : JSON ? 
        res.send(`Se guardo el archivo: ${contenido}`);
      }
    });
  } else if (option==='Cloud') {

    // realizar query de conexion y preguntar al usuario si desea
    // sobresescribir
  }
    conexion.end((err)=>{
      if (err) {
        console.log('Error al desconectar');
        return;
      }
      console.log('Desconectado!');
    });
    //res.send('Transaccion completada!');
  
});

module.exports = router;
