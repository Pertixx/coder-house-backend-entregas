import fs from "fs";

class ProductManager {
  #path;
  #format;
  constructor(fileName) {
    this.#path = fileName;
    this.#format = "utf-8";
  }

  #generateId = (products) =>
    products.length === 0 ? 1 : products[products.length - 1].id + 1;

  #validateProduct = (products, product) => {
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.thumbnail ||
      !product.code ||
      !product.stock
    ) {
      return {
        valid: false,
        error: `[${product.title}]: Todos los campos son obligatorios`,
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
    return await fs.promises.writeFile(
      this.#path,
      JSON.stringify([], null, "\t")
    );
  };

  getProducts = async () => {
    try {
      return JSON.parse(await fs.promises.readFile(this.#path, this.#format));
    } catch (error) {
      if (error.code === "ENOENT") {
        console.log(`No existe el archivo con nombre ${this.#path}`);
        console.log("Creandolo por ti...");
        await this.#createFile();
        console.log("Listo!");
        return JSON.parse(await fs.promises.readFile(this.#path, this.#format));
      } else {
        throw error;
      }
    }
  };

  getProductById = async (id) => {
    let products = await this.getProducts();
    let product = products.find((product) => product.id === id);
    return product ? product : `No se encontro producto con [id]: ${id}`;
  };

  updateProduct = async (id, updatedProduct) => {
    let product = await this.getProductById(id);
    if (typeof product !== "object") return product;

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
  };

  deleteProduct = async (id) => {
    let product = await this.getProductById(id);
    if (typeof product !== "object") return product;

    let products = await this.getProducts();
    products = products.filter((product) => product.id !== id);

    await fs.promises.writeFile(
      this.#path,
      JSON.stringify(products, null, "\t")
    );
  };

  addProduct = async (product) => {
    let products = await this.getProducts();
    const isValid = this.#validateProduct(products, product);
    if (isValid.valid) {
      product.id = this.#generateId(products);
      products.push(product);
      await fs.promises.writeFile(
        this.#path,
        JSON.stringify(products, null, "\t")
      );
    } else {
      console.log(isValid.error);
    }
  };
}

//Tests

const manager = new ProductManager("./products.json");

await manager.addProduct({
  title: "Producto 1",
  description: "Producto 1 description",
  price: 1,
  thumbnail: "ejemplo",
  code: "abc123",
  stock: 10,
});

await manager.addProduct({
  title: "Producto 2",
  description: "Producto 2 description",
  price: 2,
  thumbnail: "ejemplo 2",
  code: "abc124",
  stock: 20,
});

console.log(await manager.getProducts());

console.log(await manager.getProductById(1));

await manager.updateProduct(1, { title: "Probando 123" });

await manager.deleteProduct(2);
