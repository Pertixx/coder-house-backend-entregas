import { Router } from "express";

const router = Router();

const users = [
  {
    id: 1,
    name: "Agustin",
  },
  {
    id: 2,
    name: "Pablo",
  },
  {
    id: 2,
    name: "Pepe",
  },
];

router.get("/", (req, res) => {
  res.render("showUsers", { users });
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const user = users.find((user) => user.id === id);
  res.render("showUser", user);
});

export default router;
