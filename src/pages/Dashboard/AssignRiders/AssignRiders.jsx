import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AssignRiders = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const riderModalRef = useRef();
  const [selectedParcel, setSelectedParcel] = useState(null);

  // Get pending pickup parcels
  const { data: parcels = [], refetch: parcelsRefetch } = useQuery({
    queryKey: ["parcels", "pending_pickup"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels?deliveryStatus=pending_pickup",
      );

      return res.data;
    },
  });

  // Get available riders based on parcel pickup district
  const { data: riders = [] } = useQuery({
    queryKey: ["riders", selectedParcel?.senderDistrict, "available"],
    enabled: !!selectedParcel?.senderDistrict,

    queryFn: async () => {
      console.log("Pickup District:", selectedParcel?.senderDistrict);

      const res = await axiosSecure.get(
        `/riders?status=approved&district=${selectedParcel.senderDistrict}&workStatus=available`,
      );

      console.log("Available Riders:", res.data);

      return res.data;
    },
  });

  // Open rider assignment modal
  const openAssignRiderModal = (parcel) => {
    console.log("Selected Parcel:", parcel);

    setSelectedParcel(parcel);

    riderModalRef.current.showModal();
  };

  // Assign selected rider to parcel
  const handleAssignRider = (rider) => {
    if (!selectedParcel) {
      return;
    }

    const riderAssignInfo = {
      riderId: rider._id,
      riderName: rider.riderName,
      riderEmail: rider.riderEmail,
      parcelId: selectedParcel._id,
      trackingId: selectedParcel.trackingId,
    };

    console.log("Assigning Rider:", riderAssignInfo);

    axiosSecure
      .patch(`/parcels/${selectedParcel._id}`, riderAssignInfo)
      .then((res) => {
        console.log("Assign Rider Response:", res.data);

        if (res.data?.result?.modifiedCount > 0) {
          riderModalRef.current.close();

          // Refresh pending parcels
          parcelsRefetch();

          // Refresh available riders
          queryClient.invalidateQueries({
            queryKey: ["riders", selectedParcel.senderDistrict, "available"],
          });

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Rider has been Assigned",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: "warning",
            title: "Assignment Failed",
            text: "The rider could not be assigned.",
          });
        }
      })
      .catch((error) => {
        console.error("Assign Rider Error:", error);

        Swal.fire({
          icon: "error",
          title: "Something went wrong",
          text: "Failed to assign rider.",
        });
      });
  };

  return (
    <div>
      <h2 className="text-5xl mb-6">Assign Riders : {parcels.length}</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Cost</th>
              <th>Created At</th>
              <th>Pickup District</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>

                <td>{parcel.parcelName}</td>

                <td>{parcel.cost}</td>

                <td>{parcel.createdAt}</td>

                <td>{parcel.senderDistrict}</td>

                <td>
                  <button
                    onClick={() => openAssignRiderModal(parcel)}
                    className="btn btn-primary text-black"
                  >
                    Find Riders
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Rider Assignment Modal */}
      <dialog
        ref={riderModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Riders : {riders.length}</h3>

          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {riders.map((rider, index) => (
                  <tr key={rider._id}>
                    <th>{index + 1}</th>

                    <td>{rider.riderName}</td>

                    <td>{rider.riderEmail}</td>

                    <td>
                      <button
                        onClick={() => handleAssignRider(rider)}
                        className="btn btn-primary text-black"
                      >
                        Assign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignRiders;
