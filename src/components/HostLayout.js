import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useOutletContext } from "react-router-dom";
import { requireAuth } from "../utils";
import { db, getVans } from "../server/api";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";

export const activeStyles = () => {
return " ml-5 underline underline-offset-4 font-bold"
} 

export const inActiveStyles = () => {
  return "ml-5 hover:underline hover:underline-offset-4 hover:font-bold"
} 

export async function loader({request}) {
  // console.log(request.url)
  const url = new URL(request.url)
  console.log(url.pathname)
  await requireAuth(request)
  return null
}

const HostLayout = () => {
  const { user } = useOutletContext()
  const [listedVans, setListedVans] = useState([])
  const [allVans, setAllVans] = useState()
  
  const email = user || null

  console.log( user, listedVans)

  const vanRef = doc(db, 'users', `${user}`)
  const returnVan = async (id) => {
    try {
      const filteredVans = listedVans.filter(van => van.id !== id)
      await updateDoc(vanRef, {
        rentedVans: filteredVans
      })
      toast.success('Succcessful')

    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    onSnapshot(doc(db, 'users', `${user}`), (doc) => {
      console.log(doc.data()?.rentedVans)
      setListedVans(doc.data()?.rentedVans) 
    })

    // const isLoggedIn = sessionStorage.getItem('loggedIn')
    // console.log('isLoggedIn : ', isLoggedIn)

    async function vansArr() {
      const arr = await getVans()
      setAllVans(arr)
    }
    vansArr()
  }, [user])
  
  return (
    <div className="px-5 bg-orange-100">
      <nav className="py-10 -ml-5">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? activeStyles()
              : inActiveStyles()
          }
          // to={"/host"}
          to={`/host?user=${email}`}
          end
        >
          Dashboard
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? activeStyles()
              : inActiveStyles()
          }
          // to={"/host/income"}
          to={`/host/income?user=${email}`}
        >
          Income
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? activeStyles()
              : inActiveStyles()
          }
          // to={"/host/vans"}
          to={`/host/vans?user=${email}`}
        >
          Vans
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? activeStyles()
              : inActiveStyles()
          }
          // to={"/host/reviews"}
          to={`/host/reviews?user=${email}`}
        >
          Reviews
        </NavLink>
      </nav>
      <Outlet context={{ user, listedVans, allVans, returnVan }} />
    </div>
  );
};

export default HostLayout;
