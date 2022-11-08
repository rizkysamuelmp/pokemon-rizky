/* eslint-disable react-hooks/exhaustive-deps */
// Page
// --------------------------------------------------------

import React, { useEffect } from "react";
import InputText from "../components/InputText";
import { useNavigate } from "react-router-dom";
import { capitalize, makeKey } from "../utils";

// redux
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemonData,
  setHistory,
  setPokemons,
  setSearch,
  setSelectPokemon,
} from "../store/actions/pokemon";

// asset
import { ReactComponent as IconSearch } from "../asset/icon-search.svg";

const Page = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { pokemons, history, search } = useSelector((state) => state.pokemon);
  const pokemonsLocal = JSON.parse(localStorage.getItem("listPokemon")) || null;
  const historyLocal = JSON.parse(localStorage.getItem("history")) || null;

  let filterPokemons = [];

  if (pokemons) {
    // Prioritize get pokemons on redux
    filterPokemons = pokemons?.filter((pokemon) =>
      pokemon.name?.includes(search.toLowerCase())
    );
    if (!pokemonsLocal) {
      // Pokemons on local storage and redux not sync, this line will delete history
      localStorage.removeItem("history");
    }
  } else if (pokemonsLocal) {
    filterPokemons = pokemonsLocal?.filter((pokemon) =>
      pokemon.name?.includes(search.toLowerCase())
    );
    // Set redux pokemon from local storage
    dispatch(setPokemons(pokemonsLocal));
  }

  useEffect(() => {
    if (historyLocal && historyLocal?.length > 0) {
      // Sync redux history and local storage
      dispatch(setHistory(historyLocal));
    }
    // Get pokemon pokemon on network when localstorage empty
    if (!pokemons && !pokemonsLocal) {
      if (history) {
        dispatch(getPokemonData(history));
      } else {
        dispatch(getPokemonData(historyLocal));
      }
    }
  }, [pokemons]);

  const handleDetail = (item) => {
    dispatch(setSelectPokemon(item));
    navigate("/detail");
  };

  return (
    <div className="max-w-2xl m-auto flex flex-col gap-2 py-6 px-4 min-w-fit text-black whitespace-nowrap h-fit pb-28">
      {/* Title */}
      <h1 className="font-rubik font-bold xl:text-xxl text-lg xl:h-20 flex items-center mb-8 xl:mb-0 whitespace-nowrap">
        Stok Pokémon
      </h1>

      {/* Search Input*/}
      <InputText
        value={search}
        placeholder="Cari Pokémon"
        className="xl:max-w-sm"
        iconComponents={<IconSearch className="self-center" />}
        onChange={(e) => dispatch(setSearch(e.target.value))}
      />

      {/* Table */}
      <div className="text-xs">
        <div className="border-b-2 border-black py-3 flex justify-between gap-5">
          <p className="font-medium font-rubik">Nama</p>
          <p className="font-medium font-rubik">Stock</p>
        </div>
        {filterPokemons?.map((item) => (
          <div
            key={makeKey(3)}
            className="border-b-2 border-gray py-3 flex justify-between hover:bg-green-soft cursor-pointer hover:px-3 hover:shadow-lg gap-5"
            onClick={() => handleDetail(item)}
          >
            <p className="font-bold font-nunito text-blue-dark ">
              {capitalize(item.name)}
            </p>
            <p className="font-bold font-nunito text-black ">{`${
              item.total > 0 ? item.total : 0
            } pcs`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
