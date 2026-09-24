import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaCreditCard, FaReceipt, FaCheckCircle } from "react-icons/fa";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-6">
      {/* ================= Header ================= */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#03373d]">
              Payment History
            </h2>

            <p className="mt-1 text-gray-500">
              View and track all your payment transactions
            </p>
          </div>

          {/* Payment Count */}
          <div className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#03373d] to-[#07545b] px-6 py-4 text-white shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#CAEB66] text-[#03373d]">
              <FaCreditCard className="text-xl" />
            </div>

            <div>
              <p className="text-sm opacity-80">Total Payments</p>

              <p className="text-3xl font-bold">{payments.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= Payment Table Card ================= */}
      <div className="rounded-2xl bg-base-100 shadow-xl border border-gray-100 overflow-hidden">
        {/* Card Header */}
        <div className="bg-gradient-to-r from-[#03373d] to-[#07545b] px-5 py-4">
          <div className="flex items-center gap-3 text-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#CAEB66] text-[#03373d]">
              <FaReceipt />
            </div>

            <div>
              <h3 className="text-lg font-semibold">Transaction Records</h3>

              <p className="text-xs text-gray-300">
                Complete payment information
              </p>
            </div>
          </div>
        </div>

        {/* ================= Table ================= */}
        <div className="overflow-x-auto">
          <table className="table">
            {/* Table Head */}
            <thead>
              <tr className="bg-gray-50 text-gray-600">
                <th className="font-semibold">#</th>

                <th className="font-semibold">Parcel Name</th>

                <th className="font-semibold">Amount</th>

                <th className="font-semibold">Tracking ID</th>

                <th className="font-semibold">Transaction ID</th>

                <th className="font-semibold">Paid Time</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {payments.map((payment, index) => (
                <tr
                  key={payment._id}
                  className="hover:bg-[#f4fbe8] transition-colors duration-200"
                >
                  {/* Serial */}
                  <th>
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#03373d] text-white text-sm">
                      {index + 1}
                    </span>
                  </th>

                  {/* Parcel Name */}
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                        <FaReceipt />
                      </div>

                      <div>
                        <p className="font-semibold text-[#03373d]">
                          {payment.parcelName}
                        </p>

                        <p className="text-xs text-gray-400">Parcel Payment</p>
                      </div>
                    </div>
                  </td>

                  {/* Amount */}
                  <td>
                    <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1.5 font-bold text-green-700">
                      ৳{payment.amount}
                    </span>
                  </td>

                  {/* Tracking ID */}
                  <td>
                    <span className="rounded-lg bg-cyan-50 px-3 py-2 text-sm font-medium text-cyan-700">
                      {payment.trackingId}
                    </span>
                  </td>

                  {/* Transaction ID */}
                  <td>
                    <span className="text-sm font-medium text-gray-600">
                      {payment.transactionId}
                    </span>
                  </td>

                  {/* Paid Time */}
                  <td>
                    <div className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-500" />

                      <span className="text-sm text-gray-600 whitespace-nowrap">
                        {payment.paidAt}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ================= Empty State ================= */}
        {payments.length === 0 && (
          <div className="py-16 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-500">
              <FaCreditCard className="text-2xl" />
            </div>

            <h3 className="text-xl font-semibold text-gray-700">
              No Payment History
            </h3>

            <p className="mt-1 text-gray-500">
              You haven't made any payments yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
