import querystring from "querystring";
import instance from "../utils/axios";
export const POKEMON = {
  root: "/pokemon",
};

export function apiGetPokemonList(params) {
  const filter = querystring.stringify(params);
  return new Promise((resolve, reject) => {
    instance
      .get(`${POKEMON.root}?${filter}`)
      .then((response) => {
        resolve({ response: response.data });
      })
      .catch((err) => {
        reject({ error: err.response });
      });
  });
}

export function apiGetPokemonDetail(params) {
  const filter = querystring.stringify(params);
  return new Promise((resolve, reject) => {
    instance
      .get(`${POKEMON.root}/${querystring.parse(filter).params}`)
      .then((response) => {
        resolve({ response: response.data });
      })
      .catch((err) => {
        reject({ error: err.response });
      });
  });
}
