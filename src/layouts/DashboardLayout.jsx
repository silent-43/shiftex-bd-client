import React, { useState } from "react";
import { CiDeliveryTruck } from "react-icons/ci";
import {
  FaCreditCard,
  FaMotorcycle,
  FaTruck,
  FaHome,
  FaBoxOpen,
  FaChevronLeft,
  FaBars,
} from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router";
import { CgSmartHomeWashMachine } from "react-icons/cg";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navLinkClass = ({ isActive }) =>
    `group flex items-center gap-3 rounded-xl px-3 py-3 font-medium transition-all duration-300
    ${
      isActive
        ? "bg-[#CAEB66] text-[#03373d] shadow-md font-bold"
        : "text-gray-600 hover:bg-[#eaf7c9] hover:text-[#03373d]"
    }`;

  return (
    <div className="min-h-screen bg-base-200">
      {/* ============================== Mobile Overlay ============================== */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* ============================== Sidebar ============================== */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen bg-white border-r border-gray-200
          shadow-xl transition-all duration-300 ease-in-out
          ${isSidebarOpen ? "w-72" : "w-20"}
          max-lg:w-72
          ${isSidebarOpen ? "max-lg:translate-x-0" : "max-lg:-translate-x-full"}
        `}
      >
        {/* ============================== Sidebar Header ============================== */}
        <div
          className={`flex items-center ${
            isSidebarOpen ? "justify-between px-5" : "justify-center"
          } py-6`}
        >
          <Link
            to="/"
            className={`flex items-center ${
              isSidebarOpen ? "gap-3" : "justify-center"
            } group`}
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#03373d] text-[#CAEB66] shadow-lg group-hover:scale-105 transition-transform duration-300">
              <FaTruck className="text-xl" />
            </div>

            {isSidebarOpen && (
              <div>
                <h2 className="text-xl font-extrabold text-[#03373d]">
                  ShiftexBD
                </h2>
                <p className="text-xs text-gray-500">
                  Reliable Delivery Service
                </p>
              </div>
            )}
          </Link>

          {/* Desktop Sidebar Close Button */}
          {isSidebarOpen && (
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="hidden lg:flex btn btn-sm btn-circle btn-ghost text-gray-500 hover:bg-[#eaf7c9] hover:text-[#03373d]"
              title="Close sidebar"
            >
              <FaChevronLeft />
            </button>
          )}
        </div>

        <div className="px-5">
          <div className="h-px bg-gray-200"></div>
        </div>

        {/* ============================== Main Menu ============================== */}
        <div className="px-4 pt-6">
          {isSidebarOpen && (
            <p className="px-3 mb-3 text-[11px] font-bold uppercase tracking-wider text-gray-400">
              Main Menu
            </p>
          )}

          <ul className="space-y-2">
            {/* Homepage */}
            <li>
              <Link
                to="/"
                title={!isSidebarOpen ? "Homepage" : ""}
                className={`group flex items-center gap-3 rounded-xl px-3 py-3 font-medium text-gray-600 hover:bg-[#eaf7c9] hover:text-[#03373d] transition-all duration-300 ${
                  !isSidebarOpen ? "justify-center" : ""
                }`}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500 group-hover:bg-white group-hover:text-[#03373d] transition-all">
                  <FaHome />
                </span>

                {isSidebarOpen && <span>Homepage</span>}
              </Link>
            </li>

            {/* Dashboard */}
            <li>
              <NavLink
                to="/dashboard/dashboard-home"
                title={!isSidebarOpen ? "Dashboard" : ""}
                className={`${navLinkClass} ${
                  !isSidebarOpen ? "justify-center" : ""
                }`}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/70">
                  <CgSmartHomeWashMachine className="text-xl" />
                </span>

                {isSidebarOpen && <span>Dashboard</span>}
              </NavLink>
            </li>
          </ul>
        </div>

        {/* ============================== Parcel Management ============================== */}
        <div className="px-4 pt-7">
          {isSidebarOpen && (
            <p className="px-3 mb-3 text-[11px] font-bold uppercase tracking-wider text-gray-400">
              Parcel Management
            </p>
          )}

          <ul className="space-y-2">
            {/* My Parcels */}
            <li>
              <NavLink
                to="/dashboard/my-parcels"
                title={!isSidebarOpen ? "My Parcels" : ""}
                className={`${navLinkClass} ${
                  !isSidebarOpen ? "justify-center" : ""
                }`}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  <CiDeliveryTruck className="text-2xl" />
                </span>

                {isSidebarOpen && <span>My Parcels</span>}
              </NavLink>
            </li>

            {/* Payment History */}
            <li>
              <NavLink
                to="/dashboard/payment-history"
                title={!isSidebarOpen ? "Payment History" : ""}
                className={`${navLinkClass} ${
                  !isSidebarOpen ? "justify-center" : ""
                }`}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-600">
                  <FaCreditCard />
                </span>

                {isSidebarOpen && <span>Payment History</span>}
              </NavLink>
            </li>

            {/* Approved Riders */}
            <li>
              <NavLink
                to="/dashboard/approve-riders"
                title={!isSidebarOpen ? "Approved Riders" : ""}
                className={`${navLinkClass} ${
                  !isSidebarOpen ? "justify-center" : ""
                }`}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-pink-100 text-pink-600">
                  <FaMotorcycle />
                </span>

                {isSidebarOpen && <span>Approved Riders</span>}
              </NavLink>
            </li>
          </ul>
        </div>

        {/* ============================== Sidebar Bottom ============================== */}
        {isSidebarOpen && (
          <div className="absolute bottom-0 left-0 w-full p-4">
            <div className="rounded-2xl bg-gradient-to-br from-[#03373d] to-[#07545b] p-4 text-white shadow-lg">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#CAEB66] text-[#03373d]">
                  <FaBoxOpen />
                </div>

                <div>
                  <p className="text-sm font-bold">ShiftexBD</p>
                  <p className="text-xs text-gray-300">
                    Fast & Reliable Delivery
                  </p>
                </div>
              </div>

              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-4/5 rounded-full bg-[#CAEB66]"></div>
              </div>

              <p className="mt-2 text-[10px] text-gray-300">
                Providing reliable tech since 2026
              </p>
            </div>
          </div>
        )}

        {/* Collapsed Sidebar Open Button */}
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="absolute bottom-5 left-1/2 -translate-x-1/2 hidden lg:flex btn btn-sm btn-circle bg-[#03373d] text-[#CAEB66] border-none hover:bg-[#07545b]"
            title="Open sidebar"
          >
            <FaBars />
          </button>
        )}
      </aside>

      {/* ============================== Main Content ============================== */}
      <div
        className={`min-h-screen transition-all duration-300 ${
          isSidebarOpen ? "lg:ml-72" : "lg:ml-20"
        }`}
      >
        {/* ============================== Top Navbar ============================== */}
        <nav className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
          <div className="navbar min-h-[72px] px-4 md:px-6">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="btn btn-square btn-ghost lg:hidden text-[#03373d]"
              aria-label="Open sidebar"
            >
              <FaBars className="text-lg" />
            </button>

            {/* Desktop Sidebar Toggle */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="hidden lg:flex btn btn-square btn-ghost text-[#03373d] hover:bg-[#eaf7c9]"
              aria-label="Toggle sidebar"
              title={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              {isSidebarOpen ? <FaChevronLeft /> : <FaBars />}
            </button>

            {/* Brand */}
            <Link
              to="/dashboard/dashboard-home"
              className="ml-2 flex items-center gap-3 group"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#03373d] text-[#CAEB66] shadow-md group-hover:scale-105 transition-transform duration-300">
                <FaTruck className="text-lg" />
              </div>

              <div className="hidden sm:block">
                <h1 className="text-lg md:text-xl font-extrabold text-[#03373d] leading-none">
                  ShiftexBD
                </h1>

                <p className="text-[11px] text-gray-500 mt-1">
                  Delivery Dashboard
                </p>
              </div>
            </Link>

            <div className="flex-1"></div>

            {/* Right Side */}
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-2 rounded-full bg-[#f1f8df] px-4 py-2 text-sm font-semibold text-[#03373d]">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                Dashboard
              </div>

              <Link
                to="/"
                className="btn btn-sm bg-[#03373d] hover:bg-[#07545b] text-white border-none rounded-xl px-4"
              >
                Home
              </Link>
            </div>
          </div>
        </nav>

        {/* ============================== Page Content ============================== */}
        <main className="min-h-[calc(100vh-72px)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
