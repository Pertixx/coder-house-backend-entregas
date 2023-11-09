import Router from "./router";

export default class UserRouter extends Router {
  init() {
    //Nota que dentro de init realizamos la inicializacion de nuestras rutas, esto sera el equivalente a
    //decir router.get

    this.get("/", ["PUBLIC"], (req, res) => {
      //Solo me limito a enviar el payload
      res.sendSuccess("Hola, Coders!");
    });

    this.get("/currentUser", ["USER", "USER_PREMIUM"], (req, res) => {
      res.sendSuccess(req.user);
    });
  }
}
