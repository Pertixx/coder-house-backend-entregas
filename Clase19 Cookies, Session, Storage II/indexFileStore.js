// npm install session-file-store

import FileStore from "session-file-store";
import cookieParser from "cookie-parser";
import express from "express";
import session from "express-session";

// Conectamos session con lo que sera nuestro FileStore
const fileStorage = FileStore(session);

const app = express();
app.use(cookieParser());
app.use(
  session({
    // ttl = Time to live. Vida de la sesion
    // retries = Numero de veces que el servidor tratara de leer el archivo
    // path = Ruta donde vivira la carpeta para almacenar las sesiones
    store: new FileStore({ path: "/sessions", ttl: 100, retries: 0 }),
    secret: "a89asa8s48449846f",
    resave: false,
    saveUninitialized: false,
  })
);
