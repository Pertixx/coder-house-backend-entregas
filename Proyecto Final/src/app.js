import Routes from "./routes/index.js";
import { config } from "dotenv";
import express from "express";

config();

class App {
  constructor() {
    this.app = express();
  }

  init() {
    this.app.use(express.json());
    this._configureRoutes();
    const port = process.env.PORT || 3000;
    this.app.listen(port, () =>
      console.log(`Server listening on port ${port}`)
    );
  }

  _configureRoutes() {
    Routes.configure(this.app);
  }
}

const app = new App();
app.init();
