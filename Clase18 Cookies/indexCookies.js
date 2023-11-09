//npm install express cookie-parser

import cookieParser from "cookie-parser";
import express from "express";

const app = express();
/*
  Al conectar cookieParser con express podremos gestionar, dentro de nuestras peticiones, elementos correspondientes a cookies.
*/

app.use(cookieParser("SecretCode")); //Agregamos un secret al momento de inicializar para firmar la cookie

app.get("/setCookie", (req, res) => {
  // res.cookie(nombre de la cookie, valor de la cookie, {maxAge: tiempo de vida de la cookie en milisegundos})
  res
    .cookie("CoderCookie", "Esta es una cookie de ejemplo", { maxAge: 1000 })
    .send("Cookie");
});

app.get("/getCookies", (req, res) => {
  // Obtenemos las req.cookies y las enviamos al cliente para corroborar que hay almacenado
  res.send(req.cookies);
});

app.get("/deleteCookie", (req, res) => {
  res.clearCookie("CoderCookie").send("Cookie Removed");
});

app.get("/setSignedCookie", (req, res) => {
  res
    .cookie("SignedCookie", "Esta es una cookie firmada de ejemplo", {
      maxAge: 10000,
      signed: true,
    })
    .send("Cookie");
});
