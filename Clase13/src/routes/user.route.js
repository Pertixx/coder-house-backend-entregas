import { Router } from "express";
import { userModel } from "../models/user.model.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await userModel.find();
    res.json({ status: "Success", payload: users });
  } catch (error) {
    res.json({ status: "error", error: error.message });
  }
});

router.post("/", async (req, res) => {
  const { first_name, last_name, email } = req.body;

  const result = await userModel.create({ first_name, last_name, email });
  res.json({ status: "Success", payload: result });
});

export default router;
