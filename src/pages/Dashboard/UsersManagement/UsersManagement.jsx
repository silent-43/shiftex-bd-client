import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUserShield } from "react-icons/fa";
import { FiShieldOff, FiX, FiArrowRight } from "react-icons/fi";
import Swal from "sweetalert2";

const UsersManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");
  const [showAdminModal, setShowAdminModal] = useState(false);

  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users", searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchText=${searchText}`);
      return res.data;
    },
  });

  // Admin users
  const adminUsers = users.filter((user) => user.role === "admin");

  const handleMakeAdmin = (user) => {
    const roleInfo = { role: "admin" };

    Swal.fire({
      title: "Are you sure?",
      text: `You want to make ${user.displayName} as an Admin?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#03373d",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make Admin",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
          console.log(res.data);

          if (res.data.modifiedCount) {
            refetch();

            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${user.displayName} Marked as an Admin`,
              showConfirmButton: false,
              timer: 2500,
            });
          }
        });
      }
    });
  };

  const handleRemoveAdmin = (user) => {
    const roleInfo = { role: "user" };

    Swal.fire({
      title: "Are you sure?",
      text: `You want to Remove ${user.displayName} from Admin?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#03373d",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove from Admin",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
          console.log(res.data);

          if (res.data.modifiedCount) {
            refetch();

            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${user.displayName} Removed from Admin`,
              showConfirmButton: false,
              timer: 2500,
            });
          }
        });
      }
    });
  };

  return (
    <div className="p-4 md:p-6">
      {/* ================= HEADER ================= */}
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-secondary md:text-4xl">
          Users Management
        </h2>

        <p className="mt-2 text-md text-black">
          Manage all registered users and their roles
        </p>

        <div className="mt-2">
          <span className="badge badge-primary badge-lg font-bold text-black">
            Total Users: {users.length}
          </span>
        </div>
      </div>

      {/* ================= ADMIN INFO ================= */}
      <div className="mb-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        {/* Admin Count */}
        <div className="flex items-center gap-3 rounded-full border border-base-300 bg-base-100 px-5 py-3 shadow-sm">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-primary">
            <FaUserShield />
          </div>

          <div className="text-left">
            <p className="text-xs font-medium text-gray-500">
              Total Administrators
            </p>

            <p className="text-lg font-bold text-secondary">
              {adminUsers.length}
            </p>
          </div>
        </div>

        {/* View Administrators Button */}
        <button
          type="button"
          onClick={() => setShowAdminModal(true)}
          className="group btn rounded-full border-none bg-secondary px-5 text-white shadow-md transition-all duration-300 hover:bg-secondary hover:shadow-lg"
        >
          <FaUserShield className="text-primary transition-transform duration-300 group-hover:scale-110" />

          <span>View Administrators</span>

          <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>

      {/* ================= SEARCH ================= */}
      <div className="mb-6 flex justify-center">
        <label className="input input-bordered flex w-full max-w-md items-center gap-2 rounded-full shadow-sm">
          <svg
            className="h-5 w-5 opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>

          <input
            onChange={(e) => setSearchText(e.target.value)}
            type="search"
            className="grow"
            placeholder="Search user"
          />
        </label>
      </div>

      {/* ================= TABLE CARD ================= */}
      <div className="overflow-x-auto rounded-2xl border border-base-200 bg-base-100 shadow-md">
        <table className="table">
          {/* Head */}
          <thead className="bg-secondary text-white">
            <tr>
              <th>No</th>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Admin Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className="transition-colors hover:bg-base-200"
              >
                <td className="font-medium">{index + 1}</td>

                {/* User */}
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={user.photoURL} alt={user.displayName} />
                      </div>
                    </div>

                    <div>
                      <div className="font-semibold">{user.displayName}</div>
                    </div>
                  </div>
                </td>

                {/* Email */}
                <td className="text-sm">{user.email}</td>

                {/* Role */}
                <td>
                  {user.role === "admin" ? (
                    <span className="badge badge-secondary">Admin</span>
                  ) : (
                    <span className="badge badge-ghost">User</span>
                  )}
                </td>

                {/* Admin Action */}
                <td>
                  {user.role === "admin" ? (
                    <button
                      onClick={() => handleRemoveAdmin(user)}
                      className="btn btn-sm border-none bg-red-400 text-white hover:bg-red-500"
                      title="Remove Admin"
                    >
                      <FiShieldOff />
                      Remove Admin
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn btn-sm border-none bg-green-400 text-white hover:bg-green-500"
                      title="Make Admin"
                    >
                      <FaUserShield />
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= ADMIN LIST MODAL ================= */}
      {showAdminModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={() => setShowAdminModal(false)}
        >
          <div
            className="w-full max-w-2xl overflow-hidden rounded-2xl bg-base-100 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between bg-secondary px-5 py-4 text-white sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-secondary">
                  <FaUserShield className="text-lg" />
                </div>

                <div>
                  <h3 className="text-lg font-bold sm:text-xl">
                    Administrator List
                  </h3>

                  <p className="text-xs text-white/70 sm:text-sm">
                    {adminUsers.length}{" "}
                    {adminUsers.length === 1
                      ? "administrator"
                      : "administrators"}{" "}
                    found
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowAdminModal(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:rotate-90 hover:bg-white/20"
                aria-label="Close modal"
              >
                <FiX className="text-lg" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="max-h-[65vh] overflow-y-auto p-4 sm:p-6">
              {adminUsers.length === 0 ? (
                <div className="py-10 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-base-200 text-2xl text-gray-400">
                    <FaUserShield />
                  </div>

                  <h4 className="font-semibold text-gray-600">
                    No Administrators Found
                  </h4>

                  <p className="mt-1 text-sm text-gray-400">
                    There are currently no administrators.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {adminUsers.map((admin, index) => (
                    <div
                      key={admin._id}
                      className="flex items-center gap-3 rounded-xl border border-base-200 bg-base-200/40 p-4 transition-all duration-300 hover:border-primary hover:bg-base-100 hover:shadow-md"
                    >
                      {/* Avatar */}
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          {admin.photoURL ? (
                            <img src={admin.photoURL} alt={admin.displayName} />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-primary font-bold text-secondary">
                              {admin.displayName?.charAt(0)?.toUpperCase() ||
                                "A"}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Admin Info */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="truncate font-bold text-secondary">
                            {admin.displayName || "Unnamed Admin"}
                          </p>

                          <span className="badge badge-secondary badge-xs hidden sm:inline-flex">
                            Admin
                          </span>
                        </div>

                        <p className="mt-1 truncate text-xs text-gray-500">
                          {admin.email || "No email available"}
                        </p>
                      </div>

                      {/* Number */}
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary text-xs font-bold text-secondary">
                        {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end border-t border-base-200 bg-base-200/40 px-4 py-3 sm:px-6">
              <button
                type="button"
                onClick={() => setShowAdminModal(false)}
                className="btn btn-sm bg-secondary text-white hover:bg-secondary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersManagement;
