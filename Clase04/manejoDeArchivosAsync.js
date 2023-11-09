const fs = require("fs");

const fileName = "./ejemplo2.txt";

//Usando callbacks

fs.writeFile(fileName, "Hola Mundo", (error) => {
  if (error) return console.log("Hubo un error");
  fs.appendFile(fileName, "\nChau mundo", (error) => {
    if (error) return console.log("Hubo un error");
    fs.readFile(fileName, "utf-8", (error, contenido) => {
      if (error) return console.log("Hubo un error");
      console.log(contenido);
    });
  });
  console.log("Datos escritos correctamente");
});

//Usando promesas
const operacionesAsync = async () => {
  await fs.promises.writeFile(fileName, "Hola Mundo");

  let contenido = await fs.promises.readFile(fileName, "utf-8");
  console.log(contenido);

  await fs.promises.appendFile(fileName, "\nSaludos desde las promises");
  await fs.promises.unlink(fileName);
};
