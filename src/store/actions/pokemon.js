import { getDataPokemon } from "../../utils";
import {
  SET_POKEMON,
  SET_LOADING,
  SET_HISTORY,
  SET_SELECT,
  SET_FORM,
  SET_SEARCH,
} from "../types";

export const setSearch = (payload) => ({
  type: SET_SEARCH,
  payload,
});

export const setForm = (payload) => ({
  type: SET_FORM,
  payload,
});

export const setSelectPokemon = (payload) => ({
  type: SET_SELECT,
  payload,
});

export const setHistory = (payload) => ({
  type: SET_HISTORY,
  payload,
});

export const setLoading = (payload) => ({
  type: SET_LOADING,
  payload,
});

export const setPokemons = (payload) => ({
  type: SET_POKEMON,
  payload,
});

export const getPokemonData = (history) => {
  const all = { limit: 70, offset: 0 };
  return async (dispatch) => {
    dispatch(setLoading(true));
    getDataPokemon(all)
      .then(({ data }) => {
        const listPokemon = data.results?.map((item) => ({
          ...item,
          total: history
            .filter((el) => item.name === el.name)
            .sort((x, y) => {
              return x.date < y.date ? 1 : -1;
            })[0]?.total,
        }));
        dispatch(setPokemons(listPokemon));
        localStorage.setItem("listPokemon", JSON.stringify(listPokemon));
      })
      .catch((err) => {});
  };
};
