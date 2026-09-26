import React, { useState } from "react";
import Logo from "../../../components/Logo/Logo";
import { Link, NavLink } from "react-router";
import { FiArrowUpRight, FiMenu, FiX } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";

const NavBar = () => {
  const { user, logOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogOut = () => {
    logOut()
      .then((result) => {
        console.log(result);
        setIsMenuOpen(false);
        toast.success("Logged out successfully!");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Logout failed. Please try again.");
      });
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-300 ${
      isActive
        ? "bg-[#03373d] text-[#CAEB66] shadow-sm"
        : "text-[#365b63] hover:bg-[#03373d] hover:text-[#CAEB66]"
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `block rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 ${
      isActive
        ? "bg-[#03373d] text-[#CAEB66]"
        : "text-[#365b63] hover:bg-[#f1f8d8] hover:text-[#03373d]"
    }`;

  return (
    <>
      <Toaster position="top-right" />

      <header className="sticky top-0 z-50 px-3 pt-3 md:px-5 lg:px-6">
        <nav className="mx-auto max-w-7xl rounded-2xl border border-gray-100 bg-white/95 shadow-lg backdrop-blur-md">
          <div className="navbar min-h-[72px] px-3 sm:px-4 md:px-6">
            {/* ============================ Logo + Mobile Menu ============================ */}
            <div className="navbar-start gap-2">
              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="btn btn-ghost btn-circle text-[#03373d] hover:bg-[#f1f8d8] lg:hidden"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? (
                  <FiX className="text-2xl" />
                ) : (
                  <FiMenu className="text-2xl" />
                )}
              </button>

              {/* Logo */}
              {/* Logo */}
              <div
                onClick={closeMobileMenu}
                className="transition-transform duration-300 hover:scale-105"
              >
                <Logo />
              </div>
            </div>

            {/* ============================ Desktop Navigation ============================ */}
            <div className="navbar-center hidden lg:flex">
              <ul className="flex items-center gap-1">
                <li>
                  <NavLink to="/" className={navLinkClass}>
                    Services
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/coverage" className={navLinkClass}>
                    Coverage
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/send-parcel" className={navLinkClass}>
                    Send Parcel
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/rider" className={navLinkClass}>
                    Be a Rider
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/about-us" className={navLinkClass}>
                    About Us
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/pricing" className={navLinkClass}>
                    Pricing
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/contact" className={navLinkClass}>
                    Contact
                  </NavLink>
                </li>

                {user && (
                  <li>
                    <NavLink
                      to="/dashboard/my-parcels"
                      className={navLinkClass}
                    >
                      My Parcels
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>

            {/* ============================ Right Side ============================ */}
            <div className="navbar-end gap-2 sm:gap-3">
              {/* User Avatar */}
              {user && (
                <div
                  className="hidden items-center justify-center overflow-hidden rounded-full border-2 border-[#CAEB66] bg-[#f1f8d8] sm:flex"
                  title={user?.displayName || user?.email}
                >
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || "User"}
                      className="h-9 w-9 object-cover"
                    />
                  ) : (
                    <FaUserCircle className="h-9 w-9 text-[#03373d]" />
                  )}
                </div>
              )}

              {/* Login / Logout */}
              {user ? (
                <button
                  type="button"
                  onClick={handleLogOut}
                  className="btn hidden h-10 rounded-xl border-none bg-gray-100 px-4 text-sm font-bold text-[#03373d] shadow-none transition-all duration-300 hover:bg-[#03373d] hover:text-[#CAEB66] sm:flex"
                >
                  Log Out
                </button>
              ) : (
                <Link
                  to="/login"
                  className="btn hidden h-10 rounded-xl border-none bg-gray-100 px-4 text-sm font-bold text-[#03373d] shadow-none transition-all duration-300 hover:bg-[#03373d] hover:text-[#CAEB66] sm:flex"
                >
                  Log in
                </Link>
              )}

              {/* Be a Rider CTA */}
              <Link
                to="/rider"
                onClick={closeMobileMenu}
                className="group hidden items-center overflow-hidden rounded-xl sm:flex"
              >
                <span className="flex h-10 items-center bg-[#03373d] px-4 text-sm font-bold text-white transition-all duration-300 group-hover:bg-[#CAEB66] group-hover:text-[#03373d] md:px-5">
                  Be a Rider
                </span>

                <span className="flex h-10 w-10 items-center justify-center bg-[#CAEB66] text-[#03373d] transition-all duration-300 group-hover:bg-[#03373d] group-hover:text-[#CAEB66]">
                  <FiArrowUpRight
                    size={23}
                    className="transition-transform duration-300 group-hover:rotate-12"
                  />
                </span>
              </Link>
            </div>
          </div>

          {/* ============================ Mobile Navigation ============================ */}
          <div
            className={`overflow-hidden transition-all duration-300 lg:hidden ${
              isMenuOpen
                ? "max-h-[700px] border-t border-gray-100 opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="px-4 pb-5 pt-3">
              <ul className="space-y-1">
                <li>
                  <NavLink
                    to="/"
                    onClick={closeMobileMenu}
                    className={mobileNavLinkClass}
                  >
                    Services
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/coverage"
                    onClick={closeMobileMenu}
                    className={mobileNavLinkClass}
                  >
                    Coverage
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/send-parcel"
                    onClick={closeMobileMenu}
                    className={mobileNavLinkClass}
                  >
                    Send Parcel
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/rider"
                    onClick={closeMobileMenu}
                    className={mobileNavLinkClass}
                  >
                    Be a Rider
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/about-us"
                    onClick={closeMobileMenu}
                    className={mobileNavLinkClass}
                  >
                    About Us
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/pricing"
                    onClick={closeMobileMenu}
                    className={mobileNavLinkClass}
                  >
                    Pricing
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/contact"
                    onClick={closeMobileMenu}
                    className={mobileNavLinkClass}
                  >
                    Contact
                  </NavLink>
                </li>

                {user && (
                  <li>
                    <NavLink
                      to="/dashboard/my-parcels"
                      onClick={closeMobileMenu}
                      className={mobileNavLinkClass}
                    >
                      My Parcels
                    </NavLink>
                  </li>
                )}
              </ul>

              {/* Mobile User Section */}
              <div className="mt-4 border-t border-gray-100 pt-4">
                {user && (
                  <div className="mb-3 flex items-center gap-3 rounded-xl bg-[#f5f9e9] p-3">
                    <div className="overflow-hidden rounded-full border-2 border-[#CAEB66]">
                      {user?.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt={user.displayName || "User"}
                          className="h-10 w-10 object-cover"
                        />
                      ) : (
                        <FaUserCircle className="h-10 w-10 text-[#03373d]" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-[#03373d]">
                        {user?.displayName || "ShiftexBD User"}
                      </p>

                      <p className="truncate text-xs text-gray-500">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                )}

                {/* Mobile Auth Buttons */}
                {user ? (
                  <button
                    type="button"
                    onClick={handleLogOut}
                    className="btn h-11 w-full rounded-xl border-none bg-[#03373d] font-bold text-[#CAEB66] hover:bg-[#CAEB66] hover:text-[#03373d]"
                  >
                    Log Out
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="btn h-11 w-full rounded-xl border-none bg-[#03373d] font-bold text-[#CAEB66] hover:bg-[#CAEB66] hover:text-[#03373d]"
                  >
                    Log in
                  </Link>
                )}

                {/* Mobile Rider CTA */}
                <Link
                  to="/rider"
                  onClick={closeMobileMenu}
                  className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#CAEB66] font-bold text-[#03373d] transition-all duration-300 hover:bg-[#03373d] hover:text-[#CAEB66]"
                >
                  Be a Rider
                  <FiArrowUpRight className="text-xl" />
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default NavBar;
