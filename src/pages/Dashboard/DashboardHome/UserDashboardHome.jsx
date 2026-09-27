import React from "react";
import {
  FaBoxOpen,
  FaCheckCircle,
  FaClock,
  FaTruck,
  FaMapMarkerAlt,
  FaChartLine,
  FaClipboardList,
  FaShippingFast,
  FaUndo,
  FaExclamationTriangle,
} from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";

const UserDashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const userEmail = user?.email;

  // ==========================================
  // Get only logged-in user's parcels
  // ==========================================
  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["my-parcels", userEmail],
    enabled: !!userEmail,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels?email=${encodeURIComponent(userEmail)}`,
      );

      return Array.isArray(res.data) ? res.data : [];
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  // ==========================================
  // Parcel Status Calculations
  // ==========================================

  const totalParcels = parcels.length;

  // Waiting for pickup
  const pendingParcels = parcels.filter(
    (parcel) =>
      parcel.deliveryStatus === "pending" ||
      parcel.deliveryStatus === "pending_pickup",
  ).length;

  // Rider assigned
  const assignedParcels = parcels.filter(
    (parcel) =>
      parcel.deliveryStatus === "driver_assigned" ||
      parcel.deliveryStatus === "rider_assigned",
  ).length;

  // Rider is on the way
  const arrivingParcels = parcels.filter(
    (parcel) => parcel.deliveryStatus === "rider_arriving",
  ).length;

  // Parcel picked up / in transit
  const pickedUpParcels = parcels.filter(
    (parcel) =>
      parcel.deliveryStatus === "parcel_picked_up" ||
      parcel.deliveryStatus === "parcel_in_transit",
  ).length;

  // Successfully delivered
  const deliveredParcels = parcels.filter(
    (parcel) => parcel.deliveryStatus === "parcel_delivered",
  ).length;

  // Returned
  const returnedParcels = parcels.filter(
    (parcel) =>
      parcel.deliveryStatus === "parcel_returned" ||
      parcel.deliveryStatus === "returned",
  ).length;

  // Rider rejected / reassignment needed
  const rejectedParcels = parcels.filter(
    (parcel) => parcel.deliveryStatus === "rider_rejected",
  ).length;

  // Active = parcels currently in delivery process
  const activeParcels = parcels.filter(
    (parcel) =>
      parcel.deliveryStatus !== "parcel_delivered" &&
      parcel.deliveryStatus !== "parcel_returned" &&
      parcel.deliveryStatus !== "returned" &&
      parcel.deliveryStatus !== "rider_rejected",
  ).length;

  // ==========================================
  // Delivery Progress
  // ==========================================

  const deliveryRate =
    totalParcels > 0 ? Math.round((deliveredParcels / totalParcels) * 100) : 0;

  // ==========================================
  // Pie Chart Data
  // ==========================================

  const chartData = [
    {
      name: "Delivered",
      value: deliveredParcels,
      color: "#22c55e",
    },
    {
      name: "Waiting for Pickup",
      value: pendingParcels,
      color: "#f59e0b",
    },
    {
      name: "Rider Assigned",
      value: assignedParcels,
      color: "#3B82F6",
    },
    {
      name: "Rider On The Way",
      value: arrivingParcels,
      color: "#8b5cf6",
    },
    {
      name: "Parcel On The Way",
      value: pickedUpParcels,
      color: "#0EA5E9",
    },
    {
      name: "Returned",
      value: returnedParcels,
      color: "#ef4444",
    },
    {
      name: "Reassignment Needed",
      value: rejectedParcels,
      color: "#f97316",
    },
  ].filter((item) => item.value > 0);

  // ==========================================
  // Date Formatter
  // ==========================================

  const formatDate = (date) => {
    if (!date) return "N/A";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "N/A";
    }

    return parsedDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ==========================================
  // User-Friendly Status Badge
  // ==========================================

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
      case "pending_pickup":
        return (
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-amber-100 px-3 py-1.5 text-xs font-semibold text-amber-700">
            <FaClock className="text-[11px]" />
            Waiting for Pickup
          </span>
        );

      case "driver_assigned":
      case "rider_assigned":
        return (
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-blue-100 px-3 py-1.5 text-xs font-semibold text-blue-700">
            <FaTruck className="text-[11px]" />
            Rider Assigned
          </span>
        );

      case "rider_arriving":
        return (
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-violet-100 px-3 py-1.5 text-xs font-semibold text-violet-700">
            <FaMapMarkerAlt className="text-[11px]" />
            Rider Is On The Way
          </span>
        );

      case "parcel_picked_up":
      case "parcel_in_transit":
        return (
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-sky-100 px-3 py-1.5 text-xs font-semibold text-sky-700">
            <FaShippingFast className="text-[11px]" />
            Parcel Is On The Way
          </span>
        );

      case "parcel_delivered":
        return (
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-700">
            <FaCheckCircle className="text-[11px]" />
            Your Parcel Has Been Delivered
          </span>
        );

      case "parcel_returned":
      case "returned":
        return (
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-red-100 px-3 py-1.5 text-xs font-semibold text-red-700">
            <FaUndo className="text-[11px]" />
            Parcel Returned
          </span>
        );

      case "rider_rejected":
        return (
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-orange-100 px-3 py-1.5 text-xs font-semibold text-orange-700">
            <FaExclamationTriangle className="text-[11px]" />
            Delivery Reassignment Needed
          </span>
        );

      default:
        return (
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-600">
            Status Unavailable
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7f7] p-4 md:p-6">
      {/* ==========================================
          Header
      ========================================== */}
      <div className="mb-6">
        <div className="overflow-hidden rounded-2xl bg-[#03373d] shadow-lg">
          <div className="relative p-6 text-white md:p-7">
            {/* Decorative Circle */}
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#CAEB66]/10" />

            <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="mb-1 text-sm font-medium text-[#CAEB66]">
                  My Dashboard
                </p>

                <h1 className="text-2xl font-bold md:text-3xl">
                  Welcome, {user?.displayName || "User"} 👋
                </h1>

                <p className="mt-2 max-w-xl text-sm leading-6 text-white/70">
                  Track your parcels and stay updated on every delivery.
                </p>
              </div>

              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#CAEB66] text-3xl text-[#03373d] shadow-md">
                <FaClipboardList />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          Summary Cards
      ========================================== */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Total Parcels */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">My Parcels</p>

              <h2 className="mt-2 text-3xl font-bold text-[#03373d]">
                {totalParcels}
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                Total parcel requests
              </p>
            </div>

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#CAEB66]/25 text-2xl text-[#03373d]">
              <FaBoxOpen />
            </div>
          </div>
        </div>

        {/* Waiting */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Waiting for Pickup
              </p>

              <h2 className="mt-2 text-3xl font-bold text-amber-500">
                {pendingParcels}
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                Pickup not started yet
              </p>
            </div>

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-2xl text-amber-500">
              <FaClock />
            </div>
          </div>
        </div>

        {/* Active */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">In Progress</p>

              <h2 className="mt-2 text-3xl font-bold text-blue-500">
                {activeParcels}
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                Currently in delivery process
              </p>
            </div>

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-2xl text-blue-500">
              <FaTruck />
            </div>
          </div>
        </div>

        {/* Delivered */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Successfully Delivered
              </p>

              <h2 className="mt-2 text-3xl font-bold text-emerald-500">
                {deliveredParcels}
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                Parcels received successfully
              </p>
            </div>

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-2xl text-emerald-500">
              <FaCheckCircle />
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          Secondary Stats
      ========================================== */}
      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Rider Assigned */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl text-blue-500">
              <FaTruck />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">
                Rider Assigned
              </p>

              <h3 className="text-2xl font-bold text-[#03373d]">
                {assignedParcels}
              </h3>

              <p className="text-xs text-gray-400">Rider assigned to parcel</p>
            </div>
          </div>
        </div>

        {/* On The Way */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-xl text-sky-500">
              <FaShippingFast />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">On The Way</p>

              <h3 className="text-2xl font-bold text-[#03373d]">
                {arrivingParcels + pickedUpParcels}
              </h3>

              <p className="text-xs text-gray-400">Currently being delivered</p>
            </div>
          </div>
        </div>

        {/* Delivery Progress */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-xl text-emerald-500">
              <FaChartLine />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">
                Delivery Progress
              </p>

              <h3 className="text-2xl font-bold text-[#03373d]">
                {deliveryRate}%
              </h3>

              <p className="text-xs text-gray-400">
                Parcels successfully delivered
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          Chart + Performance
      ========================================== */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Parcel Overview */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm lg:col-span-2">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-[#03373d]">
              My Parcel Overview
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              See where your parcels are in the delivery process.
            </p>
          </div>

          <div className="h-[340px] w-full">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="48%"
                    outerRadius={105}
                    innerRadius={62}
                    paddingAngle={3}
                    stroke="none"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>

                  <Tooltip
                    formatter={(value) => [value, "Parcels"]}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #e5e7eb",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    }}
                  />

                  <Legend
                    verticalAlign="bottom"
                    height={50}
                    wrapperStyle={{
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <FaBoxOpen className="mb-3 text-4xl text-gray-300" />

                <p className="font-medium text-gray-500">
                  You have no parcel activity yet
                </p>

                <p className="mt-1 text-sm text-gray-400">
                  Your parcel activity will appear here.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Delivery Performance */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-[#03373d]">
              Delivery Progress
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Your completed deliveries
            </p>
          </div>

          <div className="flex flex-col items-center justify-center py-5">
            <div
              className="radial-progress bg-gray-100 text-[#03373d]"
              style={{
                "--value": deliveryRate,
                "--size": "10rem",
                "--thickness": "12px",
              }}
              role="progressbar"
              aria-label={`Delivery progress ${deliveryRate}%`}
            >
              <span className="text-3xl font-bold">{deliveryRate}%</span>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm font-medium text-gray-500">
                Successfully Delivered
              </p>

              <p className="mt-1 text-2xl font-bold text-emerald-500">
                {deliveredParcels}
              </p>

              <p className="mt-1 text-xs text-gray-400">
                out of {totalParcels} parcels
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          My Parcel Records
      ========================================== */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        {/* Table Header */}
        <div className="border-b border-gray-100 p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#03373d]">
                My Parcel Records
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                View the current status of all your parcels.
              </p>
            </div>

            <div className="inline-flex w-fit items-center rounded-full bg-[#03373d] px-4 py-2 text-xs font-semibold text-white">
              {totalParcels} {totalParcels === 1 ? "Parcel" : "Parcels"}
            </div>
          </div>
        </div>

        {parcels.length === 0 ? (
          <div className="p-5">
            <div className="rounded-xl bg-[#f5f7f7] py-14 text-center">
              <FaBoxOpen className="mx-auto mb-3 text-4xl text-gray-300" />

              <p className="font-semibold text-gray-500">
                You have no parcels yet
              </p>

              <p className="mt-1 text-sm text-gray-400">
                Your parcel requests will appear here after booking.
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1250px] border-collapse">
              {/* ==========================================
                  Table Header
              ========================================== */}
              <thead>
                <tr className="bg-[#03373d] text-left text-xs uppercase tracking-wide text-white">
                  <th className="px-5 py-4 font-semibold">#</th>

                  <th className="px-5 py-4 font-semibold">Parcel Name</th>

                  <th className="px-5 py-4 font-semibold">Weight</th>

                  <th className="px-5 py-4 font-semibold">Cost</th>

                  <th className="px-5 py-4 font-semibold">Payment</th>

                  <th className="px-5 py-4 font-semibold">Tracking ID</th>

                  <th className="px-5 py-4 font-semibold">Delivery Status</th>

                  <th className="px-5 py-4 font-semibold">Date</th>
                </tr>
              </thead>

              {/* ==========================================
                  Table Body
              ========================================== */}
              <tbody>
                {[...parcels]
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((parcel, index) => (
                    <tr
                      key={parcel._id}
                      className="border-b border-gray-100 transition-colors duration-200 hover:bg-[#f7faf7]"
                    >
                      {/* # */}
                      <td className="px-5 py-5 align-middle">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#03373d]/5 text-sm font-bold text-[#03373d]">
                          {index + 1}
                        </span>
                      </td>

                      {/* Parcel Name */}
                      <td className="px-5 py-5 align-middle">
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

                      {/* Weight */}
                      <td className="px-5 py-5 align-middle">
                        <span className="whitespace-nowrap text-sm font-medium text-gray-600">
                          {parcel.weight !== undefined &&
                          parcel.weight !== null &&
                          parcel.weight !== ""
                            ? `${parcel.weight} Kg`
                            : "N/A"}
                        </span>
                      </td>

                      {/* Cost */}
                      <td className="px-5 py-5 align-middle">
                        <span className="whitespace-nowrap text-sm font-bold text-[#03373d]">
                          ৳{parcel.deliveryCharge ?? parcel.cost ?? 0}
                        </span>
                      </td>

                      {/* Payment */}
                      <td className="px-5 py-5 align-middle">
                        {parcel.paymentStatus === "paid" ? (
                          <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                            <FaCheckCircle className="text-[11px]" />
                            Payment Completed
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-amber-100 px-3 py-1.5 text-xs font-semibold text-amber-700">
                            <FaClock className="text-[11px]" />
                            Payment Pending
                          </span>
                        )}
                      </td>

                      {/* Tracking ID */}
                      <td className="px-5 py-5 align-middle">
                        <span className="whitespace-nowrap rounded-md bg-gray-50 px-2.5 py-1.5 font-mono text-xs font-medium text-gray-600">
                          {parcel.trackingId || "Not Available"}
                        </span>
                      </td>

                      {/* Delivery Status */}
                      <td className="px-5 py-5 align-middle">
                        {getStatusBadge(parcel.deliveryStatus)}
                      </td>

                      {/* Date */}
                      <td className="px-5 py-5 align-middle">
                        <div className="flex items-center gap-2 whitespace-nowrap text-xs font-medium text-gray-500">
                          <FaClock className="text-[#03373d]/50" />

                          {formatDate(parcel.createdAt)}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ==========================================
          Bottom Info
      ========================================== */}
      <div className="mt-6 overflow-hidden rounded-2xl bg-[#03373d] shadow-md">
        <div className="relative p-6 text-white">
          {/* Decorative Circle */}
          <div className="absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-[#CAEB66]/10" />

          <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-lg font-bold">
                Stay updated on your deliveries 🚚
              </h3>

              <p className="mt-1 text-sm text-white/70">
                Follow your parcel from pickup to successful delivery.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs text-white/60">Successfully Delivered</p>

                <p className="text-2xl font-bold text-[#CAEB66]">
                  {deliveredParcels}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#CAEB66]/15">
                <FaCheckCircle className="text-2xl text-[#CAEB66]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardHome;
