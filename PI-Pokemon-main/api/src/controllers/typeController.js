const { Pokemon, Type } = require("../db");
const axios = require("axios");

const getTypes = async (req, res) => {
    try {
        const response = await axios.get("https://pokeapi.co/api/v2/type");
        const typesDatabase = await Type.findAll();

        if (response) {
            const pokeType = response.data.results;
            const mapType = await Promise.all(
                pokeType.map((type) => Type.create({ name: type.name }))
            );
            res.status(200).json(mapType);
        } else {
            res.status(200).json(typesDatabase);
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { getTypes };
