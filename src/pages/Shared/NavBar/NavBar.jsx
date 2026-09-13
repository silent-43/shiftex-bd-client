import React from "react";
import Logo from "../../../components/Logo/Logo";
import { NavLink } from "react-router";
import { FiArrowUpRight } from "react-icons/fi";

const NavBar = () => {
  const links = (
    <>
      <li>
        <NavLink
          to=""
          className="rounded-lg px-4 py-2 text-[15px] font-semibold text-[#365b63] transition-all duration-300 hover:bg-[#57909a] hover:text-white hover:shadow-md hover:-translate-y-1"
        >
          Services
        </NavLink>
      </li>

      <li>
        <NavLink
          to=""
          className="rounded-lg px-4 py-2 text-[15px] font-semibold text-[#365b63] transition-all duration-300 hover:bg-[#57909a] hover:text-white hover:shadow-md hover:-translate-y-1"
        >
          Coverage
        </NavLink>
      </li>

      <li>
        <NavLink
          to=""
          className="rounded-lg px-4 py-2 text-[15px] font-semibold text-[#365b63] transition-all duration-300 hover:bg-[#57909a] hover:text-white hover:shadow-md hover:-translate-y-1"
        >
          About Us
        </NavLink>
      </li>

      <li>
        <NavLink
          to=""
          className="rounded-lg px-4 py-2 text-[15px] font-semibold text-[#365b63] transition-all duration-300 hover:bg-[#57909a] hover:text-white hover:shadow-md hover:-translate-y-1"
        >
          Pricing
        </NavLink>
      </li>

      <li>
        <NavLink
          to=""
          className="rounded-lg px-4 py-2 text-[15px] font-semibold text-[#365b63] transition-all duration-300 hover:bg-[#57909a] hover:text-white hover:shadow-md hover:-translate-y-1"
        >
          Blog
        </NavLink>
      </li>

      <li>
        <NavLink
          to=""
          className="rounded-lg px-4 py-2 text-[15px] font-semibold text-[#365b63] transition-all duration-300 hover:bg-[#57909a] hover:text-white hover:shadow-md hover:-translate-y-1"
        >
          Contact
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-150 rounded-xl shadow-2xl">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              aria-label="Menu"
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
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>

        <a className="btn btn-ghost text-xl">
          <Logo />
        </a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="navbar-end flex items-center gap-3">
        <a className="btn rounded-lg px-5 font-bold text-[#365b63] transition-all duration-300 hover:-translate-y-1 hover:bg-[#57909a] hover:text-white hover:shadow-md">
          Sign In
        </a>

        <div className="group flex items-center">
          <a className="btn rounded-l-lg rounded-r-none px-5 font-bold text-[#365b63] transition-all duration-300 hover:-translate-y-1 hover:bg-[#57909a] hover:text-white hover:shadow-md">
            Sign Up
          </a>

          <span className="flex h-10 w-10 items-center justify-center rounded-r-lg bg-[#09f749] text-white transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-[#07d63f] group-hover:shadow-md">
            <FiArrowUpRight
              size={30}
              className="transition-transform duration-300 group-hover:rotate-12"
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
