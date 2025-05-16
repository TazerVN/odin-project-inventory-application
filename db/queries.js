const pool = require("./pool");

async function getAllPokemon() {
  const { rows } = await pool.query(
    "SELECT p.pokemon_id AS p_id, p.pokemon_name AS p_name, t1.type_name AS t1_name, t2.type_name AS t2_name, g.gender AS gender FROM pokemons AS p LEFT JOIN types AS t1 ON p.pokemon_first_type_id = t1.type_id LEFT JOIN types AS t2 ON p.pokemon_second_type_id = t2.type_id LEFT JOIN genders AS g ON p.gender_id = g.gender_id "
  );
  return rows;
}

async function getSearchPokemon(query) {
  if (!Array.isArray(query)) {
    query = [query];
  }
  const optionalParam = () => {
    const stringOption = [];
    for (let i = 1; i < query.length + 1; i++) {
      stringOption.push("$" + i);
    }
    return stringOption;
  };
  console.log(query);
  console.log(optionalParam());
  const param = optionalParam();
  const queryString =
    "SELECT p.pokemon_id AS p_id, p.pokemon_name AS p_name, t1.type_name AS t1_name, t2.type_name AS t2_name, g.gender AS gender FROM pokemons AS p LEFT JOIN types AS t1 ON p.pokemon_first_type_id = t1.type_id LEFT JOIN types AS t2 ON p.pokemon_second_type_id = t2.type_id LEFT JOIN genders AS g ON p.gender_id = g.gender_id WHERE (t1.type_name IN (" +
    param +
    ") AND t2.type_name IN (" +
    param +
    ")) OR (t1.type_name IN (" +
    param +
    ") OR t2.type_name IN (" +
    param +
    "))";
  const { rows } = await pool.query(queryString, query);
  return rows;
}

async function getAllTypes() {
  const { rows } = await pool.query("SELECT DISTINCT * FROM types");
  return rows;
}

async function getAllTrainer() {
  const { rows } = await pool.query(
    "SELECT t.trainer_id, t.trainer_name, p1.pokemon_name AS p1_name, p2.pokemon_name AS p2_name, p3.pokemon_name AS p3_name, p4.pokemon_name AS p4_name, p5.pokemon_name AS p5_name, p6.pokemon_name AS p6_name FROM trainers AS t LEFT JOIN pokemons AS p1 ON t.trainer_pokemon_1_id = p1.pokemon_id LEFT JOIN pokemons AS p2 ON t.trainer_pokemon_2_id = p2.pokemon_id LEFT JOIN pokemons AS p3 ON t.trainer_pokemon_3_id = p3.pokemon_id LEFT JOIN pokemons AS p4 ON t.trainer_pokemon_4_id = p4.pokemon_id LEFT JOIN pokemons AS p5 ON t.trainer_pokemon_5_id = p5.pokemon_id LEFT JOIN pokemons AS p6 ON t.trainer_pokemon_6_id = p6.pokemon_id"
  );
  return rows;
}

async function insertPokemon(name, type1, type2, gender) {
  if (type2 == "") {
    type2 = null;
  }
  await pool.query(
    "INSERT INTO pokemons (pokemon_name, pokemon_first_type_id, pokemon_second_type_id ,gender_id) VALUES ($1, $2, $3, $4)",
    [name, type1, type2, gender]
  );
}

async function insertType(name) {
  await pool.query("INSERT INTO types (type_name) VALUES ($1)", [name]);
}

async function deleteTrainer(id) {
  await pool.query("DELETE FROM trainers WHERE trainer_id = $1", [id]);
}

async function insertTrainer(name, p1, p2, p3, p4, p5, p6) {
  if (p2.length == 0) {
    p2 = null;
  }
  if (p3.length == 0) {
    p3 = null;
  }
  if (p4.length == 0) {
    p4 = null;
  }
  if (p5.length == 0) {
    p5 = null;
  }
  if (p6.length == 0) {
    p6 = null;
  }

  console.log(p3);

  await pool.query(
    "INSERT INTO trainers (trainer_name, trainer_pokemon_1_id, trainer_pokemon_2_id, trainer_pokemon_3_id, trainer_pokemon_4_id, trainer_pokemon_5_id, trainer_pokemon_6_id) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    [name, p1, p2, p3, p4, p5, p6]
  );
}

async function deleteAllPokemon() {
  await pool.query("DELETE FROM pokemons");
}

async function deletePokemon(id) {
  await pool.query("DELETE FROM pokemons WHERE pokemon_id = $1", [id]);
}

module.exports = {
  getAllPokemon,
  deleteAllPokemon,
  getAllTypes,
  insertPokemon,
  getSearchPokemon,
  getAllTrainer,
  insertType,
  insertTrainer,
  deleteTrainer,
  deletePokemon,
};
