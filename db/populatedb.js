const { Client } = require("pg");
require("dotenv").config();

const SQL = `
DROP TABLE IF EXISTS trainers, types, pokemons, genders;

CREATE TABLE IF NOT EXISTS types (
  type_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  type_name VARCHAR ( 255 ) NOT NULL
);

CREATE TABLE IF NOT EXISTS genders (
  gender_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  gender VARCHAR( 255 )
);

CREATE TABLE IF NOT EXISTS pokemons (
  pokemon_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  pokemon_name VARCHAR ( 255 ) NOT NULL,
  gender_id INTEGER,
  pokemon_first_type_id INTEGER NOT NULL,
  pokemon_second_type_id INTEGER,
  FOREIGN KEY (pokemon_first_type_id) REFERENCES types (type_id),
  FOREIGN KEY (pokemon_second_type_id) REFERENCES types (type_id),
  FOREIGN KEY (gender_id) REFERENCES genders (gender_id)

);

CREATE TABLE IF NOT EXISTS trainers (
  trainer_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  trainer_name VARCHAR ( 255 ) NOT NULL,
  trainer_pokemon_1_id INTEGER,
  trainer_pokemon_2_id INTEGER,
  trainer_pokemon_3_id INTEGER,
  trainer_pokemon_4_id INTEGER,
  trainer_pokemon_5_id INTEGER,
  trainer_pokemon_6_id INTEGER,
  CONSTRAINT p1_fk FOREIGN KEY (trainer_pokemon_1_id) REFERENCES pokemons (pokemon_id)
  ON DELETE SET NULL,
  CONSTRAINT p2_fk FOREIGN KEY (trainer_pokemon_2_id) REFERENCES pokemons (pokemon_id)
  ON DELETE SET NULL,
  CONSTRAINT p3_fk FOREIGN KEY (trainer_pokemon_3_id) REFERENCES pokemons (pokemon_id)
  ON DELETE SET NULL,
  CONSTRAINT p4_fk FOREIGN KEY (trainer_pokemon_4_id) REFERENCES pokemons (pokemon_id)
  ON DELETE SET NULL,
  CONSTRAINT p5_fk FOREIGN KEY (trainer_pokemon_5_id) REFERENCES pokemons (pokemon_id)
  ON DELETE SET NULL,
  CONSTRAINT p6_fk FOREIGN KEY (trainer_pokemon_6_id) REFERENCES pokemons (pokemon_id)
  ON DELETE SET NULL
);

INSERT INTO genders (gender)
  VALUES
  ('Male'),
  ('Female'),
  ('Null');

INSERT INTO types (type_name)
  VALUES
  ('Fire'),
  ('Electric'),
  ('Grass'),
  ('Flying'),
  ('Water'),
  ('Dark'),
  ('Psychic');

INSERT INTO pokemons (pokemon_name, pokemon_first_type_id, pokemon_second_type_id, gender_id) 
  VALUES
  ('Pikachu', 2, NULL, 1),
  ('Charmander', 1, NULL, 2),
  ('Rowlet', 3, 4, 1);

INSERT INTO trainers (trainer_name, trainer_pokemon_1_id, trainer_pokemon_2_id)
  VALUES
  ('Red', 1, 2),
  ('Ash', 1, 1);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.SQL_CONNECTION_STRING,
  });
  await client.connect();
  console.log("connected");
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
