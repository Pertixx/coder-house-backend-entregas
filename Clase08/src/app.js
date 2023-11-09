import express from "express";
import multer from "multer"; //middleware
import petRouter from "./routers/pet.router.js";
import userRouter from "./routers/user.router.js";

const app = express();
app.use(express.json());
app.use(express.static("src/public/"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/public/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploader = multer({ storage });

//endpoints

app.post("/", uploader.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file" });
  res
    .status(200)
    .json({ status: "Success", message: "File uploaded successfully" });
});

app.get("/", (req, res) => {
  res.send("OK");
});

app.get("/health", (req, res) => {
  res.json({ message: "The server is running on port 8080" });
});

const middleware1 = (req, res, next) => {
  //esto iria en la carpeta middlewares
  //Se ejecuta antes de consultar algo de users
  console.log("Soy un middleware");
  if (error) return res.status(400).json({ error: "Hubo un error" });
  next();
};

app.use("/users", middleware1, userRouter);
app.use("/pets", petRouter);

app.listen(8080, () => console.log("listening on port 8080"));
