import React from 'react'
import { Form, useFetcher, useLocation, useNavigation } from "react-router-dom";

const RentVan = ({ vanName, userName}) => {
  const fetcher = useFetcher()

  return (
    <fetcher.Form method='post'>
      <input
        className="indent-2 border border-[#d1d5db] rounded-lg p-3 text-sm placeholder:text-[#4d4d4d]"
        type="vanName"
        name="vanName"
        placeholder="Van Name"
        defaultValue={vanName}
        value={vanName}
        />
      <input
        className="indent-2 border border-[#d1d5db] rounded-lg p-3 text-sm placeholder:text-[#4d4d4d]"
        type="userName"
        name="userName"
        placeholder="User Name"
        defaultValue={userName}
        value={userName}
        />
      <button
      >
        Rent THIS van
      </button>      
    </fetcher.Form>
  )
}

export default RentVan