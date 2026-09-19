import axios from "axios";
import React from "react";

const axiosSecure = axios.create({
  baseURL: "https://shiftex-bd-server.onrender.com",
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
