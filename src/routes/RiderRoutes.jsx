import React from "react";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Loading from "../components/Loading/Loading";
import Forbidden from "../components/Forbidden/Forbidden";

const RiderRoutes = ({ children }) => {
  const { loading, user } = useAuth();
  const { role, roleLoading } = useRole();

  console.log("Auth loading:", loading);
  console.log("Role loading:", roleLoading);
  console.log("Role:", role);

  if (loading || !user || roleLoading) {
    return <Loading></Loading>;
  }

  if (role !== "rider") {
    return <Forbidden></Forbidden>;
  }

  return children;
};

export default RiderRoutes;
