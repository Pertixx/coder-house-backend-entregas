import { Router } from "express";
import pokemonModel from "../models/pokemon.model.js";

const router = Router();

router.get("/", async (req, res) => {
  const result = await pokemonModel.find();
  res.status(200).json({ status: "Success", payload: result });
});

router.get("/:name", (req, res) => {
  const name = req.params.name;
  res
    .status(200)
    .json({ status: "Success", payload: `Mostrando pokemon ${name}` });
});

router.post("/", async (req, res) => {
  const newPokemon = req.body;
  const pokemonGenerated = new pokemonModel(newPokemon);
  await pokemonGenerated.save();

  res.status(200).json({ status: "Success", payload: pokemonGenerated });
});

export default router;
