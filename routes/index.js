let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/save', function(req, res, next) {
  const fs = require('fs');
  let contenido = req.body.text;
  let nombre_archivo = 'archivo_texto_us'; 
  fs.writeFile(`${nombre_archivo}.txt`, contenido, function(err) {
    if (err) {
      console.log(err);
      res.status(500).send('Error con el guardado');
    } else {
      res.send('Se guardo el archivo');
    }
  });
});

module.exports = router;
