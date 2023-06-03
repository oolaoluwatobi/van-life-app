import React from "react";
import {
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  BsPersonX,
  BsPersonCircle,
} from "react-icons/bs";

import { inActiveStyles, activeStyles } from "./HostLayout";
import { logOut } from "./Layout";

const Header = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className=" w-full   bg-orange-0">
      <nav className="mt2 mx-auto px-5 py-8 max-w-4xl bg-orange-100">
        <div className="flex ">
          <Link to={"/"}>
            <h1 className="font-extrabold text-3xl">#VANLIFE</h1>
          </Link>
          <div className="my-auto flex ml-auto font-medium ">
            {user && (
              <NavLink
                to={"host"}
                className={({ isActive }) =>
                  isActive ? activeStyles() : inActiveStyles()
                }
              >
                Host
              </NavLink>
            )}
            <NavLink
              to={"about"}
              className={({ isActive }) =>
                isActive ? activeStyles() : inActiveStyles()
              }
            >
              About
            </NavLink>
            <NavLink
              to={"vans"}
              className={({ isActive }) =>
                isActive ? activeStyles() : inActiveStyles()
              }
            >
              Vans
            </NavLink>

            {!user ? (
              <NavLink
                to={"login"}
                className={({ isActive }) =>
                  isActive ? activeStyles() : inActiveStyles()
                }
              >
                <BsPersonCircle className="mt-1 justify-end " size={20} />
              </NavLink>
            ) : (
              <button
                className="ml-5"
                onClick={async () => {
                  await logOut();
                  sessionStorage.removeItem("loggedIn");
                  navigate("login");
                }}
              >
                <BsPersonX className="mt-1 justify-end " size={20} />
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
