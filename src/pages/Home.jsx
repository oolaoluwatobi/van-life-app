import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const style = {
    backgroundImage: `url(./images/hero-home.png)`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: '100%',
    height: 580,
  };
  return (
    <div className="bg-red-200">
      <div className="px-5 py-16 w-full h-full text-white" style={style}>
        <h1 className="font-semibold mt-28 text-4xl">
          You got the travel plans, we got the travel vans.{" "}
        </h1>
        <div className="my-4 text-base ">
          <h4 className="">
            Add adventure to your life by joining the #vanlife movement.{" "}
          </h4>
          <h4 className="">
            Rent the perfect van to make your perfect road trip.
          </h4>
        </div>
        <div className="max-w-sm flex text-center m-auto">
          <Link to={"/vans"} className="w-full mt-20 mx-auto py-2 rounded bg-orange-400 hover:bg-gradient-to-r from-[#e17654] to-[#115e59]   ">
            Find your van
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
