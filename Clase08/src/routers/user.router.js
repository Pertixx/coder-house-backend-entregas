import { Router } from "express";

const router = Router();

let users = [
  {
    id: 1,
    name: "John",
  },
];

//endpoint to create a user, etc...
router.get("/", (req, res) => {
  res.status(200).json({ users });
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const user = users.find((user) => user.id === id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.status(200).json({ user });
});

router.post("/", (req, res) => {
  const { id, name } = req.body;
  const user = { id: parseInt(id, 10), name };
  users.push(user);
  res.json({ message: "Usuario creado con exito" });
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const data = req.body;
  const userIndex = users.findIndex((user) => user.id === id);
  users[userIndex] = { ...users[userIndex], ...data };
  res.json({ message: `Actualizacion exitosa del usuario con id= ${id}` });
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  users = users.filter((user) => user.id != id);
  res.json({ message: "Usuario eliminado con exito" });
});

export default router;
