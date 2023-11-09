import { Router } from "express";

export default class Router {
  constructor() {
    this.router = Router();
    this.init();
  }

  getRouter() {
    return this.router;
  }

  init() {} //Esta inicializacion sera para las clases heredadas

  get(path, ...callbacks) {
    this.router.get(
      path,
      this.generateCustomResponses,
      this.applyCallbacks(callbacks)
    );
  }

  post(path, ...callbacks) {
    this.router.post(
      path,
      this.generateCustomResponses,
      this.applyCallbacks(callbacks)
    );
  }

  put(path, ...callbacks) {
    this.router.put(
      path,
      this.generateCustomResponses,
      this.applyCallbacks(callbacks)
    );
  }

  delete(path, ...callbacks) {
    this.router.delete(
      path,
      this.generateCustomResponses,
      this.applyCallbacks(callbacks)
    );
  }

  applyCallbacks(callbacks) {
    //Mapearemos los callbacks uno a uno, obteniendo sus parametros a partir de ...
    return callbacks.map((callback) => async (...params) => {
      try {
        /*
            apply, ejecutara la funcion callback apuntando directamente a una instancia de la clase, por ello
            colocamos this para que se utilice solo en el contexto de este router. Los parametros son internos de
            cada callback, sabemos que los params de un callback corresponden a req, res, next
          */
        await callback.apply(this, params);
      } catch (error) {
        console.log(error);
        //params[1] hace referencia a res, por eso puedo mandar un send desde este
        params[1].status(500).send(error);
      }
    });
  }

  generateCustomResponses(req, res, next) {
    /*
      Send success permitira que el desarrollador solo tenga que enviar el payload, el formato se manejara
      de manera interna
    */
    res.sendSuccess = (payload) =>
      res.status(200).send({ status: "success", payload });
    res.sendServerError = (error) =>
      res.status(500).send({ status: "error", error });
    res.sendUserError = (error) =>
      res.status(400).send({ status: "error", error });

    next();
  }
}
