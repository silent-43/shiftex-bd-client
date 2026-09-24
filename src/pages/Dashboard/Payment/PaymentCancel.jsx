import React from "react";
import { Link } from "react-router";
import {
  FaTimes,
  FaCreditCard,
  FaArrowLeft,
  FaHome,
  FaRedo,
} from "react-icons/fa";

const PaymentCancel = () => {
  return (
    <div className="min-h-[calc(100vh-72px)] bg-base-200 px-4 py-10 md:px-6 lg:py-14">
      <div className="mx-auto max-w-2xl">
        {/* ============================== Main Card ============================== */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-xl border border-gray-100">
          {/* ============================== Header ============================== */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#03373d] via-[#07545b] to-[#03373d] px-6 py-12 text-center md:px-10">
            {/* Decorative Circles */}
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-red-400/10"></div>

            <div className="absolute -bottom-20 -left-16 h-44 w-44 rounded-full bg-red-400/10"></div>

            {/* Cancel Icon */}
            <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-100 shadow-lg shadow-black/20">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-red-500 text-red-500">
                <FaTimes className="text-3xl" />
              </div>
            </div>

            <div className="relative">
              <h1 className="mt-6 text-3xl font-extrabold text-white md:text-4xl">
                Payment Cancelled
              </h1>

              <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-gray-200 md:text-base">
                Your payment was cancelled and no payment has been completed.
                Don't worry, your parcel request is still available.
              </p>
            </div>
          </div>

          {/* ============================== Body ============================== */}
          <div className="p-6 md:p-10">
            {/* Cancel Message */}
            <div className="mb-8 flex items-start gap-4 rounded-2xl bg-red-50 border border-red-100 p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-500">
                <FaCreditCard />
              </div>

              <div>
                <h3 className="font-bold text-[#03373d]">
                  Payment Was Not Completed
                </h3>

                <p className="mt-1 text-sm leading-5 text-gray-600">
                  You can return to your parcels and try the payment again
                  whenever you're ready.
                </p>
              </div>
            </div>

            {/* ============================== Information ============================== */}
            <div className="rounded-2xl bg-[#f1f8df] p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#CAEB66] text-[#03373d]">
                  <FaRedo />
                </div>

                <div>
                  <h3 className="font-bold text-[#03373d]">What can you do?</h3>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    Go back to your parcel list, find the unpaid parcel, and
                    click <span className="font-bold">Pay Now</span> to try the
                    payment again.
                  </p>
                </div>
              </div>
            </div>

            {/* ============================== Buttons ============================== */}
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Link
                to="/dashboard/my-parcels"
                className="btn rounded-xl bg-[#CAEB66] text-[#03373d] border-none font-bold hover:bg-[#bde04f]"
              >
                <FaRedo />
                Try Payment Again
              </Link>

              <Link
                to="/"
                className="btn rounded-xl bg-[#03373d] text-white border-none font-bold hover:bg-[#07545b]"
              >
                <FaHome />
                Back to Home
              </Link>
            </div>

            {/* Back Link */}
            <div className="mt-5 text-center">
              <Link
                to="/dashboard/my-parcels"
                className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#03373d] transition-colors"
              >
                <FaArrowLeft className="text-xs" />
                Return to My Parcels
              </Link>
            </div>
          </div>
        </div>

        {/* ============================== Footer ============================== */}
        <p className="mt-6 text-center text-xs text-gray-400">
          Need help? <span className="font-bold text-[#03373d]">ShiftexBD</span>{" "}
          is here for you 🚚
        </p>
      </div>
    </div>
  );
};

export default PaymentCancel;
