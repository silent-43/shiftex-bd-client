import React from "react";
import {
  FaBoxOpen,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaCheckCircle,
  FaWallet,
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";

const CompletedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // ==========================================
  // Get Completed Deliveries
  // ==========================================
  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["parcels", user?.email, "parcel_delivered"],
    enabled: !!user?.email,

    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user.email}&deliveryStatus=parcel_delivered`,
      );

      return Array.isArray(res.data) ? res.data : [];
    },
  });

  // ==========================================
  // Calculate Rider Payout
  // ==========================================
  const calculatePayout = (parcel) => {
    const cost = Number(parcel.cost || parcel.deliveryCharge || 0);

    if (parcel.senderDistrict === parcel.receiverDistrict) {
      return cost * 0.7;
    }

    return cost * 0.9;
  };

  // ==========================================
  // Format Date + Bangladesh Local Time
  // ==========================================
  const formatDateTime = (date) => {
    if (!date) {
      return {
        date: "N/A",
        time: "",
      };
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return {
        date: "N/A",
        time: "",
      };
    }

    const formattedDate = parsedDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const formattedTime = parsedDate.toLocaleTimeString("en-BD", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Dhaka",
    });

    return {
      date: formattedDate,
      time: formattedTime,
    };
  };

  // ==========================================
  // Loading
  // ==========================================
  if (isLoading) {
    return <Loading />;
  }

  // ==========================================
  // Total Payout
  // ==========================================
  const totalPayout = parcels.reduce(
    (total, parcel) => total + calculatePayout(parcel),
    0,
  );

  return (
    <div className="min-h-screen bg-[#f5f7f7] p-3 sm:p-4 md:p-6">
      {/* ==========================================
          Header
      ========================================== */}
      <div className="mb-5 sm:mb-6">
        <div className="relative overflow-hidden rounded-2xl bg-[#03373d] p-5 shadow-lg sm:p-6 md:p-7">
          {/* Decorative Elements */}
          <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#CAEB66]/10" />

          <div className="absolute -bottom-16 right-24 h-32 w-32 rounded-full bg-[#CAEB66]/5" />

          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            {/* Header Content */}
            <div className="min-w-0">
              <div className="mb-2 flex items-center gap-2">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#CAEB66]/15 text-[#CAEB66]">
                  <FaCheckCircle />
                </span>

                <p className="text-sm font-medium text-[#CAEB66]">
                  Delivery History
                </p>
              </div>

              <h1 className="text-2xl font-bold text-white sm:text-3xl">
                Completed Deliveries
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/70">
                View your successfully delivered parcels and track your earnings
                from each delivery.
              </p>
            </div>

            {/* Header Stats */}
            <div className="grid grid-cols-2 gap-3 sm:flex">
              {/* Completed */}
              <div className="min-w-0 rounded-xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-sm sm:min-w-[135px]">
                <div className="flex items-center gap-2">
                  <FaBoxOpen className="shrink-0 text-[#CAEB66]" />

                  <span className="text-xs text-white/60">Completed</span>
                </div>

                <p className="mt-1 text-2xl font-bold text-white">
                  {parcels.length}
                </p>
              </div>

              {/* Total Payout */}
              <div className="min-w-0 rounded-xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-sm sm:min-w-[145px]">
                <div className="flex items-center gap-2">
                  <FaWallet className="shrink-0 text-[#CAEB66]" />

                  <span className="text-xs text-white/60">Total Payout</span>
                </div>

                <p className="mt-1 text-2xl font-bold text-[#CAEB66]">
                  ৳{Math.round(totalPayout)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          Summary Cards
      ========================================== */}
      <div className="mb-5 grid grid-cols-1 gap-4 sm:mb-6 sm:grid-cols-2">
        {/* Completed Deliveries */}
        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md sm:p-5">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-500">
                Completed Deliveries
              </p>

              <h2 className="mt-2 text-3xl font-bold text-[#03373d]">
                {parcels.length}
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                Successfully delivered parcels
              </p>
            </div>

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-2xl text-emerald-500">
              <FaCheckCircle />
            </div>
          </div>
        </div>

        {/* Total Payout */}
        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md sm:p-5">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-500">Total Payout</p>

              <h2 className="mt-2 text-3xl font-bold text-[#03373d]">
                ৳{Math.round(totalPayout)}
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                Earnings from completed deliveries
              </p>
            </div>

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#CAEB66]/20 text-2xl text-[#03373d]">
              <FaMoneyBillWave />
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          Completed Delivery Records
      ========================================== */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        {/* Section Header */}
        <div className="border-b border-gray-100 p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <h2 className="text-xl font-bold text-[#03373d]">
                Completed Delivery Records
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Review your completed deliveries and available payouts.
              </p>
            </div>

            <div className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-[#03373d] px-4 py-2 text-xs font-semibold text-white">
              <FaCheckCircle className="text-[#CAEB66]" />
              {parcels.length}{" "}
              {parcels.length === 1 ? "Delivery" : "Deliveries"}
            </div>
          </div>
        </div>

        {/* ==========================================
            Empty State
        ========================================== */}
        {parcels.length === 0 ? (
          <div className="p-4 sm:p-5">
            <div className="rounded-xl bg-[#f5f7f7] px-4 py-14 text-center sm:py-16">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-3xl text-gray-300">
                <FaBoxOpen />
              </div>

              <h3 className="font-semibold text-gray-500">
                No completed deliveries yet
              </h3>

              <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-gray-400">
                Parcels you successfully deliver will appear here along with
                your payout information.
              </p>
            </div>
          </div>
        ) : (
          /* ==========================================
              Responsive Delivery Table
          ========================================== */
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[1100px] border-collapse">
              {/* ==========================================
                  Table Header
              ========================================== */}
              <thead>
                <tr className="bg-[#03373d] text-left text-xs uppercase tracking-wide text-white">
                  <th className="whitespace-nowrap px-4 py-4 font-semibold sm:px-5">
                    #
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 font-semibold sm:px-5">
                    Parcel Name
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 font-semibold sm:px-5">
                    Created Date & Time
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 font-semibold sm:px-5">
                    Pickup District
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 font-semibold sm:px-5">
                    Parcel Cost
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 font-semibold sm:px-5">
                    Your Payout
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 text-center font-semibold sm:px-5">
                    Status
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 text-center font-semibold sm:px-5">
                    Action
                  </th>
                </tr>
              </thead>

              {/* ==========================================
                  Table Body
              ========================================== */}
              <tbody>
                {[...parcels]
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((parcel, index) => {
                    const payout = Math.round(calculatePayout(parcel));

                    const parcelCost = Number(
                      parcel.cost || parcel.deliveryCharge || 0,
                    );

                    const dateTime = formatDateTime(parcel.createdAt);

                    return (
                      <tr
                        key={parcel._id}
                        className="border-b border-gray-100 transition-colors duration-200 hover:bg-[#f7faf7]"
                      >
                        {/* Number */}
                        <td className="px-4 py-5 align-middle sm:px-5">
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#03373d]/5 text-sm font-bold text-[#03373d]">
                            {index + 1}
                          </span>
                        </td>

                        {/* Parcel Name */}
                        <td className="px-4 py-5 align-middle sm:px-5">
                          <div className="min-w-[150px]">
                            <p className="font-semibold text-[#03373d]">
                              {parcel.parcelName || "Unnamed Parcel"}
                            </p>

                            {parcel.parcelType && (
                              <p className="mt-1 text-xs capitalize text-gray-400">
                                {parcel.parcelType}
                              </p>
                            )}
                          </div>
                        </td>

                        {/* Created Date & Time */}
                        <td className="px-4 py-5 align-middle sm:px-5">
                          <div className="flex items-start gap-2">
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
                              <FaCalendarAlt className="text-xs" />
                            </span>

                            <div className="whitespace-nowrap">
                              <p className="text-sm font-medium text-gray-600">
                                {dateTime.date}
                              </p>

                              {dateTime.time && (
                                <p className="mt-1 text-xs font-medium text-gray-400">
                                  {dateTime.time}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Pickup District */}
                        <td className="px-4 py-5 align-middle sm:px-5">
                          <div className="flex items-center gap-2 whitespace-nowrap">
                            <FaMapMarkerAlt className="text-sm text-[#03373d]/60" />

                            <span className="text-sm font-medium text-gray-600">
                              {parcel.senderDistrict || "N/A"}
                            </span>
                          </div>
                        </td>

                        {/* Parcel Cost */}
                        <td className="px-4 py-5 align-middle sm:px-5">
                          <span className="whitespace-nowrap text-sm font-bold text-[#03373d]">
                            ৳{parcelCost}
                          </span>
                        </td>

                        {/* Your Payout */}
                        <td className="px-4 py-5 align-middle sm:px-5">
                          <div className="inline-flex items-center gap-2 rounded-lg bg-[#CAEB66]/20 px-3 py-2">
                            <FaMoneyBillWave className="text-sm text-[#03373d]" />

                            <span className="whitespace-nowrap text-sm font-bold text-[#03373d]">
                              ৳{payout}
                            </span>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-4 py-5 text-center align-middle sm:px-5">
                          <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                            <FaCheckCircle className="text-[11px]" />
                            Delivered
                          </span>
                        </td>

                        {/* Action */}
                        <td className="px-4 py-5 text-center align-middle sm:px-5">
                          <button
                            type="button"
                            className="inline-flex items-center gap-2 rounded-lg bg-[#CAEB66] px-4 py-2.5 text-xs font-bold text-[#03373d] shadow-sm transition duration-200 hover:bg-[#bce052] hover:shadow-md active:scale-95"
                          >
                            <FaWallet className="text-sm" />
                            Cash Out
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>

              {/* ==========================================
                  Table Footer
              ========================================== */}
              <tfoot>
                <tr className="bg-[#f7faf7]">
                  <td
                    colSpan="5"
                    className="px-4 py-4 text-right text-sm font-semibold text-gray-500 sm:px-5"
                  >
                    Total Payout
                  </td>

                  <td className="px-4 py-4 sm:px-5">
                    <span className="inline-flex items-center rounded-lg bg-[#03373d] px-3 py-2 text-sm font-bold text-[#CAEB66]">
                      ৳{Math.round(totalPayout)}
                    </span>
                  </td>

                  <td colSpan="2" />
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompletedDeliveries;
