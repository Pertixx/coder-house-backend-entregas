import { Server } from "socket.io";
import express from "express";

const app = express();
app.use(express.static("./src/public"));

let log = [];

const serverHttp = app.listen(8080, () =>
  console.log("listening on port 8080")
);
const io = new Server(serverHttp);

io.on("connection", (socket) => {
  console.log("connection established");

  socket.on("message", (data) => {
    log.push({ id: socket.id, message: data });
    // socket.emit("history", log);
    io.emit("history", log); //io es el servidor backend y socket es la conexion front. socket.emit solo se lo emite a ese cliente. io.emit lo emite a todos los clientes conectados
  });
});
