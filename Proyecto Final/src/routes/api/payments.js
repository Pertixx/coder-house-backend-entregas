import {
  createPaymentsController,
  paymentCancelController,
  paymentSuccessController,
} from "../../controllers/payments.controller.js";

import Routes from "../routes.js";

export default class PaymentsRoutes extends Routes {
  init() {
    this.get("/createCheckout", ["USER", "PREMIUM"], createPaymentsController);
    this.get("/success", ["USER", "PREMIUM"], paymentSuccessController);
    this.get("/cancel", ["USER", "PREMIUM"], paymentCancelController);
  }
}
