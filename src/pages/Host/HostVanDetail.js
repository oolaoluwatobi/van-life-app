import React, { Suspense } from "react";
import { Await, Link, NavLink, Outlet, defer, useLoaderData, useOutletContext, useParams } from "react-router-dom";

import { activeStyles, inActiveStyles } from "../../components/HostLayout";
import { getVan, rentVan } from "../../server/api";
import { requireAuth } from "../../utils";

export async function loader({ params, request }) {
  await requireAuth(request)
  return defer({ van: getVan(params.id) })
}

const HostVanDetail = () => {
  const { params } = useParams()
  const vanPromise = useLoaderData()
  console.log(params)
  const { user } = useOutletContext()

  return (
    <div className="bg-orange50 pb-10 h-56">
      <Link to={".."} relative="path" className="mb-10 font-medium ">
        &larr;
        <span className="ml-2 hover:underline underline-offset-2">
          Back to all vans
        </span>
      </Link>

      <div className="bg-orange-50 rounded p-5 mt-10">
        <Suspense fallback={<h1>Loading van...</h1>}>
          <Await resolve={vanPromise?.van}>
            {van => {
              console.log(van.imageUrl)
              return (
                <div className="flex flex-col h-[526px] ">
                  <div className="flex mb-5 ">
                    <img
                      src={van.imageUrl}
                      // src={`/images/${van.imageUrl}`}
                      alt="van"
                      width={200}
                      className="rounded"
                    />
                    <div className="p-5 my-auto">
                      <i
                        className={`${
                          van.type === "simple"
                            ? "bg-[#e17654]"
                            : van.type === "rugged"
                            ? "bg-[#115e59]"
                            : "bg-[#161616]"} bg-green-80 inlin text-white h- px-4 py-1 pb-2  rounded capitalize`}
                      >
                        {van.type}
                      </i>
                      <h2 className="mt-5 font-bold text-3xl">{van.name}</h2>
                      <h3 className="font-bold text-2xl mt-2">
                        ${van.price}
                        <span className="font-normal">/day</span>
                      </h3>
                    </div>
                  </div>

                  <div className="mb-10 -ml-5 ">
                    <NavLink
                      to={"."}
                      end
                      className={({ isActive }) =>
                        isActive ? activeStyles() : inActiveStyles()
                      }
                    >
                      Details
                    </NavLink>
                    <NavLink
                      to={"pricing"}
                      className={({ isActive }) =>
                        isActive ? activeStyles() : inActiveStyles()
                      }
                    >
                      Pricing
                    </NavLink>
                    <NavLink
                      to={"photos"}
                      className={({ isActive }) =>
                        isActive ? activeStyles() : inActiveStyles()
                      }
                    >
                      Photos
                    </NavLink>
                  </div>

                  <Outlet context={{ van }} />

                  <p
                    onClick={() =>
                      user
                      ? rentVan({ user, van })
                        : alert("You need to sign in first!")
                    }
                    className={`${
                      van.type === "simple"
                        ? "bg-[#e17654]"
                        : van.type === "rugged"
                        ? "bg-[#115e59]"
                        : "bg-[#161616]"} items-end cursor-pointer text-center text-white h- mt-auto px-4 py-3 rounded capitalize hover:bg-gradient-to-r from-[#e17654] to-[#115e59]`}
                  >
                    Rent this van
                  </p>

                </div>
              )
            }}
          </Await>
        </Suspense>
      </div>

      
    </div>
  );
};

export default HostVanDetail;
