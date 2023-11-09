import {
  MONGO_DB_NAME,
  MONGO_URI,
  PORT,
  SECRET_PASS,
} from "./config/config.js";

import CartsRoutes from "./routes/api/carts.js";
import JWTRoutes from "./routes/api/jwt.js";
import PaymentsRoutes from "./routes/api/payments.js";
import ProductsRoutes from "./routes/api/products.js";
import { Server } from "socket.io";
import UsersRoutes from "./routes/api/users.js";
import ViewsProductsRoutes from "./routes/api/viewsProducts.js";
import cookieParser from "cookie-parser";
import express from "express";
import initializePassport from "./config/passport.config.js";
import messageModel from "./models/messages.model.js";
import mongoose from "mongoose";

class App {
  constructor() {
    this.app = express();
  }

  init() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use();
    this._configureRoutes();
    this._configureCookies();
    this._configurePassport();

    this._configureDb();
  }

  _configureCookies() {
    this.app.use(cookieParser(SECRET_PASS));
  }

  _configurePassport() {
    initializePassport();
    this.app.use(passport.initialize());
  }

  _configureServer() {
    const port = PORT || 3000;
    const serverHttp = this.app.listen(port, () =>
      console.log(`Server listening on port ${port}`)
    );

    // Crear una instancia de socket.io y para asi vincularla al server http
    const io = new Server(serverHttp);
    // Establezco el objeto socket.io en la app para que este este disponible en todas las rutass
    this.app.set("socketio", io);

    io.on("connection", async (socket) => {
      // Escucha el evento "productList" emitido por el cliente
      socket.on("productList", (data) => {
        // Emitir el evento "updatedCarts" a todos los clientes conectados
        // console.log(data);
        io.emit("updatedProducts", data);
      });
      socket.on("cartList", (data) => {
        // Emitir el evento "updatedCarts" a todos los clientes conectados
        io.emit("updatedCarts", data);
      });

      let messages = (await messageModel.find())
        ? await messageModel.find()
        : [];

      socket.broadcast.emit("alerta");
      socket.emit("logs", messages);
      socket.on("message", (data) => {
        messages.push(data);
        messageModel.create(messages);
        io.emit("logs", messages);
      });
    });

    this.app.use((req, res, next) => {
      req.io = io;
      next();
    });
  }

  async _configureDb() {
    mongoose.set("strictQuery", false);
    try {
      await mongoose.connect(`${MONGO_URI}${MONGO_DB_NAME}`);
      console.log("DB connection established");
    } catch (error) {
      console.log(error.message);
    }
  }

  _configureRoutes() {
    const productsRoutes = new ProductsRoutes();
    this.app.use("/api/products", productsRoutes.getRouter());

    const cartsRoutes = new CartsRoutes();
    this.app.use("/api/carts", cartsRoutes.getRouter());

    const jwtRoutes = new JWTRoutes();
    this.app.use("/api/jwt", jwtRoutes.getRouter());

    const usersRoutes = new UsersRoutes();
    this.app.use("/api/users", passportCall("jwt"), usersRoutes.getRouter());

    const paymentsRoutes = new PaymentsRoutes();
    this.app.use(
      "/api/payments",
      passportCall("jwt"),
      paymentsRoutes.getRouter()
    );

    const viewsProductsRoutes = new ViewsProductsRoutes();
    this.app.use(
      "/products",
      passportCall("jwt"),
      viewsProductsRoutes.getRouter()
    );
  }
}

const app = new App();
app.init();
