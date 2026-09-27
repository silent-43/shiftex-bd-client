import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  FaBoxOpen,
  FaCheckCircle,
  FaClock,
  FaTruck,
  FaMotorcycle,
  FaUndo,
  FaMapMarkerAlt,
} from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminDashboardHome = () => {
  const axiosSecure = useAxiosSecure();

  const { data: deliveryStats = [], isLoading } = useQuery({
    queryKey: ["delivery-status-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels/delivery-status/stats");
      return res.data;
    },
  });

  // Convert backend status into readable text
  const formatStatus = (status) => {
    if (!status) return "Unknown";

    return status
      .replaceAll("_", " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // Get icon according to parcel status
  const getStatusIcon = (status) => {
    switch (status) {
      case "parcel_delivered":
        return <FaCheckCircle />;

      case "pending":
        return <FaClock />;

      case "parcel_picked_up":
        return <FaMotorcycle />;

      case "parcel_in_transit":
        return <FaTruck />;

      case "out_for_delivery":
        return <FaMapMarkerAlt />;

      case "returned":
        return <FaUndo />;

      default:
        return <FaBoxOpen />;
    }
  };

  // Get card style according to status
  const getStatusStyle = (status) => {
    switch (status) {
      case "parcel_delivered":
        return {
          bg: "bg-green-50",
          iconBg: "bg-green-100",
          iconColor: "text-green-600",
          valueColor: "text-green-600",
        };

      case "pending":
        return {
          bg: "bg-yellow-50",
          iconBg: "bg-yellow-100",
          iconColor: "text-yellow-600",
          valueColor: "text-yellow-600",
        };

      case "parcel_picked_up":
        return {
          bg: "bg-purple-50",
          iconBg: "bg-purple-100",
          iconColor: "text-purple-600",
          valueColor: "text-purple-600",
        };

      case "parcel_in_transit":
        return {
          bg: "bg-blue-50",
          iconBg: "bg-blue-100",
          iconColor: "text-blue-600",
          valueColor: "text-blue-600",
        };

      case "out_for_delivery":
        return {
          bg: "bg-sky-50",
          iconBg: "bg-sky-100",
          iconColor: "text-sky-600",
          valueColor: "text-sky-600",
        };

      case "returned":
        return {
          bg: "bg-red-50",
          iconBg: "bg-red-100",
          iconColor: "text-red-600",
          valueColor: "text-red-600",
        };

      default:
        return {
          bg: "bg-gray-50",
          iconBg: "bg-gray-100",
          iconColor: "text-gray-600",
          valueColor: "text-gray-600",
        };
    }
  };

  // Prepare pie chart data
  const getPieChartData = (data) => {
    return data.map((item) => ({
      name: formatStatus(item.status || item._id),
      value: item.count,
    }));
  };

  const pieData = getPieChartData(deliveryStats);

  // Calculate total parcels
  const totalParcels = deliveryStats.reduce(
    (total, item) => total + item.count,
    0,
  );

  // Delivered parcels
  const deliveredParcels =
    deliveryStats.find(
      (item) => (item.status || item._id) === "parcel_delivered",
    )?.count || 0;

  // Delivery percentage
  const deliveryPercentage =
    totalParcels > 0 ? ((deliveredParcels / totalParcels) * 100).toFixed(1) : 0;

  // Chart colors
  const COLORS = [
    "#CAEB66",
    "#03373d",
    "#3B82F6",
    "#60A5FA",
    "#0EA5E9",
    "#EF4444",
    "#8B5CF6",
    "#F59E0B",
  ];

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-[#03373d]"></span>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* ================= HEADER ================= */}
      <div>
        <p className="text-sm font-medium text-gray-500">
          Overview & Statistics
        </p>

        <h2 className="mt-1 text-3xl font-bold text-[#03373d] md:text-4xl">
          Admin Dashboard
        </h2>

        <p className="mt-2 text-gray-500">
          Monitor parcel delivery activity and overall platform performance.
        </p>
      </div>

      {/* ================= TOP SUMMARY ================= */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Total Parcels */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Parcels</p>

              <h3 className="mt-2 text-3xl font-bold text-[#03373d]">
                {totalParcels}
              </h3>

              <p className="mt-1 text-xs text-gray-400">
                All parcels in system
              </p>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#CAEB66] text-2xl text-[#03373d]">
              <FaBoxOpen />
            </div>
          </div>
        </div>

        {/* Delivered */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Delivered</p>

              <h3 className="mt-2 text-3xl font-bold text-green-600">
                {deliveredParcels}
              </h3>

              <p className="mt-1 text-xs text-gray-400">
                Successfully delivered
              </p>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-2xl text-green-600">
              <FaCheckCircle />
            </div>
          </div>
        </div>

        {/* Delivery Rate */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Delivery Rate</p>

              <h3 className="mt-2 text-3xl font-bold text-blue-600">
                {deliveryPercentage}%
              </h3>

              <p className="mt-1 text-xs text-gray-400">
                Overall completion rate
              </p>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-2xl text-blue-600">
              <FaTruck />
            </div>
          </div>
        </div>

        {/* Active Parcels */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Active Parcels
              </p>

              <h3 className="mt-2 text-3xl font-bold text-purple-600">
                {totalParcels - deliveredParcels}
              </h3>

              <p className="mt-1 text-xs text-gray-400">Yet to be delivered</p>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-2xl text-purple-600">
              <FaMotorcycle />
            </div>
          </div>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* ================= PIE CHART ================= */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm xl:col-span-2">
          <div className="mb-5">
            <h3 className="text-xl font-bold text-[#03373d]">
              Parcel Delivery Overview
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Current distribution of parcels by delivery status.
            </p>
          </div>

          {pieData.length > 0 ? (
            <div className="h-[360px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={115}
                    paddingAngle={3}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>

                  <Tooltip
                    formatter={(value) => [`${value} parcels`, "Count"]}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #e5e7eb",
                    }}
                  />

                  <Legend
                    verticalAlign="bottom"
                    height={40}
                    iconType="circle"
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex h-[360px] items-center justify-center">
              <div className="text-center">
                <FaBoxOpen className="mx-auto text-5xl text-gray-300" />

                <p className="mt-3 text-gray-500">
                  No parcel statistics available.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ================= QUICK SUMMARY ================= */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-5">
            <h3 className="text-xl font-bold text-[#03373d]">
              Delivery Summary
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Parcel status breakdown.
            </p>
          </div>

          <div className="space-y-4">
            {deliveryStats.map((stat) => {
              const status = stat.status || stat._id;
              const style = getStatusStyle(status);

              return (
                <div
                  key={stat._id}
                  className={`flex items-center justify-between rounded-xl p-3 ${style.bg}`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg ${style.iconBg} ${style.iconColor}`}
                    >
                      {getStatusIcon(status)}
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-gray-700">
                        {formatStatus(status)}
                      </p>

                      <p className="text-xs text-gray-400">Parcel status</p>
                    </div>
                  </div>

                  <span className={`text-xl font-bold ${style.valueColor}`}>
                    {stat.count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================= STATUS CARDS ================= */}
      <div>
        <div className="mb-4">
          <h3 className="text-xl font-bold text-[#03373d]">
            All Delivery Status
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Detailed parcel count according to each status.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {deliveryStats.map((stat) => {
            const status = stat.status || stat._id;
            const style = getStatusStyle(status);

            return (
              <div
                key={stat._id}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl ${style.iconBg} ${style.iconColor}`}
                  >
                    {getStatusIcon(status)}
                  </div>

                  <span className={`text-3xl font-bold ${style.valueColor}`}>
                    {stat.count}
                  </span>
                </div>

                <h4 className="mt-4 font-bold text-gray-700">
                  {formatStatus(status)}
                </h4>

                <p className="mt-1 text-sm text-gray-400">
                  Total parcels in this status
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
