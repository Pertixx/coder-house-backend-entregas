class ProductManager {
  #products;
  constructor() {
    this.#products = [];
  }

  #generateId = () =>
    this.#products.length === 0
      ? 1
      : this.#products[this.#products.length - 1].id + 1;

  #validateProduct = (title, description, price, thumbnail, code, stock) => {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      return {
        valid: false,
        error: `[${title}]: Todos los campos son obligatorios`,
      };
    } else {
      const found = this.#products.find((item) => item.code === code);
      return found
        ? {
            valid: false,
            error: `[${title}]: El campo 'Code' no puede repetirse`,
          }
        : { valid: true };
    }
  };

  getProducts = () => this.#products;

  addProduct = (title, description, price, thumbnail, code, stock) => {
    const isValid = this.#validateProduct(
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    );
    isValid.valid
      ? this.#products.push({
          id: this.#generateId(),
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
        })
      : console.log(isValid.error);
  };

  getProductById = (id) => {
    const product = this.#products.find((item) => item.id === id);
    return product ? product : `Not Found event with id: ${id}`;
  };
}

//Testing

const productManager = new ProductManager();
console.log(productManager.getProducts());
productManager.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);
console.log(productManager.getProducts());
productManager.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
); //Error no se puede repetir el codigo
console.log(productManager.getProductById(1)); //Obtengo el primer producto insertado
console.log(productManager.getProductById(0)); //Obtengo un error si no encuentra el producto con ese id
