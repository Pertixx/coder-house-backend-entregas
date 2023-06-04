import CartsManager from "../../helpers/cartsManager.js";
import ProductManager from "../../helpers/productManager.js";
import { Router } from "express";

const router = Router();
const manager = new CartsManager("./src/store/carts.json");
const productManager = new ProductManager("./src/store/products.json");

router.post("/", async (req, res) => {
  const response = await manager.createCart();
  res.status(200).json(response);
});

router.get("/:cid", async (req, res) => {
  const cart = await manager.getCartById(req.params.cid);
  if (!cart)
    return res
      .status(404)
      .json({ error: `Cart with cid ${req.params.cid} not found` });
  const products = cart.products;
  res.status(200).json({ products });
});

router.post("/:cid/product/:pid", async (req, res) => {
  const cart = await manager.getCartById(req.params.cid);
  if (!cart)
    return res
      .status(404)
      .json({ error: `Cart with cid ${req.params.cid} not found` });
  const product = await productManager.getProductById(req.params.pid);
  if (!product)
    return res
      .status(404)
      .json({ error: `Product with pid ${req.params.pid}` });
  const response = await manager.addProductToCart(
    req.params.cid,
    req.params.pid
  );
  res.status(200).json(response);
});

export default router;
