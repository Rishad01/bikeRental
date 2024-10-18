import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function Homepage() {
  const token = useSelector((state) => state.auth.token);
  const role = useSelector((state) => state.auth.role);
  return (
    <div>
      <Navbar role={role} />

      <Outlet />
    </div>
  );
}

export default Homepage;
