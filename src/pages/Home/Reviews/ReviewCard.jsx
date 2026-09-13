import React from "react";
import { FaQuoteRight } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  const { userName, review: testimonial, user_photoURL } = review;
  return (
    <div className="mx-auto w-full max-w-md rounded-3xl bg-[#f8dfe1] p-5">
      {/* Inner Card */}
      <div className="rounded-2xl bg-[#fffafa] p-7">
        {/* Quote Icon */}
        <FaQuoteRight className="mb-5 text-4xl text-gray-300" />

        {/* Testimonial */}
        <p className="text-base leading-6 text-gray-600">{testimonial}</p>

        {/* Dashed Divider */}
        <div className="my-5 border-t-2 border-dashed border-gray-400"></div>

        {/* User Info */}
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="avatar placeholder">
            <div className="h-12 w-12 rounded-full bg-[#21474d] text-white">
              <span className="text-lg font-semibold">
                <img src={user_photoURL} alt="" />
              </span>
            </div>
          </div>

          {/* Name & Designation */}
          <div>
            <h3 className="text-lg font-bold text-[#123c42]">{userName}</h3>

            <p className="text-sm text-gray-500">Senior Product Designer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
