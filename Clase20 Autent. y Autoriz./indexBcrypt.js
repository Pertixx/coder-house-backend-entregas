// npm instlal bcrypt
// Estas funciones exportables tiene que ir en utils.js

import bcrypt from "bcrypt";

export const encode = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) =>
  bcrypt.compare(user.password, password);
