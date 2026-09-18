import React from "react";
import { FaFileAlt, FaBoxOpen, FaWeightHanging, FaCity } from "react-icons/fa";
import { MdLocationOn, MdLocalShipping } from "react-icons/md";
import { FiCheckCircle, FiInfo } from "react-icons/fi";

const Pricing = () => {
  return (
    <section className="bg-base-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* ================= Section Header ================= */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#CAEB66] px-4 py-2 text-sm font-semibold text-[#03373d]">
            <MdLocalShipping className="text-lg" />
            Simple & Transparent Pricing
          </div>

          <h2 className="mb-4 text-3xl font-bold text-[#03373d] sm:text-4xl lg:text-5xl">
            Pricing Structure
          </h2>

          <p className="text-sm leading-7 text-gray-600 sm:text-base lg:text-lg">
            Affordable and transparent delivery charges for documents and
            parcels. Choose your parcel type and destination to understand the
            delivery cost clearly.
          </p>
        </div>

        {/* ================= Quick Pricing Cards ================= */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Document Card */}
          <div className="group rounded-2xl border border-gray-200 bg-base-100 p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#CAEB66] text-2xl text-[#03373d] transition-transform duration-300 group-hover:scale-110">
                <FaFileAlt />
              </div>

              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                DOCUMENT
              </span>
            </div>

            <h3 className="mb-2 text-2xl font-bold text-[#03373d]">Document</h3>

            <p className="mb-6 text-sm leading-6 text-gray-600">
              Documents such as letters, certificates, contracts, papers, and
              other document-type items.
            </p>

            {/* Within City */}
            <div className="mb-3 flex items-center justify-between rounded-xl bg-gray-50 p-4">
              <div className="flex items-center gap-3">
                <FaCity className="text-xl text-[#03373d]" />

                <div>
                  <p className="font-semibold text-gray-800">Within City</p>
                  <p className="text-xs text-gray-500">Any weight</p>
                </div>
              </div>

              <span className="text-xl font-bold text-[#03373d]">৳60</span>
            </div>

            {/* Outside City */}
            <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
              <div className="flex items-center gap-3">
                <MdLocationOn className="text-xl text-[#03373d]" />

                <div>
                  <p className="font-semibold text-gray-800">Outside City</p>
                  <p className="text-xs text-gray-500">Other district</p>
                </div>
              </div>

              <span className="text-xl font-bold text-[#03373d]">৳80</span>
            </div>

            <div className="mt-5 flex items-center gap-2 text-sm text-gray-600">
              <FiCheckCircle className="text-green-500" />
              Any weight is accepted
            </div>
          </div>

          {/* Up To 3kg Card */}
          <div className="group relative rounded-2xl bg-[#03373d] p-6 text-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            {/* Badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="whitespace-nowrap rounded-full bg-[#CAEB66] px-4 py-1.5 text-xs font-bold text-[#03373d] shadow-md">
                MOST POPULAR
              </span>
            </div>

            <div className="mb-6 flex items-center justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#CAEB66] text-2xl text-[#03373d] transition-transform duration-300 group-hover:scale-110">
                <FaBoxOpen />
              </div>

              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-[#CAEB66]">
                UP TO 3KG
              </span>
            </div>

            <h3 className="mb-2 text-2xl font-bold">Non-Document</h3>

            <p className="mb-6 text-sm leading-6 text-white/70">
              Regular parcels, products, gifts, clothing, and packages weighing
              up to 3kg.
            </p>

            {/* Within City */}
            <div className="mb-3 flex items-center justify-between rounded-xl bg-white/10 p-4">
              <div className="flex items-center gap-3">
                <FaCity className="text-xl text-[#CAEB66]" />

                <div>
                  <p className="font-semibold">Within City</p>
                  <p className="text-xs text-white/60">Up to 3kg</p>
                </div>
              </div>

              <span className="text-xl font-bold text-[#CAEB66]">৳110</span>
            </div>

            {/* Outside City */}
            <div className="flex items-center justify-between rounded-xl bg-white/10 p-4">
              <div className="flex items-center gap-3">
                <MdLocationOn className="text-xl text-[#CAEB66]" />

                <div>
                  <p className="font-semibold">Outside City</p>
                  <p className="text-xs text-white/60">Other district</p>
                </div>
              </div>

              <span className="text-xl font-bold text-[#CAEB66]">৳150</span>
            </div>

            <div className="mt-5 flex items-center gap-2 text-sm text-white/70">
              <FiCheckCircle className="text-[#CAEB66]" />
              Up to 3kg included
            </div>
          </div>

          {/* Above 3kg Card */}
          <div className="group rounded-2xl border border-gray-200 bg-base-100 p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-2xl text-orange-600 transition-transform duration-300 group-hover:scale-110">
                <FaWeightHanging />
              </div>

              <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700">
                ABOVE 3KG
              </span>
            </div>

            <h3 className="mb-2 text-2xl font-bold text-[#03373d]">
              Extra Weight
            </h3>

            <p className="mb-6 text-sm leading-6 text-gray-600">
              For non-document parcels weighing more than 3kg, additional
              charges apply based on the extra weight.
            </p>

            {/* Extra Weight */}
            <div className="rounded-xl bg-orange-50 p-5">
              <div className="mb-4 flex items-center gap-3">
                <FaWeightHanging className="text-xl text-orange-600" />

                <h4 className="font-bold text-orange-800">Additional Weight</h4>
              </div>

              <div className="flex items-center justify-between border-b border-orange-200 pb-3">
                <span className="text-sm text-gray-700">Extra charge</span>

                <span className="font-bold text-[#03373d]">+৳40 / kg</span>
              </div>

              <div className="flex items-center justify-between pt-3">
                <span className="text-sm text-gray-700">Outside city</span>

                <span className="font-bold text-[#03373d]">+৳40</span>
              </div>
            </div>

            {/* Example */}
            <div className="mt-5 rounded-xl bg-gray-50 p-4">
              <p className="text-sm leading-6 text-gray-600">
                <span className="font-bold text-[#03373d]">Example:</span> If a
                parcel exceeds 3kg, an additional
                <span className="font-bold text-[#03373d]">
                  {" "}
                  ৳40 per kg
                </span>{" "}
                will be added.
              </p>
            </div>
          </div>
        </div>

        {/* ================= Complete Pricing Table ================= */}
        <div className="mt-12">
          <div className="mb-6 text-center">
            <h3 className="text-2xl font-bold text-[#03373d] sm:text-3xl">
              Complete Pricing Details
            </h3>

            <p className="mt-2 text-sm text-gray-600 sm:text-base">
              Compare delivery charges based on parcel type, weight, and
              destination.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-lg">
            <table className="w-full min-w-190 border-collapse">
              <thead>
                <tr className="bg-[#03373d] text-white">
                  <th className="px-5 py-4 text-left text-sm font-bold sm:text-base">
                    Parcel Type
                  </th>

                  <th className="px-5 py-4 text-center text-sm font-bold sm:text-base">
                    Weight
                  </th>

                  <th className="px-5 py-4 text-center text-sm font-bold sm:text-base">
                    Within City
                  </th>

                  <th className="px-5 py-4 text-center text-sm font-bold sm:text-base">
                    Outside City / District
                  </th>
                </tr>
              </thead>

              <tbody>
                {/* Document */}
                <tr className="border-b border-gray-200 bg-base-100 transition-colors hover:bg-gray-50">
                  <td className="px-5 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#CAEB66] text-[#03373d]">
                        <FaFileAlt />
                      </div>

                      <div>
                        <p className="font-bold text-[#03373d]">Document</p>
                        <p className="text-xs text-gray-500">
                          Papers & documents
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-5 text-center text-sm font-medium">
                    Any
                  </td>

                  <td className="px-5 py-5 text-center">
                    <span className="rounded-full bg-green-100 px-4 py-2 font-bold text-green-700">
                      ৳60
                    </span>
                  </td>

                  <td className="px-5 py-5 text-center">
                    <span className="rounded-full bg-blue-100 px-4 py-2 font-bold text-blue-700">
                      ৳80
                    </span>
                  </td>
                </tr>

                {/* Non Document Up To 3kg */}
                <tr className="border-b border-gray-200 bg-gray-50 transition-colors hover:bg-gray-100">
                  <td className="px-5 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#CAEB66] text-[#03373d]">
                        <FaBoxOpen />
                      </div>

                      <div>
                        <p className="font-bold text-[#03373d]">Non-Document</p>
                        <p className="text-xs text-gray-500">Regular parcel</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-5 text-center text-sm font-medium">
                    Up to 3kg
                  </td>

                  <td className="px-5 py-5 text-center">
                    <span className="rounded-full bg-green-100 px-4 py-2 font-bold text-green-700">
                      ৳110
                    </span>
                  </td>

                  <td className="px-5 py-5 text-center">
                    <span className="rounded-full bg-blue-100 px-4 py-2 font-bold text-blue-700">
                      ৳150
                    </span>
                  </td>
                </tr>

                {/* Non Document Above 3kg */}
                <tr className="bg-base-100 transition-colors hover:bg-gray-50">
                  <td className="px-5 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                        <FaWeightHanging />
                      </div>

                      <div>
                        <p className="font-bold text-[#03373d]">Non-Document</p>
                        <p className="text-xs text-gray-500">Heavy parcel</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-5 text-center text-sm font-medium">
                    &gt; 3kg
                  </td>

                  <td className="px-5 py-5 text-center">
                    <span className="rounded-full bg-orange-100 px-4 py-2 font-bold text-orange-700">
                      +৳40/kg
                    </span>
                  </td>

                  <td className="px-5 py-5 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="rounded-full bg-orange-100 px-4 py-2 font-bold text-orange-700">
                        +৳40/kg
                      </span>

                      <span className="text-xs font-medium text-gray-500">
                        +৳40 extra
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ================= How Pricing Works ================= */}
        <div className="mt-12 rounded-2xl bg-[#03373d] p-6 text-white sm:p-8 lg:p-10">
          <div className="mb-8 text-center">
            <h3 className="text-2xl font-bold sm:text-3xl">
              How Your Delivery Charge Works
            </h3>

            <p className="mt-2 text-sm leading-6 text-white/70 sm:text-base">
              Your final delivery charge depends on three simple factors.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Step 1 */}
            <div className="rounded-xl bg-white/10 p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#CAEB66] text-xl font-bold text-[#03373d]">
                01
              </div>

              <h4 className="mb-2 text-lg font-bold">Select Parcel Type</h4>

              <p className="text-sm leading-6 text-white/70">
                Choose whether your shipment is a document or a non-document
                parcel.
              </p>
            </div>

            {/* Step 2 */}
            <div className="rounded-xl bg-white/10 p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#CAEB66] text-xl font-bold text-[#03373d]">
                02
              </div>

              <h4 className="mb-2 text-lg font-bold">Check Parcel Weight</h4>

              <p className="text-sm leading-6 text-white/70">
                Non-document parcels up to 3kg have a fixed price. Parcels above
                3kg include an additional weight charge.
              </p>
            </div>

            {/* Step 3 */}
            <div className="rounded-xl bg-white/10 p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#CAEB66] text-xl font-bold text-[#03373d]">
                03
              </div>

              <h4 className="mb-2 text-lg font-bold">Choose Destination</h4>

              <p className="text-sm leading-6 text-white/70">
                Delivery within the city has a lower charge, while outside-city
                or district delivery has an additional charge.
              </p>
            </div>
          </div>
        </div>

        {/* ================= Examples ================= */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Example 1 */}
          <div className="rounded-2xl border border-gray-200 bg-base-100 p-6 shadow-md">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-600">
                <MdLocationOn className="text-xl" />
              </div>

              <div>
                <h4 className="font-bold text-[#03373d]">
                  Within City Example
                </h4>

                <p className="text-xs text-gray-500">Non-document parcel</p>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b pb-3">
                <span className="text-gray-600">Parcel weight</span>

                <span className="font-semibold">Up to 3kg</span>
              </div>

              <div className="flex justify-between border-b pb-3">
                <span className="text-gray-600">Delivery location</span>

                <span className="font-semibold">Within City</span>
              </div>

              <div className="flex justify-between pt-1">
                <span className="font-bold text-[#03373d]">
                  Delivery Charge
                </span>

                <span className="text-xl font-bold text-green-600">৳110</span>
              </div>
            </div>
          </div>

          {/* Example 2 */}
          <div className="rounded-2xl border border-gray-200 bg-base-100 p-6 shadow-md">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                <FaWeightHanging className="text-xl" />
              </div>

              <div>
                <h4 className="font-bold text-[#03373d]">
                  Extra Weight Example
                </h4>

                <p className="text-xs text-gray-500">
                  Non-document parcel above 3kg
                </p>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b pb-3">
                <span className="text-gray-600">Base weight</span>

                <span className="font-semibold">3kg</span>
              </div>

              <div className="flex justify-between border-b pb-3">
                <span className="text-gray-600">Extra weight charge</span>

                <span className="font-semibold">+৳40 / kg</span>
              </div>

              <div className="flex justify-between pt-1">
                <span className="font-bold text-[#03373d]">Outside City</span>

                <span className="font-bold text-orange-600">+৳40 extra</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= Important Information ================= */}
        <div className="mt-8 flex items-start gap-4 rounded-2xl border border-[#CAEB66] bg-[#CAEB66]/20 p-5 sm:p-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#CAEB66] text-[#03373d]">
            <FiInfo className="text-xl" />
          </div>

          <div>
            <h4 className="mb-1 font-bold text-[#03373d]">
              Important Pricing Information
            </h4>

            <p className="text-sm leading-6 text-gray-700">
              Document delivery is charged at a fixed rate regardless of weight.
              Non-document parcels up to 3kg follow the standard pricing. For
              parcels above 3kg, an additional ৳40 per kg applies. Outside
              City/District delivery also includes the applicable additional ৳40
              charge.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
