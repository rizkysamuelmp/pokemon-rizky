import axios from "axios";

export const getDataPokemon = async (data) => {
  return axios.get("https://pokeapi.co/api/v2/pokemon", {
    params: data,
    headers: { "Content-Type": "application/json" },
  });
};

export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const makeKey = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
