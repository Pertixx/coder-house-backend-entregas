import {
  addProductsController,
  deleteProductsController,
  getProductsByIdController,
  getProductsController,
  updateProductsController,
} from "../../controllers/products.controller.js";

import Routes from "../routes.js";
import { uploaders } from "../../middlewares/multer.js";

export default class ProductsRoutes extends Routes {
  init() {
    this.get("/", ["USER", "ADMIN", "PREMIUM"], getProductsController);

    this.get("/:pid", ["USER", "ADMIN", "PREMIUM"], getProductsByIdController);

    this.post("/", ["ADMIN", "PREMIUM"], uploaders, addProductsController);

    this.put("/:pid", ["ADMIN", "PREMIUM"], updateProductsController);

    this.delete("/:pid", ["ADMIN", "PREMIUM"], deleteProductsController);
  }
}
