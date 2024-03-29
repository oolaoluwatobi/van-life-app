import React, { Suspense } from "react";
import { Await, Link, NavLink, Outlet, defer, redirect, useLoaderData, useOutletContext, useParams } from "react-router-dom";

import { activeStyles, inActiveStyles } from "../../components/HostLayout";
// import { getVan, rentVan } from "../../server/api";
import { refresh, reqInter, requireAuth, resInter } from "../../utils";
import { apiPrivate } from "../../server/api";
import RentVan from "../../components/RentVan";

export async function loader({ params, request }) {
  await requireAuth(request)
  const accessToken = await refresh()
  // console.log(accessToken)

  const getVan = async () => {
    reqInter(accessToken);
    resInter();
    
  // let isMounted = true;
    const controller = new AbortController();

    try {
      const response = await apiPrivate.get(`/vans/${params.id}`, {
        signal: controller.signal,
      });
      // console.log(response.data);
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
  
  return defer({ van: getVan() })
}


export async function action({ request, params: { id } }) {
  const formData = await request.formData();

  // console.log(request, id, formData);

  const userCred = {
    vanName: formData.get("vanName"),
    userName: formData.get("userName"),
    id
  };
  console.log(request, id, userCred)


  
  await requireAuth(request)
  const accessToken = await refresh()

  const addUser = async () => {
    reqInter(accessToken);
    resInter();
    
  // let isMounted = true;
    const controller = new AbortController();

    const userName = sessionStorage.getItem('user')
    console.log(userName)
    
    try {
      const res = await apiPrivate.put(`/vans/${id}`, userCred, {signal: controller.signal});
      console.log(res.data, "user cred");
      const resData = res?.data;
      console.log('redirecting...')
      return redirect(`/host?user=${userName}`);
    } catch (error) {
      console.log('error!!!')
      return error;
    } finally {
      console.log('finally')
      apiPrivate.interceptors.response.eject(resInter());
      apiPrivate.interceptors.request.eject(reqInter());
      controller.abort();
    }
  }

  return await addUser()

}

const HostVanDetail = ({ }) => {
  const { params } = useParams()
  const vanPromise = useLoaderData()
  console.log(params)
  const { user } = sessionStorage.getItem('user');

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
              console.log(van.name)
              return (
                <div className="flex flex-col h-[526px] ">
                  <div className="flex mb-5 ">
                    <img
                      // src={van.imageUrl}
                      src={`/images/${van.imageUrl}`}
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
                  <div className="items-end mt-auto">
                    <RentVan vanName={ van.name } vanType={ van.type} />
                  </div>

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
