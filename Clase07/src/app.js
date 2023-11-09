import express from "express";

const app = express();
app.use(express.json()); //middleWare

let users = [
  {
    id: 1,
    name: "John",
    age: 21,
  },
  {
    id: 2,
    name: "Agustin",
    age: 23,
  },
];

const cursos = [
  {
    id: 1,
    name: "React Native",
    teacher: "John",
  },
  {
    id: 2,
    name: "JavaScript",
    teacher: "John Doe",
  },
];

app.listen(8080, () => console.log("Listening on port 8080"));

app.get("/", (req, res) => {
  res.status(200).send({ message: "Server OK" });
});

app.get("/users", (req, res) => {
  res.status(200).json({ users });
});

app.get("/cursos", (req, res) => {
  res.status(200).json({ cursos });
});

app.post("/users/", (req, res) => {
  const { id, name, age } = req.body;
  if (!id || !name || !age) {
    return res.status(404).json({ error: "Missing fields" });
  }
  const user = { id: parseInt(id, 10), name, age: parseInt(age, 10) };
  users.push(user);
  res.status(201).json({ message: "User added successfully", data: user });
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  users = users.filter((user) => user.id != id);
  res.status(200).json({ message: "User deleted successfully" });
});

app.put("/users/:id", (req, res) => {
  const id = req.params.id;
  const updatedFields = req.body;
  const user = users.find((user) => user.id == id);
  const userIndex = users.findIndex((user) => user.id == id);
  users[userIndex] = {
    ...user,
    ...updatedFields,
  };
  res.status(200).json({ message: "User updated successfully" });
});
