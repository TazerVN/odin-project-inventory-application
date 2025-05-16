const db = require("../db/queries");

async function getPokemonList(req, res) {
  if (req.query.type) {
    const query = req.query.type;
    const pokemonList = await db.getSearchPokemon(query);
    const typeList = await db.getAllTypes();
    res.render("index", {
      title: "Pokemon",
      list: pokemonList,
      types: typeList,
    });
  } else {
    const pokemonList = await db.getAllPokemon();
    const typeList = await db.getAllTypes();
    res.render("index", {
      title: "Pokemon",
      list: pokemonList,
      types: typeList,
    });
  }
}

async function postPokemonList(req, res) {
  console.log(req.body);
  if (Object.keys(req.body).length === 0) {
    res.redirect("/");
  }
  if (typeof req.body.type == "string") {
    res.redirect("/?type=" + req.body.type);
  } else {
    res.redirect("/?type=" + req.body.type[0] + "&type=" + req.body.type[1]);
  }
}

async function deleteAllPokemon(req, res) {
  res.redirect("/");
}

async function deletePokemon(req, res) {
  const id = req.query.id;
  await db.deletePokemon(id);
  res.redirect("/");
}

async function newPokemonGet(req, res) {
  const typeList = await db.getAllTypes();
  res.render("newPokemon", { types: typeList });
}

async function newPokemonPost(req, res) {
  const { name, type1, type2, gender } = req.body;
  await db.insertPokemon(name, type1, type2, gender);
  res.redirect("/");
}

module.exports = {
  getPokemonList,
  postPokemonList,
  deleteAllPokemon,
  deletePokemon,
  newPokemonGet,
  newPokemonPost,
};
