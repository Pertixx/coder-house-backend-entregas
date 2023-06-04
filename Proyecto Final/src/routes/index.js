import cartsRoutes from "./api/carts.js";
import productsRoutes from "./api/products.js";

export default class Routes {
  static configure(app) {
    app.use("/api/products", productsRoutes);
    app.use("/api/carts", cartsRoutes);
  }
}
