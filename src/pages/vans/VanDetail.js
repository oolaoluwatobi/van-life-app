import React, { Suspense } from "react";
import {
  Link,
  useLocation,
  useLoaderData,
  defer,
  Await,
  useOutletContext,
  useNavigate
} from "react-router-dom";

import { getVan, rentVan } from "../../server/api";

export async function loader({ params }) {
  return defer({ van: getVan(params.id) })
}

const VanDetail = () => {
  const vanDataPromise = useLoaderData();
  const { user } = useOutletContext();
  const location = useLocation();
  const navigate = useNavigate()

  const search = location.state?.search || null;
  const typeFilter = location.state?.typeFilter || "all";

  return (
    <div className="bg-orange50 ">
      <div className="bg-orange50 py-5 ml-5">
        <Link to={`..${search}`} relative="path" className="mb10 font-medium ">
          &larr;
          <span className="ml-2 hover:underline underline-offset-2">
            Back to{" "}
            <span className={`${typeFilter !== "all" ? "capitalize" : null}`}>
              {typeFilter}
            </span>{" "}
            vans
          </span>
        </Link>
      </div>
      <Suspense fallback={<h1 className="ml-5">Loading van...</h1>}>
        <Await resolve={vanDataPromise.van}>
          {(van) => {
            console.log(van.type, typeFilter)
            return (
              <div className="px-5 py-5 max-w-4xl">
                <img
                  className="rounded-xl "
                  src={van.imageUrl}
                  // src={`/images/${van.imageUrl}`}
                  alt="van"
                />
                <div className="mt-10 mb-6">
                  <p
                    className={`${
                      van.type === "simple"
                        ? "bg-[#e17654]"
                        : van.type === "rugged"
                        ? "bg-[#115e59]"
                        : "bg-[#161616]"
                    } inline text-white px-4 py-1 pb-2 rounded capitalize`}
                  >
                    {van.type}
                  </p>
                </div>
                <h1 className="text-4xl font-bold mt-4">{van.name}</h1>
                <h3 className="font-bold text-xl my-4">
                  ${van.price}
                  <span className="font-medium text-base">/day</span>
                </h3>
                <p className="font-medium my-4 ">{van.description}</p>
                <p
                  onClick={() =>
                    user
                      ? rentVan({ user, van })
                      : navigate('/host/vans')
                  }
                  className={`${
                    van.type === "simple"
                      ? "bg-[#e17654]"
                      : van.type === "rugged"
                      ? "bg-[#115e59]"
                      : "bg-[#161616]"} cursor-pointer text-center text-white h- my-3 mb-10 px-4 py-3  rounded capitalize  hover:bg-gradient-to-r from-[#e17654] to-[#115e59]`} 
                    >
                  Rent this van
                </p>
              </div>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
};

export default VanDetail;
