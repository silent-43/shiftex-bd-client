import React from "react";
import liveTrackingImg from "../../../assets/live-tracking.png";
import safeDeliveryImg from "../../../assets/safe-delivery.png";
import callcenterImg from "../../../assets/callCenter.png";

const VerticalSectionCard = () => {
  const cards = [
    {
      image: liveTrackingImg,
      title: "Live Parcel Tracking",
      description:
        "Track your parcel anytime with our live tracking system. Simply check your tracking information to see the current status and follow your parcel from the moment it is picked up until it reaches the recipient.",
      badge1: "Live Tracking",
      badge2: "Real-time",
    },
    {
      image: safeDeliveryImg,
      title: "100% Safe Delivery",
      description:
        "Your parcel is handled with care throughout the entire delivery process. We take proper safety measures from pickup to transportation and final delivery to make sure your package reaches its destination safely and securely.",
      badge1: "Safe Delivery",
      badge2: "Reliable",
    },
    {
      image: callcenterImg,
      title: "24/7 Call Center Support",
      description:
        "Our customer support team is available 24/7 to help you with any delivery-related questions or problems. Whether you need help tracking a parcel, updating delivery information, or resolving an issue, we are always ready to assist you.",
      badge1: "24/7 Support",
      badge2: "Customer Care",
    },
  ];

  return (
    <div className="mt-30 space-y-6 shadow-[0_-10px_20px_rgba(0,0,0,0.15),0_10px_20px_rgba(0,0,0,0.15)] rounded-2xl">
      {cards.map((card, index) => (
        <div
          key={index}
          className="card flex min-h-[240px] w-full flex-row overflow-hidden bg-base-100 shadow-sm"
        >
          {/* Image - 30% */}
          <figure className="flex w-[30%] items-center justify-center">
            <img
              src={card.image}
              alt={card.title}
              className="h-[200px] w-[195px] object-contain"
            />
          </figure>

          {/* Dashed Vertical Line */}
          <div className="my-6 border-l-2 border-dashed border-gray-300"></div>

          {/* Content - 70% */}
          <div className="flex w-[70%] items-center">
            <div className="card-body">
              <h2 className="card-title text-2xl font-bold">{card.title}</h2>

              <p className="mt-2 text-base leading-7 text-gray-600">
                {card.description}
              </p>

              <div className="card-actions mt-4">
                <div className="badge badge-outline">{card.badge1}</div>

                <div className="badge badge-outline">{card.badge2}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VerticalSectionCard;
