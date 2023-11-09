import mongoose from "mongoose";
import userModel from "./models/user.model.js";

const uri = "mongodb://localhost:27017";

try {
  //top-level await. No necesitamos async en Node -v 16 siempre y cunado estemos usando type = module
  await mongoose.connect(uri, {
    dbName: "advance1",
  });
  console.log("Db connected");
  const response = await userModel.find().explain("executionStats"); //no consologea los documentos sino el tiempo que demora en acceder a esos documentos
  console.log(response);
} catch (error) {
  console.log(error.message);
}
