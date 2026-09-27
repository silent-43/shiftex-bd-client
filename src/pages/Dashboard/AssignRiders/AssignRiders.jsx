import React, { useRef, useState } from "react";
import {
  FaBoxOpen,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaMotorcycle,
  FaUserCheck,
  FaTimes,
} from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading/Loading";

const AssignRiders = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const riderModalRef = useRef();
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [assigningRiderId, setAssigningRiderId] = useState(null);

  // ==========================================
  // Get Pending Pickup Parcels
  // ==========================================
  const {
    data: parcels = [],
    refetch: parcelsRefetch,
    isLoading: parcelsLoading,
  } = useQuery({
    queryKey: ["parcels", "pending_pickup"],

    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels?deliveryStatus=pending_pickup",
      );

      return Array.isArray(res.data) ? res.data : [];
    },
  });

  // ==========================================
  // Get Available Riders Based On Pickup District
  // ==========================================
  const { data: riders = [], isLoading: ridersLoading } = useQuery({
    queryKey: ["riders", selectedParcel?.senderDistrict, "available"],
    enabled: !!selectedParcel?.senderDistrict,

    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders?status=approved&district=${selectedParcel.senderDistrict}&workStatus=available`,
      );

      return Array.isArray(res.data) ? res.data : [];
    },
  });

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
      timeZone: "Asia/Dhaka",
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
  // Open Rider Assignment Modal
  // ==========================================
  const openAssignRiderModal = (parcel) => {
    setSelectedParcel(parcel);

    riderModalRef.current?.showModal();
  };

  // ==========================================
  // Assign Selected Rider
  // ==========================================
  const handleAssignRider = (rider) => {
    if (!selectedParcel) {
      return;
    }

    const riderAssignInfo = {
      riderId: rider._id,
      riderName: rider.riderName,
      riderEmail: rider.riderEmail,
      parcelId: selectedParcel._id,
      trackingId: selectedParcel.trackingId,
    };

    setAssigningRiderId(rider._id);

    axiosSecure
      .patch(`/parcels/${selectedParcel._id}`, riderAssignInfo)
      .then((res) => {
        if (res.data?.result?.modifiedCount > 0) {
          riderModalRef.current?.close();

          // Refresh pending parcels
          parcelsRefetch();

          // Refresh available riders
          queryClient.invalidateQueries({
            queryKey: ["riders", selectedParcel.senderDistrict, "available"],
          });

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Rider has been Assigned",
            showConfirmButton: false,
            timer: 1500,
          });

          setSelectedParcel(null);
        } else {
          Swal.fire({
            icon: "warning",
            title: "Assignment Failed",
            text: "The rider could not be assigned.",
          });
        }
      })
      .catch((error) => {
        console.error("Assign Rider Error:", error);

        Swal.fire({
          icon: "error",
          title: "Something went wrong",
          text: "Failed to assign rider.",
        });
      })
      .finally(() => {
        setAssigningRiderId(null);
      });
  };

  // ==========================================
  // Loading
  // ==========================================
  if (parcelsLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-[#f5f7f7] p-3 sm:p-4 md:p-6">
      {/* ==========================================
          Page Header
      ========================================== */}
      <div className="mb-5 sm:mb-6">
        <div className="relative overflow-hidden rounded-2xl bg-[#03373d] p-5 shadow-lg sm:p-6 md:p-7">
          {/* Decorative Circles */}
          <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#CAEB66]/10" />

          <div className="absolute -bottom-16 right-24 h-32 w-32 rounded-full bg-[#CAEB66]/5" />

          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            {/* Header Content */}
            <div className="min-w-0">
              <div className="mb-2 flex items-center gap-2">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#CAEB66]/15 text-[#CAEB66]">
                  <FaMotorcycle />
                </span>

                <p className="text-sm font-medium text-[#CAEB66]">
                  Delivery Management
                </p>
              </div>

              <h1 className="text-2xl font-bold text-white sm:text-3xl">
                Assign Riders
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/70">
                Assign available riders to parcels that are waiting for pickup.
              </p>
            </div>

            {/* Total Pending */}
            <div className="w-fit rounded-xl border border-white/10 bg-white/10 px-5 py-3 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <FaBoxOpen className="text-[#CAEB66]" />

                <span className="text-xs text-white/60">Pending Pickup</span>
              </div>

              <p className="mt-1 text-2xl font-bold text-white">
                {parcels.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          Summary Card
      ========================================== */}
      <div className="mb-5 grid grid-cols-1 gap-4 sm:mb-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Pending Parcels */}
        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md sm:p-5">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-500">
                Pending Parcels
              </p>

              <h2 className="mt-2 text-3xl font-bold text-[#03373d]">
                {parcels.length}
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                Waiting for rider assignment
              </p>
            </div>

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-2xl text-amber-500">
              <FaBoxOpen />
            </div>
          </div>
        </div>

        {/* Available Riders */}
        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md sm:p-5">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-500">Assignment</p>

              <h2 className="mt-2 text-3xl font-bold text-[#03373d]">Ready</h2>

              <p className="mt-1 text-xs text-gray-400">
                Find riders by pickup district
              </p>
            </div>

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-2xl text-blue-500">
              <FaUserCheck />
            </div>
          </div>
        </div>

        {/* Process */}
        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md sm:p-5 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-500">Process</p>

              <h2 className="mt-2 text-3xl font-bold text-[#03373d]">1 → 2</h2>

              <p className="mt-1 text-xs text-gray-400">
                Select parcel → assign rider
              </p>
            </div>

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#CAEB66]/20 text-2xl text-[#03373d]">
              <FaMotorcycle />
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          Parcel Records
      ========================================== */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        {/* Table Header */}
        <div className="border-b border-gray-100 p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <h2 className="text-xl font-bold text-[#03373d]">
                Pending Pickup Parcels
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Choose a parcel and assign an available rider from its pickup
                district.
              </p>
            </div>

            <div className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-[#03373d] px-4 py-2 text-xs font-semibold text-white">
              <FaBoxOpen className="text-[#CAEB66]" />
              {parcels.length} {parcels.length === 1 ? "Parcel" : "Parcels"}
            </div>
          </div>
        </div>

        {/* ==========================================
            Empty State
        ========================================== */}
        {parcels.length === 0 ? (
          <div className="p-4 sm:p-5">
            <div className="rounded-xl bg-[#f5f7f7] px-4 py-14 text-center sm:py-16">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-3xl text-emerald-400">
                <FaUserCheck />
              </div>

              <h3 className="font-semibold text-gray-500">
                No parcels waiting for rider assignment
              </h3>

              <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-gray-400">
                New parcels waiting for pickup will appear here when they are
                ready to be assigned.
              </p>
            </div>
          </div>
        ) : (
          /* ==========================================
              Responsive Table
          ========================================== */
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[950px] border-collapse">
              <thead>
                <tr className="bg-[#03373d] text-left text-xs uppercase tracking-wide text-white">
                  <th className="whitespace-nowrap px-4 py-4 font-semibold sm:px-5">
                    #
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 font-semibold sm:px-5">
                    Parcel Name
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 font-semibold sm:px-5">
                    Cost
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 font-semibold sm:px-5">
                    Created Date & Time
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 font-semibold sm:px-5">
                    Pickup District
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 text-center font-semibold sm:px-5">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {[...parcels]
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((parcel, index) => {
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

                        {/* Cost */}
                        <td className="px-4 py-5 align-middle sm:px-5">
                          <div className="inline-flex items-center gap-2 rounded-lg bg-[#CAEB66]/20 px-3 py-2">
                            <FaMoneyBillWave className="text-sm text-[#03373d]" />

                            <span className="whitespace-nowrap text-sm font-bold text-[#03373d]">
                              ৳
                              {Number(
                                parcel.cost || parcel.deliveryCharge || 0,
                              )}
                            </span>
                          </div>
                        </td>

                        {/* Created Date */}
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

                        {/* Action */}
                        <td className="px-4 py-5 text-center align-middle sm:px-5">
                          <button
                            type="button"
                            onClick={() => openAssignRiderModal(parcel)}
                            className="inline-flex items-center gap-2 rounded-lg bg-[#CAEB66] px-4 py-2.5 text-xs font-bold text-[#03373d] shadow-sm transition duration-200 hover:bg-[#bce052] hover:shadow-md active:scale-95"
                          >
                            <FaMotorcycle className="text-sm" />
                            Find Riders
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ==========================================
          Rider Assignment Modal
      ========================================== */}
      <dialog
        ref={riderModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box w-11/12 max-w-4xl rounded-2xl p-0">
          {/* Modal Header */}
          <div className="relative overflow-hidden bg-[#03373d] p-5 sm:p-6">
            <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#CAEB66]/10" />

            <div className="relative flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="mb-2 flex items-center gap-2">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#CAEB66]/15 text-[#CAEB66]">
                    <FaMotorcycle />
                  </span>

                  <span className="text-sm font-medium text-[#CAEB66]">
                    Rider Assignment
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white sm:text-2xl">
                  Available Riders
                </h3>

                {selectedParcel && (
                  <p className="mt-1 text-sm text-white/60">
                    {selectedParcel.parcelName || "Selected Parcel"}
                  </p>
                )}
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => {
                  riderModalRef.current?.close();
                  setSelectedParcel(null);
                }}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white transition hover:bg-white/20"
              >
                <FaTimes />
              </button>
            </div>
          </div>

          {/* Selected Parcel Information */}
          {selectedParcel && (
            <div className="border-b border-gray-100 bg-[#f7faf7] p-4 sm:p-5">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-gray-100 bg-white p-3">
                  <p className="text-xs text-gray-400">Parcel</p>

                  <p className="mt-1 truncate text-sm font-semibold text-[#03373d]">
                    {selectedParcel.parcelName || "N/A"}
                  </p>
                </div>

                <div className="rounded-xl border border-gray-100 bg-white p-3">
                  <p className="text-xs text-gray-400">Pickup District</p>

                  <div className="mt-1 flex items-center gap-1.5">
                    <FaMapMarkerAlt className="text-xs text-[#03373d]/60" />

                    <p className="truncate text-sm font-semibold text-[#03373d]">
                      {selectedParcel.senderDistrict || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-gray-100 bg-white p-3">
                  <p className="text-xs text-gray-400">Tracking ID</p>

                  <p className="mt-1 truncate font-mono text-xs font-semibold text-[#03373d]">
                    {selectedParcel.trackingId || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Modal Body */}
          <div className="p-4 sm:p-5">
            {/* Riders Count */}
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h4 className="text-lg font-bold text-[#03373d]">
                  Select a Rider
                </h4>

                <p className="mt-1 text-sm text-gray-500">
                  Showing approved and currently available riders from the
                  pickup district.
                </p>
              </div>

              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#03373d] px-4 py-2 text-xs font-semibold text-white">
                <FaUserCheck className="text-[#CAEB66]" />
                {riders.length} {riders.length === 1 ? "Rider" : "Riders"}
              </span>
            </div>

            {/* Riders Loading */}
            {ridersLoading ? (
              <div className="flex min-h-[220px] items-center justify-center rounded-xl bg-[#f5f7f7]">
                <Loading />
              </div>
            ) : riders.length === 0 ? (
              /* Empty Riders */
              <div className="rounded-xl bg-[#f5f7f7] px-4 py-12 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-2xl text-amber-400">
                  <FaMotorcycle />
                </div>

                <h3 className="font-semibold text-gray-500">
                  No available riders found
                </h3>

                <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-gray-400">
                  There are currently no approved and available riders in this
                  pickup district.
                </p>
              </div>
            ) : (
              /* Riders Table */
              <div className="overflow-hidden rounded-xl border border-gray-100">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[650px] border-collapse">
                    <thead>
                      <tr className="bg-[#03373d] text-left text-xs uppercase tracking-wide text-white">
                        <th className="px-4 py-3.5 font-semibold">#</th>

                        <th className="px-4 py-3.5 font-semibold">
                          Rider Name
                        </th>

                        <th className="px-4 py-3.5 font-semibold">Email</th>

                        <th className="px-4 py-3.5 text-center font-semibold">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {riders.map((rider, index) => (
                        <tr
                          key={rider._id}
                          className="border-b border-gray-100 last:border-b-0 transition-colors duration-200 hover:bg-[#f7faf7]"
                        >
                          {/* Number */}
                          <td className="px-4 py-4 align-middle">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#03373d]/5 text-sm font-bold text-[#03373d]">
                              {index + 1}
                            </span>
                          </td>

                          {/* Rider Name */}
                          <td className="px-4 py-4 align-middle">
                            <div className="flex items-center gap-3">
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#CAEB66]/30 text-sm font-bold text-[#03373d]">
                                {rider.riderName?.charAt(0)?.toUpperCase() ||
                                  "R"}
                              </div>

                              <div className="min-w-0">
                                <p className="truncate font-semibold text-[#03373d]">
                                  {rider.riderName || "Unnamed Rider"}
                                </p>

                                <p className="mt-0.5 text-xs text-emerald-500">
                                  Available
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Email */}
                          <td className="px-4 py-4 align-middle">
                            <span className="whitespace-nowrap text-sm text-gray-600">
                              {rider.riderEmail || "N/A"}
                            </span>
                          </td>

                          {/* Action */}
                          <td className="px-4 py-4 text-center align-middle">
                            <button
                              type="button"
                              onClick={() => handleAssignRider(rider)}
                              disabled={assigningRiderId === rider._id}
                              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#CAEB66] px-4 py-2.5 text-xs font-bold text-[#03373d] shadow-sm transition duration-200 hover:bg-[#bce052] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              {assigningRiderId === rider._id ? (
                                <>
                                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#03373d]/30 border-t-[#03373d]" />
                                  Assigning...
                                </>
                              ) : (
                                <>
                                  <FaUserCheck />
                                  Assign Rider
                                </>
                              )}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="border-t border-gray-100 bg-[#fafcfc] p-4 sm:p-5">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  riderModalRef.current?.close();
                  setSelectedParcel(null);
                }}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-600 transition hover:border-gray-300 hover:bg-gray-50"
              >
                <FaTimes className="text-xs" />
                Close
              </button>
            </div>
          </div>
        </div>

        {/* Modal Backdrop */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default AssignRiders;
