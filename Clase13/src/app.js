import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/user.route.js";

const app = express();
app.use(express.json());

app.use("/users", userRoute);

try {
  await mongoose.connect(
    "mongodb+srv://agustinperti:password1234@cluster0.li1fwsi.mongodb.net/nombreBD"
  );
  app.listen(8080, () => console.log("listening on 8080"));
} catch (error) {
  console.log(error.message);
}
