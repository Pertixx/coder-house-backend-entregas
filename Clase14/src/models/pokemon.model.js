import mongoose from "mongoose";

const pokemonSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  type: String,
  photo: { type: String, required: true },
});

const pokemonModel = mongoose.model("pokemons", pokemonSchema);

export default pokemonModel;
