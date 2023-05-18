import ProductManager from "./ProductManager.js";
import express from "express";

const app = express();
const manager = new ProductManager("./products.json");

app.listen(8080, () => {
  console.log("Server Running on port 8080");
});

app.get("/", (req, res) => {
  res.send("Solicita tus productos!");
});

app.get("/products", async (req, res) => {
  const limit = req.query.limit;
  const products = await manager.getProducts();
  if (!limit) {
    res.send({ products });
  } else {
    //Send the number of products requested
    const limitedProducts = products.slice(0, limit);
    res.send({ limitedProducts });
  }
});

app.get("/products/:pid", async (req, res) => {
  const product = await manager.getProductById(req.params.pid);
  res.send({ product });
});
