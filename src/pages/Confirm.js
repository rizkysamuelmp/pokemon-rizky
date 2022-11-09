/* eslint-disable react-hooks/exhaustive-deps */
// Confirm
// --------------------------------------------------------

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import Button from "../components/Button";
import InputText from "../components/InputText";

// redux
import { useDispatch, useSelector } from "react-redux";
import { setForm, setHistory, setPokemons } from "../store/actions/pokemon";

// asset
import { ReactComponent as IconArrowLeft } from "../asset/icon-arrow-left.svg";
import { ReactComponent as ArrowFormard } from "../asset/arrow-forward.svg";
import { ReactComponent as IconEdit } from "../asset/icon-edit.svg";

const Confirm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectPokemon, initiateHistory, history, form, pokemons } =
    useSelector((state) => state.pokemon);

  const [isOpen, setIsOpen] = useState(false);
  const [pcs, setPcs] = useState("0");
  const [lusin, setLusin] = useState("0");

  useEffect(() => {
    console.warn("Isi pcs : ", pcs);
    console.warn("Isi lusin : ", lusin);
  }, [pcs, lusin]);

  // Page will back to home when there is no pokemon selected
  useEffect(() => {
    if (!selectPokemon) {
      navigate("/");
    }
    setPcs(`${form.pcs}`);
    setLusin(`${form.lusin}`);
  }, []);

  const thisPokemon = history.filter(
    (item) => item.name === selectPokemon?.name
  );

  const combineHistory = [...thisPokemon, initiateHistory].sort((x, y) => {
    return x.date < y.date ? 1 : -1;
  });

  const handlePcs = (e) => {
    if (parseInt(e.target.value) >= 0) {
      setPcs(e.target.value);
    } else {
      setPcs("0");
    }
  };

  const handleLusin = (e) => {
    if (parseInt(e.target.value) >= 0) {
      setLusin(e.target.value);
    } else {
      setLusin("0");
    }
  };

  const handleConfirm = () => {
    const dataPcs = parseInt(pcs);
    const dataLusin = parseInt(lusin);
    dispatch(
      setForm({
        name: selectPokemon?.name,
        date: new Date(),
        activity: "Update Stok",
        quantity:
          dataLusin > 0 && dataPcs > 0
            ? dataLusin * 12 + dataPcs
            : dataLusin > 0
            ? dataLusin * 12
            : dataPcs,
        total:
          dataLusin > 0 && dataPcs > 0
            ? dataLusin * 12 + dataPcs + combineHistory[0]?.total
            : dataLusin > 0
            ? dataLusin * 12 + combineHistory[0]?.total
            : dataPcs + combineHistory[0]?.total,
        pcs: dataPcs,
        lusin: dataLusin,
        note: "",
      })
    );
    setIsOpen(false);
  };

  const handleSave = () => {
    const data = history;
    data.push({
      name: form.name,
      date: form.date,
      activity: form.activity,
      quantity: form.quantity,
      total:
        (pokemons?.filter((item) => item.name === selectPokemon.name)[0].total >
        0
          ? pokemons?.filter((item) => item.name === selectPokemon.name)[0]
              .total
          : 0) + form?.quantity,
      note: note,
    });
    dispatch(setHistory(data));
    localStorage.setItem("history", JSON.stringify(data));
    dispatch(
      setPokemons(
        pokemons.map((item) =>
          item.name === form.name ? { ...item, total: form.total } : item
        )
      )
    );
    dispatch(
      setForm({
        name: "",
        date: "",
        activity: "Update Stok",
        quantity: 0,
        total: 0,
        note: "",
      })
    );

    const listPokemon = pokemons?.map((item) => ({
      ...item,
      total: history
        .filter((el) => item.name === el.name)
        .sort((x, y) => {
          return x.date < y.date ? 1 : -1;
        })[0]?.total,
    }));

    localStorage.setItem("listPokemon", JSON.stringify(listPokemon));
    dispatch(setPokemons(listPokemon));
    navigate("/detail");
  };

  const handleBack = () => {
    dispatch(
      setForm({
        name: "",
        date: "",
        activity: "Update Stok",
        quantity: 0,
        total: 0,
        note: "",
      })
    );
    navigate("/detail");
  };

  const [note, setNote] = useState("");
  return (
    <div className="max-w-2xl m-auto flex flex-col gap-2 py-0 min-w-fit xl:py-16 text-black whitespace-nowrap pb-28 h-full">
      {/* Header Desktop */}
      <div className="justify-between items-center hidden">
        <Button
          variant="transparent"
          className="w-fit whitespace-nowrap"
          startIcon={<IconArrowLeft className="-mr-1" />}
        />
      </div>

      {/* Header Mobile */}
      <div className="flex justify-between items-center px-2 py-1 xl:hidden shadow-header w-screen">
        <IconButton aria-label="arrow" onClick={handleBack}>
          <IconArrowLeft />
        </IconButton>
        <h1 className="font-rubik font-bold text-xs flex items-center whitespace-nowrap">
          Stok Pokémon
        </h1>
        <div className="h-10 w-10" />
      </div>

      {/* Title */}
      <h1 className="font-rubik font-bold xl:text-xxl text-lg flex items-center px-4 xl:px-0 my-6 xl:my-0">
        Konfirmasi update stok
      </h1>

      {/* Stock Remaining  */}
      <div className="mx-4 mt-6 xl:mx-0 xl:mt-8">
        <p className="font-rubik text-xxs">Selisih</p>
        <p className="font-rubik text-xl">{`+${form?.quantity} pcs`}</p>
      </div>

      {/* Info Update */}
      <div className="flex gap-4 justify-between px-4 xl:px-0 mt-2 ">
        <div className="w-full">
          <p className="font-rubik text-xxs">Di sistem</p>
          <p className="font-rubik text-md">{`${
            pokemons?.filter((item) => item.name === selectPokemon.name)[0]
              .total > 0
              ? pokemons?.filter((item) => item.name === selectPokemon.name)[0]
                  .total
              : 0
          } pcs`}</p>
        </div>
        <div className="w-6 h-6 self-center">
          <ArrowFormard />
        </div>
        <div className="w-full">
          <p className="font-rubik text-xxs">Hasil update stok</p>
          <p className="ont-rubik text-md">{`${
            (pokemons?.filter((item) => item.name === selectPokemon.name)[0]
              .total > 0
              ? pokemons?.filter((item) => item.name === selectPokemon.name)[0]
                  .total
              : 0) + form?.quantity
          } pcs`}</p>
        </div>
      </div>

      {/* Table */}
      <div className="px-4 xl:px-0 mt-9 xl:mt-4 text-xxs">
        <p className="font-rubik font-bold text-xsx xl:hidden">
          Detail stok opname
        </p>
        <div className="border-b-2 border-black py-3 flex justify-between gap-5">
          <div className="hidden xl:flex">
            <div className="flex gap-4">
              <p className="font-medium font-rubik w-40">Keterangan</p>
              <p className="font-medium font-rubik w-fit">Detail</p>
            </div>
          </div>
          <p className="font-medium font-rubik w-fit xl:hidden">Keterangan</p>
          <p className="font-medium font-rubik mr-12">Jumlah</p>
        </div>

        <div className="border-b-2 border-gray flex justify-between gap-5 py-3 xl:py-1">
          <div className="xl:flex flex-col gap-0 xl:gap-4 xl:flex-row items-center">
            <p className="font-bold font-nunito text-blue-dark w-40">
              {form?.activity}
            </p>
            <p className="font-nunito text-xxs w-32 hidden xl:flex">
              {form.pcs > 0 ? `${form.pcs} pcs` : "0 pcs"}{" "}
              {form.lusin > 0 ? `${form.lusin} lusin (12s)` : "0 plusin (12s)"}
            </p>
            <p className="font-nunito text-xxs text-blue-dark w-40 xl:hidden">
              {form.pcs > 0 ? `${form.pcs} pcs` : "0 pcs"}{" "}
              {form.lusin > 0 ? `${form.lusin} lusin (12s)` : "0 plusin (12s)"}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <p className="font-bold font-nunito text-black">{`${form.quantity} pcs`}</p>
            <IconButton aria-label="arrow" onClick={() => setIsOpen(true)}>
              <IconEdit />
            </IconButton>
          </div>
        </div>

        {/* Result */}
        <div className="border-gray py-3 flex justify-between gap-5">
          <p className="font-bold font-nunito text-black xl:text-blue-dark w-40">
            Total hasil stok opname
          </p>
          <p className="font-bold font-nunito text-black pr-12">{`${form.quantity} pcs`}</p>
        </div>
      </div>

      {/* Input Note */}
      <p className="font-rubik font-semibold text-xs pt-12 xl:pt-8 px-4 xl:px-0 mt-2">
        Catatan
      </p>
      <InputText
        value={note}
        placeholder="Cari Pokémon"
        className="lg  px-4 xl:px-0 mt-2"
        onChange={(e) => setNote(e.target.value)}
      />

      {/* Button */}
      <div className="flex gap-2 pt-4 self-end px-4 xl:px-0 mt-2">
        <Button variant="contained" onClick={handleSave}>
          Simpan
        </Button>
        <Button
          variant="outlined"
          className="hidden xl:flex"
          onClick={handleBack}
        >
          Batal
        </Button>
      </div>

      {/* Popup */}
      <div
        className={`${
          isOpen ? "flex" : "hidden"
        }  fixed left-0 top-0 w-screen h-screen bg-black bg-opacity-80 justify-center items-center`}
      >
        <div className="flex flex-col bg-white p-6 rounded-lg shadow-modal gap-4 w-80 text-black">
          {/* Title */}
          <div className="flex flex-col gap-2">
            <p className="font-rubik text-md font-bold text-center">
              Update Stok
            </p>
            <p className="font-nunito text-xxs text-center whitespace-pre-wrap">
              Masukkan jumlah stok yang tersedia di rak saat ini.
            </p>
          </div>

          {/* Table */}
          <div>
            <div className="grid grid-cols-4 border-b-2 border-black py-2">
              <p className="col-span-2 font-rubik font-medium text-xsx">
                Kemasan
              </p>
              <p className="col-span-1 text-right font-rubik font-medium text-xsx">
                Jumlah
              </p>
              <p className="col-span-1 text-right font-rubik font-medium text-xsx">
                Stock
              </p>
            </div>

            {/* Input PCS */}
            <div className="grid grid-cols-4 border-b-2 items-center py-2">
              <p className="col-span-1 font-nunito font-bold text-xxs">Pcs</p>
              <div className="col-span-2 flex justify-end items-center gap-1">
                <p className="font-nunito font-normal text-right">1 x</p>
                <InputText
                  value={pcs === "0" ? "" : pcs}
                  className="w-14"
                  type="number"
                  onChange={handlePcs}
                />
              </div>
              <p className="font-nunito text-xxs col-span-1 text-right">
                {pcs > 0 ? pcs : 0}
              </p>
            </div>

            {/* Input Lusin */}
            <div className="grid grid-cols-4 border-b-2 items-center py-2">
              <p className="col-span-1 font-nunito font-bold text-xxs">Lusin</p>
              <div className="col-span-2 flex justify-end items-center gap-1">
                <p className="font-nunito font-normal text-right">12 x</p>
                <InputText
                  value={lusin === "0" ? "" : lusin}
                  type="number"
                  className="w-14"
                  onChange={handleLusin}
                />
              </div>
              <p className="font-nunito text-xxs col-span-1 text-right">
                {lusin > 0 ? lusin * 12 : 0}
              </p>
            </div>

            <div className="flex justify-between items-center py-4">
              <div className="flex gap-2">
                <p className="col-span-2 font-nunito font-bold text-xxs">
                  Total stok
                </p>
                <p className="col-span-2 font-nunito text-xxs">(dalam pcs)</p>
              </div>
              <p className="col-span-2 font-nunito font-bold text-xxs">
                {parseInt(lusin) > 0 && parseInt(pcs) > 0
                  ? parseInt(lusin) * 12 + parseInt(pcs)
                  : parseInt(lusin) > 0
                  ? parseInt(lusin) * 12
                  : parseInt(pcs)}
              </p>
            </div>
          </div>

          {/* Button */}
          <div className="flex gap-2 pt-2 self-end px-0">
            <Button
              variant="contained"
              onClick={() => handleConfirm()}
              disabled={pcs === "0" && lusin === "0"}
            >
              Simpan
            </Button>
            <Button
              variant="outlined"
              className="flex"
              onClick={() => setIsOpen(false)}
            >
              Batal
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
