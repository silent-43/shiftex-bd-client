import React from "react";
import { CiDeliveryTruck } from "react-icons/ci";

const CardSection = () => {
  return (
    <div className="mt-10">
      {/* Section Title */}
      <h2 className="mb-6 ml-4 text-2xl font-bold">How It Works</h2>

      {/* Cards */}
      <div className="grid grid-cols-4 gap-5">
        {/* Card 1 */}
        <div className="group card bg-base-300 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:bg-[#60A5FA] hover:shadow-xl">
          <div className="card-body">
            {/* Logo */}
            <div className="mb-2">
              <CiDeliveryTruck className="h-12 w-12 transition-all duration-300 group-hover:scale-110 group-hover:text-white" />
            </div>

            {/* Title */}
            <h2 className="card-title transition-colors duration-300 group-hover:text-white">
              Booking Pick & Drop
            </h2>

            {/* Paragraph */}
            <p className="transition-colors duration-300 group-hover:text-white">
              Easily book a parcel pickup and drop-off by providing the
              necessary delivery details. Our system ensures your parcel is
              picked up and delivered safely to the destination.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="group card bg-base-300 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:bg-[#60A5FA] hover:shadow-xl">
          <div className="card-body">
            <div className="mb-2">
              <CiDeliveryTruck className="h-12 w-12 transition-all duration-300 group-hover:scale-110 group-hover:text-white" />
            </div>

            <h2 className="card-title transition-colors duration-300 group-hover:text-white">
              Cash On Delivery
            </h2>

            <p className="transition-colors duration-300 group-hover:text-white">
              Send parcels with a convenient Cash on Delivery option. Customers
              can pay the required amount when the parcel is successfully
              delivered to them.
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="group card bg-base-300 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:bg-[#60A5FA] hover:shadow-xl">
          <div className="card-body">
            <div className="mb-2">
              <CiDeliveryTruck className="h-12 w-12 transition-all duration-300 group-hover:scale-110 group-hover:text-white" />
            </div>

            <h2 className="card-title transition-colors duration-300 group-hover:text-white">
              Delivery Hub
            </h2>

            <p className="transition-colors duration-300 group-hover:text-white">
              Our delivery hubs help organize, manage, and transfer parcels
              efficiently between different locations for faster and more
              reliable delivery.
            </p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="group card bg-base-300 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:bg-[#073ff6] hover:shadow-xl">
          <div className="card-body">
            <div className="mb-2">
              <CiDeliveryTruck className="h-12 w-12 transition-all duration-300 group-hover:scale-110 group-hover:text-white" />
            </div>

            <h2 className="card-title transition-colors duration-300 group-hover:text-white">
              Booking SME & Corporate
            </h2>

            <p className="transition-colors duration-300 group-hover:text-white">
              Businesses can easily manage regular parcel deliveries with
              dedicated SME and corporate booking services designed for reliable
              and efficient logistics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSection;
