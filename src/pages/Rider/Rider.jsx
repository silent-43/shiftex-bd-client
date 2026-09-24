import React from "react";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import {
  FaMotorcycle,
  FaUser,
  FaEnvelope,
  FaMapMarkerAlt,
  FaIdCard,
  FaIdBadge,
  FaCheckCircle,
} from "react-icons/fa";

const Rider = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const serviceCenters = useLoaderData();

  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];

  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);

    return regionDistricts.map((d) => d.district);
  };

  const riderRegion = useWatch({
    control,
    name: "region",
  });

  const handleRiderApplication = (data) => {
    console.log(data);

    axiosSecure.post("/riders", data).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title:
            "Your Application has been submitted, Please wait! We will reach to you.",
          showConfirmButton: false,
          timer: 2500,
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-base-200 px-4 py-8 md:px-6 lg:py-10">
      <div className="mx-auto max-w-4xl">
        {/* ============================ Header ============================ */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#03373d] text-[#CAEB66] shadow-lg">
              <FaMotorcycle className="text-3xl" />
            </div>
          </div>

          <h1 className="text-3xl font-extrabold text-[#03373d] md:text-4xl">
            Be a Rider
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-500 md:text-base">
            Join ShiftexBD and become a trusted delivery partner. Enjoy flexible
            delivery opportunities and help us deliver parcels safely and on
            time.
          </p>
        </div>

        {/* ============================ Form Card ============================ */}
        <form
          onSubmit={handleSubmit(handleRiderApplication)}
          className="overflow-hidden rounded-3xl bg-white shadow-sm"
        >
          {/* ============================ Form Header ============================ */}
          <div className="bg-[#03373d] px-5 py-6 text-white md:px-8">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#CAEB66] text-[#03373d]">
                <FaMotorcycle className="text-xl" />
              </div>

              <div>
                <h2 className="text-xl font-bold">Rider Application</h2>

                <p className="mt-1 text-xs text-gray-300">
                  Please provide accurate information for verification.
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 md:p-8">
            {/* ============================ Personal Details ============================ */}
            <div className="mb-8">
              <div className="mb-5 flex items-center gap-3 border-b border-gray-100 pb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f1f8d8] text-[#03373d]">
                  <FaUser />
                </div>

                <div>
                  <h3 className="font-bold text-[#03373d]">Personal Details</h3>

                  <p className="text-xs text-gray-400">
                    Your basic contact information
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-x-5 md:grid-cols-2">
                {/* Rider Name */}
                <div className="mb-4">
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Your Name
                  </label>

                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                    <input
                      type="text"
                      {...register("riderName", {
                        required: true,
                      })}
                      defaultValue={user?.displayName}
                      className="input h-12 w-full rounded-xl border-gray-200 bg-gray-50 pl-11 text-sm focus:border-[#03373d] focus:outline-none"
                      placeholder="Your Name"
                    />
                  </div>

                  <div className="min-h-5">
                    {errors.riderName?.type === "required" && (
                      <p className="text-xs font-semibold text-red-500">
                        Name is Required
                      </p>
                    )}
                  </div>
                </div>

                {/* Rider Email */}
                <div className="mb-4">
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Your Email
                  </label>

                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                    <input
                      type="email"
                      {...register("riderEmail", {
                        required: true,
                      })}
                      defaultValue={user?.email}
                      readOnly
                      className="input h-12 w-full rounded-xl border-gray-200 bg-gray-100 pl-11 text-sm"
                      placeholder="Rider Email"
                    />
                  </div>

                  <div className="min-h-5">
                    {errors.riderEmail?.type === "required" && (
                      <p className="text-xs font-semibold text-red-500">
                        Email is Required
                      </p>
                    )}
                  </div>
                </div>

                {/* Rider Region */}
                <div className="mb-4">
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Region
                  </label>

                  <select
                    {...register("region", {
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
                    {errors.region?.type === "required" && (
                      <p className="text-xs font-semibold text-red-500">
                        Region is Required
                      </p>
                    )}
                  </div>
                </div>

                {/* Rider District */}
                <div className="mb-4">
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    District
                  </label>

                  <select
                    {...register("riderDistrict", {
                      required: true,
                    })}
                    defaultValue=""
                    disabled={!riderRegion}
                    className="select h-12 w-full rounded-xl border-gray-200 bg-gray-50 text-sm focus:border-[#03373d] focus:outline-none disabled:bg-gray-100 disabled:text-gray-400"
                  >
                    <option value="" disabled>
                      {riderRegion ? "Pick a District" : "Select Region First"}
                    </option>

                    {districtsByRegion(riderRegion).map((district, index) => (
                      <option key={index} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>

                  <div className="min-h-5">
                    {errors.riderDistrict?.type === "required" && (
                      <p className="text-xs font-semibold text-red-500">
                        District is Required
                      </p>
                    )}
                  </div>
                </div>

                {/* Rider Address */}
                <div className="mb-4 md:col-span-2">
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Your Address
                  </label>

                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                    <input
                      type="text"
                      {...register("riderAddress", {
                        required: true,
                      })}
                      className="input h-12 w-full rounded-xl border-gray-200 bg-gray-50 pl-11 text-sm focus:border-[#03373d] focus:outline-none"
                      placeholder="Enter your full address"
                    />
                  </div>

                  <div className="min-h-5">
                    {errors.riderAddress?.type === "required" && (
                      <p className="text-xs font-semibold text-red-500">
                        Address is Required
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* ============================ Verification Details ============================ */}
            <div>
              <div className="mb-5 flex items-center gap-3 border-b border-gray-100 pb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f1f8d8] text-[#03373d]">
                  <FaIdCard />
                </div>

                <div>
                  <h3 className="font-bold text-[#03373d]">
                    Verification & Vehicle
                  </h3>

                  <p className="text-xs text-gray-400">
                    Information required for rider verification
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-x-5 md:grid-cols-2">
                {/* Driving License */}
                <div className="mb-4">
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Driving License
                  </label>

                  <div className="relative">
                    <FaIdBadge className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                    <input
                      type="text"
                      {...register("license", {
                        required: true,
                      })}
                      className="input h-12 w-full rounded-xl border-gray-200 bg-gray-50 pl-11 text-sm focus:border-[#03373d] focus:outline-none"
                      placeholder="Enter driving license"
                    />
                  </div>

                  <div className="min-h-5">
                    {errors.license?.type === "required" && (
                      <p className="text-xs font-semibold text-red-500">
                        License is Required
                      </p>
                    )}
                  </div>
                </div>

                {/* NID */}
                <div className="mb-4">
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    NID
                  </label>

                  <div className="relative">
                    <FaIdCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                    <input
                      type="text"
                      {...register("nid", {
                        required: true,
                      })}
                      className="input h-12 w-full rounded-xl border-gray-200 bg-gray-50 pl-11 text-sm focus:border-[#03373d] focus:outline-none"
                      placeholder="Enter NID number"
                    />
                  </div>

                  <div className="min-h-5">
                    {errors.nid?.type === "required" && (
                      <p className="text-xs font-semibold text-red-500">
                        NID is Required
                      </p>
                    )}
                  </div>
                </div>

                {/* Bike */}
                <div className="mb-2 md:col-span-2">
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Bike
                  </label>

                  <div className="relative">
                    <FaMotorcycle className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                    <input
                      type="text"
                      {...register("bike", {
                        required: true,
                      })}
                      className="input h-12 w-full rounded-xl border-gray-200 bg-gray-50 pl-11 text-sm focus:border-[#03373d] focus:outline-none"
                      placeholder="Enter bike details"
                    />
                  </div>

                  <div className="min-h-5">
                    {errors.bike?.type === "required" && (
                      <p className="text-xs font-semibold text-red-500">
                        Bike is Required
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* ============================== Apply Button ============================== */}
            <div className="mt-6 border-t border-gray-100 pt-6">
              <div className="rounded-2xl bg-[#f5f9e9] p-4 text-center">
                <div className="mb-2 flex justify-center">
                  <FaCheckCircle className="text-xl text-[#03373d]" />
                </div>

                <p className="text-xs text-gray-500">
                  Make sure all information is correct before submitting your
                  application.
                </p>

                <input
                  type="submit"
                  className="btn mt-4 h-12 rounded-xl border-none bg-[#CAEB66] px-8 font-bold text-[#03373d] shadow-md transition hover:scale-105 hover:bg-[#CAEB66]"
                  value="Apply as a Rider"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Rider;
