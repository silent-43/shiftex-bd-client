import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUserShield } from "react-icons/fa";
import { FiShieldOff } from "react-icons/fi";
import Swal from "sweetalert2";

const UsersManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");

  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users", searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchText=${searchText}`);
      return res.data;
    },
  });

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
      {/* Header */}
      <div className="mb-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-secondary">
          Users Management
        </h2>

        <p className="mt-2 text-md text-black">
          Manage all registered users and their roles
        </p>

        <div className="mt-2">
          <span className="badge badge-primary text-black font-bold badge-lg">
            Total Users: {users.length}
          </span>
        </div>
      </div>

      {/* Search */}
      <div className="flex justify-center mb-6">
        <label className="input input-bordered w-full max-w-md flex items-center gap-2 rounded-full shadow-sm">
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

      {/* Table Card */}
      <div className="overflow-x-auto rounded-2xl bg-base-100 shadow-md border border-base-200">
        <table className="table">
          {/* Head */}
          <thead className="bg-secondary text-white">
            <tr>
              <th>No</th>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Admin Action</th>
              <th>Other Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className="hover:bg-base-200 transition-colors"
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
                      className="btn btn-sm bg-red-400 hover:bg-red-500 text-white border-none"
                      title="Remove Admin"
                    >
                      <FiShieldOff />
                      Remove Admin
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn btn-sm bg-green-400 hover:bg-green-500 text-white border-none"
                      title="Make Admin"
                    >
                      <FaUserShield />
                      Make Admin
                    </button>
                  )}
                </td>

                {/* Other Action */}
                <td>
                  <button className="btn btn-sm btn-outline">Actions</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersManagement;
