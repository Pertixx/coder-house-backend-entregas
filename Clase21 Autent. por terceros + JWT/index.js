import { authToken, generateToken } from "./utils.js";

import express from "express";
import initializePassport from "./config/passport.config.js";
import mongoose from "mongoose";
import passport from "passport";
import session from "express-session";
import sessionRouter from "./routes/session.router.js";
import viewsRouter from "./routes/views.router.js";

const app = express();
const server = app.listen(8080, () => console.log("Listening on port 8080"));
const connection = mongoose.connect("connection link");

const users = []; //Por el momento optamos por una persistencia en memoria
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  const exists = users.find((user) => user.email == email);
  if (exists)
    return res
      .status(400)
      .send({ status: "error", error: "User already exists" });

  const user = {
    name,
    email,
    password,
  };
  users.push(user);
  //Generamos un token con el usuario
  const access_token = generateToken(user);
  res.send({ status: "success", access_token });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(
    (user) => user.email == email && user.password == password
  );

  if (!user)
    return res
      .status(400)
      .send({ status: "error", error: "Invalid credentials" });

  const access_token = generateToken(user);
  res.send({ status: "success", access_token });
});

app.get("/current", authToken, (req, res) => {
  /*
    Ya que usamos authToken sabemos que tenemos que tener un objeto user en nuestro request. De otra manera el
    middleware devolveria el error
  */
  res.send({ status: "success", payload: req.user });
});

initializePassport();
app.use(
  session({
    secret: "CoderSecrets",
  })
);

app.use(passport.initialize());

app.use("/", viewsRouter);
app.use("/api/sessions", sessionRouter);
