import React from "react";
import Logo from "../components/Logo/Logo";
import { Outlet } from "react-router";
import authImage from "../assets/authImage.png";

const AuthLayout = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Logo></Logo>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default AuthLayout;
