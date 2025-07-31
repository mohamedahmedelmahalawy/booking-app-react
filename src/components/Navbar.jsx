import React, { useState, useEffect, useRef } from "react";
import NavbarBg from "../assets/images/navbagbg.jpg";
import { MdLocalHotel } from "react-icons/md";
import { MdOutlineVilla } from "react-icons/md";
import { FaTaxi } from "react-icons/fa6";
import { FaPlaneDeparture } from "react-icons/fa";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import Filterbar from "./Filterbar";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUser,
  selectIsAuthenticated,
  logoutUser,
} from "../store/authSlice";
import Logo from "../assets/images/Logo.svg";

function Navbar({ className }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/login");
      setIsDropdownOpen(false);
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav
      className={`relative flex flex-col justify-center w-full h-[325px] ${className}`}
      style={{
        backgroundImage: `url(${NavbarBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="top-8 right-10 absolute flex justify-between gap-4 w-full">
        <figure className="px-3 pl-20 w-48">
          <Link to="/">
            <img src={Logo} alt="" className="w-full h-full object-cover" />
          </Link>
        </figure>

        <div className="relative" ref={dropdownRef}>
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-2 text-shadow-md text-shadow-zinc-600 font-medium text-white hover:text-green-400 duration-150"
              >
                <FaUser className="text-lg" />
                <span>{user?.name || user?.email}</span>
                <MdKeyboardArrowDown
                  className={`text-lg transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isDropdownOpen && (
                <div className="right-0 z-50 absolute bg-white shadow-lg mt-2 border border-gray-200 rounded-lg w-48">
                  <div className="py-2">
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 hover:bg-gray-100 px-4 py-2 text-gray-700 transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <FaUser className="text-sm" />
                      <span>Profile</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 hover:bg-gray-100 px-4 py-2 w-full text-gray-700 transition-colors"
                    >
                      <FaSignOutAlt className="text-sm" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-4">
              <Link
                to="/login"
                className="text-shadow-md text-shadow-zinc-600 font-medium text-white hover:text-green-400 duration-150"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-shadow-md text-shadow-zinc-600 font-medium text-white hover:text-green-400 duration-150"
              >
                Signup
              </Link>
            </div>
          )}
        </div>
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
