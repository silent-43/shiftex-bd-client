import React from "react";

import logo from "../../assets/logo.png";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link className="btn btn-ghost text-xl mt-2 mb-2" to="/">
      <div className="flex items-end">
        <img src={logo} alt="" />
        <h3 className="text-3xl font-bold -ms-2.5">ShiftexBD</h3>
      </div>
    </Link>
  );
};

export default Logo;
