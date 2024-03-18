// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const express = require("express");
const { Pokemon, Type } = require("../db");
const router = express.Router();
const axios = require("axios");
const { Op } = require("sequelize");
const {
    getPokemons,
    getPokemonsByName,
    postPokemons,
    getPokemonsById,
} = require("../controllers/pokemonController");

const { getTypes } = require("../controllers/typeController");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/pokemons", getPokemons);

router.get("/pokemons/name", getPokemonsByName);

router.post("/pokemons", postPokemons);

router.get("/pokemons/:id", getPokemonsById);

router.get("/types", getTypes);

module.exports = router;
