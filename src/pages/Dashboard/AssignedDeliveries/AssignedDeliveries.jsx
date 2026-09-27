import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AssignedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels", user?.email],
    enabled: !!user?.email,

    queryFn: async () => {
      console.log("Logged in user:", user);
      console.log("Rider email:", user.email);

      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user.email}`,
      );

      console.log("Rider API response:", res.data);

      return res.data;
    },
  });

  const handleDeliveryStatusUpdate = (parcel, status) => {
    const statusInfo = {
      deliveryStatus: status,
      riderId: parcel.riderId,
      trackingId: parcel.trackingId,
    };

    const message = `Parcel Status is updated with ${status
      .split("_")
      .join(" ")}`;

    axiosSecure
      .patch(`/parcels/${parcel._id}/status`, statusInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div className="w-full min-w-0">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
          Pending Parcel Pickup : {parcels.length}
        </h2>

        <Link
          to="/dashboard/rejected-deliveries"
          className="btn btn-error text-white w-full sm:w-auto shrink-0"
        >
          View Rejected Deliveries
        </Link>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto rounded-lg">
        <table className="table table-zebra min-w-[850px]">
          <thead>
            <tr>
              <th className="w-14">#</th>
              <th className="min-w-[180px]">Name</th>
              <th className="min-w-[230px]">Confirm</th>
              <th className="min-w-[400px]">Other Actions</th>
            </tr>
          </thead>

          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                {/* Serial */}
                <th>{index + 1}</th>

                {/* Parcel Name */}
                <td className="font-medium whitespace-nowrap">
                  {parcel.parcelName}
                </td>

                {/* Confirm */}
                <td>
                  {parcel.deliveryStatus === "rider_rejected" ? (
                    <span className="badge badge-error text-white p-3 whitespace-nowrap">
                      Rejected
                    </span>
                  ) : [
                      "rider_arriving",
                      "parcel_picked_up",
                      "parcel_delivered",
                    ].includes(parcel.deliveryStatus) ? (
                    <span className="badge badge-success text-white p-3 whitespace-nowrap">
                      Accepted
                    </span>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() =>
                          handleDeliveryStatusUpdate(parcel, "rider_arriving")
                        }
                        className="btn btn-primary btn-sm sm:btn-md text-black whitespace-nowrap"
                      >
                        Accept
                      </button>

                      <button
                        onClick={() =>
                          handleDeliveryStatusUpdate(parcel, "rider_rejected")
                        }
                        className="btn btn-warning btn-sm sm:btn-md text-black whitespace-nowrap"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>

                {/* Other Actions */}
                <td>
                  {parcel.deliveryStatus === "rider_rejected" ? (
                    <Link
                      to="/dashboard/rejected-deliveries"
                      className="btn btn-error btn-sm sm:btn-md text-white whitespace-nowrap"
                    >
                      View Rejected
                    </Link>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() =>
                          handleDeliveryStatusUpdate(parcel, "parcel_picked_up")
                        }
                        className="btn btn-primary btn-sm sm:btn-md text-black whitespace-nowrap"
                      >
                        Mark as Picked Up
                      </button>

                      <button
                        onClick={() =>
                          handleDeliveryStatusUpdate(parcel, "parcel_delivered")
                        }
                        className="btn btn-primary btn-sm sm:btn-md text-black whitespace-nowrap"
                      >
                        Mark as Delivered
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignedDeliveries;
