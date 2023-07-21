import React, { Suspense } from "react";
import {
  Await,
  Link,
  defer,
  useLoaderData,
  useOutletContext,
} from "react-router-dom";
import { BsStarFill } from "react-icons/bs";
import { refresh, reqInter, requireAuth, resInter } from "../../utils";
import api, { apiPrivate } from "../../server/api";
import ReturnVan from "../../components/ReturnVan";

export async function loader({ params, request }) {
  await requireAuth(request)
  const accessToken = await refresh()
  console.log(accessToken)


  const getUserVans = async () => {
    reqInter(accessToken);
    resInter();
    const controller = new AbortController();
    try {
      let user = sessionStorage.getItem('user')
      console.log(user)
      const response = await apiPrivate.get(`/vans?user=${user}`, {
        signal: controller.signal,
      }) ;
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
  
  return defer({ vans: getUserVans() })
}


export async function action({ request, params }) {
  const p = new URL(request.url).searchParams.get("p") || "";
  const q = new URL(request.url).searchParams.get("q") || "";
  const formData = await request.formData();

  // console.log(request, id, formData);
  const vanId = formData.get("vanId")
  const userCred = {
    vanName: formData.get("vanName"),
    userName: formData.get("userName"),
    id: vanId
  };
  console.log(request, userCred)

  await requireAuth(request)
  const accessToken = await refresh()

  const removeUser = async () => {
    reqInter(accessToken);
    resInter();
    
  // let isMounted = true;
    const controller = new AbortController();

    try {
      const res = await apiPrivate.put(`/vans/${vanId}/remove`, userCred, {signal: controller.signal});
      console.log(res.data, "user cred");
      const resData = res?.data;
      return { resData, userCred }, redirect(`./?q=${q}&p=${p}`);
    } catch (error) {
      return error;
    } finally {
      apiPrivate.interceptors.response.eject(resInter());
      apiPrivate.interceptors.request.eject(reqInter());
      controller.abort();
    }
  }

  return await removeUser()

}

const Dashboard = () => {
  const vansDataPromise = useLoaderData();
  // const { listedVans, returnVan } = null || '';
  let user = sessionStorage.getItem("user")

  return (
    <div className="-mx-5 mb-8">
      <div className="bg-[#ffead0 bg-orange-200 px-5 flex ">
        <div className=" ">
          <h1 className="font-bold text-4xl pt-5">Welcome! {user} </h1>
          <h3 className="pt-5">
            Income last <span className="underline ">30 days</span>
          </h3>
          <h1 className="text-5xl font-bold py-5">$2,260</h1>
        </div>
        <Link to={"/host/income"} className="ml-auto my-auto">
          Details
        </Link>
      </div>

      <div className="bg-[#ffddb2 bg-orange-300 px-5 py-8 ">
        <div className="flex">
          <div className="text-2xl font-bold flex">
            <p>Review score</p>{" "}
            <BsStarFill className=" text-[#ff8c38] ml-3 mr-1 my-auto" />{" "}
            <p>5.0</p> <p className="font-normal">/5</p>
          </div>

          <Link to={"/host/reviews"} className="ml-auto">
            Details
          </Link>
        </div>
      </div>

      <div>
        {vansDataPromise?.vans ? (
          <div className="flex px-5 mt-20 ">
            <h2 className="bg[#ffffff] text-2xl font-bold">Your listed vans</h2>
            <Link
              to={"/host/vans"}
              className="ml-auto text-xl hover:underline underline-offset-2 font-medium"
            >
              View all vans
            </Link>
          </div>
        ) : (
          <>
            <h2 className="bg[#ffffff] mt-20 text-2xl font-bold text-center">
              You have no listed vans
            </h2>
            <div className="my-8 text-center">
              <Link
                to={"vans"}
                className=" hover:underline underline-offset-4 bg[#ffffff] mt-20 text-2xl font-bold inline text-center"
              >
                Go to vans
              </Link>
            </div>
          </>
        )}
      </div>

      <Suspense
        fallback={
          <h2 className="mx-5 mt-10 font-semibold text-2xl">
            Loading your listed vans...
          </h2>
        }
      >
        <Await resolve={vansDataPromise.vans}>
          {(vans) => {
            const vanElements = vans?.map((van) => (
              <div key={van.id} className="flex my-4 p-5 rounded bg-white">
                <div className="flex">
                  <img
                    // src={van.imageUrl}
                    src={`./images/${van.imageUrl} `}
                    alt="van"
                    width={60}
                    className="rounded"
                  />
                  <div className="ml-4 my-auto">
                    <h3 className="font-bold">{van.name}</h3>
                    <p>${van.price}/day </p>
                  </div>
                </div>
                <div className="ml-auto my-auto">
                  <ReturnVan vanName = { van.name } vanId = { van._id } />
                </div>
              </div>
            ));

            return <div className="px-5 my-6">{vanElements}</div>;
          }}
        </Await>
      </Suspense>
    </div>
  );
};

export default Dashboard;
