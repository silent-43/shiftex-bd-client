import React from "react";
import { FaBan, FaHome, FaTachometerAlt } from "react-icons/fa";
import { Link } from "react-router";

const Forbidden = () => {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-red-500">
          <FaBan className="text-4xl" />
        </div>

        <h1 className="text-3xl font-extrabold text-[#03373d]">
          403 - Forbidden
        </h1>

        <p className="mt-3 text-gray-500">
          You don't have permission to access this page.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {/* Go to Dashboard */}
          <Link
            to="/dashboard/dashboard-home"
            className="inline-flex items-center gap-2 rounded-xl bg-[#CAEB66] px-5 py-3 font-semibold text-[#03373d] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#bfe354] active:scale-95"
          >
            <FaTachometerAlt />
            Go to Dashboard
          </Link>

          {/* Go to Homepage */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl bg-[#03373d] px-5 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#07545b] active:scale-95"
          >
            <FaHome />
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
