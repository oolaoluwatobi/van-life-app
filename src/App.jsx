import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Login, {
  loader as loginLoader,
  action as loginAction,
} from "./pages/Login";
import SignUp, {
  loader as signUpLoader,
  action as signUpAction,
} from "./pages/SignUp";
import Vans, { loader as vansLoader } from "./pages/vans/Vans";
import VanDetail, { loader as vanDetailLoader, action as vanDetailAction } from "./pages/vans/VanDetail";
import Layout from "./components/Layout";
import HostLayout, { loader as hostLayoutLoader } from "./components/HostLayout";
import HostVans, {
  loader as hostVanLoader,
} from "./pages/Host/HostVans";
import Dashboard, { loader as DashboardLoader, action as DashboardAction } from "./pages/Host/Dashboard";
import Income from "./pages/Host/Income";
import Reviews from "./pages/Host/Reviews";
import HostVanDetail, {
  loader as hostVanDetailLoader,
  action as hostVanDetailAction,
} from "./pages/Host/HostVanDetail";
import HostVanInfo from "./pages/Host/HostVanInfo";
import HostVanPricing from "./pages/Host/HostVanPricing";
import HostVanPhotos from "./pages/Host/HostVanPhotos";
import NotFound from "./pages/NotFound";
import ErrorPage from "./components/ErrorPage";
import { requireAuth } from "./utils";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route
        path="login"
        element={<Login />}
        loader={loginLoader}
        action={loginAction}
      />
      <Route
        path="signup"
        element={<SignUp />}
        loader={signUpLoader}
        action={signUpAction}
      />
      <Route
        path="vans"
        element={<Vans />}
        loader={vansLoader}
        errorElement={<ErrorPage />}
      />
      <Route
        path="vans/:id"
        element={<VanDetail />}
        loader={vanDetailLoader}
        action={vanDetailAction}
        errorElement={<ErrorPage />}
      />

      <Route path="host" element={<HostLayout />} errorElement={<ErrorPage />} loader={hostLayoutLoader} >
        <Route
          index
          element={<Dashboard />}
          loader={DashboardLoader}
          action={DashboardAction}
        />
        <Route
          path="income"
          element={<Income />}
          loader={async ({ request }) => await requireAuth(request)}
        />
        <Route
          path="reviews"
          element={<Reviews />}
          loader={async ({ request }) => await requireAuth(request)}
        />
        <Route path="vans" element={<HostVans />} 
          loader={hostVanLoader}
        />

        <Route
          path="vans/:id"
          element={<HostVanDetail />}
          errorElement={<ErrorPage />}
          loader={hostVanDetailLoader}
          action={hostVanDetailAction}
        >
          <Route index element={<HostVanInfo />} loader={hostVanDetailLoader} />
          <Route
            path="pricing"
            element={<HostVanPricing />}
            loader={async ({ request }) => await requireAuth(request)}
          />
          <Route
            path="photos"
            element={<HostVanPhotos />}
            loader={async ({ request }) => await requireAuth(request)}
          />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
