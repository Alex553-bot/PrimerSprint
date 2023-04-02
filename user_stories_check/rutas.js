const express = require("express");
const router = express.Router();

router.get("/rutabuena", function (req, res) {
    console.log("espabila");
    res.send("Esta es la ruta buena");
  });
// req = request query, res = respeusta a enviar
router.get("/rutamala", function (req, res) {
    res.send("Esta es la ruta mala");
  });

  module.exports=router;