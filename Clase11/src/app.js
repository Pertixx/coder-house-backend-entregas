import { Server } from "socket.io";
import express from "express";
import handlebars from "express-handlebars";
import viewsRoute from "./routes/views.js";

const app = express();
const httpServer = app.listen(8080, () =>
  console.log("listening on port 8080")
);
const io = new Server(httpServer);

app.engine("handlebars", handlebars.engine);
app.set("views", "./src/views");
app.set("view engine", "handlebars");
app.use(express.static("./src/public"));
app.use("/", viewsRoute);
