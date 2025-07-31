import { useState } from "react";
import { HomeIcon } from "@heroicons/react/16/solid";
import { FaAddressBook, FaUser, FaSignOutAlt } from "react-icons/fa";
import {
  MdContactSupport,
  MdTravelExplore,
  MdMenu,
  MdClose,
} from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUser,
  selectIsAuthenticated,
  logoutUser,
} from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const navigation = [
  { name: "Home", to: "/", icon: HomeIcon },
  { name: "Explore", to: "/explore", icon: MdTravelExplore },
  { name: "Support", to: "/support", icon: MdContactSupport },
];

function Sidebar({ className }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/login");
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="relative">
      <button
        onClick={toggleSidebar}
        className="top-6 -right-4 z-20 absolute bg-white hover:bg-gray-50 shadow-lg p-2 border border-gray-200 rounded-full transition-all duration-200"
      >
        {isCollapsed ? (
          <MdMenu className="w-4 h-4 text-blue-600" />
        ) : (
          <MdClose className="w-4 h-4 text-blue-600" />
        )}
      </button>

      <div
        className={`bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 shadow-2xl transition-all duration-300 ease-in-out h-full ${
          isCollapsed ? "w-16" : "w-64"
        } ${className}`}
      >
        <div className="p-6 border-b border-blue-700">
          {!isCollapsed && (
            <div className="font-bold text-white text-xl">
              <span className="text-blue-200">Booking</span> App
            </div>
          )}
        </div>

        <div className="p-4">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const IconComponent = item.icon;
              return (
                <li key={item.name}>
                  <Link
                    to={item.to}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                      isActive(item.to)
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-blue-100 hover:bg-blue-700 hover:text-white"
                    }`}
                  >
                    <IconComponent className="flex-shrink-0 w-5 h-5" />
                    {!isCollapsed && (
                      <span className="font-medium text-sm">{item.name}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="right-0 bottom-0 left-0 absolute p-4 border-t border-blue-700">
                  {isAuthenticated ? (
          <div className="space-y-3">
              {!isCollapsed && (
                <div className="bg-blue-800 mb-4 p-3 rounded-lg text-blue-100 text-xs">
                  <p className="font-medium text-white text-sm">
                    {user?.name || user?.email}
                  </p>
                  <p className="text-blue-200">Welcome back!</p>
                </div>
              )}

              <Link
                to="/bookings"
                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                  isActive("/bookings")
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-blue-100 hover:bg-blue-700 hover:text-white"
                }`}
              >
                <FaAddressBook className="flex-shrink-0 w-5 h-5" />
                {!isCollapsed && (
                  <span className="font-medium text-sm">My Bookings</span>
                )}
              </Link>

              <Link
                to="/profile"
                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                  isActive("/profile")
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-blue-100 hover:bg-blue-700 hover:text-white"
                }`}
              >
                <FaUser className="flex-shrink-0 w-5 h-5" />
                {!isCollapsed && (
                  <span className="font-medium text-sm">Profile</span>
                )}
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 hover:bg-red-600 p-3 rounded-lg w-full text-red-300 hover:text-white transition-all duration-200"
              >
                <FaSignOutAlt className="flex-shrink-0 w-5 h-5" />
                {!isCollapsed && (
                  <span className="font-medium text-sm">Sign Out</span>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {!isCollapsed && (
                <div className="bg-blue-800 mb-4 p-3 rounded-lg text-blue-100 text-xs">
                  <p className="font-medium text-white text-sm">Guest User</p>
                  <p className="text-blue-200">Sign in to continue</p>
                </div>
              )}

              <Link
                to="/login"
                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                  isActive("/login")
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-blue-100 hover:bg-blue-700 hover:text-white"
                }`}
              >
                <FaUser className="flex-shrink-0 w-5 h-5" />
                {!isCollapsed && (
                  <span className="font-medium text-sm">Login</span>
                )}
              </Link>

              <Link
                to="/signup"
                className="flex items-center gap-3 bg-green-600 hover:bg-green-700 shadow-lg p-3 rounded-lg w-full text-white transition-all duration-200"
              >
                <FaUser className="flex-shrink-0 w-5 h-5" />
                {!isCollapsed && (
                  <span className="font-medium text-sm">Sign Up</span>
                )}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
