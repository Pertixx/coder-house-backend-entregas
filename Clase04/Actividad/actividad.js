//Actividad en clase
import fs from "fs";

const user1 = {
  userName: "AgustinP",
  age: 22,
  email: "ejemplo@gmail.com",
};
const user2 = {
  userName: "Ramiro",
  age: 25,
  email: "ejemplo@gmail.com",
};

await fs.promises.writeFile(
  "./users.json",
  JSON.stringify([user1, user2], null, "\t")
);
//Modificamos la edad del usuario 2
let contenido = JSON.parse(await fs.promises.readFile("./users.json", "utf-8"));
contenido[1].age = 35;
await fs.promises.writeFile(
  "./users.json",
  JSON.stringify(contenido, null, "\t")
);

//Ahora lo hacemos con clases

class UserManager {
  constructor(fileName) {
    this.filename = fileName;
    this.format = "utf-8";
  }

  createUser = async (username, age, email) => {
    const users = await this.getUsers();
    users.push({ username, age, email });
    return await fs.promises.writeFile(
      this.filename,
      JSON.stringify(users, null, "\t")
    );
  };

  getUsers = async () => {
    return JSON.parse(await fs.promises.readFile(this.filename, this.format));
  };
}

const userManager = new UserManager("./users.json");
userManager.createUser("AgustinP", 22, "ejemplo@gmail.com");
