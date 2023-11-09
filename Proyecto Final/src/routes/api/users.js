import {
  addFilesController,
  deleteInactiveUsersController,
  deleteUserController,
  updatedUserRoleController,
} from "../../controllers/users.controller.js";

import Routes from "../routes.js";
import { uploaders } from "../../middlewares/multer.js";

export default class UsersRoutes extends Routes {
  init() {
    this.post("/premium/:uid", ["ADMIN"], updatedUserRoleController);
    this.post(
      "/:uid/documents",
      ["USER", "PREMIUM", "ADMIN"],
      uploaders,
      addFilesController
    );
    this.delete("/inactiveUsers", ["ADMIN"], deleteInactiveUsersController);
    this.delete("/:uid", ["ADMIN"], deleteUserController);
  }
}
