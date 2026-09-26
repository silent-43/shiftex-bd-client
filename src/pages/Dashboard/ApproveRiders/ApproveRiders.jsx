import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrashAlt, FaUserCheck, FaEye } from "react-icons/fa";
import { IoPersonRemoveSharp } from "react-icons/io5";
import Swal from "sweetalert2";

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();

  const [selectedRider, setSelectedRider] = useState(null);

  const { data: riders = [], refetch } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  const updateRiderStatus = (rider, status) => {
    const updatedInfo = {
      status: status,
      email: rider.riderEmail,
    };

    axiosSecure.patch(`/riders/${rider._id}`, updatedInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();

        document.getElementById("rider_details_modal").close();

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Rider Status is set to : ${status}.`,
          showConfirmButton: false,
          timer: 2500,
        });
      }
    });
  };

  const handleApproval = (rider) => {
    updateRiderStatus(rider, "approved");
  };

  const handleRejection = (rider) => {
    updateRiderStatus(rider, "rejected");
  };

  const handleDelation = (rider) => {
    const modal = document.getElementById("rider_details_modal");

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      target: modal,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/riders/${rider._id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();

            modal.close();

            Swal.fire({
              title: "Deleted!",
              text: "Rider has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  // Open modal
  const handleViewDetails = (rider) => {
    setSelectedRider(rider);
    document.getElementById("rider_details_modal").showModal();
  };

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-6">
      {/* ================= Header ================= */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#03373d]">
              Rider Management
            </h2>

            <p className="mt-1 text-gray-500">
              Review and manage rider applications
            </p>
          </div>

          {/* Rider Count */}
          <div className="rounded-2xl bg-gradient-to-r from-[#03373d] to-[#07545b] px-6 py-4 text-white shadow-lg">
            <p className="text-sm opacity-80">Total Riders</p>
            <p className="text-3xl font-bold">{riders.length}</p>
          </div>
        </div>
      </div>

      {/* ================= Table Card ================= */}
      <div className="rounded-2xl bg-base-100 shadow-xl border border-gray-100 overflow-hidden">
        {/* Table Header */}
        <div className="bg-gradient-to-r from-[#03373d] to-[#07545b] px-5 py-4">
          <h3 className="text-lg font-semibold text-white">
            Riders Pending Approval
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="table">
            {/* ================= Table Head ================= */}
            <thead>
              <tr className="bg-gray-50 text-gray-600">
                <th className="font-bold">#</th>
                <th className="font-bold">Name</th>
                <th className="font-bold">Email</th>
                <th className="font-bold">District</th>
                <th className="font-bold">Application Status</th>
                <th className="font-bold">Work Status</th>
                <th className="font-bold text-center">Actions</th>
              </tr>
            </thead>

            {/* ================= Table Body ================= */}
            <tbody>
              {riders.map((rider, index) => (
                <tr
                  key={rider._id}
                  className="hover:bg-[#f4fbe8] transition-colors duration-200"
                >
                  {/* Serial */}
                  <th>
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#03373d] text-white text-sm">
                      {index + 1}
                    </span>
                  </th>

                  {/* Name */}
                  <td>
                    <div className="font-semibold text-[#03373d]">
                      {rider.riderName}
                    </div>
                  </td>

                  {/* Email */}
                  <td>
                    <span className="text-gray-600">{rider.riderEmail}</span>
                  </td>

                  {/* District */}
                  <td>
                    <span className="font-medium text-gray-700">
                      {rider.riderDistrict}
                    </span>
                  </td>

                  {/* Status */}
                  <td>
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold capitalize ${
                        rider.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : rider.status === "rejected"
                            ? "bg-red-100 text-red-600"
                            : "bg-orange-100 text-orange-600"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          rider.status === "approved"
                            ? "bg-green-500"
                            : rider.status === "rejected"
                              ? "bg-red-500"
                              : "bg-orange-500"
                        }`}
                      ></span>

                      {rider.status}
                    </span>
                  </td>
                  <td>{rider.workStatus}</td>

                  {/* Actions */}
                  <td>
                    <div className="flex justify-center">
                      <button
                        onClick={() => handleViewDetails(rider)}
                        className="btn btn-sm bg-blue-500 hover:bg-purple-600 text-white border-none shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                        title="View Details"
                      >
                        <FaEye className="text-base" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {riders.length === 0 && (
          <div className="py-16 text-center">
            <div className="text-5xl mb-3">🚴</div>
            <h3 className="text-xl font-semibold text-gray-700">
              No riders found
            </h3>
            <p className="text-gray-500 mt-1">
              There are no rider applications at the moment.
            </p>
          </div>
        )}
      </div>

      {/* =====================================================
                        Rider Details Modal
      ====================================================== */}

      <dialog id="rider_details_modal" className="modal">
        <div className="modal-box max-w-2xl p-0 overflow-hidden rounded-3xl">
          {selectedRider && (
            <>
              {/* ================= Modal Header ================= */}
              <div className="bg-gradient-to-r from-[#03373d] to-[#07545b] px-6 py-5 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#CAEB66] font-medium">
                      Rider Application
                    </p>

                    <h3 className="text-2xl font-bold mt-1">Rider Details</h3>
                  </div>

                  {/* Status */}
                  <span
                    className={`rounded-full px-4 py-1.5 text-sm font-bold capitalize ${
                      selectedRider.status === "approved"
                        ? "bg-green-400 text-green-950"
                        : selectedRider.status === "rejected"
                          ? "bg-red-400 text-red-950"
                          : "bg-orange-400 text-orange-950"
                    }`}
                  >
                    {selectedRider.status}
                  </span>
                </div>
              </div>

              {/* ================= Modal Body ================= */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Rider Name */}
                  <div className="rounded-xl bg-blue-50 border border-blue-100 p-4">
                    <p className="text-xs font-semibold text-blue-500 uppercase">
                      Rider Name
                    </p>
                    <p className="mt-1 font-semibold text-gray-800">
                      {selectedRider.riderName}
                    </p>
                  </div>

                  {/* Email */}
                  <div className="rounded-xl bg-purple-50 border border-purple-100 p-4">
                    <p className="text-xs font-semibold text-purple-500 uppercase">
                      Email
                    </p>
                    <p className="mt-1 font-semibold text-gray-800 break-all">
                      {selectedRider.riderEmail}
                    </p>
                  </div>

                  {/* Region */}
                  <div className="rounded-xl bg-green-50 border border-green-100 p-4">
                    <p className="text-xs font-semibold text-green-600 uppercase">
                      Region
                    </p>
                    <p className="mt-1 font-semibold text-gray-800">
                      {selectedRider.region}
                    </p>
                  </div>

                  {/* District */}
                  <div className="rounded-xl bg-orange-50 border border-orange-100 p-4">
                    <p className="text-xs font-semibold text-orange-600 uppercase">
                      District
                    </p>
                    <p className="mt-1 font-semibold text-gray-800">
                      {selectedRider.riderDistrict}
                    </p>
                  </div>

                  {/* Address */}
                  <div className="rounded-xl bg-cyan-50 border border-cyan-100 p-4">
                    <p className="text-xs font-semibold text-cyan-600 uppercase">
                      Address
                    </p>
                    <p className="mt-1 font-semibold text-gray-800">
                      {selectedRider.riderAddress}
                    </p>
                  </div>

                  {/* License */}
                  <div className="rounded-xl bg-pink-50 border border-pink-100 p-4">
                    <p className="text-xs font-semibold text-pink-600 uppercase">
                      License
                    </p>
                    <p className="mt-1 font-semibold text-gray-800">
                      {selectedRider.license}
                    </p>
                  </div>

                  {/* NID */}
                  <div className="rounded-xl bg-indigo-50 border border-indigo-100 p-4">
                    <p className="text-xs font-semibold text-indigo-600 uppercase">
                      NID
                    </p>
                    <p className="mt-1 font-semibold text-gray-800">
                      {selectedRider.nid}
                    </p>
                  </div>

                  {/* Bike */}
                  <div className="rounded-xl bg-lime-50 border border-lime-100 p-4">
                    <p className="text-xs font-semibold text-lime-700 uppercase">
                      Bike
                    </p>
                    <p className="mt-1 font-semibold text-gray-800">
                      {selectedRider.bike}
                    </p>
                  </div>

                  {/* Created At */}
                  <div className="rounded-xl bg-gray-50 border border-gray-200 p-4 md:col-span-2">
                    <p className="text-xs font-semibold text-gray-500 uppercase">
                      Applied At
                    </p>

                    <p className="mt-1 font-semibold text-gray-800">
                      {new Date(selectedRider.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* ================= Modal Actions ================= */}
                <div className="flex flex-wrap justify-end gap-2 mt-7 pt-5 border-t border-gray-200">
                  {/* Approve */}
                  <button
                    onClick={() => handleApproval(selectedRider)}
                    className="btn bg-green-500 hover:bg-green-600 text-white border-none shadow-md"
                  >
                    <FaUserCheck />
                    Approve
                  </button>

                  {/* Reject */}
                  <button
                    onClick={() => handleRejection(selectedRider)}
                    className="btn bg-orange-500 hover:bg-orange-600 text-white border-none shadow-md"
                  >
                    <IoPersonRemoveSharp />
                    Reject
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelation(selectedRider)}
                    className="btn bg-red-500 hover:bg-red-600 text-white border-none shadow-md"
                  >
                    <FaTrashAlt />
                    Delete
                  </button>

                  {/* Close */}
                  <form method="dialog">
                    <button className="btn bg-gray-200 hover:bg-gray-300 text-gray-700 border-none">
                      Close
                    </button>
                  </form>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Click outside to close */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default ApproveRiders;
