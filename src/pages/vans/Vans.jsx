import React, { Suspense } from "react";
import {
  Link,
  useSearchParams,
  useLoaderData,
  defer,
  Await,
} from "react-router-dom";

import api, { apiPrivate } from "../../server/api";
import { refresh, reqInter, requireAuth, resInter } from "../../utils";

export async function loader({ params, request }) {
  // const res = await api.get(`/?q=${q}&p=${p}`);
  const res = await api.get("/");
  console.log(res.data)
  return defer({ vans: res.data })

  
  // await requireAuth(request)
  // const accessToken = await refresh()
  // console.log(accessToken)


  // const gUser = async () => {
  //   reqInter(accessToken);
  //   resInter();
    
  // // let isMounted = true;
  //   const controller = new AbortController();

  //   try {
  //     const response = await apiPrivate.get("/vans", {
  //       signal: controller.signal,
  //     });
  //     console.log(response.data);
  //     //
  //     return response.data;
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     apiPrivate.interceptors.response.eject(resInter());
  //     apiPrivate.interceptors.request.eject(reqInter());
  //     controller.abort();
  //   }

  // }
  // return defer({ vans: gUser() })

}

const Vans = () => {
  const vansDataPromise = useLoaderData();
  console.log(vansDataPromise);

  const [searchParams, setSearchParams] = useSearchParams();

  const typeFilter = searchParams.get("type");

  function handleFilterChange(key, value) {
    setSearchParams((prevParams) => {
      if (value === null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  }

  function renderVanElements(vans) {
    const displayedVans = typeFilter
      ? vans.filter((van) => van.type === typeFilter)
      : vans;
    const vanElements = displayedVans.map((van) => (
      <div key={van.id} className="sm:my-16 md:my-4 ">
        <Link
          to={van._id}
          // to={`/${van._id}`}
          state={{
            search: `?${searchParams.toString()}`,
            typeFilter,
          }}
        >
          <div className="">
            <img
              src={van.imageUrl}
              src={`./images/${van.imageUrl}`}
              alt="van"
              // width={230}
              className="sm:rounded aspect-square"
            />
            <div className="flex font-semibold text-xl mt-3">
              <h4>{van.name}</h4>
              <div className="ml-auto">
                <h4>${van.price}</h4>
                <p className="text-xs font-medium text-right">/day</p>
              </div>
            </div>
            <i
              // style={typeStyles(van)}
              className={`${
                van.type === "simple"
                  ? "bg-[#e17654]"
                  : van.type === "rugged"
                  ? "bg-[#115e59]"
                  : "bg-[#161616]"
              } bg-green-80 inline text-white h-8 px-4 py-1 pb-2 rounded capitalize`}
            >
              {van.type}
            </i>
          </div>
        </Link>
      </div>
    ));

    return (
      <>
        <div className="mt-6 mb-8">
          <button
            onClick={() => handleFilterChange("type", "simple")} //to be used with buttons
            className={` ${
              typeFilter === "simple"
                ? "bg-[#e17654] text-white"
                : "text-slate-700 bg-orange-200"
            } hover:bg-[#e17654] hover:text-white  inline font-medium h-8 mr-5 px-5 py-1 pb-2 rounded capitalize`}
            // to={genNewSearchParams("type", "simple")}    //to be used with links
          >
            Simple
          </button>
          <button
            onClick={() => handleFilterChange("type", "rugged")} //to be used with buttons
            className={`${
              typeFilter === "rugged"
                ? "bg-[#115e59] text-white"
                : "bg-orange-200"
            } text-slate-700 hover:bg-[#115e59]  hover:text-white inline font-medium h-8 mr-5 px-5 py-1 pb-2 rounded capitalize`}
            // to={genNewSearchParams("type", "rugged")}    //to be used with links
          >
            Rugged
          </button>
          <button
            onClick={() => handleFilterChange("type", "luxury")} //to be used with buttons
            className={`${
              typeFilter === "luxury"
                ? "bg-black text-white"
                : "bg-orange-200"
            } text-slate-700  hover:bg-black hover:text-white inline font-medium h-8 mr-5 px-5 py-1 pb-2 rounded capitalize`}
            // to={genNewSearchParams("type", "luxury")}    //to be used with links
          >
            Luxury
          </button>
          {typeFilter && (
            <button
              onClick={() => handleFilterChange("type", null)} //to be used with buttons
              className=" text-slate-700 inline font-medium h-8 mr-5 px-5 py-1 pb-2 rounded capitalize hover:underline"
              // to={genNewSearchParams("type", null)}    //to be used with links
            >
              Clear Filters
            </button>
          )}
        </div>
        <div className="md:grid grid-cols-2 grid-flow-row gap-5  mt6 ">
          {vanElements}
        </div>
      </>
    );
  }

  return (
    <div className="py-8 pt-10 h-full bg-orange50 px-5">
      <h1 className="font-bold text-3xl ">Explore our van options</h1>
      <Suspense fallback={<h1 className="my-5">Loading vans...</h1>}>
        <Await resolve={vansDataPromise.vans}>
          {renderVanElements}
        </Await>
      </Suspense>
    </div>
  );
};

export default Vans;
