import React, { Suspense } from "react";
import {
  Link,
  useLocation,
  useLoaderData,
  defer,
  Await,
  useOutletContext,
  useNavigate,
  redirect
} from "react-router-dom";

import api, { apiPrivate } from "../../server/api";
import RentVan from "../../components/RentVan";
import { refresh, reqInter, requireAuth, resInter } from "../../utils";


export async function loader({ params }) {
  // const res = await api.get(`/?q=${q}&p=${p}`);
  console.log(params.id)
  const res = await api.get(`/vans/${params.id}`);
  console.log(res.data)
  return defer({ van: res.data })
}


export async function action({ request, params: { id } }) {
  const p = new URL(request.url).searchParams.get("p") || "";
  const q = new URL(request.url).searchParams.get("q") || "";
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

    try {
      const res = await apiPrivate.put(`/vans/${id}`, userCred, {signal: controller.signal});
      console.log(res.data, "user cred");
      const resData = res?.data;
      return { resData, userCred }, redirect(`/host?q=${q}&p=${p}`);
    } catch (error) {
      return error;
    } finally {
      apiPrivate.interceptors.response.eject(resInter());
      apiPrivate.interceptors.request.eject(reqInter());
      controller.abort();
    }
  }

  return await addUser()

}


const VanDetail = () => {
  const vanDataPromise = useLoaderData();
  // const { user } = useOutletContext();
  let user = sessionStorage.getItem("user");
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
                  src={`/images/${van.imageUrl}`}
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
                <div>
                  <RentVan vanName={van.name} vanType={van.type} />
                </div>
              </div>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
};

export default VanDetail;
