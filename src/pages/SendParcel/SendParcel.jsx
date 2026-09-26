import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import {
  FaBoxOpen,
  FaMapMarkerAlt,
  FaUser,
  FaEnvelope,
  FaWeightHanging,
  FaClipboardList,
  FaTruck,
} from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const serviceCenters = useLoaderData();

  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];

  const senderRegion = useWatch({
    control,
    name: "senderRegion",
  });

  const receiverRegion = useWatch({
    control,
    name: "receiverRegion",
  });

  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);

    return regionDistricts.map((d) => d.district);
  };

  const handleSendParcel = (data) => {
    console.log(data);

    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;

    const parcelWeight = parseFloat(data.parcelWeight);

    let cost = 0;

    if (isDocument) {
      cost = isSameDistrict ? 80 : 100;
    } else {
      if (parcelWeight <= 3) {
        cost = isSameDistrict ? 130 : 170;
      } else {
        const minCharge = isSameDistrict ? 130 : 170;
        const extraWeight = parcelWeight - 3;

        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;

        cost = minCharge + extraCharge;
      }
    }
    console.log("cost :", cost);

    data.cost = cost;

    Swal.fire({
      title: "Agree with the Cost?",
      text: `You will be charged ৳${cost}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#03373d",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm and Continue to Payment",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post("/parcels", data).then((res) => {
          console.log("after saving data", res.data);

          if (res.data.insertedId) {
            navigate("/dashboard/my-parcels");

            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Parcel has Created. Please Pay",
              showConfirmButton: false,
              timer: 2500,
            });
          }
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-base-200 px-4 py-8 md:px-6 lg:py-10">
      <div className="mx-auto max-w-6xl">
        {/* ============================ Page Header ============================ */}
        <div className="mb-8 text-center">
          <div className="mb-3 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#03373d] text-[#CAEB66] shadow-lg">
              <FaTruck className="text-2xl" />
            </div>
          </div>

          <h1 className="text-3xl font-extrabold text-[#03373d] md:text-4xl">
            Send a Parcel
          </h1>

          <p className="mt-2 text-sm text-gray-500 md:text-base">
            Enter your parcel and delivery information carefully
          </p>
        </div>

        <form onSubmit={handleSubmit(handleSendParcel)} className="space-y-6">
          {/* ========================== Parcel Information ========================== */}
          <div className="rounded-3xl bg-white p-5 shadow-sm md:p-7">
            <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#03373d] text-[#CAEB66]">
                <FaBoxOpen />
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#03373d]">
                  Parcel Information
                </h2>

                <p className="text-xs text-gray-500">
                  Tell us about the parcel you want to send
                </p>
              </div>
            </div>

            {/* Parcel Type */}
            <div className="mb-6">
              <label className="mb-3 block text-sm font-bold text-gray-700">
                Parcel Type
              </label>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <label className="flex cursor-pointer items-center gap-3 rounded-2xl border-2 border-gray-200 p-4 transition hover:border-[#CAEB66] hover:bg-[#f8ffe8]">
                  <input
                    type="radio"
                    {...register("parcelType")}
                    value="document"
                    className="radio radio-sm checked:bg-[#03373d]"
                    defaultChecked
                  />

                  <div>
                    <p className="font-bold text-[#03373d]">Document</p>
                    <p className="text-xs text-gray-500">
                      Papers, files and documents
                    </p>
                  </div>
                </label>

                <label className="flex cursor-pointer items-center gap-3 rounded-2xl border-2 border-gray-200 p-4 transition hover:border-[#CAEB66] hover:bg-[#f8ffe8]">
                  <input
                    type="radio"
                    {...register("parcelType")}
                    value="non-document"
                    className="radio radio-sm checked:bg-[#03373d]"
                  />

                  <div>
                    <p className="font-bold text-[#03373d]">Non-Document</p>
                    <p className="text-xs text-gray-500">
                      Packages and other items
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Parcel Name & Weight */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Parcel Name */}
              <fieldset>
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Parcel Name
                </label>

                <div className="relative">
                  <FaBoxOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type="text"
                    {...register("parcelName", {
                      required: true,
                    })}
                    className="input h-12 w-full rounded-xl border-gray-200 bg-gray-50 pl-11 text-sm focus:border-[#03373d] focus:outline-none"
                    placeholder="Enter parcel name"
                  />
                </div>

                <div className="mt-1 min-h-5">
                  {errors.parcelName?.type === "required" && (
                    <p className="text-xs font-semibold text-red-500">
                      Parcel Name is Required
                    </p>
                  )}
                </div>
              </fieldset>

              {/* Parcel Weight */}
              <fieldset>
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Parcel Weight (kg)
                </label>

                <div className="relative">
                  <FaWeightHanging className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    {...register("parcelWeight", {
                      required: true,
                    })}
                    className="input h-12 w-full rounded-xl border-gray-200 bg-gray-50 pl-11 text-sm focus:border-[#03373d] focus:outline-none"
                    placeholder="e.g. 2.5"
                  />
                </div>

                <div className="mt-1 min-h-5">
                  {errors.parcelWeight?.type === "required" && (
                    <p className="text-xs font-semibold text-red-500">
                      Parcel Weight is Required
                    </p>
                  )}
                </div>
              </fieldset>
            </div>
          </div>

          {/* ============================= Sender & Receiver ============================ */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* ============================= Sender ============================== */}
            <div className="rounded-3xl bg-white p-5 shadow-sm md:p-7">
              <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#03373d] text-[#CAEB66]">
                  <FaMapMarkerAlt />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-[#03373d]">
                    Sender Details
                  </h2>

                  <p className="text-xs text-gray-500">
                    Where should we collect the parcel?
                  </p>
                </div>
              </div>

              {/* Sender Name */}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Sender Name
                </label>

                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type="text"
                    {...register("senderName", {
                      required: true,
                    })}
                    defaultValue={user?.displayName}
                    readOnly
                    className="input h-12 w-full rounded-xl border-gray-200 bg-gray-100 pl-11 text-sm"
                    placeholder="Sender Name"
                  />
                </div>

                <div className="min-h-5">
                  {errors.senderName?.type === "required" && (
                    <p className="text-xs font-semibold text-red-500">
                      Sender Name is Required
                    </p>
                  )}
                </div>
              </div>

              {/* Sender Email */}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Sender Email
                </label>

                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type="email"
                    {...register("senderEmail", {
                      required: true,
                    })}
                    defaultValue={user?.email}
                    readOnly
                    className="input h-12 w-full rounded-xl border-gray-200 bg-gray-100 pl-11 text-sm"
                    placeholder="Sender Email"
                  />
                </div>

                <div className="min-h-5">
                  {errors.senderEmail?.type === "required" && (
                    <p className="text-xs font-semibold text-red-500">
                      Sender Email is Required
                    </p>
                  )}
                </div>
              </div>

              {/* Sender Region */}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Sender Region
                </label>

                <select
                  {...register("senderRegion", {
                    required: true,
                  })}
                  defaultValue=""
                  className="select h-12 w-full rounded-xl border-gray-200 bg-gray-50 text-sm focus:border-[#03373d] focus:outline-none"
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

                <div className="min-h-5">
                  {errors.senderRegion?.type === "required" && (
                    <p className="text-xs font-semibold text-red-500">
                      Sender Region is Required
                    </p>
                  )}
                </div>
              </div>

              {/* Sender District */}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Sender District
                </label>

                <select
                  {...register("senderDistrict", {
                    required: true,
                  })}
                  defaultValue=""
                  disabled={!senderRegion}
                  className="select h-12 w-full rounded-xl border-gray-200 bg-gray-50 text-sm focus:border-[#03373d] focus:outline-none disabled:bg-gray-100 disabled:text-gray-400"
                >
                  <option value="" disabled>
                    {senderRegion ? "Pick a District" : "Select Region First"}
                  </option>

                  {districtsByRegion(senderRegion).map((district, index) => (
                    <option key={index} value={district}>
                      {district}
                    </option>
                  ))}
                </select>

                <div className="min-h-5">
                  {errors.senderDistrict?.type === "required" && (
                    <p className="text-xs font-semibold text-red-500">
                      Sender District is Required
                    </p>
                  )}
                </div>
              </div>

              {/* Sender Address */}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Sender Address
                </label>

                <input
                  type="text"
                  {...register("senderAddress", {
                    required: true,
                  })}
                  className="input h-12 w-full rounded-xl border-gray-200 bg-gray-50 text-sm focus:border-[#03373d] focus:outline-none"
                  placeholder="Enter sender address"
                />

                <div className="min-h-5">
                  {errors.senderAddress?.type === "required" && (
                    <p className="text-xs font-semibold text-red-500">
                      Sender Address is Required
                    </p>
                  )}
                </div>
              </div>

              {/* Pickup Instruction */}
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Pickup Instruction
              </label>

              <textarea
                {...register("senderPickupInstruction")}
                className="textarea min-h-24 w-full rounded-xl border-gray-200 bg-gray-50 text-sm focus:border-[#03373d] focus:outline-none"
                placeholder="Enter pickup instruction"
              ></textarea>
            </div>

            {/* ============================= Receiver ============================== */}
            <div className="rounded-3xl bg-white p-5 shadow-sm md:p-7">
              <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#CAEB66] text-[#03373d]">
                  <FaMapMarkerAlt />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-[#03373d]">
                    Receiver Details
                  </h2>

                  <p className="text-xs text-gray-500">
                    Where should we deliver the parcel?
                  </p>
                </div>
              </div>

              {/* Receiver Name */}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Receiver Name
                </label>

                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type="text"
                    {...register("receiverName", {
                      required: true,
                    })}
                    className="input h-12 w-full rounded-xl border-gray-200 bg-gray-50 pl-11 text-sm focus:border-[#03373d] focus:outline-none"
                    placeholder="Receiver Name"
                  />
                </div>

                <div className="min-h-5">
                  {errors.receiverName?.type === "required" && (
                    <p className="text-xs font-semibold text-red-500">
                      Receiver Name is Required
                    </p>
                  )}
                </div>
              </div>

              {/* Receiver Email */}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Receiver Email
                </label>

                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type="email"
                    {...register("receiverEmail", {
                      required: true,
                    })}
                    className="input h-12 w-full rounded-xl border-gray-200 bg-gray-50 pl-11 text-sm focus:border-[#03373d] focus:outline-none"
                    placeholder="Receiver Email"
                  />
                </div>

                <div className="min-h-5">
                  {errors.receiverEmail?.type === "required" && (
                    <p className="text-xs font-semibold text-red-500">
                      Receiver Email is Required
                    </p>
                  )}
                </div>
              </div>

              {/* Receiver Region */}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Receiver Region
                </label>

                <select
                  {...register("receiverRegion", {
                    required: true,
                  })}
                  defaultValue=""
                  className="select h-12 w-full rounded-xl border-gray-200 bg-gray-50 text-sm focus:border-[#03373d] focus:outline-none"
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

                <div className="min-h-5">
                  {errors.receiverRegion?.type === "required" && (
                    <p className="text-xs font-semibold text-red-500">
                      Receiver Region is Required
                    </p>
                  )}
                </div>
              </div>

              {/* Receiver District */}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Receiver District
                </label>

                <select
                  {...register("receiverDistrict", {
                    required: true,
                  })}
                  defaultValue=""
                  disabled={!receiverRegion}
                  className="select h-12 w-full rounded-xl border-gray-200 bg-gray-50 text-sm focus:border-[#03373d] focus:outline-none disabled:bg-gray-100 disabled:text-gray-400"
                >
                  <option value="" disabled>
                    {receiverRegion ? "Pick a District" : "Select Region First"}
                  </option>

                  {districtsByRegion(receiverRegion).map((district, index) => (
                    <option key={index} value={district}>
                      {district}
                    </option>
                  ))}
                </select>

                <div className="min-h-5">
                  {errors.receiverDistrict?.type === "required" && (
                    <p className="text-xs font-semibold text-red-500">
                      Receiver District is Required
                    </p>
                  )}
                </div>
              </div>

              {/* Receiver Address */}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Receiver Address
                </label>

                <input
                  type="text"
                  {...register("receiverAddress", {
                    required: true,
                  })}
                  className="input h-12 w-full rounded-xl border-gray-200 bg-gray-50 text-sm focus:border-[#03373d] focus:outline-none"
                  placeholder="Enter receiver address"
                />

                <div className="min-h-5">
                  {errors.receiverAddress?.type === "required" && (
                    <p className="text-xs font-semibold text-red-500">
                      Receiver Address is Required
                    </p>
                  )}
                </div>
              </div>

              {/* Delivery Instruction */}
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Delivery Instruction
              </label>

              <textarea
                {...register("receiverPickupInstruction")}
                className="textarea min-h-24 w-full rounded-xl border-gray-200 bg-gray-50 text-sm focus:border-[#03373d] focus:outline-none"
                placeholder="Enter delivery instruction"
              ></textarea>
            </div>
          </div>

          {/* ============================== Bottom CTA ============================== */}
          <div className="rounded-3xl bg-[#03373d] p-6 text-center shadow-lg md:p-8">
            <div className="mb-4 flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#CAEB66] text-[#03373d]">
                <FaClipboardList />
              </div>
            </div>

            <h3 className="text-xl font-bold text-white">
              Ready to Book Your Delivery?
            </h3>

            <p className="mt-2 text-sm text-gray-300">
              Pickup time:{" "}
              <span className="font-bold text-[#CAEB66]">4 PM - 7 PM</span>{" "}
              approximately
            </p>

            <input
              type="submit"
              className="btn mt-5 border-none bg-[#CAEB66] px-8 text-[#03373d] shadow-md transition hover:scale-105 hover:bg-[#CAEB66]"
              value="Proceed to Confirm Booking"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendParcel;
