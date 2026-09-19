import React from "react";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaBoxOpen, FaMapMarkedAlt, FaShieldAlt } from "react-icons/fa";

const DashboardHome = () => {
  return (
    <div className="p-5 md:p-8 bg-base-100 min-h-[calc(100vh-64px)]">
      {/* Welcome Section */}
      <div className="bg-secondary rounded-3xl p-6 md:p-10 text-white overflow-hidden">
        <div className="max-w-3xl">
          <p className="text-primary font-semibold mb-2">
            Welcome to ShiftexBD
          </p>

          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
            Moving Parcels. Connecting People.
          </h1>

          <p className="text-gray-200 text-base md:text-lg leading-7">
            Welcome to your ShiftexBD dashboard. Manage your parcels, track
            deliveries, check payment information, and stay updated with
            everything related to your delivery journey — all from one place.
          </p>
        </div>
      </div>

      {/* Dashboard Overview */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-secondary">
          Everything You Need in One Place
        </h2>

        <p className="text-gray-500 mt-2">
          Your dashboard makes parcel management simple, fast, and convenient.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
        {/* My Parcels */}
        <div className="card bg-base-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <div className="card-body">
            <CiDeliveryTruck className="text-4xl text-primary" />

            <h3 className="card-title text-secondary">Manage Your Parcels</h3>

            <p className="text-gray-500">
              View all your booked parcels, check their current status, and keep
              track of your delivery information easily.
            </p>
          </div>
        </div>

        {/* Tracking */}
        <div className="card bg-base-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <div className="card-body">
            <FaMapMarkedAlt className="text-3xl text-primary" />

            <h3 className="card-title text-secondary">Track Your Delivery</h3>

            <p className="text-gray-500">
              Follow your parcel journey and stay informed about where your
              package is and what is happening with your delivery.
            </p>
          </div>
        </div>

        {/* Secure */}
        <div className="card bg-base-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <div className="card-body">
            <FaShieldAlt className="text-3xl text-primary" />

            <h3 className="card-title text-secondary">Safe & Secure</h3>

            <p className="text-gray-500">
              ShiftexBD is designed to keep your parcel information organized
              and your delivery experience reliable and secure.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Information */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-primary rounded-2xl p-6 text-secondary">
          <FaBoxOpen className="text-3xl mb-3" />

          <h3 className="text-xl font-bold mb-2">Simple Parcel Management</h3>

          <p>
            From booking a parcel to completing the delivery, ShiftexBD keeps
            everything organized so you can manage your deliveries without
            unnecessary hassle.
          </p>
        </div>

        <div className="border border-base-300 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-secondary mb-2">
            Your Delivery, Your Dashboard
          </h3>

          <p className="text-gray-500 leading-7">
            Use the sidebar to explore your parcels and other dashboard
            features. As ShiftexBD grows, more tools and services will be
            available here to make your delivery experience even easier.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
