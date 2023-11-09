import express from "express";
import session from "express-session";

const app = express();

app.use(
  session({
    secret: "secretCoder",
    /*
    Resave permite mantener la sesion activa en caso de que la sesion
    se mantenga inactiva. Si se deja en false la sesion morira en caso
    de que exista cierto tiempo de inactividad.
  */
    resave: true,
    /*
      saveUninitialized permite guardar cualquier sesion aun cuando el objeto
      de sesion no tenga nada para contener. Si se deja en false la sesion no
      se guardara si el objeto de sesion esta vacio al final de la consulta.
    */
    saveUninitialized: true,
  })
);

app.get("/session", (req, res) => {
  // Si al conectarse la sesion ya existe entonces aumentar el contador
  if (req.session.counter) {
    req.session.counter++;
    res.send(`Se ha visitado el sitio ${req.session.counter} veces.`);
  } else {
    // Si no hay una sesion para el usuario, entonces inicializar el contador en 1
    req.session.counter = 1;
    res.send("¡Bienvenido!");
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (!err) res.send("Logout Ok!");
    else res.send({ status: "Logout ERROR", body: err });
  });
});

app.get("/login", (req, res) => {
  const { username, password } = req.query;
  if (username !== "pepe" || password !== "password") {
    return res.send("Login Failed");
  }
  req.session.user = username;
  req.session.admin = true;
  res.send("Login Success");
});

// Middleware de autenticacion
const auth = (req, res, next) => {
  if (req.session?.user === "pepe" && req.session?.admin) {
    return next();
  }
  return res.status(401).send("error de autorización!");
};

app.get("/privado", auth, (req, res) => {
  res.send("si estas viendo esto es porque ya te logueaste!");
});
