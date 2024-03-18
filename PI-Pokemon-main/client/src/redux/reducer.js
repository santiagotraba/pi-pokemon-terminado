//imports:
import {
    GET_POKEMONS,
    GET_POKEMON_BY_ID,
    GET_POKEMON_BY_NAME,
    FILTER_POKEMON_BY_ORIGIN,
    FILTER_BY_TYPE,
    GET_TYPES,
    ORDER_BY_NAME,
    CREATE_POKEMON,
    ORDER_BY_ATTACK,
} from "./action";

//estado inicial
const initialState = {
    allPokemons: [],
    detailPokemon: [],
    pokemonsFilter: [],
    types: [],
};

const reducer = (state = initialState, { payload, type }) => {
    switch (type) {
        case GET_POKEMONS:
            return {
                ...state,
                allPokemons: payload,
                pokemonsFilter: payload,
            };

        case GET_POKEMON_BY_ID:
            return {
                ...state,
                detailPokemon: payload,
            };

        case GET_POKEMON_BY_NAME:
            return {
                ...state,
                pokemonsFilter: [...payload],
            };
        case FILTER_POKEMON_BY_ORIGIN:
            let response = [];

            if (payload === "api") {
                response = state.allPokemons.filter(
                    (pokemon) => pokemon.id <= 120
                );
            }

            if (payload === "database") {
                response = state.allPokemons.filter(
                    (pokemon) => typeof pokemon.id != "number"
                );
            }

            if (payload == "all") {
                response = state.allPokemons;
            }
            return {
                ...state,
                pokemonsFilter: response,
            };
        case FILTER_BY_TYPE:
            let arrayOfTypes = [];
            if (payload) {
                arrayOfTypes = state.allPokemons.filter((pokemon) => {
                    return pokemon.types.some((pokeType) => {
                        return pokeType.type && pokeType.type.name === payload;
                    });
                });
            } else {
                arrayOfTypes = state.allPokemons;
            }

            return {
                ...state,
                pokemonsFilter: arrayOfTypes,
            };
        case GET_TYPES:
            return {
                ...state,
                types: payload,
            };

        case ORDER_BY_NAME:
            const orderPokemons = [...state.pokemonsFilter].sort((a, b) => {
                if (payload === "asc") {
                    return a.name.localeCompare(b.name);
                } else {
                    return b.name.localeCompare(a.name);
                }
            });

            return {
                ...state,
                pokemonsFilter: orderPokemons,
            };
        case ORDER_BY_ATTACK:
            if (payload == "asc") {
                const order = [...state.pokemonsFilter]?.sort((a, b) => {
                    if (a?.stats && b?.stats) {
                        return a.stats[1].base_stat - b.stats[1].base_stat;
                    }
                });
                return {
                    ...state,
                    pokemonsFilter: [order],
                };
            } else if (payload == "desc") {
                const order = [...state.pokemonsFilter].sort((a, b) => {
                    if (a?.stats && b?.stats) {
                        return b.stats[1].base_stat - a.stats[1].base_stat;
                    }
                });
                return {
                    ...state,
                    pokemonsFilter: order,
                };
            }
    }
};

export default reducer;

//primero creo la action
//luego mando la action al reducer
//el reducer procesa la informacion y actualiza el estado
//luego de esto lo conecto con el front
//tengo que usar el useSelector para conectar con el estado y leerlo para luego modificarlo
