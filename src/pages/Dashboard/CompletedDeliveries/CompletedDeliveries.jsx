import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const CompletedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [] } = useQuery({
    queryKey: ["parcels", user?.email, "parcel_delivered"],
    enabled: !!user?.email,

    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user.email}&deliveryStatus=parcel_delivered`,
      );

      return res.data;
    },
  });

  const calculatePayout = (parcel) => {
    if (parcel.senderDistrict === parcel.receiverDistrict) {
      return parcel.cost * 0.7;
    } else {
      return parcel.cost * 0.9;
    }
  };

  return (
    <div>
      <h2 className="text-5xl">Completed Deliveries: {parcels.length}</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Parcel Name</th>
              <th>Parcel Created Time</th>
              <th>Parcel Pickup District</th>
              <th>Parcel Cost</th>
              <th>Your Payout</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>

                <td>{parcel.parcelName}</td>

                <td>{parcel.createdAt}</td>

                <td>{parcel.senderDistrict}</td>

                <td>{parcel.cost}</td>

                <td>{Math.round(calculatePayout(parcel))}</td>

                <td>
                  <button className="btn btn-primary text-black">
                    Cash Out
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompletedDeliveries;
