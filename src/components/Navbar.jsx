import React from "react";
import NavbarBg from "../assets/images/navbagbg.jpg";
import HotelIcon from "../assets/images/Background/Top/Navigation/Secondary/4-Tabs/Icon/Stay/Hotel.svg";
import VillaIcon from "../assets/images/Background/Top/Navigation/Secondary/4-Tabs/Icon/Stay/Villa.svg";
import TaxiIcon from "../assets/images/Background/Top/Navigation/Secondary/4-Tabs/Icon/Transport/Texi.svg";
import PlaneIcon from "../assets/images/Background/Top/Navigation/Secondary/4-Tabs/Icon/Transport/Plane.svg";
import Filterbar from "./Filterbar";

function Navbar() {
  return (
    <nav>
      <figure className="relative w-full h-72">
        <img
          src={NavbarBg}
          alt="navbar background"
          className="w-full h-full object-cover"
        />
        <ul className="bottom-0 md:bottom-10 left-[15%] md:left-[20%] absolute flex justify-center items-center gap-8">
          <li className="flex flex-col items-center gap-2 hover:bg-green-800 p-2 rounded-2xl duration-200 ease-in-out">
            <img src={HotelIcon} alt="HotelIcon" className="w-8" />
            <span className="font-medium text-white">Hotel</span>
          </li>
          <li className="flex flex-col items-center gap-2 hover:bg-green-800 p-2 rounded-2xl duration-200 ease-in-out">
            <img src={VillaIcon} alt="VillaIcon" className="w-8" />
            <span className="font-medium text-white">Villa</span>
          </li>
          <li className="flex flex-col items-center gap-2 hover:bg-green-800 p-2 rounded-2xl duration-200 ease-in-out">
            <img src={TaxiIcon} alt="TaxiIcon" className="w-8" />
            <span className="font-medium text-white">Taxi</span>
          </li>
          <li className="flex flex-col items-center gap-2 hover:bg-green-800 p-2 rounded-2xl duration-200 ease-in-out">
            <img src={PlaneIcon} alt="PlaneIcon" className="w-8" />
            <span className="font-medium text-white">Plane</span>
          </li>
        </ul>
      </figure>
      <Filterbar />
    </nav>
  );
}

export default Navbar;
