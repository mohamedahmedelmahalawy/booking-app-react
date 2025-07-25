import React from "react";
import { Outlet } from "react-router-dom";

function Root() {
  return (
    <>
      <nav>Nav</nav>
      <Outlet />
    </>
  );
}

export default Root;
