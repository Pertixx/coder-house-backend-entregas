import fs from "fs";

export default class CartsManager {
  #path;
  #format;
  constructor(filename) {
    this.#path = filename;
    this.#format = "utf-8";
    this.#createFile();
  }

  #generateId = (carts) => {
    if (carts.length === 0) return "1";
    const lastId = parseInt(carts[carts.length - 1].id, 10);
    const newId = lastId + 1;
    return String(newId);
  };

  #createFile = async () => {
    try {
      await fs.promises.access(this.#path);
    } catch (error) {
      if (error.code === "ENOENT")
        return await fs.promises.writeFile(
          this.#path,
          JSON.stringify([], null, "\t")
        );
    }
  };

  getCarts = async () => {
    return JSON.parse(await fs.promises.readFile(this.#path, this.#format));
  };

  getCartById = async (id) => {
    let carts = await this.getCarts();
    let cart = carts.find((cart) => cart.id === id);
    return cart ? cart : null;
  };

  addProductToCart = async (cartId, productId) => {
    const carts = await this.getCarts();
    const cartIndex = carts.findIndex((cart) => cart.id === cartId);
    const cart = carts[cartIndex];
    const productIndex = cart.products.findIndex(
      (product) => product.id === productId
    );
    if (productIndex === -1) {
      cart.products.push({ id: productId, quantity: 1 });
    } else {
      cart.products[productIndex].quantity++;
    }
    await fs.promises.writeFile(this.#path, JSON.stringify(carts, null, "\t"));
    return { status: "Success" };
  };

  createCart = async () => {
    let carts = await this.getCarts();
    const cart = {
      id: this.#generateId(carts),
      products: [],
    };
    carts.push(cart);
    await fs.promises.writeFile(this.#path, JSON.stringify(carts, null, "\t"));
    return { status: "Success", message: "Cart created successfully" };
  };
}
