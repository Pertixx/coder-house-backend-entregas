import ProductManager from "../../helpers/productManager.js";
import { Router } from "express";

const router = Router();
const manager = new ProductManager("./src/store/products.json");

router.get("/", async (req, res) => {
  const limit = req.query.limit;
  const products = await manager.getProducts();
  if (!limit) return res.status(200).json({ products });
  const limitedProducts = products.slice(0, limit);
  res.status(200).json({ limitedProducts });
});

router.get("/:pid", async (req, res) => {
  const product = await manager.getProductById(req.params.pid);
  if (!product)
    return res
      .status(404)
      .json({ error: `Product with pid ${req.params.pid} not found` });
  res.status(200).json({ product });
});

router.post("/", async (req, res) => {
  const response = await manager.addProduct(req.body);
  if (!response.error) return res.status(200).json({ status: response.status });
  res.status(400).json(response);
});

router.put("/:pid", async (req, res) => {
  const response = await manager.updateProduct(req.params.pid, req.body);
  if (!response)
    return res
      .status(404)
      .json({ error: `Product with pid ${req.params.pid} not found` });
  res.status(200).json(response);
});

router.delete("/:pid", async (req, res) => {
  const response = await manager.deleteProduct(req.params.pid);
  if (!response)
    return res
      .status(404)
      .json({ error: `Product with pid ${req.params.pid} not found` });
  res.status(200).json(response);
});

export default router;
