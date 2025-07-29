import React from "react";
import NavbarBg from "../assets/images/navbagbg.jpg";
import { MdLocalHotel } from "react-icons/md";

import { MdOutlineVilla } from "react-icons/md";
import { FaTaxi } from "react-icons/fa6";
import { FaPlaneDeparture } from "react-icons/fa";
import Filterbar from "./Filterbar";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      className="relative flex flex-col justify-center w-full h-[325px]"
      style={{
        backgroundImage: `url(${NavbarBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="top-8 right-10 absolute flex gap-4">
        <Link
          to="/login"
          className="text-shadow-md text-shadow-zinc-600 font-medium text-white hover:text-green-300 duration-150"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="text-shadow-md text-shadow-zinc-600 font-medium text-white hover:text-green-300 duration-150 zinc-600"
        >
          Signup
        </Link>
      </div>
      <ul className="bottom-10 left-[calc(50%-187.705px)] absolute flex justify-center items-center gap-8">
        <li className="flex flex-col items-center gap-2 hover:bg-green-800 p-4 rounded-2xl duration-200 ease-in-out">
          <MdLocalHotel className="text-white text-4xl" />

          <span className="font-medium text-white">Hotel</span>
        </li>
        <li className="flex flex-col items-center gap-2 hover:bg-green-800 p-4 rounded-2xl duration-200 ease-in-out">
          <MdOutlineVilla className="text-white text-4xl" />

          <span className="font-medium text-white">Villa</span>
        </li>
        <li className="flex flex-col items-center gap-2 hover:bg-green-800 p-4 rounded-2xl duration-200 ease-in-out">
          <FaTaxi className="text-white text-4xl" />

          <span className="font-medium text-white">Taxi</span>
        </li>
        <li className="flex flex-col items-center gap-2 hover:bg-green-800 p-4 rounded-2xl duration-200 ease-in-out">
          <FaPlaneDeparture className="text-white text-4xl" />
          <span className="font-medium text-white">Plane</span>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
