import { Server } from "socket.io";
import express from "express";
import handlebars from "express-handlebars";
import productManager from "./controllers/productManager.js";
import productsRoute from "./routes/productsRoute.js";

const manager = new productManager("./src/store/products.json");
const app = express();

const serverHttp = app.listen(8080, () =>
  console.log("listening on port 8080")
);
const io = new Server(serverHttp);

io.on("connection", async (socket) => {
  console.log("connection established");
  const products = await manager.getProducts();

  socket.emit("products", products);
  socket.on("newProduct", async (data) => {
    await manager.addProduct(data);
    io.emit("products", await manager.getProducts());
  });
  socket.on("deleteProduct", async (data) => {
    await manager.deleteProduct(data);
    io.emit("products", await manager.getProducts());
  });
});

app.engine("handlebars", handlebars.engine());
app.set("views", "./src/views");
app.set("view engine", "handlebars");

app.use(express.static("./src/public"));
app.use("/realtimeproducts", productsRoute);

app.get("/", async (req, res) => {
  res.render("home", {
    products: await manager.getProducts(),
  });
});
