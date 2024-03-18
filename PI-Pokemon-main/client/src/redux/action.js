//action-types:
export const GET_POKEMONS = "GET_POKEMONS";
export const GET_POKEMON_BY_ID = "GET_POKEMON_BY_ID";
export const GET_POKEMON_BY_NAME = "GET_POKEMON_BY_NAME";
export const FILTER_POKEMON_BY_ORIGIN = "FILTER_POKEMON_BY_ORIGIN";
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";
export const GET_TYPES = "GET_TYPES";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const ORDER_BY_ATTACK = "ORDER_BY_ATTACK";

//imports:
import axios from "axios";

// ACTION
// allPokemons

export const getPokemons = () => {
    return async (dispatch) => {
        try {
            const endpoint = "http://localhost:3001/pokemons";
            const { data } = await axios.get(endpoint);
            return dispatch({
                type: GET_POKEMONS,
                payload: data,
            });
        } catch (error) {
            if (error) {
                error.message;
            }
        }
    };
};

//action
//getPokemonById
export const getPokemonById = (id) => {
    return async (dispatch) => {
        try {
            const endpoint = `http://localhost:3001/pokemons/${id}`;
            const { data } = await axios.get(endpoint);
            return dispatch({
                type: GET_POKEMON_BY_ID,
                payload: data,
            });
        } catch (error) {
            if (error) {
                error.message;
            }
        }
    };
};

//action
//getByName

export const getByName = (name) => {
    return async (dispatch) => {
        try {
            const endpoint = `http://localhost:3001/pokemons/name?name=${name}`;
            if (name == "") {
                return alert("La barra de busqueda no puede estar vacia");
            } else {
                const { data } = await axios.get(endpoint);

                return dispatch({
                    type: GET_POKEMON_BY_NAME,
                    payload: data,
                });
            }
        } catch (error) {
            error.message;
            alert("No existe el pokemon que esta buscando");
        }
    };
};

//action
//filterByOrigin

export const filterByOrigin = (payload) => {
    return {
        type: FILTER_POKEMON_BY_ORIGIN,
        payload: payload,
    };
};

//action
//filterByType

export const filterByType = (payload) => {
    return {
        type: FILTER_BY_TYPE,
        payload: payload,
    };
};

//action
//getTypes

export const getTypes = () => {
    return async (dispatch) => {
        try {
            const endpoint = `http://localhost:3001/types`;
            const { data } = await axios.get(endpoint);
            return dispatch({
                type: GET_TYPES,
                payload: data,
            });
        } catch (error) {
            error.message;
        }
    };
};

//action
//orderByNameAndAttack

export const orderByName = (payload) => {
    return {
        type: ORDER_BY_NAME,
        payload: payload,
    };
};

//action
//createPokemon

export const createPokemon = (payload) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(
                `http://localhost:3001/pokemons`,
                payload
            );
            dispatch({
                type: CREATE_POKEMON,
                payload: response.data,
            });
        } catch (error) {
            error.mesage;
            console.log(error.response.data.error);
        }
    };
};

//action
//orderByAttack
export const orderByAttack = (payload) => {
    return {
        type: ORDER_BY_ATTACK,
        payload: payload,
    };
};

//primero creo la action
//luego mando la action al reducer
//el reducer procesa la informacion y actualiza el estado
//luego de esto lo conecto con el front
//tengo que usar el useSelector para conectar con el estado y leerlo para luego modificarlo
