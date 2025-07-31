import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Filterbar from "../../components/Filterbar";

function Root() {
  return (
    <div className="flex h-screen">
      <Sidebar className="flex-shrink-0" />

      <div className="flex flex-col flex-1 min-w-0">
        <Navbar className="z-10" />
        <Filterbar className="z-10" />
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Root;
