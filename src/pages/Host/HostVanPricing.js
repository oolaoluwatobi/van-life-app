import React from "react";
import { useParams } from "react-router-dom";

import server from "../../server/server";

const Pricing = () => {
  const { id } = useParams();

  const vans = server.vans;
  const van = vans.find((van) => van.id == id);

  return (
    <h3 className="font-medium text-2xl">
      ${van.price}.00
      <span className="font-normal text-base ">/day</span>
    </h3>
  );
};

export default Pricing;
