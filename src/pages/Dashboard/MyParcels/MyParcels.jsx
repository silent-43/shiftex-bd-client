import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useLoaderData } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FiEdit } from "react-icons/fi";
import { MdPreview, MdClose } from "react-icons/md";
import {
  FaTrashAlt,
  FaBoxOpen,
  FaCreditCard,
  FaTruck,
  FaMapMarkerAlt,
  FaUser,
  FaWeightHanging,
  FaMoneyBillWave,
  FaSave,
  FaEnvelope,
  FaGlobeAsia,
  FaClipboardList,
} from "react-icons/fa";
import Swal from "sweetalert2";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // ============================================================
  // Loader Data - Same data used in SendParcel
  // ============================================================

  const serviceCenters = useLoaderData();

  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];

  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);

    const districts = regionDistricts.map((d) => d.district);

    return [...new Set(districts)];
  };

  // ============================================================
  // States
  // ============================================================

  const [selectedParcel, setSelectedParcel] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Edit Region & District States
  const [editSenderRegion, setEditSenderRegion] = useState("");
  const [editSenderDistrict, setEditSenderDistrict] = useState("");

  const [editReceiverRegion, setEditReceiverRegion] = useState("");
  const [editReceiverDistrict, setEditReceiverDistrict] = useState("");

  // ============================================================
  // Get My Parcels
  // ============================================================

  const {
    data: parcels = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["myParcels", user?.email],

    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);

      return res.data;
    },

    enabled: !!user?.email,
  });

  // ============================================================
  // Calculate Parcel Cost
  // Same Pricing Logic as SendParcel
  // ============================================================

  const calculateParcelCost = (
    parcelType,
    parcelWeight,
    senderDistrict,
    receiverDistrict,
  ) => {
    const weight = parseFloat(parcelWeight);

    if (!weight || weight <= 0) {
      return 0;
    }

    const isSameDistrict =
      senderDistrict.trim().toLowerCase() ===
      receiverDistrict.trim().toLowerCase();

    // ==========================================================
    // Document
    // ==========================================================

    if (parcelType === "document") {
      return isSameDistrict ? 60 : 80;
    }

    // ==========================================================
    // Non-document
    // ==========================================================

    if (parcelType === "non-document") {
      // Up to 3 KG
      if (weight <= 3) {
        return isSameDistrict ? 110 : 150;
      }

      // More than 3 KG
      const extraWeight = weight - 3;

      const minCharge = isSameDistrict ? 110 : 150;

      const extraCharge = isSameDistrict
        ? extraWeight * 40
        : extraWeight * 40 + 40;

      return minCharge + extraCharge;
    }

    return 0;
  };

  // ============================================================
  // Delete Parcel
  // ============================================================

  const handleParcelDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      const res = await axiosSecure.delete(`/parcels/${id}`);

      if (res.data.deletedCount) {
        await refetch();

        Swal.fire({
          title: "Deleted!",
          text: "Your Parcel Request has been deleted.",
          icon: "success",
          confirmButtonColor: "#03373d",
        });
      }
    } catch (error) {
      console.error("Delete parcel error:", error);

      Swal.fire({
        title: "Delete Failed",
        text: "Something went wrong while deleting the parcel.",
        icon: "error",
      });
    }
  };

  // ============================================================
  // Payment
  // ============================================================

  const handlePayment = async (parcel) => {
    try {
      const paymentInfo = {
        cost: parcel.cost,
        parcelId: parcel._id,
        senderEmail: parcel.senderEmail,
        parcelName: parcel.parcelName,
      };

      const res = await axiosSecure.post(
        "/create-checkout-session",
        paymentInfo,
      );

      if (res.data.url) {
        window.location.assign(res.data.url);
      }
    } catch (error) {
      console.error("Payment error:", error);

      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: "Unable to start payment. Please try again.",
      });
    }
  };

  // ============================================================
  // View Parcel
  // ============================================================

  const handleView = (parcel) => {
    setSelectedParcel(parcel);
    setModalType("view");

    document.getElementById("parcel_modal")?.showModal();
  };

  // ============================================================
  // Edit Parcel
  // ============================================================

  const handleEdit = (parcel) => {
    setSelectedParcel(parcel);
    setModalType("edit");

    // Existing Sender Values
    setEditSenderRegion(parcel.senderRegion || "");
    setEditSenderDistrict(parcel.senderDistrict || "");

    // Existing Receiver Values
    setEditReceiverRegion(parcel.receiverRegion || "");
    setEditReceiverDistrict(parcel.receiverDistrict || "");

    document.getElementById("parcel_modal")?.showModal();
  };

  // ============================================================
  // Close Modal
  // ============================================================

  const closeModal = () => {
    document.getElementById("parcel_modal")?.close();

    setSelectedParcel(null);
    setModalType(null);

    setEditSenderRegion("");
    setEditSenderDistrict("");

    setEditReceiverRegion("");
    setEditReceiverDistrict("");
  };

  // ============================================================
  // Update Parcel
  // ============================================================

  const handleUpdateParcel = async (e) => {
    e.preventDefault();

    if (!selectedParcel) {
      return;
    }

    const form = e.target;

    // ==========================================================
    // Get Updated Values
    // ==========================================================

    const parcelName = form.parcelName.value.trim();
    const parcelType = form.parcelType.value;
    const parcelWeight = parseFloat(form.parcelWeight.value);

    const senderName = form.senderName.value.trim();
    const senderRegion = editSenderRegion;
    const senderDistrict = editSenderDistrict;
    const senderAddress = form.senderAddress.value.trim();
    const senderPickupInstruction = form.senderPickupInstruction.value.trim();

    const receiverName = form.receiverName.value.trim();
    const receiverEmail = form.receiverEmail.value.trim();
    const receiverRegion = editReceiverRegion;
    const receiverDistrict = editReceiverDistrict;
    const receiverAddress = form.receiverAddress.value.trim();
    const receiverPickupInstruction =
      form.receiverPickupInstruction.value.trim();

    // ==========================================================
    // Validate Region & District
    // ==========================================================

    if (!senderRegion || !senderDistrict) {
      Swal.fire({
        icon: "warning",
        title: "Sender Location Required",
        text: "Please select sender region and district.",
      });

      return;
    }

    if (!receiverRegion || !receiverDistrict) {
      Swal.fire({
        icon: "warning",
        title: "Receiver Location Required",
        text: "Please select receiver region and district.",
      });

      return;
    }

    // ==========================================================
    // Validate Weight
    // ==========================================================

    if (!parcelWeight || parcelWeight <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Weight",
        text: "Parcel weight must be greater than 0 KG.",
      });

      return;
    }

    // ==========================================================
    // Calculate New Cost
    // ==========================================================

    const newCost = calculateParcelCost(
      parcelType,
      parcelWeight,
      senderDistrict,
      receiverDistrict,
    );

    if (!newCost) {
      Swal.fire({
        icon: "warning",
        title: "Unable to Calculate Cost",
        text: "Please check parcel type, weight and district information.",
      });

      return;
    }

    // ==========================================================
    // Check Whether Cost Changed
    // ==========================================================

    const oldCost = Number(selectedParcel.cost || 0);

    const costChanged = oldCost !== newCost;

    // ==========================================================
    // Payment Status
    // ==========================================================

    const updatedPaymentStatus = costChanged
      ? "unpaid"
      : selectedParcel.paymentStatus || "unpaid";

    // ==========================================================
    // Updated Parcel Object
    // ==========================================================

    const updatedParcel = {
      parcelName,
      parcelType,
      parcelWeight: parcelWeight.toString(),

      senderName,
      senderRegion,
      senderDistrict,
      senderAddress,
      senderPickupInstruction,

      receiverName,
      receiverEmail,
      receiverRegion,
      receiverDistrict,
      receiverAddress,
      receiverPickupInstruction,

      // Recalculated Cost
      cost: newCost,

      // If cost changes, payment becomes unpaid
      paymentStatus: updatedPaymentStatus,
    };

    try {
      setIsUpdating(true);

      const res = await axiosSecure.patch(
        `/parcels/${selectedParcel._id}`,
        updatedParcel,
      );

      if (res.data.modifiedCount) {
        await refetch();

        closeModal();

        // ======================================================
        // Cost Changed + Previously Paid
        // ======================================================

        if (costChanged && selectedParcel.paymentStatus === "paid") {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Parcel Updated Successfully!",
            html: `
              <p>New delivery cost: <strong>৳${newCost}</strong></p>
              <p class="text-sm mt-1">
                Please make the payment again.
              </p>
            `,
            showConfirmButton: true,
            confirmButtonColor: "#03373d",
          });
        } else {
          // ====================================================
          // Normal Update
          // ====================================================

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Parcel Updated Successfully!",
            text: `Delivery cost: ৳${newCost}`,
            showConfirmButton: false,
            timer: 2500,
          });
        }
      } else {
        Swal.fire({
          icon: "info",
          title: "No Changes Made",
          text: "There were no changes to update.",
        });
      }
    } catch (error) {
      console.error("Update parcel error:", error);

      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong while updating the parcel.",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-6">
      {/* ==========================================================
          Header
      ========================================================== */}

      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#03373d]">
              My Parcels
            </h2>

            <p className="mt-1 text-gray-500">
              Manage and track all your parcel requests
            </p>
          </div>

          {/* Total Parcels */}

          <div className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#03373d] to-[#07545b] px-6 py-4 text-white shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#CAEB66] text-[#03373d]">
              <FaBoxOpen className="text-xl" />
            </div>

            <div>
              <p className="text-sm opacity-80">Total Parcels</p>

              <p className="text-3xl font-bold">{parcels.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================================
          Table Card
      ========================================================== */}

      <div className="rounded-2xl bg-base-100 shadow-xl border border-gray-100 overflow-hidden">
        {/* Table Header */}

        <div className="bg-gradient-to-r from-[#03373d] to-[#07545b] px-5 py-4">
          <div className="flex items-center gap-3 text-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#CAEB66] text-[#03373d]">
              <FaTruck />
            </div>

            <div>
              <h3 className="text-lg font-semibold">Parcel Records</h3>

              <p className="text-xs text-gray-300">
                View and manage your parcel requests
              </p>
            </div>
          </div>
        </div>

        {/* ==========================================================
            Loading
        ========================================================== */}

        {isLoading ? (
          <div className="py-20 flex justify-center items-center">
            <span className="loading loading-spinner loading-lg text-[#03373d]"></span>
          </div>
        ) : (
          <>
            {/* ======================================================
                Table
            ====================================================== */}

            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className="bg-gray-50 text-gray-600">
                    <th className="font-semibold">#</th>

                    <th className="font-semibold">Parcel Name</th>

                    <th className="font-semibold">Weight</th>

                    <th className="font-semibold">Cost</th>

                    <th className="font-semibold">Payment Status</th>

                    <th className="font-semibold">Delivery Status</th>

                    <th className="font-semibold text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {parcels.map((parcel, index) => (
                    <tr
                      key={parcel._id}
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
                            <FaBoxOpen />
                          </div>

                          <div>
                            <p className="font-semibold text-[#03373d]">
                              {parcel.parcelName}
                            </p>

                            <p className="text-xs text-gray-400 capitalize">
                              {parcel.parcelType}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Weight */}

                      <td>
                        <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-3 py-1.5 text-sm font-semibold text-purple-700">
                          <FaWeightHanging />
                          {parcel.parcelWeight} Kg
                        </span>
                      </td>

                      {/* Cost */}

                      <td>
                        <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1.5 font-bold text-orange-700">
                          <FaMoneyBillWave />৳{parcel.cost}
                        </span>
                      </td>

                      {/* Payment Status */}

                      <td>
                        {parcel.paymentStatus === "paid" ? (
                          <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 font-bold text-green-700 border border-green-200">
                            <FaCreditCard />
                            Paid
                          </span>
                        ) : (
                          <button
                            onClick={() => handlePayment(parcel)}
                            className="btn btn-sm bg-[#CAEB66] text-[#03373d] border-none font-bold
                            transition-all duration-300
                            hover:bg-[#03373d] hover:text-white
                            hover:scale-105 hover:shadow-lg
                            active:scale-95"
                          >
                            <FaCreditCard />
                            Pay Now
                          </button>
                        )}
                      </td>

                      {/* Delivery Status */}

                      <td>
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1.5 text-sm font-semibold capitalize
                          ${
                            parcel.deliveryStatus === "delivered"
                              ? "bg-green-100 text-green-700"
                              : parcel.deliveryStatus === "in-transit"
                                ? "bg-blue-100 text-blue-700"
                                : parcel.deliveryStatus === "cancelled"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {parcel.deliveryStatus || "pending"}
                        </span>
                      </td>

                      {/* Actions */}

                      <td>
                        <div className="flex items-center justify-center gap-2">
                          {/* Edit */}

                          <button
                            onClick={() => handleEdit(parcel)}
                            className="btn btn-sm btn-square bg-blue-500 hover:bg-purple-600 text-white border-none shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                            title="Edit Parcel"
                          >
                            <FiEdit className="text-lg" />
                          </button>

                          {/* View */}

                          <button
                            onClick={() => handleView(parcel)}
                            className="btn btn-sm btn-square bg-cyan-500 hover:bg-blue-600 text-white border-none shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                            title="View Parcel"
                          >
                            <MdPreview className="text-xl" />
                          </button>

                          {/* Delete */}

                          <button
                            onClick={() => handleParcelDelete(parcel._id)}
                            className="btn btn-sm btn-square bg-red-500 hover:bg-red-700 text-white border-none shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                            title="Delete Parcel"
                          >
                            <FaTrashAlt className="text-sm" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ======================================================
                Empty State
            ====================================================== */}

            {parcels.length === 0 && (
              <div className="py-16 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-500">
                  <FaBoxOpen className="text-2xl" />
                </div>

                <h3 className="text-xl font-semibold text-gray-700">
                  No Parcels Found
                </h3>

                <p className="mt-1 text-gray-500">
                  You haven't created any parcel requests yet.
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* ======================================================================
          MODAL
      ====================================================================== */}

      <dialog id="parcel_modal" className="modal">
        <div className="modal-box max-w-4xl h-auto max-h-[90vh] p-0 rounded-3xl overflow-hidden flex flex-col">
          {/* =================================================================
              VIEW
          ================================================================= */}

          {selectedParcel && modalType === "view" && (
            <>
              {/* View Header */}

              <div className="shrink-0 bg-gradient-to-r from-[#03373d] to-[#07545b] px-6 py-5 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#CAEB66] text-[#03373d]">
                      <FaBoxOpen className="text-xl" />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold">Parcel Details</h3>

                      <p className="text-sm text-gray-300">
                        Complete parcel information
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={closeModal}
                    className="btn btn-sm btn-circle bg-white/10 hover:bg-red-500 text-white border-none"
                  >
                    <MdClose className="text-xl" />
                  </button>
                </div>
              </div>

              {/* View Scroll Body */}

              <div className="flex-1 min-h-0 overflow-y-auto p-6">
                {/* Parcel Basic Info */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                  {/* Parcel Name */}

                  <div className="rounded-2xl bg-blue-50 border border-blue-100 p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-blue-500 text-white flex items-center justify-center">
                        <FaBoxOpen />
                      </div>

                      <div>
                        <p className="text-xs text-blue-500 font-semibold">
                          PARCEL NAME
                        </p>

                        <p className="font-bold text-[#03373d]">
                          {selectedParcel.parcelName}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Parcel Type */}

                  <div className="rounded-2xl bg-purple-50 border border-purple-100 p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-purple-500 text-white flex items-center justify-center">
                        <FaBoxOpen />
                      </div>

                      <div>
                        <p className="text-xs text-purple-500 font-semibold">
                          PARCEL TYPE
                        </p>

                        <p className="font-bold text-gray-700 capitalize">
                          {selectedParcel.parcelType}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Weight */}

                  <div className="rounded-2xl bg-orange-50 border border-orange-100 p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-orange-500 text-white flex items-center justify-center">
                        <FaWeightHanging />
                      </div>

                      <div>
                        <p className="text-xs text-orange-500 font-semibold">
                          WEIGHT
                        </p>

                        <p className="font-bold text-gray-700">
                          {selectedParcel.parcelWeight} Kg
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sender & Receiver */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Sender */}

                  <div className="rounded-2xl bg-indigo-50 border border-indigo-100 p-5">
                    <div className="flex items-center gap-2 mb-5 text-indigo-600">
                      <div className="h-10 w-10 rounded-xl bg-indigo-500 text-white flex items-center justify-center">
                        <FaUser />
                      </div>

                      <h4 className="font-bold text-lg">Sender Information</h4>
                    </div>

                    <div className="space-y-4 text-sm">
                      <div>
                        <p className="text-xs text-indigo-500 font-semibold">
                          NAME
                        </p>

                        <p className="font-semibold text-gray-700">
                          {selectedParcel.senderName}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-indigo-500 font-semibold">
                          EMAIL
                        </p>

                        <div className="flex items-center gap-2">
                          <FaEnvelope className="text-indigo-500 shrink-0" />

                          <p className="font-medium text-gray-700 break-all">
                            {selectedParcel.senderEmail}
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-indigo-500 font-semibold">
                          REGION
                        </p>

                        <div className="flex items-center gap-2">
                          <FaGlobeAsia className="text-indigo-500 shrink-0" />

                          <p className="font-medium text-gray-700">
                            {selectedParcel.senderRegion}
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-indigo-500 font-semibold">
                          DISTRICT
                        </p>

                        <p className="font-medium text-gray-700">
                          {selectedParcel.senderDistrict}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-indigo-500 font-semibold">
                          ADDRESS
                        </p>

                        <div className="flex gap-2">
                          <FaMapMarkerAlt className="text-indigo-500 mt-1 shrink-0" />

                          <p className="font-medium text-gray-700">
                            {selectedParcel.senderAddress}
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-indigo-500 font-semibold">
                          PICKUP INSTRUCTION
                        </p>

                        <div className="flex gap-2">
                          <FaClipboardList className="text-indigo-500 mt-1 shrink-0" />

                          <p className="font-medium text-gray-700">
                            {selectedParcel.senderPickupInstruction ||
                              "No instruction"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Receiver */}

                  <div className="rounded-2xl bg-pink-50 border border-pink-100 p-5">
                    <div className="flex items-center gap-2 mb-5 text-pink-600">
                      <div className="h-10 w-10 rounded-xl bg-pink-500 text-white flex items-center justify-center">
                        <FaUser />
                      </div>

                      <h4 className="font-bold text-lg">
                        Receiver Information
                      </h4>
                    </div>

                    <div className="space-y-4 text-sm">
                      <div>
                        <p className="text-xs text-pink-500 font-semibold">
                          NAME
                        </p>

                        <p className="font-semibold text-gray-700">
                          {selectedParcel.receiverName}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-pink-500 font-semibold">
                          EMAIL
                        </p>

                        <div className="flex items-center gap-2">
                          <FaEnvelope className="text-pink-500 shrink-0" />

                          <p className="font-medium text-gray-700 break-all">
                            {selectedParcel.receiverEmail}
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-pink-500 font-semibold">
                          REGION
                        </p>

                        <div className="flex items-center gap-2">
                          <FaGlobeAsia className="text-pink-500 shrink-0" />

                          <p className="font-medium text-gray-700">
                            {selectedParcel.receiverRegion}
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-pink-500 font-semibold">
                          DISTRICT
                        </p>

                        <p className="font-medium text-gray-700">
                          {selectedParcel.receiverDistrict}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-pink-500 font-semibold">
                          ADDRESS
                        </p>

                        <div className="flex gap-2">
                          <FaMapMarkerAlt className="text-pink-500 mt-1 shrink-0" />

                          <p className="font-medium text-gray-700">
                            {selectedParcel.receiverAddress}
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-pink-500 font-semibold">
                          PICKUP INSTRUCTION
                        </p>

                        <div className="flex gap-2">
                          <FaClipboardList className="text-pink-500 mt-1 shrink-0" />

                          <p className="font-medium text-gray-700">
                            {selectedParcel.receiverPickupInstruction ||
                              "No instruction"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cost & Payment */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                  {/* Cost */}

                  <div className="rounded-2xl bg-green-50 border border-green-100 p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-green-500 text-white flex items-center justify-center">
                        <FaMoneyBillWave />
                      </div>

                      <div>
                        <p className="text-xs text-green-500 font-semibold">
                          DELIVERY COST
                        </p>

                        <p className="text-xl font-bold text-gray-700">
                          ৳{selectedParcel.cost}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Payment Status */}

                  <div className="rounded-2xl bg-cyan-50 border border-cyan-100 p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-cyan-500 text-white flex items-center justify-center">
                        <FaCreditCard />
                      </div>

                      <div>
                        <p className="text-xs text-cyan-500 font-semibold">
                          PAYMENT STATUS
                        </p>

                        <p className="font-bold text-gray-700 capitalize">
                          {selectedParcel.paymentStatus || "unpaid"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delivery Status */}

                <div className="mt-4 rounded-2xl bg-yellow-50 border border-yellow-100 p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-yellow-500 text-white flex items-center justify-center">
                      <FaTruck />
                    </div>

                    <div>
                      <p className="text-xs text-yellow-600 font-semibold">
                        DELIVERY STATUS
                      </p>

                      <p className="font-bold text-gray-700 capitalize">
                        {selectedParcel.deliveryStatus || "pending"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Created At */}

                <div className="mt-4 rounded-2xl bg-gray-50 border border-gray-200 p-4">
                  <p className="text-xs text-gray-500 font-semibold">
                    CREATED AT
                  </p>

                  <p className="font-medium text-gray-700 mt-1">
                    {selectedParcel.createdAt
                      ? new Date(selectedParcel.createdAt).toLocaleString()
                      : "N/A"}
                  </p>
                </div>

                {/* Close */}

                <div className="flex justify-end mt-6">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="btn bg-[#03373d] hover:bg-[#07545b] text-white border-none px-6"
                  >
                    Close
                  </button>
                </div>
              </div>
            </>
          )}

          {/* =================================================================
              EDIT
          ================================================================= */}

          {selectedParcel && modalType === "edit" && (
            <>
              {/* Edit Header */}

              <div className="shrink-0 bg-gradient-to-r from-[#03373d] to-[#07545b] px-6 py-5 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#CAEB66] text-[#03373d]">
                      <FiEdit className="text-xl" />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold">Edit Parcel</h3>

                      <p className="text-sm text-gray-300">
                        Update your parcel information
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={closeModal}
                    className="btn btn-sm btn-circle bg-white/10 hover:bg-red-500 text-white border-none"
                  >
                    <MdClose className="text-xl" />
                  </button>
                </div>
              </div>

              {/* Edit Form */}

              <form
                onSubmit={handleUpdateParcel}
                className="flex-1 min-h-0 overflow-y-auto p-6"
              >
                {/* ==========================================================
                    Parcel Information
                ========================================================== */}

                <div className="bg-base-200/60 rounded-2xl p-5 mb-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#03373d] text-white flex items-center justify-center">
                      <FaBoxOpen className="text-lg" />
                    </div>

                    <div>
                      <h3 className="font-bold text-lg text-[#03373d]">
                        Parcel Information
                      </h3>

                      <p className="text-sm text-gray-500">
                        Update your parcel details
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Parcel Name */}

                    <div className="md:col-span-2">
                      <label className="text-sm font-semibold text-gray-600 mb-1 block">
                        Parcel Name
                      </label>

                      <input
                        name="parcelName"
                        type="text"
                        defaultValue={selectedParcel.parcelName}
                        className="input input-bordered w-full bg-white"
                        required
                      />
                    </div>

                    {/* Parcel Type */}

                    <div>
                      <label className="text-sm font-semibold text-gray-600 mb-1 block">
                        Parcel Type
                      </label>

                      <select
                        name="parcelType"
                        defaultValue={selectedParcel.parcelType}
                        className="select select-bordered w-full bg-white"
                        required
                      >
                        <option value="document">Document</option>

                        <option value="non-document">Non-document</option>
                      </select>
                    </div>

                    {/* Weight */}

                    <div>
                      <label className="text-sm font-semibold text-gray-600 mb-1 block">
                        Parcel Weight (Kg)
                      </label>

                      <input
                        name="parcelWeight"
                        type="number"
                        min="0.1"
                        step="0.1"
                        defaultValue={selectedParcel.parcelWeight}
                        className="input input-bordered w-full bg-white"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* ==========================================================
                    Sender Information
                ========================================================== */}

                <div className="bg-indigo-50 rounded-2xl p-5 mb-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
                      <FaUser />
                    </div>

                    <div>
                      <h3 className="font-bold text-lg text-indigo-700">
                        Sender Information
                      </h3>

                      <p className="text-sm text-indigo-500">
                        Update sender details
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Sender Name */}

                    <div>
                      <label className="text-sm font-semibold text-gray-600 mb-1 block">
                        Sender Name
                      </label>

                      <input
                        name="senderName"
                        type="text"
                        defaultValue={selectedParcel.senderName}
                        className="input input-bordered w-full bg-white"
                        required
                      />
                    </div>

                    {/* Sender Email */}

                    <div>
                      <label className="text-sm font-semibold text-gray-600 mb-1 block">
                        Sender Email
                      </label>

                      <div className="relative">
                        <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                        <input
                          type="email"
                          value={selectedParcel.senderEmail || ""}
                          className="input input-bordered w-full pl-10 bg-gray-100 text-gray-500"
                          readOnly
                        />
                      </div>
                    </div>

                    {/* ======================================================
                        Sender Region
                    ====================================================== */}

                    <div>
                      <label className="text-sm font-semibold text-gray-600 mb-1 block">
                        Sender Region
                      </label>

                      <select
                        name="senderRegion"
                        value={editSenderRegion}
                        onChange={(e) => {
                          setEditSenderRegion(e.target.value);

                          // Region change হলে district reset
                          setEditSenderDistrict("");
                        }}
                        className="select select-bordered w-full bg-white"
                        required
                      >
                        <option value="" disabled>
                          Pick a Region
                        </option>

                        {regions.map((r, index) => (
                          <option key={index} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* ======================================================
                        Sender District
                    ====================================================== */}

                    <div>
                      <label className="text-sm font-semibold text-gray-600 mb-1 block">
                        Sender District
                      </label>

                      <select
                        name="senderDistrict"
                        value={editSenderDistrict}
                        onChange={(e) => setEditSenderDistrict(e.target.value)}
                        disabled={!editSenderRegion}
                        className="select select-bordered w-full bg-white disabled:bg-gray-100"
                        required
                      >
                        <option value="" disabled>
                          {editSenderRegion
                            ? "Pick a District"
                            : "Select Region First"}
                        </option>

                        {districtsByRegion(editSenderRegion).map((d, index) => (
                          <option key={index} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Sender Address */}

                    <div className="md:col-span-2">
                      <label className="text-sm font-semibold text-gray-600 mb-1 block">
                        Sender Address
                      </label>

                      <input
                        name="senderAddress"
                        type="text"
                        defaultValue={selectedParcel.senderAddress}
                        className="input input-bordered w-full bg-white"
                        required
                      />
                    </div>

                    {/* Sender Pickup Instruction */}

                    <div className="md:col-span-2">
                      <label className="text-sm font-semibold text-gray-600 mb-1 block">
                        Sender Pickup Instruction
                      </label>

                      <textarea
                        name="senderPickupInstruction"
                        defaultValue={
                          selectedParcel.senderPickupInstruction || ""
                        }
                        className="textarea textarea-bordered w-full bg-white"
                        rows="2"
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* ==========================================================
                    Receiver Information
                ========================================================== */}

                <div className="bg-pink-50 rounded-2xl p-5 mb-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-pink-600 text-white flex items-center justify-center">
                      <FaUser />
                    </div>

                    <div>
                      <h3 className="font-bold text-lg text-pink-700">
                        Receiver Information
                      </h3>

                      <p className="text-sm text-pink-500">
                        Update receiver details
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Receiver Name */}

                    <div>
                      <label className="text-sm font-semibold text-gray-600 mb-1 block">
                        Receiver Name
                      </label>

                      <input
                        name="receiverName"
                        type="text"
                        defaultValue={selectedParcel.receiverName}
                        className="input input-bordered w-full bg-white"
                        required
                      />
                    </div>

                    {/* Receiver Email */}

                    <div>
                      <label className="text-sm font-semibold text-gray-600 mb-1 block">
                        Receiver Email
                      </label>

                      <div className="relative">
                        <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                        <input
                          name="receiverEmail"
                          type="email"
                          defaultValue={selectedParcel.receiverEmail}
                          className="input input-bordered w-full pl-10 bg-white"
                          required
                        />
                      </div>
                    </div>

                    {/* ======================================================
                        Receiver Region
                    ====================================================== */}

                    <div>
                      <label className="text-sm font-semibold text-gray-600 mb-1 block">
                        Receiver Region
                      </label>

                      <select
                        name="receiverRegion"
                        value={editReceiverRegion}
                        onChange={(e) => {
                          setEditReceiverRegion(e.target.value);

                          // Region change হলে district reset
                          setEditReceiverDistrict("");
                        }}
                        className="select select-bordered w-full bg-white"
                        required
                      >
                        <option value="" disabled>
                          Pick a Region
                        </option>

                        {regions.map((r, index) => (
                          <option key={index} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* ======================================================
                        Receiver District
                    ====================================================== */}

                    <div>
                      <label className="text-sm font-semibold text-gray-600 mb-1 block">
                        Receiver District
                      </label>

                      <select
                        name="receiverDistrict"
                        value={editReceiverDistrict}
                        onChange={(e) =>
                          setEditReceiverDistrict(e.target.value)
                        }
                        disabled={!editReceiverRegion}
                        className="select select-bordered w-full bg-white disabled:bg-gray-100"
                        required
                      >
                        <option value="" disabled>
                          {editReceiverRegion
                            ? "Pick a District"
                            : "Select Region First"}
                        </option>

                        {districtsByRegion(editReceiverRegion).map(
                          (d, index) => (
                            <option key={index} value={d}>
                              {d}
                            </option>
                          ),
                        )}
                      </select>
                    </div>

                    {/* Receiver Address */}

                    <div className="md:col-span-2">
                      <label className="text-sm font-semibold text-gray-600 mb-1 block">
                        Receiver Address
                      </label>

                      <input
                        name="receiverAddress"
                        type="text"
                        defaultValue={selectedParcel.receiverAddress}
                        className="input input-bordered w-full bg-white"
                        required
                      />
                    </div>

                    {/* Receiver Pickup Instruction */}

                    <div className="md:col-span-2">
                      <label className="text-sm font-semibold text-gray-600 mb-1 block">
                        Receiver Pickup Instruction
                      </label>

                      <textarea
                        name="receiverPickupInstruction"
                        defaultValue={
                          selectedParcel.receiverPickupInstruction || ""
                        }
                        className="textarea textarea-bordered w-full bg-white"
                        rows="2"
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* ==========================================================
                    Buttons
                ========================================================== */}

                <div className="flex justify-end gap-3 pt-2 pb-1">
                  <button
                    type="button"
                    onClick={closeModal}
                    disabled={isUpdating}
                    className="btn bg-gray-200 hover:bg-gray-300 text-gray-700 border-none"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="btn bg-[#CAEB66] hover:bg-[#03373d] hover:text-white text-[#03373d] border-none font-bold px-6"
                  >
                    {isUpdating ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Updating...
                      </>
                    ) : (
                      <>
                        <FaSave />
                        Update Parcel
                      </>
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>

        {/* ==========================================================
            Modal Backdrop
        ========================================================== */}

        <form method="dialog" className="modal-backdrop">
          <button type="button" onClick={closeModal}>
            close
          </button>
        </form>
      </dialog>
    </div>
  );
};

export default MyParcels;
