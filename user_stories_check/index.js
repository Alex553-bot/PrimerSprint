const express = require("express");
const app = express();
const rutas = require("./rutas.js");
const cors = require("cors");
const controlador = require("./controladores.js");
controlador.crearArchivo();

const port = 3600;
app.use(cors());
app.use("/", rutas);
app.listen(port, function(){
    console.log("ok express");
})