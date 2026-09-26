import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  FaBoxOpen,
  FaUser,
  FaEnvelope,
  FaWeightHanging,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaTruck,
  FaClipboardList,
} from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const RejectedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["rejected-parcels", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider/rejected?riderEmail=${user.email}`,
      );

      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div>
      {/* ============================ Page Header ============================ */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#03373d] text-[#CAEB66]">
            <FaTruck className="text-xl" />
          </div>

          <div>
            <h2 className="text-3xl font-extrabold text-[#03373d] md:text-4xl">
              Rejected Deliveries
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Parcels that were rejected by riders
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-2xl bg-red-50 px-5 py-4">
          <p className="font-semibold text-red-600">
            Total Rejected Parcels: {parcels.length}
          </p>
        </div>
      </div>

      {/* ============================ Empty State ============================ */}
      {parcels.length === 0 ? (
        <div className="rounded-3xl bg-white px-5 py-16 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400">
            <FaBoxOpen className="text-2xl" />
          </div>

          <h3 className="text-2xl font-bold text-gray-700">
            No Rejected Deliveries
          </h3>

          <p className="mt-2 text-gray-500">
            You have not rejected any parcel yet.
          </p>
        </div>
      ) : (
        /* ============================ Parcel List ============================ */
        <div className="space-y-6">
          {parcels.map((parcel, index) => (
            <div
              key={parcel._id}
              className="overflow-hidden rounded-3xl bg-white shadow-sm"
            >
              {/* ============================ Parcel Header ============================ */}
              <div className="flex flex-col gap-4 border-b border-gray-100 p-5 md:flex-row md:items-center md:justify-between md:p-7">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#03373d] text-[#CAEB66]">
                    <FaBoxOpen className="text-xl" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase text-gray-400">
                      Parcel #{index + 1}
                    </p>

                    <h3 className="text-xl font-bold text-[#03373d]">
                      {parcel.parcelName}
                    </h3>
                  </div>
                </div>

                <span className="badge badge-error px-4 py-3 text-white">
                  Rejected
                </span>
              </div>

              {/* ============================ Rider Information ============================ */}
              <div className="border-b border-gray-100 bg-red-50 p-5 md:p-7">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600">
                    <FaUser />
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-800">
                      Rejected By Rider
                    </h4>

                    <p className="text-xs text-gray-500">
                      Rider assigned to this parcel
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold text-gray-500">
                      Rider Name
                    </p>

                    <p className="mt-1 font-bold text-gray-800">
                      {parcel.riderName || "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-500">
                      Rider Email
                    </p>

                    <p className="mt-1 break-all font-medium text-gray-700">
                      {parcel.riderEmail || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* ============================ Parcel Information ============================ */}
              <div className="p-5 md:p-7">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#03373d] text-[#CAEB66]">
                    <FaClipboardList />
                  </div>

                  <h4 className="text-xl font-bold text-[#03373d]">
                    Parcel Information
                  </h4>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <p className="text-xs font-semibold text-gray-500">
                      Parcel Type
                    </p>

                    <p className="mt-1 font-bold capitalize text-gray-800">
                      {parcel.parcelType}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-500">
                      Parcel Name
                    </p>

                    <p className="mt-1 font-bold text-gray-800">
                      {parcel.parcelName}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-500">
                      Parcel Weight
                    </p>

                    <p className="mt-1 flex items-center gap-2 font-bold text-gray-800">
                      <FaWeightHanging className="text-gray-400" />
                      {parcel.parcelWeight} kg
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-500">
                      Delivery Cost
                    </p>

                    <p className="mt-1 flex items-center gap-2 font-bold text-[#03373d]">
                      <FaMoneyBillWave className="text-green-600" />৳
                      {parcel.cost}
                    </p>
                  </div>
                </div>
              </div>

              {/* ============================ Sender Information ============================ */}
              <div className="border-t border-gray-100 p-5 md:p-7">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-[#03373d]">
                    <FaMapMarkerAlt />
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-[#03373d]">
                      Sender Information
                    </h4>

                    <p className="text-xs text-gray-500">
                      Parcel pickup information
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold text-gray-500">
                      Sender Name
                    </p>

                    <p className="mt-1 flex items-center gap-2 font-semibold text-gray-800">
                      <FaUser className="text-gray-400" />
                      {parcel.senderName}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-500">
                      Sender Email
                    </p>

                    <p className="mt-1 flex items-center gap-2 break-all font-medium text-gray-700">
                      <FaEnvelope className="text-gray-400" />
                      {parcel.senderEmail}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-500">
                      Sender Region
                    </p>

                    <p className="mt-1 font-medium text-gray-800">
                      {parcel.senderRegion}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-500">
                      Sender District
                    </p>

                    <p className="mt-1 font-medium text-gray-800">
                      {parcel.senderDistrict}
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <p className="text-xs font-semibold text-gray-500">
                      Sender Address
                    </p>

                    <p className="mt-1 font-medium text-gray-800">
                      {parcel.senderAddress}
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <p className="text-xs font-semibold text-gray-500">
                      Pickup Instruction
                    </p>

                    <p className="mt-1 rounded-xl bg-gray-50 p-4 text-sm text-gray-700">
                      {parcel.senderPickupInstruction ||
                        "No instruction provided"}
                    </p>
                  </div>
                </div>
              </div>

              {/* ============================ Receiver Information ============================ */}
              <div className="border-t border-gray-100 p-5 md:p-7">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#CAEB66] text-[#03373d]">
                    <FaMapMarkerAlt />
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-[#03373d]">
                      Receiver Information
                    </h4>

                    <p className="text-xs text-gray-500">
                      Parcel delivery information
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold text-gray-500">
                      Receiver Name
                    </p>

                    <p className="mt-1 flex items-center gap-2 font-semibold text-gray-800">
                      <FaUser className="text-gray-400" />
                      {parcel.receiverName}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-500">
                      Receiver Email
                    </p>

                    <p className="mt-1 flex items-center gap-2 break-all font-medium text-gray-700">
                      <FaEnvelope className="text-gray-400" />
                      {parcel.receiverEmail}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-500">
                      Receiver Region
                    </p>

                    <p className="mt-1 font-medium text-gray-800">
                      {parcel.receiverRegion}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-500">
                      Receiver District
                    </p>

                    <p className="mt-1 font-medium text-gray-800">
                      {parcel.receiverDistrict}
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <p className="text-xs font-semibold text-gray-500">
                      Receiver Address
                    </p>

                    <p className="mt-1 font-medium text-gray-800">
                      {parcel.receiverAddress}
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <p className="text-xs font-semibold text-gray-500">
                      Delivery Instruction
                    </p>

                    <p className="mt-1 rounded-xl bg-gray-50 p-4 text-sm text-gray-700">
                      {parcel.receiverPickupInstruction ||
                        "No instruction provided"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RejectedDeliveries;
