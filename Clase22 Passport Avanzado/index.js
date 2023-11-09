//npm install passport passport-jwt
//npm install cookie-parser
import { authToken, generateToken } from "./utils.js";

import { authorization } from "./utils.js";
import express from "express";
import initializePassport from "./config/passport.config.js";
import mongoose from "mongoose";
import passport from "passport";
import { passportCall } from "./utils.js";
import session from "express-session";

const app = express();
const server = app.listen(8080, () => console.log("Listening on port 8080"));
const connection = mongoose.connect("connection link");

app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
initializePassport();
app.use(passport.initialize());

app.get(
  "/current",
  passport.authenticate("jwt", { session: false }), //Colocamos session: false debido a que no ocupamos express-session para estos procesos
  (req, res) => {
    res.send(req.user);
  }
);

//Ahora usando el passportCall de utils.js y el authorization

app.get("/current", passportCall("jwt"), authorization("user"), (req, res) => {
  res.send(req.user);
});
