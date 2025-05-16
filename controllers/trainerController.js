const db = require("../db/queries");

async function getTrainerList(req, res) {
  const trainerList = await db.getAllTrainer();
  res.render("trainer", { trainers: trainerList });
}

async function getNewTrainer(req, res) {
  const pokemonList = await db.getAllPokemon();
  res.render("newTrainer", { pokemons: pokemonList });
}

async function postNewTrainer(req, res) {
  const { name, p1, p2, p3, p4, p5, p6 } = req.body;
  console.log("p2: " + p2 + " p3: " + p3);
  await db.insertTrainer(name, p1, p2, p3, p4, p5, p6);
  res.redirect("/trainer");
}

async function deleteTrainer(req, res) {
  if (req.query.id) {
    await db.deleteTrainer(req.query.id);
    res.redirect("/trainer");
  }
}

module.exports = {
  getTrainerList,
  getNewTrainer,
  postNewTrainer,
  deleteTrainer,
};
