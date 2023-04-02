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