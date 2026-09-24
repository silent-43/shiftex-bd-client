import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  FaCheck,
  FaBoxOpen,
  FaReceipt,
  FaCopy,
  FaCheckCircle,
  FaHome,
  FaArrowRight,
} from "react-icons/fa";
import Swal from "sweetalert2";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();

  const [paymentInfo, setPaymentInfo] = useState({});
  const [loading, setLoading] = useState(true);

  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (sessionId) {
      setLoading(true);

      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);

          setPaymentInfo({
            trackingId: res.data.trackingId,
            transactionId: res.data.transactionId,
          });
        })
        .catch((error) => {
          console.error("Payment success error:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [sessionId, axiosSecure]);

  // ============================== Copy ID ==============================
  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);

    Swal.fire({
      icon: "success",
      title: "Copied!",
      text: `${label} copied successfully.`,
      timer: 1200,
      showConfirmButton: false,
      position: "top-end",
      toast: true,
    });
  };

  // ============================== Loading ==============================
  if (loading) {
    return (
      <div className="min-h-[calc(100vh-72px)] flex items-center justify-center bg-base-200 px-4">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-[#03373d]"></span>

          <p className="mt-4 text-lg font-semibold text-[#03373d]">
            Confirming your payment...
          </p>

          <p className="mt-1 text-sm text-gray-500">Please wait a moment.</p>
        </div>
      </div>
    );
  }

  // ============================== Error ==============================
  if (!paymentInfo.transactionId || !paymentInfo.trackingId) {
    return (
      <div className="min-h-[calc(100vh-72px)] flex items-center justify-center bg-base-200 px-4 py-10">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl border border-gray-100">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-red-500">
            <FaReceipt className="text-3xl" />
          </div>

          <h2 className="mt-6 text-2xl font-extrabold text-[#03373d]">
            Payment Information Not Found
          </h2>

          <p className="mt-3 text-gray-500">
            We couldn't retrieve your payment information. Please check your
            payment history.
          </p>

          <Link
            to="/dashboard/payment-history"
            className="btn mt-6 w-full rounded-xl bg-[#03373d] text-white border-none hover:bg-[#07545b]"
          >
            Payment History
            <FaArrowRight />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-72px)] bg-base-200 px-4 py-10 md:px-6 lg:py-14">
      <div className="mx-auto max-w-3xl">
        {/* ============================== Success Card ============================== */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-xl border border-gray-100">
          {/* ============================== Header ============================== */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#03373d] via-[#07545b] to-[#03373d] px-6 py-12 text-center md:px-10">
            {/* Decorative circles */}
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#CAEB66]/10"></div>

            <div className="absolute -bottom-20 -left-16 h-44 w-44 rounded-full bg-[#CAEB66]/10"></div>

            {/* Success Icon */}
            <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#CAEB66] shadow-lg shadow-black/20">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#03373d] text-[#03373d]">
                <FaCheck className="text-3xl" />
              </div>
            </div>

            <div className="relative">
              <h1 className="mt-6 text-3xl font-extrabold text-white md:text-4xl">
                Payment Successful!
              </h1>

              <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-gray-200 md:text-base">
                Your payment has been successfully completed. Your parcel is now
                ready for the next step of delivery.
              </p>
            </div>
          </div>

          {/* ============================== Body ============================== */}
          <div className="p-6 md:p-10">
            {/* Success Message */}
            <div className="mb-8 flex items-start gap-4 rounded-2xl bg-[#f1f8df] p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#CAEB66] text-[#03373d]">
                <FaCheckCircle />
              </div>

              <div>
                <h3 className="font-bold text-[#03373d]">Payment Confirmed</h3>

                <p className="mt-1 text-sm leading-5 text-gray-600">
                  Thank you for choosing ShiftexBD. Keep your tracking ID safe
                  to track your parcel.
                </p>
              </div>
            </div>

            {/* ============================== Payment Details ============================== */}
            <div className="mb-8">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <FaReceipt />
                </div>

                <div>
                  <h2 className="font-bold text-[#03373d]">Payment Details</h2>

                  <p className="text-xs text-gray-500">
                    Your payment information
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Transaction ID */}
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Transaction ID
                      </p>

                      <p className="mt-1 break-all font-mono text-sm font-bold text-[#03373d]">
                        {paymentInfo.transactionId}
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        handleCopy(paymentInfo.transactionId, "Transaction ID")
                      }
                      className="btn btn-sm shrink-0 rounded-lg bg-white border-gray-200 text-gray-600 hover:bg-[#eaf7c9] hover:text-[#03373d]"
                    >
                      <FaCopy />
                      Copy
                    </button>
                  </div>
                </div>

                {/* Tracking ID */}
                <div className="rounded-2xl border border-[#CAEB66]/50 bg-[#f8fce9] p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Parcel Tracking ID
                      </p>

                      <p className="mt-1 break-all font-mono text-base font-extrabold text-[#03373d]">
                        {paymentInfo.trackingId}
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        handleCopy(paymentInfo.trackingId, "Tracking ID")
                      }
                      className="btn btn-sm shrink-0 rounded-lg bg-[#CAEB66] text-[#03373d] border-none hover:bg-[#bde04f]"
                    >
                      <FaCopy />
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ============================== Next Step ============================== */}
            <div className="rounded-2xl bg-gradient-to-r from-[#03373d] to-[#07545b] p-5 text-white">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#CAEB66] text-[#03373d]">
                  <FaBoxOpen className="text-xl" />
                </div>

                <div>
                  <h3 className="font-bold">What's next?</h3>

                  <p className="mt-1 text-sm text-gray-300">
                    You can track your parcel from your dashboard using the
                    tracking ID.
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
                <FaBoxOpen />
                My Parcels
              </Link>

              <Link
                to="/"
                className="btn rounded-xl bg-[#03373d] text-white border-none font-bold hover:bg-[#07545b]"
              >
                <FaHome />
                Back to Home
              </Link>
            </div>
          </div>
        </div>

        {/* ============================== Footer Text ============================== */}
        <p className="mt-6 text-center text-xs text-gray-400">
          Thank you for using{" "}
          <span className="font-bold text-[#03373d]">ShiftexBD</span> 🚚
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
