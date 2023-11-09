import {
  getCartViewController,
  getChatController,
  getProductsByIdViewController,
  getProductsViewsController,
  getRealTimeProductsController,
} from "../../controllers/views.controller.js";

import Routes from "../routes.js";

export default class ViewsProductsRoutes extends Routes {
  init() {
    this.get("/", ["USER", "ADMIN", "PREMIUM"], getProductsViewsController);

    this.get(
      "/realTimeProducts",
      ["ADMIN", "PREMIUM"],
      getRealTimeProductsController
    );

    this.get("/chat", ["USER", "PREMIUM"], getChatController);

    this.get(
      "/product/:pid",
      ["USER", "ADMIN", "PREMIUM"],
      getProductsByIdViewController
    );

    this.get(
      "/carts/:cid",
      ["USER", "ADMIN", "PREMIUM"],
      getCartViewController
    );
  }
}
