import { HomeIcon } from "@heroicons/react/16/solid";
import { FaAddressBook } from "react-icons/fa";
import { MdContactSupport, MdTravelExplore } from "react-icons/md";
import { Link } from "react-router-dom";
import Sidebarbg from "../assets/images/sidebar.png";

const navigation = [
  { name: "Home", to: "/", icon: HomeIcon, current: true },
  { name: "Bookings", to: "/bookings", icon: FaAddressBook, current: false },
  { name: "Explore", to: "/explore", icon: MdTravelExplore, current: false },
  { name: "Support", to: "support", icon: MdContactSupport, current: false },
];

function Sidebar({ className }) {
  return (
    <div
      className={`flex flex-col justify-between w-[276px] h-[745px]  ${className}`}
      style={{
        backgroundImage: `url(${Sidebarbg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <ul className="flex flex-col gap-4 p-10 text-xl">
        {navigation.map((item) => {
          const IconComponent = item.icon;
          return (
            <li
              key={item.name}
              className="font-medium text-white hover:text-green-300 duration-150"
            >
              <Link to={item.to} className="flex items-center gap-3">
                <IconComponent className="w-6 h-6" />
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
      <Link
        to="/signup"
        className="bg-white hover:bg-red-500 m-12 p-2 border border-red-500 rounded-3xl font-medium text-red-500 hover:text-white text-xl text-center duration-150"
      >
        Sign UP Now
      </Link>
    </div>
  );
}

export default Sidebar;
