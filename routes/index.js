let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/save', function(req, res, next) {
  //const option = req.body.saveOption;
  const option = 'a';
  const nombre_archivo='archivo.txt';
  let contenido = req.body.text;
      const mysql = require('mysql');
    let jso = contenido;// AQUI AGREGAR LA FUNCION DE PARSEADO 
    const conexion = mysql.createConnection({
      host: '18.189.51.11',
      //host: 'localhost',
      user: 'sis2',
      password: 'Gat0235!52',
      database: 'sistemas2'
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
        res.status(500).send('Error con el guardado');
      } else {
        //. correo electronico : JSON ? 
        res.send('Se guardo el archivo');
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
    res.send('Transaccion completada!');
  
});

module.exports = router;
