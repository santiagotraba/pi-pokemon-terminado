const { Pokemon, Type } = require("../db");
const axios = require("axios");
const { Op } = require("sequelize");

const getPokemons = async (req, res) => {
    const pokemonCallBack = async (url) => {
        const { data } = await axios.get(url);
        return data;
    };
    try {
        const arrayPokemons = [];
        const apiData = await axios.get(
            "https://pokeapi.co/api/v2/pokemon?limit=120"
        );
        const apiResponse = apiData.data.results;
        for (const pokemon of apiResponse) {
            const result = await pokemonCallBack(pokemon.url);
            arrayPokemons.push(result);
        }

        const pokemons = await Pokemon.findAll({
            include: [Type],
        });

        res.status(200).json([...arrayPokemons, ...pokemons]);
    } catch (error) {
        res.status(404).json({
            error: error.message,
        });
    }
};

const getPokemonsByName = async (req, res) => {
    const { name } = req.query;

    try {
        const response_DB = await Pokemon.findAll({
            where: {
                name: {
                    [Op.iLike]: `${name}`,
                },
            },
            include: [Type],
        });

        try {
            const response_API = await axios.get(
                `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
            );

            res.json([...response_DB, response_API.data]);
        } catch (error) {
            if (response_DB.length === 0) {
                res.status(404).json({ error: error.message });
            } else {
                res.json(response_DB);
            }
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const postPokemons = async (req, res) => {
    const { name, image, hp, attack, defense, speed, height, weight, types } =
        req.body;

    try {
        const newPokemon = await Pokemon.create({
            name,
            image,
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
        });

        const arrTypes = types.map(async (type) => {
            return await Type.findByPk(type);
        });

        await Promise.all(arrTypes)
            .then((res) =>
                res.forEach(async (type) => await newPokemon.addType(type))
            )
            .catch((err) => console.log("Error"));

        const includeTypeInPokemon = await Pokemon.findOne({
            where: {
                name: name,
            },
            include: {
                model: Type,
                through: {
                    attributes: [],
                },
            },
        });

        res.status(201).json(includeTypeInPokemon);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPokemonsById = async (req, res) => {
    const { id } = req.params;
    let API = {};

    try {
        if (id.length <= 3) {
            const { data } = await axios.get(
                `https://pokeapi.co/api/v2/pokemon/${id}`
            );

            API = {
                id: data.id,
                name: data?.name,
                image: data?.sprites.front_default,
                attack: data?.stats[1].base_stat,
                defense: data?.stats[3].base_stat,
                speed: data?.stats[5].base_stat,
                height: data?.height,
                weight: data?.weight,
                hp: data?.stats[0].base_stat,
                type: data?.types
                    ?.map((element) => element.type.name)
                    .join(", "),
            };

            res.status(200).json(API);
        } else {
            let pokeDb = await Pokemon.findByPk(id, {
                include: [
                    {
                        model: Type,
                        through: { attributes: [] },
                    },
                ],
            });

            res.status(200).json(pokeDb);
        }
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

module.exports = {
    getPokemons,
    getPokemonsByName,
    postPokemons,
    getPokemonsById,
};
