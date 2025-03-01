import React, { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { authUser, getMe, logout } = useAuthStore();

  useEffect(() => {
    console.log("authuser", authUser);
  }, []);

  return (
    <div className="navbar bg-indigo-primary text-text-light">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            {authUser && authUser.isAdmin && (
              <li>
                <details>
                  <summary>Parent</summary>
                  <ul className="p-2">
                    <li>
                      <Link to="/employee">Employee</Link>
                    </li>
                  </ul>
                </details>
              </li>
            )}
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          {authUser && authUser.isAdmin && (
            <li>
              <details>
                <summary>Parent</summary>
                <ul className="p-2">
                  <li>
                    <Link to="/employee">Employee</Link>
                  </li>
                </ul>
              </details>
            </li>
          )}
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <span onClick={logout} className="btn bg-purple-button hover:bg-purple-hover border text-text-light border-purple-border">
          Logout
        </span>
      </div>
    </div>
  );
};

export default Navbar;
