import express from "express";
import handlebars from "express-handlebars";
import userRoute from "./routes/user.route.js";

const app = express();

//Configuracion del motor de plantillas handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", "./src/views");
app.set("view engine", "handlebars");
app.get("/motor", (req, res) => {
  res.render("motor", {
    nombre_vista: "Ejemplo de handlebars",
  });
});
//middleware
//Le digo que en la ruta raiz muestre lo que esta en la carpeta publica
app.use(express.static("./src/public"));

//Le digo que lo muestre en la ruta contenido
app.use("/contenido", express.static("./src/public"));

app.get("/health", (req, res) => res.send);
app.use("/users", userRoute);

app.listen(8080, () => console.log("listening on port 8080"));
