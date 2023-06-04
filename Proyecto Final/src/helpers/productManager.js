import fs from "fs";

export default class ProductManager {
  #path;
  #format;
  constructor(fileName) {
    this.#path = fileName;
    this.#format = "utf-8";
    this.#createFile();
  }

  #generateId = (products) => {
    if (products.length === 0) {
      return "1";
    } else {
      const lastId = parseInt(products[products.length - 1].id, 10);
      const newId = lastId + 1;
      return String(newId);
    }
  };

  #validateProduct = (products, product) => {
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.code ||
      !product.status ||
      !product.category ||
      !product.stock
    ) {
      return {
        valid: false,
        error: "Todos los campos menos thumbnails son obligatorios",
      };
    } else {
      const found = products.find((item) => item.code === product.code);
      return found
        ? {
            valid: false,
            error: `[${product.title}]: El campo 'Code' no puede repetirse`,
          }
        : { valid: true };
    }
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

  getProducts = async () => {
    return JSON.parse(await fs.promises.readFile(this.#path, this.#format));
  };

  getProductById = async (id) => {
    let products = await this.getProducts();
    let product = products.find((product) => product.id === id);
    return product ? product : null;
  };

  updateProduct = async (id, updatedProduct) => {
    let product = await this.getProductById(id);
    if (!product) return product;

    let products = await this.getProducts();

    products = products.map((product) => {
      if (product.id === id) {
        return { ...product, ...updatedProduct };
      } else {
        return product;
      }
    });
    await fs.promises.writeFile(
      this.#path,
      JSON.stringify(products, null, "\t")
    );
    return { status: "Success" };
  };

  deleteProduct = async (id) => {
    let product = await this.getProductById(id);
    if (!product) return product;

    let products = await this.getProducts();
    products = products.filter((product) => product.id !== id);

    await fs.promises.writeFile(
      this.#path,
      JSON.stringify(products, null, "\t")
    );
    return { status: "Success" };
  };

  addProduct = async (product) => {
    let products = await this.getProducts();
    const isValid = this.#validateProduct(products, product);
    if (isValid.valid) {
      product.id = this.#generateId(products);
      if (!product.thumbnails) product.thumbnails = [];
      products.push(product);
      await fs.promises.writeFile(
        this.#path,
        JSON.stringify(products, null, "\t")
      );
      return { status: "Success" };
    } else {
      return { status: "Error", error: isValid.error };
    }
  };
}
