import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
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

  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];
  //useMemo or useWatch
  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });

  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };
  //   console.log(regions);

  const handleSendParcel = (data) => {
    console.log(data);

    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    // console.log(isSameDistrict);
    const parcelWeight = parseFloat(data.parcelWeight);

    let cost = 0;
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
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
      text: `You will be charged ${cost} !`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I Agree",
    }).then((result) => {
      if (result.isConfirmed)
        //save the parcel info to the database
        axiosSecure.post("/parcels", data).then((res) => {
          console.log("after saving data", res.data);
        });

      // Swal.fire({
      //   title: "Done !",
      //   text: "Your Order has been Confirmed.",
      //   icon: "success",
      // });
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      {/* ============================ title ============================ */}
      <div className="text-center">
        <h2 className="text-5xl font-bold">Send a Parcel</h2>
        <h2 className="mt-3 text-2xl font-bold">Enter Your Parcel Details</h2>
      </div>

      <form
        onSubmit={handleSubmit(handleSendParcel)}
        className="mx-auto mt-10 max-w-6xl p-4 text-black"
      >
        {/* ========================== parcel info =========================== */}
        <div className="flex justify-center gap-6">
          <label className="label cursor-pointer gap-2">
            <input
              type="radio"
              {...register("parcelType")}
              value="document"
              className="radio radio-success"
              defaultChecked
            />
            Document
          </label>

          <label className="label cursor-pointer gap-2">
            <input
              type="radio"
              {...register("parcelType")}
              value="non-document"
              className="radio radio-success"
            />
            Non-Document
          </label>
        </div>

        {/* ======================== parcel name & weight ================================ */}
        <div className="my-8 grid grid-cols-1 gap-10 md:grid-cols-2">
          {/* Parcel Name */}
          <fieldset className="fieldset">
            <label className="label font-semibold">Parcel Name</label>

            <input
              type="text"
              {...register("parcelName", {
                required: true,
              })}
              className="input w-full"
              placeholder="Parcel Name"
            />

            {errors.parcelName?.type === "required" && (
              <p className="text-sm font-bold text-red-500">
                Parcel Name is Required
              </p>
            )}
          </fieldset>

          {/* Parcel Weight */}
          <fieldset className="fieldset">
            <label className="label font-semibold">Parcel Weight (kg)</label>

            <input
              type="number"
              step="0.1"
              {...register("parcelWeight", {
                required: true,
              })}
              className="input w-full"
              placeholder="Parcel Weight"
            />

            {errors.parcelWeight?.type === "required" && (
              <p className="text-sm font-bold text-red-500">
                Parcel Weight is Required
              </p>
            )}
          </fieldset>
        </div>

        {/* ============================= sender & receiver ============================ */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {/* ============================= Sender Info ============================== */}
          <fieldset className="fieldset">
            <h2 className="mb-5 text-center text-2xl font-bold">
              Sender Details
            </h2>

            {/* Sender Name */}
            <div className="mb-4">
              <label className="label font-semibold">Sender Name</label>

              <input
                type="text"
                {...register("senderName", {
                  required: true,
                })}
                defaultValue={user?.displayName}
                readOnly
                className="input w-full"
                placeholder="Sender Name"
              />

              <div className="h-5">
                {errors.senderName?.type === "required" && (
                  <p className="text-sm font-bold text-red-500">
                    Sender Name is Required
                  </p>
                )}
              </div>
            </div>

            {/* Sender Email */}
            <div className="mb-4">
              <label className="label font-semibold">Sender Email</label>

              <input
                type="email"
                {...register("senderEmail", {
                  required: true,
                })}
                defaultValue={user?.email}
                readOnly
                className="input w-full"
                placeholder="Sender Email"
              />

              <div className="h-5">
                {errors.senderEmail?.type === "required" && (
                  <p className="text-sm font-bold text-red-500">
                    Sender Email is Required
                  </p>
                )}
              </div>
            </div>

            {/* Sender Region */}
            <div className="mb-4">
              <fieldset className="fieldset">
                <legend className="fieldset-legend font-semibold">
                  Sender Region
                </legend>

                <select
                  {...register("senderRegion", {
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

              <div className="h-5">
                {errors.senderRegion?.type === "required" && (
                  <p className="text-sm font-bold text-red-500">
                    Sender Region is Required
                  </p>
                )}
              </div>
            </div>

            {/* Sender District */}
            <div className="mb-4">
              <fieldset className="fieldset">
                <legend className="fieldset-legend font-semibold">
                  Sender District
                </legend>

                <select
                  {...register("senderDistrict", {
                    required: true,
                  })}
                  defaultValue=""
                  className="select w-full"
                >
                  <option value="" disabled>
                    Pick a District
                  </option>

                  {districtsByRegion(senderRegion).map((r, index) => (
                    <option key={index} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </fieldset>

              <div className="h-5">
                {errors.senderDistrict?.type === "required" && (
                  <p className="text-sm font-bold text-red-500">
                    Sender District is Required
                  </p>
                )}
              </div>
            </div>

            {/* Sender Address */}
            <div className="mb-4">
              <label className="label font-semibold">Sender Address</label>

              <input
                type="text"
                {...register("senderAddress", {
                  required: true,
                })}
                className="input w-full"
                placeholder="Sender Address"
              />

              <div className="h-5">
                {errors.senderAddress?.type === "required" && (
                  <p className="text-sm font-bold text-red-500">
                    Sender Address is Required
                  </p>
                )}
              </div>
            </div>

            {/* Pickup Instruction */}
            <label className="label font-semibold">Pickup Instruction</label>

            <textarea
              {...register("senderPickupInstruction")}
              className="textarea w-full"
              placeholder="Enter pickup instruction"
            ></textarea>
          </fieldset>

          {/* ============================= Receiver Info ============================== */}
          <fieldset className="fieldset">
            <h2 className="mb-5 text-center text-2xl font-bold">
              Receiver Details
            </h2>

            {/* Receiver Name */}
            <div className="mb-4">
              <label className="label font-semibold">Receiver Name</label>

              <input
                type="text"
                {...register("receiverName", {
                  required: true,
                })}
                className="input w-full"
                placeholder="Receiver Name"
              />

              <div className="h-5">
                {errors.receiverName?.type === "required" && (
                  <p className="text-sm font-bold text-red-500">
                    Receiver Name is Required
                  </p>
                )}
              </div>
            </div>

            {/* Receiver Email */}
            <div className="mb-4">
              <label className="label font-semibold">Receiver Email</label>

              <input
                type="email"
                {...register("receiverEmail", {
                  required: true,
                })}
                className="input w-full"
                placeholder="Receiver Email"
              />

              <div className="h-5">
                {errors.receiverEmail?.type === "required" && (
                  <p className="text-sm font-bold text-red-500">
                    Receiver Email is Required
                  </p>
                )}
              </div>
            </div>

            {/* Receiver Region */}
            <div className="mb-4">
              <fieldset className="fieldset">
                <legend className="fieldset-legend font-semibold">
                  Receiver Region
                </legend>

                <select
                  {...register("receiverRegion", {
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

              <div className="h-5">
                {errors.receiverRegion?.type === "required" && (
                  <p className="text-sm font-bold text-red-500">
                    Receiver Region is Required
                  </p>
                )}
              </div>
            </div>

            {/* Receiver District */}
            <div className="mb-4">
              <fieldset className="fieldset">
                <legend className="fieldset-legend font-semibold">
                  Receiver District
                </legend>

                <select
                  {...register("receiverDistrict", {
                    required: true,
                  })}
                  defaultValue=""
                  className="select w-full"
                >
                  <option value="" disabled>
                    Pick a District
                  </option>

                  {districtsByRegion(receiverRegion).map((d, index) => (
                    <option key={index} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </fieldset>

              <div className="h-5">
                {errors.receiverDistrict?.type === "required" && (
                  <p className="text-sm font-bold text-red-500">
                    Receiver District is Required
                  </p>
                )}
              </div>
            </div>

            {/* Receiver Address */}
            <div className="mb-4">
              <label className="label font-semibold">Receiver Address</label>

              <input
                type="text"
                {...register("receiverAddress", {
                  required: true,
                })}
                className="input w-full"
                placeholder="Receiver Address"
              />

              <div className="h-5">
                {errors.receiverAddress?.type === "required" && (
                  <p className="text-sm font-bold text-red-500">
                    Receiver Address is Required
                  </p>
                )}
              </div>
            </div>

            {/* Delivery Instruction */}
            <label className="label font-semibold">Delivery Instruction</label>

            <textarea
              {...register("receiverPickupInstruction")}
              className="textarea w-full"
              placeholder="Enter delivery instruction"
            ></textarea>
          </fieldset>
        </div>

        {/* ============================== send parcel button ============================== */}
        <div className="mt-10 flex flex-col items-center gap-4">
          <p className="text-sm text-center">* PickUp Time 4pm-7pm Approx.</p>
          <input
            type="submit"
            className="btn btn-primary text-black"
            value="Proceed to Confirm Booking"
          />
        </div>
      </form>
    </div>
  );
};

export default SendParcel;
