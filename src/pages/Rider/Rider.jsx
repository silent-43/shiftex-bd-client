import React from "react";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";

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
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const riderRegion = useWatch({ control, name: "region" });

  const handleRiderApplication = (data) => {
    console.log(data);
    axiosSecure.post("/riders", data).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title:
            "Your Application has been submitted, Please wait ! We will reach to You",
          showConfirmButton: false,
          timer: 2500,
        });
      }
    });
  };

  return (
    <div>
      {/* ============================ title ============================ */}
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mt-8 text-4xl font-bold">Be A Rider</h2>

        <h2 className="mt-2 text-xl font-bold leading-7">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </h2>
      </div>

      <form
        onSubmit={handleSubmit(handleRiderApplication)}
        className="mx-auto mt-6 max-w-3xl px-4 pb-4 text-black"
      >
        <div>
          <fieldset className="fieldset">
            <h2 className="mb-3 text-center text-2xl font-bold">
              Rider Details
            </h2>

            {/* Rider Name */}
            <div className="mb-2">
              <label className="label font-semibold">Your Name</label>

              <input
                type="text"
                {...register("riderName", {
                  required: true,
                })}
                defaultValue={user?.displayName}
                className="input w-full"
                placeholder="Your Name"
              />

              <div className="min-h-4">
                {errors.riderName?.type === "required" && (
                  <p className="text-xs font-bold text-red-500">
                    Name is Required
                  </p>
                )}
              </div>
            </div>

            {/* Rider Email */}
            <div className="mb-2">
              <label className="label font-semibold">Your Email</label>

              <input
                type="email"
                {...register("riderEmail", {
                  required: true,
                })}
                defaultValue={user?.email}
                readOnly
                className="input w-full"
                placeholder="Rider Email"
              />

              <div className="min-h-4">
                {errors.riderEmail?.type === "required" && (
                  <p className="text-xs font-bold text-red-500">
                    Email is Required
                  </p>
                )}
              </div>
            </div>

            {/* Rider Region */}
            <div className="mb-2">
              <fieldset className="fieldset">
                <legend className="fieldset-legend font-semibold">
                  Region
                </legend>

                <select
                  {...register("region", {
                    required: true,
                  })}
                  defaultValue=""
                  className="select w-full"
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
              </fieldset>

              <div className="min-h-4">
                {errors.riderRegion?.type === "required" && (
                  <p className="text-xs font-bold text-red-500">
                    Region is Required
                  </p>
                )}
              </div>
            </div>

            {/* Rider District */}
            <div className="mb-2">
              <fieldset className="fieldset">
                <legend className="fieldset-legend font-semibold">
                  District
                </legend>

                <select
                  {...register("riderDistrict", {
                    required: true,
                  })}
                  defaultValue=""
                  className="select w-full"
                >
                  <option value="" disabled>
                    Pick a District
                  </option>

                  {districtsByRegion(riderRegion).map((r, index) => (
                    <option key={index} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </fieldset>

              <div className="min-h-4">
                {errors.riderDistrict?.type === "required" && (
                  <p className="text-xs font-bold text-red-500">
                    District is Required
                  </p>
                )}
              </div>
            </div>

            {/* Rider Address */}
            <div className="mb-2">
              <label className="label font-semibold">Your Address</label>

              <input
                type="text"
                {...register("riderAddress", {
                  required: true,
                })}
                className="input w-full"
                placeholder="Your Address"
              />

              <div className="min-h-4">
                {errors.riderAddress?.type === "required" && (
                  <p className="text-xs font-bold text-red-500">
                    Address is Required
                  </p>
                )}
              </div>
            </div>
          </fieldset>

          {/* Driving License */}
          <div className="mb-2">
            <label className="label font-semibold">Driving License</label>

            <input
              type="text"
              {...register("license", {
                required: true,
              })}
              className="input w-full"
              placeholder="Driving License"
            />

            <div className="min-h-4">
              {errors.license?.type === "required" && (
                <p className="text-xs font-bold text-red-500">
                  License is Required
                </p>
              )}
            </div>
          </div>

          {/* Rider NID */}
          <div className="mb-2">
            <label className="label font-semibold">NID</label>

            <input
              type="text"
              {...register("nid", {
                required: true,
              })}
              className="input w-full"
              placeholder="NID"
            />

            <div className="min-h-4">
              {errors.nid?.type === "required" && (
                <p className="text-xs font-bold text-red-500">
                  NID is Required
                </p>
              )}
            </div>
          </div>

          {/* Rider Bike */}
          <div className="mb-2">
            <label className="label font-semibold">Bike</label>

            <input
              type="text"
              {...register("bike", {
                required: true,
              })}
              className="input w-full"
              placeholder="Bike"
            />

            <div className="min-h-4">
              {errors.bike?.type === "required" && (
                <p className="text-xs font-bold text-red-500">
                  Bike is Required
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ============================== Apply button ============================== */}
        <div className="mt-4 mb-4 flex justify-center">
          <input
            type="submit"
            className="btn btn-primary text-black"
            value="Apply as a Rider"
          />
        </div>
      </form>
    </div>
  );
};

export default Rider;
