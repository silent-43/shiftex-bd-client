import React from "react";
import {
  FaEnvelope,
  FaUser,
  FaUserShield,
  FaPhone,
  FaCalendarAlt,
  FaClock,
  FaIdCard,
  FaCheckCircle,
  FaTruck,
  FaBoxOpen,
  FaShieldAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import { MdVerifiedUser } from "react-icons/md";

const MyProfile = () => {
  const { user, logOut } = useAuth();
  const { role } = useRole();

  const displayName = user?.displayName || "Not Available";
  const email = user?.email || "Not Available";
  const photoURL = user?.photoURL;

  const formattedRole =
    role?.charAt(0).toUpperCase() + role?.slice(1) || "User";

  // Format Firebase dates
  const formatDate = (date) => {
    if (!date) return "Not Available";

    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateTime = (date) => {
    if (!date) return "Not Available";

    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const getRoleDescription = () => {
    if (role === "admin") {
      return "You have administrative access to manage and monitor the ShiftexBD platform.";
    }

    if (role === "rider") {
      return "You are a ShiftexBD delivery rider responsible for parcel pickup and delivery.";
    }

    return "You are a ShiftexBD customer who can book, manage, pay for and track parcels.";
  };

  // Logout Handler
  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from your ShiftexBD account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#03373d",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await logOut();

      await Swal.fire({
        icon: "success",
        title: "Logged Out",
        text: "You have been successfully logged out.",
        timer: 1500,
        showConfirmButton: false,
      });

      // Go to Homepage
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);

      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: "Something went wrong while logging out.",
        confirmButtonColor: "#03373d",
      });
    }
  };

  return (
    <div className="min-h-full py-4 md:py-6">
      {/* Page Header */}
      <div className="mb-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-secondary">
          My Profile
        </h2>

        <p className="text-gray-500 mt-2 text-base md:text-lg">
          Manage and view your personal account information
        </p>
      </div>

      {/* Main Profile Card */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-base-100 rounded-3xl shadow-xl overflow-hidden border border-base-200">
          {/* Cover Section */}
          <div className="h-44 md:h-60 relative overflow-hidden bg-secondary">
            {/* Background Decoration */}
            <div className="absolute -top-24 -right-20 w-80 h-80 rounded-full bg-primary opacity-20"></div>

            <div className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-blue-400 opacity-10"></div>

            <div className="absolute top-10 left-1/2 w-40 h-40 rounded-full bg-primary opacity-10 blur-3xl"></div>

            {/* Cover Content */}
            <div className="relative z-10 h-full flex items-center justify-center">
              <div className="text-center text-white">
                <h3 className="text-2xl md:text-3xl font-bold">
                  Welcome to ShiftexBD
                </h3>

                <p className="mt-2 text-white/70">Your account information</p>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="px-5 md:px-10 pb-10">
            {/* Profile Image */}
            <div className="-mt-20 md:-mt-24 relative z-20">
              <div className="relative inline-block">
                <div className="avatar">
                  <div className="w-36 h-36 md:w-48 md:h-48 rounded-full ring-8 ring-base-100 shadow-2xl bg-base-200 overflow-hidden">
                    {photoURL ? (
                      <img
                        src={photoURL}
                        alt={displayName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-base-200">
                        <FaUser className="text-6xl md:text-7xl text-gray-400" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Online Indicator */}
                <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 w-7 h-7 rounded-full bg-green-500 border-4 border-base-100 shadow-md"></div>
              </div>
            </div>

            {/* Name + Role */}
            <div className="mt-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-secondary">
                  {displayName}
                </h1>

                <div className="flex items-center gap-2 mt-3 text-gray-500">
                  <FaEnvelope className="text-secondary" />
                  <span className="break-all">{email}</span>
                </div>
              </div>

              {/* Role Badge */}
              <div>
                <span className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary text-secondary font-bold text-lg shadow-md">
                  {role === "rider" ? (
                    <FaTruck />
                  ) : role === "admin" ? (
                    <FaShieldAlt />
                  ) : (
                    <FaUserShield />
                  )}

                  {formattedRole}
                </span>
              </div>
            </div>

            {/* Profile Summary */}
            <div className="mt-8 p-6 rounded-2xl bg-secondary text-white relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-primary opacity-10"></div>

              <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-5">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-primary text-secondary flex items-center justify-center">
                  {role === "rider" ? (
                    <FaTruck className="text-2xl" />
                  ) : role === "admin" ? (
                    <FaShieldAlt className="text-2xl" />
                  ) : (
                    <FaBoxOpen className="text-2xl" />
                  )}
                </div>

                <div>
                  <p className="text-primary font-semibold text-lg">
                    {formattedRole} Account
                  </p>

                  <p className="text-white/70 mt-1 text-sm md:text-base">
                    {getRoleDescription()}
                  </p>
                </div>
              </div>
            </div>

            {/* Account Details */}
            <div className="mt-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-8 rounded-full bg-primary"></div>

                <h3 className="text-2xl md:text-3xl font-bold text-secondary">
                  Account Details
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="group flex items-center gap-4 p-5 rounded-2xl bg-base-200 border border-transparent hover:border-primary transition-all duration-300">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-pink-100 text-pink-600 group-hover:scale-105 transition-transform">
                    <FaUser className="text-xl" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm text-gray-500">Full Name</p>

                    <p className="font-semibold text-lg break-words">
                      {displayName}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="group flex items-center gap-4 p-5 rounded-2xl bg-base-200 border border-transparent hover:border-primary transition-all duration-300">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 group-hover:scale-105 transition-transform">
                    <FaEnvelope className="text-xl" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm text-gray-500">Email Address</p>

                    <p className="font-semibold text-lg break-all">{email}</p>
                  </div>
                </div>

                {/* Role */}
                <div className="group flex items-center gap-4 p-5 rounded-2xl bg-base-200 border border-transparent hover:border-primary transition-all duration-300">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-purple-100 text-purple-600 group-hover:scale-105 transition-transform">
                    <MdVerifiedUser className="text-2xl" />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Account Role</p>

                    <p className="font-semibold text-lg">{formattedRole}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="group flex items-center gap-4 p-5 rounded-2xl bg-base-200 border border-transparent hover:border-primary transition-all duration-300">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-600 group-hover:scale-105 transition-transform">
                    <FaPhone className="text-xl" />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Phone Number</p>

                    <p className="font-semibold text-lg">
                      {user?.phoneNumber || "Not Available"}
                    </p>
                  </div>
                </div>

                {/* User ID */}
                <div className="group flex items-center gap-4 p-5 rounded-2xl bg-base-200 border border-transparent hover:border-primary transition-all duration-300">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 group-hover:scale-105 transition-transform">
                    <FaIdCard className="text-xl" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm text-gray-500">User ID</p>

                    <p className="font-semibold text-sm break-all">
                      {user?.uid || "Not Available"}
                    </p>
                  </div>
                </div>

                {/* Account Created */}
                <div className="group flex items-center gap-4 p-5 rounded-2xl bg-base-200 border border-transparent hover:border-primary transition-all duration-300">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-600 group-hover:scale-105 transition-transform">
                    <FaCalendarAlt className="text-xl" />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Account Created</p>

                    <p className="font-semibold text-lg">
                      {formatDate(user?.metadata?.creationTime)}
                    </p>
                  </div>
                </div>

                {/* Last Sign In */}
                <div className="group flex items-center gap-4 p-5 rounded-2xl bg-base-200 border border-transparent hover:border-primary transition-all duration-300">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 group-hover:scale-105 transition-transform">
                    <FaClock className="text-xl" />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Last Sign In</p>

                    <p className="font-semibold text-lg">
                      {formatDateTime(user?.metadata?.lastSignInTime)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Status */}
            <div className="mt-8 p-6 rounded-2xl border border-green-200 bg-green-50">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-600">
                  <FaCheckCircle className="text-2xl" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-green-500"></span>

                    <p className="font-bold text-green-700 text-lg">
                      Account Active
                    </p>
                  </div>

                  <p className="text-sm text-green-600 mt-1">
                    Your ShiftexBD account is active and ready to use.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {/* Account Type */}
              <div className="text-center p-5 rounded-2xl bg-base-200">
                <FaUser className="mx-auto text-2xl text-secondary mb-2" />

                <p className="text-sm text-gray-500">Account Type</p>

                <p className="font-bold text-lg">{formattedRole}</p>
              </div>

              {/* ShiftexBD Access */}
              <div className="text-center p-5 rounded-2xl bg-base-200">
                {role === "rider" ? (
                  <FaTruck className="mx-auto text-2xl text-secondary mb-2" />
                ) : role === "admin" ? (
                  <FaShieldAlt className="mx-auto text-2xl text-secondary mb-2" />
                ) : (
                  <FaBoxOpen className="mx-auto text-2xl text-secondary mb-2" />
                )}

                <p className="text-sm text-gray-500">ShiftexBD Access</p>

                <p className="font-bold text-lg">{formattedRole}</p>
              </div>
            </div>

            {/* Logout Button */}
            <div className="mt-10 flex justify-center">
              <button
                onClick={handleLogout}
                className="btn btn-error text-white px-8 md:px-12 rounded-xl shadow-lg hover:scale-105 transition-all duration-300"
              >
                <FaSignOutAlt className="text-lg" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
