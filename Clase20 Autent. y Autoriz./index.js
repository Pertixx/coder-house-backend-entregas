// Reestructuracion del indexMongoDB de la clase 19

import FileStore from "session-file-store";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import express from "express";
import initializePassport from "./config/passport.config.js";
import passport from "passport";
import session from "express-session";

// Conectamos session con lo que sera nuestro FileStore
const fileStorage = FileStore(session);

const app = express();
app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: "url de tu mongo atlas",
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 15,
    }),
    secret: "a89asa8s48449846f",
    resave: false,
    saveUninitialized: false,
  })
);
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// Reestructura de las rutas de registro

router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/failRegister" }),
  async (req, res) => {
    res.send({ status: "success", message: "User Registered" });
  }
);

router.get("/failRegister", async (req, res) => {
  console.log("Failed Strategy");
  res.send({ error: "Failed" });
});
