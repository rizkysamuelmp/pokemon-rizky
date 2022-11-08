import {
  SET_LOADING,
  SET_POKEMON,
  SET_HISTORY,
  SET_SELECT,
  SET_FORM,
  SET_SEARCH,
} from "../types";

const initialState = {
  isLoading: false,
  pokemons: null,
  search: "",
  selectPokemon: null,
  initiateHistory: {
    date: "2022-11-07T16:36:52.865Z",
    activity: "Stok Awal",
    quantity: 0,
    total: 0,
    note: "",
  },
  form: {
    name: "",
    date: "",
    activity: "Update Stok",
    quantity: 0,
    total: 0,
    note: "",
  },
  history: [],
};

const pokemon = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH:
      return {
        ...state,
        search: action.payload,
      };
    case SET_FORM:
      return {
        ...state,
        form: action.payload,
      };
    case SET_SELECT:
      return {
        ...state,
        selectPokemon: action.payload,
      };
    case SET_HISTORY:
      return {
        ...state,
        history: action.payload,
      };
    case SET_POKEMON:
      return {
        ...state,
        pokemons: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export default pokemon;
