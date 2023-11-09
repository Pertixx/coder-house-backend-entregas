const fs = require("fs"); //file system

fs.writeFileSync("./ejemplo.txt", "Hola Mundo");

if (fs.existsSync("./ejemplo.txt")) {
  let contenido = fs.readFileSync("./ejemplo.txt", "utf-8");
  console.log(contenido);

  fs.appendFileSync("./ejemplo.txt", "\nAgregamos mas contenido");
  fs.unlinkSync("./ejemplo.txt");
} else {
  console.log("No existe el archivo");
}
