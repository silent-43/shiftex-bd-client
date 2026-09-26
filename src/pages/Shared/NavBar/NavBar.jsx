import React, { useEffect, useRef, useState } from "react";
import Logo from "../../../components/Logo/Logo";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { FiMenu, FiX } from "react-icons/fi";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const NavBar = () => {
  const { user, logOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const previousUserRef = useRef(null);

  // ==========================================
  // Get User Name
  // ==========================================
  const getUserName = () => {
    if (user?.displayName?.trim()) {
      return user.displayName.trim();
    }

    if (user?.email) {
      const emailName = user.email.split("@")[0];

      if (emailName) {
        return emailName
          .replace(/[._-]+/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase());
      }
    }

    return "ShiftexBD User";
  };

  // ==========================================
  // Welcome / Welcome Back Popup
  // ==========================================
  useEffect(() => {
    if (!user) {
      previousUserRef.current = null;
      return;
    }

    // Show popup only on the homepage
    if (location.pathname !== "/") {
      previousUserRef.current = user;
      return;
    }

    // ==========================================
    // Check if popup was already shown in this session
    // ==========================================
    const sessionWelcomeKey = `shiftexbd-welcome-session-${user.uid}`;

    const alreadyShownThisSession = sessionStorage.getItem(sessionWelcomeKey);

    if (alreadyShownThisSession) {
      previousUserRef.current = user;
      return;
    }

    // ==========================================
    // Check if this user has logged in before
    // ==========================================
    const userKey = `shiftexbd-user-${user.uid}`;

    const existingUser = localStorage.getItem(userKey);

    // Mark popup as shown for this session
    sessionStorage.setItem(sessionWelcomeKey, "true");

    // Get actual user name
    const userName = getUserName();

    // ==========================================
    // First Time Login
    // ==========================================
    if (!existingUser) {
      localStorage.setItem(
        userKey,
        JSON.stringify({
          uid: user.uid,
          email: user.email,
          name: userName,
        }),
      );

      setTimeout(() => {
        Swal.fire({
          title: `Welcome, ${userName}!`,
          text: "Welcome to ShiftexBD. We're happy to have you with us.",
          icon: "success",
          confirmButtonText: "Get Started",
          confirmButtonColor: "#03373d",
          background: "#ffffff",
          color: "#03373d",
        });
      }, 300);
    }

    // ==========================================
    // Returning User
    // ==========================================
    else {
      setTimeout(() => {
        Swal.fire({
          title: `Welcome Back, ${userName}!`,
          text: "It's great to see you again.",
          icon: "success",
          confirmButtonText: "Continue",
          confirmButtonColor: "#03373d",
          background: "#ffffff",
          color: "#03373d",
        });
      }, 300);
    }

    previousUserRef.current = user;
  }, [user, location.pathname]);

  // ==========================================
  // Logout
  // ==========================================
  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from your ShiftexBD account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#03373d",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await logOut();

      await Swal.fire({
        icon: "success",
        title: "Logged Out",
        text: "You have been successfully logged out.",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);

      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: "Something went wrong while logging out.",
        confirmButtonColor: "#03373d",
      });
    }
  };

  // ==========================================
  // Close Mobile Menu
  // ==========================================
  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  // ==========================================
  // Desktop Navigation Style
  // ==========================================
  const navLinkClass = ({ isActive }) =>
    `whitespace-nowrap rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-300 ${
      isActive
        ? "bg-[#03373d] text-[#CAEB66] shadow-sm"
        : "text-[#365b63] hover:bg-[#03373d] hover:text-[#CAEB66]"
    }`;

  // ==========================================
  // Mobile Navigation Style
  // ==========================================
  const mobileNavLinkClass = ({ isActive }) =>
    `block rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 ${
      isActive
        ? "bg-[#03373d] text-[#CAEB66]"
        : "text-[#365b63] hover:bg-[#f1f8d8] hover:text-[#03373d]"
    }`;

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 md:px-5 lg:px-6">
      <nav className="mx-auto max-w-7xl rounded-2xl border border-gray-100 bg-white/95 shadow-lg backdrop-blur-md">
        <div className="navbar min-h-[72px] px-3 sm:px-4 md:px-6">
          {/* ============================
              Logo + Mobile Menu
          ============================ */}
          <div className="navbar-start w-auto shrink-0 gap-2">
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
            <div
              onClick={closeMobileMenu}
              className="shrink-0 transition-transform duration-300 hover:scale-105"
            >
              <Logo />
            </div>
          </div>

          {/* ============================
              Desktop Navigation
          ============================ */}
          <div className="navbar-center hidden min-w-0 flex-1 justify-center lg:flex">
            <ul className="flex items-center gap-1 whitespace-nowrap">
              {/* Services */}
              <li>
                <NavLink to="/" className={navLinkClass}>
                  Services
                </NavLink>
              </li>

              {/* Coverage */}
              <li>
                <NavLink to="/coverage" className={navLinkClass}>
                  Coverage
                </NavLink>
              </li>

              {/* Send Parcel */}
              <li>
                <NavLink to="/send-parcel" className={navLinkClass}>
                  Send Parcel
                </NavLink>
              </li>

              {/* About Us */}
              <li>
                <NavLink to="/about-us" className={navLinkClass}>
                  About Us
                </NavLink>
              </li>

              {/* Pricing */}
              <li>
                <NavLink to="/pricing" className={navLinkClass}>
                  Pricing
                </NavLink>
              </li>

              {/* Contact */}
              <li>
                <NavLink to="/contact" className={navLinkClass}>
                  Contact
                </NavLink>
              </li>

              {/* ==========================================
                  Logged In User Navigation
              ========================================== */}
              {user && (
                <>
                  {/* My Parcels */}
                  <li>
                    <NavLink
                      to="/dashboard/my-parcels"
                      className={navLinkClass}
                    >
                      My Parcels
                    </NavLink>
                  </li>

                  {/* My Profile */}
                  <li>
                    <NavLink to="/dashboard/profile" className={navLinkClass}>
                      My Profile
                    </NavLink>
                  </li>

                  {/* My Dashboard */}
                  <li>
                    <NavLink
                      to="/dashboard/dashboard-home"
                      className={navLinkClass}
                    >
                      My Dashboard
                    </NavLink>
                  </li>

                  {/* Logout */}
                  <li>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="whitespace-nowrap rounded-xl px-3 py-2 text-sm font-semibold text-red-500 transition-all duration-300 hover:bg-red-500 hover:text-white"
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* ============================
              Right Side
          ============================ */}
          <div className="navbar-end w-auto shrink-0">
            {/* Login Button */}
            {!user && (
              <Link
                to="/login"
                className="btn hidden h-10 rounded-xl border-none bg-gray-100 px-4 text-sm font-bold text-[#03373d] shadow-none transition-all duration-300 hover:bg-[#03373d] hover:text-[#CAEB66] sm:flex"
              >
                Log in
              </Link>
            )}
          </div>
        </div>

        {/* ============================
            Mobile Navigation
        ============================ */}
        <div
          className={`overflow-hidden transition-all duration-300 lg:hidden ${
            isMenuOpen
              ? "max-h-[700px] border-t border-gray-100 opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 pb-5 pt-3">
            <ul className="space-y-1">
              {/* Services */}
              <li>
                <NavLink
                  to="/"
                  onClick={closeMobileMenu}
                  className={mobileNavLinkClass}
                >
                  Services
                </NavLink>
              </li>

              {/* Coverage */}
              <li>
                <NavLink
                  to="/coverage"
                  onClick={closeMobileMenu}
                  className={mobileNavLinkClass}
                >
                  Coverage
                </NavLink>
              </li>

              {/* Send Parcel */}
              <li>
                <NavLink
                  to="/send-parcel"
                  onClick={closeMobileMenu}
                  className={mobileNavLinkClass}
                >
                  Send Parcel
                </NavLink>
              </li>

              {/* About Us */}
              <li>
                <NavLink
                  to="/about-us"
                  onClick={closeMobileMenu}
                  className={mobileNavLinkClass}
                >
                  About Us
                </NavLink>
              </li>

              {/* Pricing */}
              <li>
                <NavLink
                  to="/pricing"
                  onClick={closeMobileMenu}
                  className={mobileNavLinkClass}
                >
                  Pricing
                </NavLink>
              </li>

              {/* Contact */}
              <li>
                <NavLink
                  to="/contact"
                  onClick={closeMobileMenu}
                  className={mobileNavLinkClass}
                >
                  Contact
                </NavLink>
              </li>

              {/* ==========================================
                  Logged In User Navigation
              ========================================== */}
              {user && (
                <>
                  {/* My Parcels */}
                  <li>
                    <NavLink
                      to="/dashboard/my-parcels"
                      onClick={closeMobileMenu}
                      className={mobileNavLinkClass}
                    >
                      My Parcels
                    </NavLink>
                  </li>

                  {/* My Profile */}
                  <li>
                    <NavLink
                      to="/dashboard/profile"
                      onClick={closeMobileMenu}
                      className={mobileNavLinkClass}
                    >
                      My Profile
                    </NavLink>
                  </li>

                  {/* My Dashboard */}
                  <li>
                    <NavLink
                      to="/dashboard"
                      onClick={closeMobileMenu}
                      className={mobileNavLinkClass}
                    >
                      My Dashboard
                    </NavLink>
                  </li>

                  {/* Logout */}
                  <li>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="block w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-red-500 transition-all duration-300 hover:bg-red-500 hover:text-white"
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>

            {/* ============================
                Mobile Login Button
            ============================ */}
            {!user && (
              <div className="mt-4 border-t border-gray-100 pt-4">
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="btn h-11 w-full rounded-xl border-none bg-[#03373d] font-bold text-[#CAEB66] hover:bg-[#CAEB66] hover:text-[#03373d]"
                >
                  Log in
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
