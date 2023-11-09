import { Router } from "express";
import passport from "passport";

const router = Router();

/*
  Este primer link es el que mandamos a llamar desde el front. Al entrar, pasa por el middleware de passport-github
  lo cual pedira autorizacion para acceder al perfil. En cuanto se pueda acceder al perfil, passport enviara la 
  info hacia el callback especificado

*/
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);
/*
  Este CALLBACK tiene que coincidir con el que seteaste en tu aplicacion de Github, este se encargara de hacer la
  redireccion final a la ventana de home, una vez que el login haya logrado establecer la sesion

*/
router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    //Nuestra estrategia nos devolvera al usuario, solo lo agregaremos a nuestro objeto de sesion
    req.session.user = req.user;
    res.redirect("/");
  }
);
