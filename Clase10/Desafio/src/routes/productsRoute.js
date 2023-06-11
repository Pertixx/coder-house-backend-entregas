import { Router } from "express";
import productManager from "../controllers/productManager.js";

const router = Router();
const manager = new productManager("./src/store/products.json");

router.get("/", (req, res) => {
  res.render("realTimeProducts");
});

export default router;
