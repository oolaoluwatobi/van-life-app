import React from "react";
import { useOutletContext } from "react-router-dom";


const Pricing = () => {
  const { van } = useOutletContext()

  return (
    <h3 className="font-medium text-2xl">
      ${van.price}.00
      <span className="font-normal text-base ">/day</span>
    </h3>
  );
};

export default Pricing;
