import React from "react";
import {
  FaShippingFast,
  FaGlobeAsia,
  FaWarehouse,
  FaMoneyBillWave,
  FaBuilding,
  FaUndoAlt,
} from "react-icons/fa";

const cards = [
  {
    icon: <FaShippingFast />,
    title: "Express & Standard Delivery",
    description:
      "Choose express or standard delivery based on your needs and get your parcels delivered safely and reliably.",
  },
  {
    icon: <FaGlobeAsia />,
    title: "Nationwide Delivery",
    description:
      "Send parcels anywhere across Bangladesh with our nationwide delivery network covering cities and districts.",
  },
  {
    icon: <FaWarehouse />,
    title: "Fulfillment Solution",
    description:
      "Simplify your business operations with reliable storage, order processing, packaging, and delivery fulfillment services.",
  },
  {
    icon: <FaMoneyBillWave />,
    title: "Cash on Home Delivery",
    description:
      "Receive payments conveniently through Cash on Delivery while ensuring your customers get their parcels right at their doorstep.",
  },
  {
    icon: <FaBuilding />,
    title: "Corporate Service / Contract In Logistics",
    description:
      "Get customized logistics solutions for your business with dedicated corporate services and flexible delivery contracts.",
  },
  {
    icon: <FaUndoAlt />,
    title: "Parcel Return",
    description:
      "Enjoy a simple and convenient parcel return process for undelivered, rejected, or customer-returned packages.",
  },
];

const BigSectionCard = () => {
  return (
    <section className="mt-16 rounded-2xl bg-success py-24">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section Heading */}
        <div className="mb-14 text-center text-black">
          <h2 className="text-4xl font-bold ">Our Services</h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 opacity-80 font-bold">
            We provide fast, reliable, and secure parcel delivery solutions for
            individuals, small businesses, and corporate clients. From express
            and standard delivery to nationwide coverage, fulfillment,
            cash-on-delivery, corporate logistics, and easy parcel returns, we
            make every step of the delivery process simple and convenient.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 px-16 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => (
            <div
              key={index}
              className="group card bg-base-300 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:bg-[#0e5be9] hover:shadow-xl rounded-xl"
            >
              <div className="card-body items-center px-6 py-10 text-center">
                {/* Icon */}
                <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-secondary transition-all duration-300 group-hover:scale-110 group-hover:bg-secondary group-hover:text-primary">
                  <span className="text-3xl">{card.icon}</span>
                </div>

                {/* Title */}
                <h2 className="card-title transition-colors duration-300 group-hover:text-white">
                  {card.title}
                </h2>

                {/* Description */}
                <p className="text-sm leading-6 opacity-80 transition-colors duration-300 group-hover:text-white group-hover:opacity-100">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BigSectionCard;
