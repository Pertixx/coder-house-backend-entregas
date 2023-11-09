import { Router } from "express";
import jwt from "jsonwebtoken";

export default class SessionsRouter extends Router {
  init() {
    this.post("/login", ["PUBLIC"], (req, res) => {
      //Usuario hardcodeado, lo que nos interesa aqui es la asignacion del rol
      let user = {
        email: req.body.email,
        role: "user",
      };
      let token = jwt.sign(user, "CoderSecretClaseRouter");
      res.sendSuccess({ token });
    });
  }
}
