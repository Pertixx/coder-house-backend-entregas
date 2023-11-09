//Creamos las funciones necesarias para JWT aca
//Hacemos npm install express jsonwebtoken
import jwt from "jsonwebtoken";

//Una private key sirve para utilizarse al momento de hacer el cifrado del token

const PRIVATE_KEY = "CoderKeyQueFuncionaComoUnSecret";

/*
  generateToken: al utilizar jwt.sign
  El primer argumento es un objeto con la informacion
  El segundo argumento es la llave privada con la cual se realizara el cifrado
  El tercer argumento es el tiempo de expiracion del token
*/

const generateToken = (user) => {
  const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: "24h" });
  return token;
};

const authToken = (req, res, next) => {
  //Recormdemos que el token viene desde los headers de autorizacion
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).send({
      //Si no hay headers es pq no hay token, entonces no esta autenticado
      error: "Not Authenticated",
    });

  const token = authHeader.split(" ")[1]; //Se hace el split para retirar la palabra Bearer

  jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
    //jwt verifica el token existente y corrobora si es un token valido, alterado, expirado, etc...
    if (error) return res.status(403).send({ error: "Not authorized" });
    req.user = credentials.user;
    next();
  });
};
