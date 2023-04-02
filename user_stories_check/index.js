const express = require("express");
const app = express();
const rutas = require("./rutas.js");

const hostname = "localhost";
const port = 8000;

app.use("/", rutas);
app.listen(port, function(){
    console.log("ok express");
})