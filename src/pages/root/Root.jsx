import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

function Root() {
  return (
    <div>
      <Navbar />
      {/* <Sidebar className="hidden md:flex" /> */}
      <Outlet />
    </div>
  );
}

export default Root;
