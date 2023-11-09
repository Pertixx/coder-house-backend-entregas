// npm install passport passport-local
// este archivo se llamaria passport.config.js

import { encode, isValidPassword } from "../utils.js";

import local from "passport-local";
import passport from "passport";
import userService from "../models/User.js";

const localStrategy = local.Strategy;
const initializePassport = () => {
  /*
    Passport utiliza sus propios middlewares de acuerdo a cada estrategia
    Inicializamos la estrategia local:
    username sera en este caso el correo electronico
    done sera el callback de resolucion de passport, el primer argumento es para error y el segundo para el usuario
  */
  passport.use(
    "register",
    new localStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        // passReqToCallback permite que se pueda acceder al objeto req como cualquier otro middleware
        const { first_name, last_name, email, age } = req.body;
        try {
          let user = await userService.findOne({ email: username });
          if (user) {
            console.log("User already exists");
            return done(null, false);
          }
          const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: encode(password),
          };
          let result = await userService.create(newUser);
          return done(null, result);
        } catch (error) {
          return done("Error al obtener el usuario " + error);
        }
      }
    )
  );
};

export default initializePassport;
