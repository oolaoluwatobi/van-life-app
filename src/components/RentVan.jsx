import React from "react";
import {  useFetcher } from "react-router-dom";

const RentVan = ({ vanName, vanType }) => {
  const fetcher = useFetcher();

  let userName = sessionStorage.getItem("user");
  console.log(vanName, vanType);

  return (
    <fetcher.Form method="post">
      <input
        hidden
        type="vanName"
        name="vanName"
        placeholder="Van Name"
        defaultValue={vanName}
      />
      <input
        hidden
        type="userName"
        name="userName"
        placeholder="User Name"
        defaultValue={userName}
      />
      <button
        className={`${
          vanType === "simple"
            ? "bg-[#e17654]"
            : vanType === "rugged"
            ? "bg-[#115e59]"
            : "bg-[#161616]"
        } items-end w-full cursor-pointer text-center text-white h- mt-auto px-4 py-3 rounded capitalize hover:bg-gradient-to-r from-[#e17654] to-[#115e59]`}
      >
        Rent This van
      </button>
    </fetcher.Form>
  );
};

export default RentVan;
