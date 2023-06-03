import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className=" min-w-full min-h-full flex flex-col mb-auto">
      <div className="  ">
        <img src="./images/hero-about.png" alt="hero" />
        <div className="mx-5 mt-20">
          <h2 className="mt-6 mb-4 text-2xl font-bold ">
            Don't squeeze in a sedan when you could relax in a van.
          </h2>
          <p>
            Our mission is to enliven your road trip with the perfect travel van
            rental. Our vans are recertified before each trip to ensure your
            travel plans can go off without a hitch. (Hitch costs extra 😉)
          </p>
          <p className="mt-4">
            Our team is full of vanlife enthusiasts who know firsthand the magic
            of touring the world on 4 wheels.
          </p>
          <div className="bg-orange-200 my-10 px-5 py-4 rounded ">
            <h2 className="text-2xl font-bold ">
              Your destination is waiting.
            </h2>
            <h2 className="text-2xl font-bold ">Your van is ready.</h2>
            <div className="my-8">
              <Link
                to={"/vans"}
                className="bg-black text-white px-4 py-3 rounded-lg hover:bg-slate-700 hover:text-orange-200 "
              >
                Explore our vans
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;
