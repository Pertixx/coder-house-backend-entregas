import crypto from "crypto";

const DB = [];

class UserManager {
  getUsers = () => DB;

  insertUser = (user) => {
    //Encriptamos la password del user usando el modulo nativo de NodeJS "crypto"
    user.salt = crypto.randomBytes(128).toString("base64");
    user.password = crypto
      .createHmac("sha256", user.salt)
      .update(user.password)
      .digest("hex");
    DB.push(user);
  };
}

const manager = new UserManager();
manager.insertUser({
  name: "John",
  last_name: "Smith",
  username: "John Smith",
  password: "password",
});
console.log(manager.getUsers());
