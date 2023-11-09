import mongoose from "mongoose";

export default mongoose.model(
  "users",
  mongoose.Schema({
    first_name: { type: String, index: true }, //el index ayuda a que la consulta sea mas rapida
    last_name: String,
    email: String,
    gender: String,
  })
);
