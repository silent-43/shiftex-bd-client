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
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-4xl md:text-5xl font-bold">
          Pending Parcel Pickup : {parcels.length}
        </h2>

        <Link
          to="/dashboard/rejected-deliveries"
          className="btn btn-error text-white"
        >
          View Rejected Deliveries
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Confirm</th>
              <th>Other Actions</th>
            </tr>
          </thead>

          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>

                <td>{parcel.parcelName}</td>

                {/* Confirm */}
                {/* Confirm */}
                <td>
                  {parcel.deliveryStatus === "rider_rejected" ? (
                    <span className="badge badge-error text-white p-3">
                      Rejected
                    </span>
                  ) : [
                      "rider_arriving",
                      "parcel_picked_up",
                      "parcel_delivered",
                    ].includes(parcel.deliveryStatus) ? (
                    <span className="badge badge-success text-white p-3">
                      Accepted
                    </span>
                  ) : (
                    <>
                      <button
                        onClick={() =>
                          handleDeliveryStatusUpdate(parcel, "rider_arriving")
                        }
                        className="btn btn-primary text-black"
                      >
                        Accept
                      </button>

                      <button
                        onClick={() =>
                          handleDeliveryStatusUpdate(parcel, "rider_rejected")
                        }
                        className="btn btn-warning ms-2 text-black"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
                {/* Other Actions - আগের functionality */}
                <td>
                  {parcel.deliveryStatus === "rider_rejected" ? (
                    <Link
                      to="/dashboard/rejected-deliveries"
                      className="btn btn-error text-white"
                    >
                      View Rejected
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={() =>
                          handleDeliveryStatusUpdate(parcel, "parcel_picked_up")
                        }
                        className="btn btn-primary text-black"
                      >
                        Marked as Picked Up
                      </button>

                      <button
                        onClick={() =>
                          handleDeliveryStatusUpdate(parcel, "parcel_delivered")
                        }
                        className="btn btn-primary text-black mx-2"
                      >
                        Marked as Delivered
                      </button>
                    </>
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
