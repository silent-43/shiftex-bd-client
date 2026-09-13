import React from "react";
import { FaArrowRight } from "react-icons/fa";
import locationMerchant from "../../../assets/location-merchant.png";

const MerchantCustomerSection = () => {
  return (
    <section className="mt-20 overflow-hidden rounded-[28px] bg-secondary shadow-[0_-10px_20px_rgba(0,0,0,0.15),0_10px_20px_rgba(0,0,0,0.15)]">
      <div className="flex min-h-[320px] flex-col items-center lg:flex-row">
        {/* Left Content */}
        <div className="w-full px-8 py-10 lg:w-[55%] lg:px-14">
          <h2 className="max-w-xl text-3xl font-bold leading-tight text-white md:text-4xl">
            Merchant and Customer Satisfaction
            <br />
            is Our First Priority
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-6 text-gray-300 md:text-base">
            We offer the lowest delivery charge with the highest value along
            with 100% safety of your product. ShiftexBD delivers your parcels in
            every corner of Bangladesh right on time.
          </p>

          {/* Buttons */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="btn rounded-full border-none bg-primary px-6 text-secondary hover:bg-lime-light">
              Become a Merchant
            </button>

            <button className="btn rounded-full border border-primary bg-transparent px-6 text-primary hover:bg-primary hover:text-secondary">
              Earn with ShiftexBD
              <FaArrowRight className="text-sm" />
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex w-full items-end justify-center px-8 pt-4 lg:w-[45%] lg:px-5 lg:pt-0">
          <img
            src={locationMerchant}
            alt="ShiftexBD delivery service"
            className="h-[250px] w-full object-contain md:h-[280px]"
          />
        </div>
      </div>
    </section>
  );
};

export default MerchantCustomerSection;
