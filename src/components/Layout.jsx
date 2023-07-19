import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { Toaster } from 'react-hot-toast'

// import { auth, db } from "../server/api";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged,
// } from "firebase/auth";
// import { setDoc, doc } from "firebase/firestore";

import Header from "./Header";
import Footer from "./Footer";

// export async function signUp(email, password) {
//   await createUserWithEmailAndPassword(auth, email, password)
//   sessionStorage.setItem('loggedIn', 'true')
//   await setDoc(doc(db, 'users', email), {
//     rentedVans: []
//   })
// }

// export async function logOut() {
//   await signOut(auth)
//   return sessionStorage.removeItem('loggedIn')
// }

// export async function logIn(email, password) {
//   await signInWithEmailAndPassword(auth, email, password)
//   sessionStorage.setItem('loggedIn', 'true')
//   localStorage.clear()
//   return null
// }



const Layout = () => {
  const [user, setUser] = useState("ọlá")
  const [auth, setAuth] = useState(true)

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     currentUser === null ? sessionStorage.removeItem('loggedIn') : sessionStorage.setItem('loggedIn', true )  
  //     setUser(currentUser)
  //   })
  //   return () => {
  //     unsubscribe()
  //   }

  // })
  
  return (
    <div className=" flex w-screen h-full bg-orange-50">
      <div className=" w[576px] bg-green400 mx-auto mt8">
        <div className=" w-screen min-h-screen flex flex-col bg-orange ">
          <Toaster />
          {/* <Header user={ user } /> */}
          <Header  />
          <main className=" mx-auto max-w-4xl flex-grow w-full  bg-blue200 bg-orange-100">
            <div className="max-w-4xl mx-auto h-full bg-red500 ">
              {/* <Outlet context={{ signUp, logIn, logOut, user: user?.email }} /> */}
              <Outlet context={{ auth, user}} />
            </div>
          </main>
          <div className="mt-auto ">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
