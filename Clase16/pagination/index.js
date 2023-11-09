import mongoose from "mongoose";
import userModel from "./models/user.model.js";

await mongoose.connect("mongodb>//localhost:27017", { dbName: "clase177" });
console.log("DB Connected!");

const users = await userModel.paginate(
  { gender: "Female" },
  { limit: 3, page: 1 }
);

console.log(users);
