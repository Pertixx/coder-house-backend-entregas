/*
  ¿Cómo lo hacemos? Se creará un middleware que, en cada momento, valide el acceso a partir de las políticas (Sólo PUBLIC, USER, ADMIN).

  Definir una función handlePolicies, 
  El método deberá recibir un arreglo de políticas (strings) y seguir los siguientes pasos:
  Si la única política es “PUBLIC”, continuar sin problema. 
  para el resto de casos, primero procesar el token de jwt, el cual llegará desde los headers de autorización.
  Posteriormente, validar el rol del usuario que esté dentro del token para corroborar si se encuentra dentro de las políticas
  Cada método get, post, put, delete deberá recibir antes de los callbacks, un arreglo de políticas. 
  Colocar handlePolicies como el primer middleware del procesamiento.

  Una vez configurado el router: 

  Crear un router session que cuente con un endpoint ‘/login’, el cual guardará al usuario en un token (no es necesario un registro, todo es hardcodeado para agilizar el proceso de políticas)
  En el router de usuario que ya existe, crear un endpoint que utilice las políticas de usuario, y otro que utilice sólo políticas públicas.
  Validar políticas con Postman.

  CONSIDERACIONES:
  1. Recordar agregar app.use(express.json()); para el login
  2. Recordar agregar a los headers de autorización el Bearer token en Postman.
  3. Enviar el jwt por medio de body para este caso
  4. Hardcodear el rol del cliente en “user”.
*/

const handlePolicies = (polices) => (req, res, next) => {
  if (polices[0] == "PUBLIC") return next(); //Cualquiera puede entrar
  const authHeaders = req.headers.authorization;

  if (!authHeaders)
    return res.status(401).send({ status: "error", message: "Unauthorized" });
  const token = authHeaders.split(" ")[1]; //Removemos el Bearer
  //Obtenemos el usuario a partir del token
  let user = jwt.verify(token, "CoderSecretClaseRouter");
  // El rol del usuario existe dentro del arreglo de politicas?
  if (!polices.includes(user.role.toUpperCase()))
    return res.status(403).send({ status: "error", message: "Role not found" });

  req.user = user;
  next();
};
