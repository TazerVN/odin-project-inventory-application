const { Router } = require("express");
const indexController = require("../controllers/indexController");
const indexRouter = Router();

indexRouter.get("/", indexController.getPokemonList);
indexRouter.post("/", indexController.postPokemonList);
indexRouter.get("/delete", indexController.deleteAllPokemon);
indexRouter.post("/delete", indexController.deletePokemon);

indexRouter.get("/new", indexController.newPokemonGet);
indexRouter.post("/new", indexController.newPokemonPost);

module.exports = indexRouter;
