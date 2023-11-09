import { Router } from "express";

const router = Router();

let pets = [
  {
    id: 1,
    name: "Seth",
  },
];

router.get("/", (req, res) => {
  res.status(200).json({ pets });
});

//etc...

export default router;
