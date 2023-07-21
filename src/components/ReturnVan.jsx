import React from "react";
import { useFetcher } from "react-router-dom";

const ReturnVan = ({ vanName, vanId }) => {
  const fetcher = useFetcher();

  // let vanName = 'ff'
  let userName = sessionStorage.getItem("user");
  console.log(vanName, vanId);

  return (
    <fetcher.Form method="put">
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
      <input
        hidden
        type="vanId"
        name="vanId"
        placeholder="vanId"
        defaultValue={vanId}
      />
      <button
        className=" hover:underline underline-offset-2 "
      >
        Unlist van
      </button>
    </fetcher.Form>
  );
};

export default ReturnVan;
