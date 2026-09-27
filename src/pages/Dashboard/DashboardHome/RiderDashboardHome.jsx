import React from "react";
import {
  FaBoxOpen,
  FaCheckCircle,
  FaMotorcycle,
  FaTruck,
  FaMapMarkerAlt,
  FaClock,
  FaChartLine,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";

const RiderDashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const riderEmail = user?.email;

  // --------------------------------
  // Get rider's active/assigned parcels
  // --------------------------------
  const { data: parcels = [], isLoading: parcelsLoading } = useQuery({
    queryKey: ["rider-parcels", riderEmail],
    enabled: !!riderEmail,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${riderEmail}`,
      );

      return res.data;
    },
  });

  // --------------------------------
  // Get rider's delivered parcels per day
  // --------------------------------
  const { data: deliveryPerDay = [], isLoading: deliveryLoading } = useQuery({
    queryKey: ["rider-delivery-per-day", riderEmail],
    enabled: !!riderEmail,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders/delivery-per-day?email=${riderEmail}`,
      );

      return res.data;
    },
  });

  if (parcelsLoading || deliveryLoading) {
    return <Loading />;
  }

  // --------------------------------
  // Delivered count
  // IMPORTANT:
  // /parcels/rider does NOT return delivered parcels.
  // So delivered count comes from delivery-per-day API.
  // --------------------------------
  const deliveredParcels = deliveryPerDay.reduce(
    (total, item) => total + Number(item.deliveredCount || 0),
    0,
  );

  // --------------------------------
  // Active parcel status counts
  // --------------------------------
  const assignedParcels = parcels.filter(
    (parcel) => parcel.deliveryStatus === "driver_assigned",
  ).length;

  const arrivingParcels = parcels.filter(
    (parcel) => parcel.deliveryStatus === "rider_arriving",
  ).length;

  const pickedUpParcels = parcels.filter(
    (parcel) => parcel.deliveryStatus === "parcel_picked_up",
  ).length;

  // /parcels/rider route already excludes delivered parcels.
  const activeParcels = parcels.length;

  // Total = active + delivered
  const totalParcels = activeParcels + deliveredParcels;

  // --------------------------------
  // Delivery rate
  // --------------------------------
  const deliveryRate =
    totalParcels > 0 ? Math.round((deliveredParcels / totalParcels) * 100) : 0;

  // --------------------------------
  // Prepare chart data
  // --------------------------------
  const chartData = [...deliveryPerDay]
    .sort((a, b) => new Date(a._id) - new Date(b._id))
    .map((item) => ({
      date: item._id,
      delivered: Number(item.deliveredCount || 0),
    }));

  // --------------------------------
  // Format date
  // --------------------------------
  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // --------------------------------
  // Status badge
  // --------------------------------
  const getStatusBadge = (status) => {
    switch (status) {
      case "driver_assigned":
        return (
          <span className="badge badge-info badge-sm gap-1">
            <FaTruck />
            Assigned
          </span>
        );

      case "rider_arriving":
        return (
          <span className="badge badge-warning badge-sm gap-1">
            <FaMotorcycle />
            Arriving
          </span>
        );

      case "parcel_picked_up":
        return (
          <span className="badge badge-primary badge-sm gap-1">
            <FaBoxOpen />
            Picked Up
          </span>
        );

      case "parcel_delivered":
        return (
          <span className="badge badge-success badge-sm gap-1">
            <FaCheckCircle />
            Delivered
          </span>
        );

      case "rider_rejected":
        return (
          <span className="badge badge-error badge-sm gap-1">Rejected</span>
        );

      default:
        return (
          <span className="badge badge-ghost badge-sm">
            {status || "Unknown"}
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-6">
      {/* =========================
          Header
      ========================= */}
      <div className="mb-6">
        <div className="rounded-2xl bg-[#03373d] p-6 text-white shadow-lg">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-1 text-sm text-[#CAEB66]">Rider Dashboard</p>

              <h1 className="text-2xl font-bold md:text-3xl">
                Welcome, {user?.displayName || "Rider"} 👋
              </h1>

              <p className="mt-2 text-sm text-white/70">{riderEmail}</p>
            </div>

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#CAEB66] text-3xl text-[#03373d]">
              <FaMotorcycle />
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          Main Summary Cards
      ========================= */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Parcels */}
        <div className="rounded-2xl bg-base-100 p-5 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Parcels</p>

              <h2 className="mt-2 text-3xl font-bold text-[#03373d]">
                {totalParcels}
              </h2>

              <p className="mt-1 text-xs text-gray-400">Assigned + Delivered</p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#CAEB66]/30 text-2xl text-[#03373d]">
              <FaBoxOpen />
            </div>
          </div>
        </div>

        {/* Assigned */}
        <div className="rounded-2xl bg-base-100 p-5 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Assigned</p>

              <h2 className="mt-2 text-3xl font-bold text-info">
                {assignedParcels}
              </h2>

              <p className="mt-1 text-xs text-gray-400">Waiting for delivery</p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-info/10 text-2xl text-info">
              <FaTruck />
            </div>
          </div>
        </div>

        {/* Active */}
        <div className="rounded-2xl bg-base-100 p-5 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active</p>

              <h2 className="mt-2 text-3xl font-bold text-warning">
                {activeParcels}
              </h2>

              <p className="mt-1 text-xs text-gray-400">Currently in process</p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-warning/10 text-2xl text-warning">
              <FaMotorcycle />
            </div>
          </div>
        </div>

        {/* Delivered */}
        <div className="rounded-2xl bg-base-100 p-5 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Delivered</p>

              <h2 className="mt-2 text-3xl font-bold text-success">
                {deliveredParcels}
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                Successfully delivered
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/10 text-2xl text-success">
              <FaCheckCircle />
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          Secondary Stats
      ========================= */}
      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Arriving */}
        <div className="rounded-2xl bg-base-100 p-5 shadow-md">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-warning/10 text-xl text-warning">
              <FaMapMarkerAlt />
            </div>

            <div>
              <p className="text-sm text-gray-500">Rider Arriving</p>

              <h3 className="text-2xl font-bold">{arrivingParcels}</h3>
            </div>
          </div>
        </div>

        {/* Picked Up */}
        <div className="rounded-2xl bg-base-100 p-5 shadow-md">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-xl text-primary">
              <FaBoxOpen />
            </div>

            <div>
              <p className="text-sm text-gray-500">Picked Up</p>

              <h3 className="text-2xl font-bold">{pickedUpParcels}</h3>
            </div>
          </div>
        </div>

        {/* Delivery Rate */}
        <div className="rounded-2xl bg-base-100 p-5 shadow-md">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/10 text-xl text-success">
              <FaChartLine />
            </div>

            <div>
              <p className="text-sm text-gray-500">Delivery Rate</p>

              <h3 className="text-2xl font-bold">{deliveryRate}%</h3>
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          Charts + Performance
      ========================= */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Daily Delivery Chart */}
        <div className="rounded-2xl bg-base-100 p-5 shadow-md lg:col-span-2">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-[#03373d]">
              Daily Delivery Performance
            </h2>

            <p className="text-sm text-gray-500">
              Your delivered parcels by date
            </p>
          </div>

          <div className="h-[300px] w-full">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />

                  <YAxis allowDecimals={false} />

                  <Tooltip />

                  <Bar
                    dataKey="delivered"
                    name="Delivered"
                    fill="#CAEB66"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-gray-400">
                No delivery data available
              </div>
            )}
          </div>
        </div>

        {/* Performance */}
        <div className="rounded-2xl bg-base-100 p-6 shadow-md">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-[#03373d]">My Performance</h2>

            <p className="text-sm text-gray-500">Overall delivery rate</p>
          </div>

          <div className="flex flex-col items-center justify-center py-5">
            <div
              className="radial-progress bg-base-200 text-[#03373d]"
              style={{
                "--value": deliveryRate,
                "--size": "10rem",
                "--thickness": "12px",
              }}
              role="progressbar"
            >
              <span className="text-3xl font-bold">{deliveryRate}%</span>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">Successfully Delivered</p>

              <p className="mt-1 text-2xl font-bold text-success">
                {deliveredParcels}
              </p>

              <p className="mt-1 text-xs text-gray-400">parcels delivered</p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          Assigned Parcels
      ========================= */}
      <div className="mt-6 rounded-2xl bg-base-100 p-5 shadow-md">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#03373d]">
              My Assigned Parcels
            </h2>

            <p className="text-sm text-gray-500">
              Parcels currently assigned to you
            </p>
          </div>

          <div className="badge badge-neutral">{parcels.length} Active</div>
        </div>

        {parcels.length === 0 ? (
          <div className="rounded-xl bg-base-200 py-12 text-center">
            <FaBoxOpen className="mx-auto mb-3 text-4xl text-gray-400" />

            <p className="font-medium text-gray-500">
              No active parcels assigned
            </p>

            <p className="mt-1 text-sm text-gray-400">
              Assigned parcels will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Parcel</th>
                  <th>Receiver</th>
                  <th>Tracking ID</th>
                  <th>Status</th>
                  <th>Charge</th>
                  <th>Created</th>
                </tr>
              </thead>

              <tbody>
                {parcels.map((parcel, index) => (
                  <tr key={parcel._id}>
                    <td>{index + 1}</td>

                    <td>
                      <div className="font-semibold">
                        {parcel.parcelName || "N/A"}
                      </div>
                    </td>

                    <td>
                      <div className="font-medium">
                        {parcel.receiverName || "N/A"}
                      </div>

                      {parcel.receiverPhone && (
                        <div className="text-xs text-gray-400">
                          {parcel.receiverPhone}
                        </div>
                      )}
                    </td>

                    <td>
                      <span className="font-mono text-xs">
                        {parcel.trackingId || "N/A"}
                      </span>
                    </td>

                    <td>{getStatusBadge(parcel.deliveryStatus)}</td>

                    <td>
                      <span className="font-semibold">
                        ৳{parcel.deliveryCharge ?? parcel.cost ?? 0}
                      </span>
                    </td>

                    <td>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <FaClock />

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

      {/* =========================
          Bottom Info
      ========================= */}
      <div className="mt-6 rounded-2xl bg-[#03373d] p-6 text-white shadow-md">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-bold">
              Keep delivering with ShiftexBD 🚚
            </h3>

            <p className="mt-1 text-sm text-white/70">
              Stay updated with your assigned parcels and delivery performance.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs text-white/60">Total Delivered</p>

              <p className="text-2xl font-bold text-[#CAEB66]">
                {deliveredParcels}
              </p>
            </div>

            <FaCheckCircle className="text-3xl text-[#CAEB66]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiderDashboardHome;
