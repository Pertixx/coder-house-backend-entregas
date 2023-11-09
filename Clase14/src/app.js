import express from "express";
import mongoose from "mongoose";
import pokemonRouter from "./routes/pokemon.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //cuando los datos llegan por formulario

app.use("/api/pokemons", pokemonRouter);

mongoose.set("strictQuery", false);
try {
  await mongoose.connect(
    "mongodb+srv://agustinperti:password1234@cluster0.li1fwsi.mongodb.net/integradora1",
    {
      useUnifiedTopology: true,
    }
  );
  app.listen(8080, () => console.log("listening on port 8080"));
} catch (error) {
  console.log(error.message);
}
