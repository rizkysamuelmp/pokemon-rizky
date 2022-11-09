/* eslint-disable react-hooks/exhaustive-deps */
// Detail
// --------------------------------------------------------

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import Button from "../components/Button";
import InputText from "../components/InputText";
import moment from "moment";

// redux
import { useDispatch, useSelector } from "react-redux";

// asset
import { ReactComponent as IconArrowLeft } from "../asset/icon-arrow-left.svg";
import { capitalize, makeKey } from "../utils";
import { setForm } from "../store/actions/pokemon";

const Detail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const historyLocal = JSON.parse(localStorage.getItem("history")) || null;

  const { selectPokemon, initiateHistory, history, pokemons } = useSelector(
    (state) => state.pokemon
  );

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
  }, []);

  let thisPokemon = [];

  if (historyLocal) {
    thisPokemon = historyLocal
      .filter((item) => item.name === selectPokemon?.name)
      .sort((x, y) => {
        return x.date < y.date ? 1 : -1;
      });
  } else {
    thisPokemon = history
      .filter((item) => item.name === selectPokemon?.name)
      .sort((x, y) => {
        return x.date < y.date ? 1 : -1;
      });
  }

  const combineHistory = [...thisPokemon, initiateHistory];

  const groupBy = (dataList, property) =>
    dataList.reduce((acc, obj) => {
      const key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});

  const array = combineHistory.map((item) => ({
    ...item,
    tanggal: moment(item.date).format("DD MMM YYYY"),
  }));

  const groupData = groupBy(array, "tanggal");

  const list = Object.keys(groupData).map((key) => ({
    date: key,
    childs: groupData[key].map((e) => ({
      ...e,
    })),
  }));

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
    navigate("/");
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
    navigate("/confirm");
  };

  return (
    <div className="m-auto flex flex-col gap-2 py-0 xl:px-10 min-w-fit xl:py-16 text-black whitespace-nowrap pb-28 h-fit">
      {/* Header Desktop */}
      <div className="justify-between items-center hidden xl:flex">
        <Button
          variant="transparent"
          className="w-fit whitespace-nowrap"
          startIcon={<IconArrowLeft className="-mr-1" />}
          onClick={handleBack}
        >
          Stok Pokémon
        </Button>
        <Button
          variant="outlined"
          className="w-fit"
          onClick={() => setIsOpen(true)}
        >
          Update Stok
        </Button>
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
        {selectPokemon && capitalize(selectPokemon.name)}
      </h1>

      {/* Button Update Stock Mobile */}
      <Button
        variant="outlined"
        className="w-fit xl:hidden mx-4 xl:mx-0"
        onClick={() => setIsOpen(true)}
      >
        Update Stok
      </Button>

      {/* Remaining Stock  */}
      <div className="mx-4 mt-6 xl:mx-0 xl:mt-8">
        <p className="font-rubik text-xxs font-normal">Sisa stok</p>
        <p className="font-rubik text-xl">{`${
          pokemons?.filter((item) => item.name === selectPokemon.name)[0]
            .total > 0
            ? pokemons?.filter((item) => item.name === selectPokemon.name)[0]
                .total
            : 0
        } pcs`}</p>
      </div>

      {/* Hisotory Stock */}
      <div className="mx-4 xl:mx-0 mt-8 font-black">
        <p className="font-rubik text-sm font-bold">Riwayat stok</p>
        <p className="font-nunito text-xxs font-normal">
          Satuan stok dalam pcs
        </p>
      </div>

      {/* Table Web */}
      <div className="hidden xl:flex flex-col px-4 xl:px-0 mt-2 text-xxs">
        <div className="border-b-2 border-black py-3 flex justify-between gap-5">
          <div className="hidden xl:flex">
            <div className="flex gap-4">
              <p className="font-medium font-rubik w-32">Waktu</p>
              <p className="font-medium font-rubik w-40">Kegiatan</p>
              <p className="font-medium font-rubik w-fit">Catatan</p>
            </div>
          </div>
          <div className="flex gap-8">
            <p className="font-medium font-rubik">Jmlh</p>
            <p className="font-medium font-rubik w-10">Stock</p>
          </div>
        </div>
        {combineHistory?.map((item) => (
          <div
            key={makeKey(3)}
            className="border-b-2 border-gray py-3 flex justify-between hover:bg-green-soft cursor-pointer hover:px-3 hover:shadow-lg gap-5"
          >
            <div className="xl:flex flex-col gap-0 xl:gap-4 xl:flex-row">
              <p className="font-nunito text-xxs w-32 hidden xl:flex">
                {item.date !== ""
                  ? moment(item.date).format("DD MMM YYYY, HH:mm")
                  : ""}
              </p>
              <p className="font-bold font-nunito text-blue-dark w-40">
                {item.activity}
              </p>
              <p className="font-nunito text-xxs w-fit">
                {item.note !== "" ? `"${item.note}"` : ""}
              </p>
            </div>
            <div className="flex gap-8">
              <p
                className={`${
                  item.quantity > 0 ? "text-green-light" : "text-black"
                } font-bold font-nunito `}
              >
                {item?.quantity > 0 ? "+" : ""}
                {item.quantity}
              </p>
              <p className="font-bold font-nunito text-black w-10 text-end">
                {item.total}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Table Mobile */}
      <div className="mt-2 ">
        {list?.map((item) => (
          <div key={makeKey(5)} className="xl:hidden px-4 xl:px-0 text-xxs">
            <div className="border-b-2 border-black py-3 flex justify-between gap-5">
              <p className="font-medium font-rubik w-fit">
                {item.date !== ""
                  ? moment(item.date).format("DD MMM YYYY, HH:mm")
                  : "-"}
              </p>
              <div className="flex gap-8">
                <p className="font-medium font-rubik">Jmlh</p>
                <p className="font-medium font-rubik w-10">Stock</p>
              </div>
            </div>
            {item.childs?.map((el) => (
              <div key={makeKey(5)}>
                <div className="border-b-2 border-gray py-3 flex justify-between hover:bg-green-soft cursor-pointer hover:px-3 hover:shadow-lg gap-5">
                  <div className="xl:flex flex-col gap-0 xl:gap-4 xl:flex-row">
                    <p className="font-nunito text-xxs font-bold w-32">
                      {el.date !== "" ? moment(el.date).format("HH:mm") : "-"}
                    </p>
                    <p className="font-bold font-nunito text-blue-dark w-40">
                      {el.activity}
                    </p>
                    <p className="font-nunito text-xxs w-fit">
                      {el.note !== "" ? `"${el.note}"` : ""}
                    </p>
                  </div>
                  <div className="flex gap-8">
                    <p
                      className={`${
                        el.quantity > 0 ? "text-green-light" : "text-black"
                      } font-bold font-nunito `}
                    >
                      {el?.quantity > 0 ? "+" : ""}
                      {el.quantity}
                    </p>
                    <p className="font-bold font-nunito text-black w-10 text-end">
                      {el.total}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
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
              onClick={handleConfirm}
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

export default Detail;
