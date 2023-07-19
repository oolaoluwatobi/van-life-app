import React, { Suspense } from "react";
import { Link, Await, useOutletContext, defer, useLoaderData } from "react-router-dom";
import { refresh, reqInter, requireAuth, resInter } from "../../utils";
import api, { apiPrivate } from "../../server/api";

export async function loader({ params, request }) {
  await requireAuth(request)
  const accessToken = await refresh()
  console.log(accessToken)


  const getAllVans = async () => {
    reqInter(accessToken);
    resInter();
    
  // let isMounted = true;
    const controller = new AbortController();

    try {
      const response = await api.get("/", {
        signal: controller.signal,
      });
      console.log(response.data);
      //
      return response.data;
    } catch (error) {
      console.log(error);
    } finally {
      apiPrivate.interceptors.response.eject(resInter());
      apiPrivate.interceptors.request.eject(reqInter());
      controller.abort();
    }

  }
  
  return defer({ vans: getAllVans() })
}

const HostVans = () => {
  const vansDataPromise = useLoaderData();
  const { listedVans, allVans, unListedVans } = null || ''

  // const unListedVans = allVans?.filter((van1) => {
  //   return !listedVans?.some(
  //     (van2) => van2.id === van1.id && van2.name === van1.name
  //   );
  // });

  return (
    <div className="bg-orange50">
      <h1 className="font-bold text-3xl pb-4 mb-2">Available vans</h1>
      <p className="font-medium mb-4">
        Your listed vans will be shown in the{" "}
        <Link
          className="hover:underline underline-offset-2 text-lg font-bold "
          to={"/host"}
        >
          Dashboard
        </Link>
      </p>
      <Suspense fallback={<h1>Loading vans...</h1>}>
        <Await resolve={vansDataPromise.vans}>
          {(vans) => {
            const vanElements = vans?.map((van) => {
              return (
                <div key={van.id}>
                  <Link to={van._id}>
                    <div className="flex p-5 mb-5 bg-white rounded">
                      <img
                        className="mr-5 rounded"
                        // src={van?.imageUrl}
                        src={`/images/${van.imageUrl}`}
                        alt="van"
                        width={100}
                      />
                      <div className="my-auto">
                        <h3 className="text-xl font-semibold">{van.name}</h3>
                        <p>${van.price}/day</p>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            });
            return <div>{vanElements}</div>;
          }}
        </Await>
      </Suspense>
    </div>
  );
};

export default HostVans;
