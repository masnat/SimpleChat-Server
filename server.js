const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: process.env.username,
  password: process.env.password,
  host: process.env.host,
  database: process.env.database,
  port: process.env.port,
});

app.get("/api/chats", async (req, res) => {
  const result = await pool.query("SELECT * FROM chats");
  res.json(result.rows);
});

app.post("/api/chats", async (req, res) => {
  const { senderName, receiverName, message } = req.body;
  let data = [];
  const result = await pool.query(
    "INSERT INTO chats(sender_name, receiver_name, message) VALUES($1, $2, $3)\
    RETURNING *",
    [senderName, receiverName, message]
  );
  data.push(result.rows[0]);
  // get random pokemon from python api
  const pokemonres = await axios.get(
    "http://127.0.0.1:8000/pokemons/0?include=type"
  );
  // if (pokemon.data) {
  // console.log("pokemonres.data", pokemonres.data.data);
  const pokemondata = pokemonres.data.data;
  // console.log("pokemondata.attributes", pokemondata[0].attributes);
  const pokemonresult = await pool.query(
    "INSERT INTO chats(sender_name, receiver_name, message) VALUES($1, $2, $3)\
    RETURNING *",
    [
      senderName,
      receiverName,
      pokemondata[0].attributes.name +
        "\n" +
        pokemondata[0].attributes.description,
    ]
  );
  data.push(pokemonresult.rows[0]);

  res.json(data);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
