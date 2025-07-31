import React from "react";
import { useNavigate } from "react-router-dom";

function SliderCard({ id, images, address, name, rating, className }) {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    console.log("SliderCard clicked, navigating to:", `/${id}`);
    navigate(`/${id}`);
  };
  const handleBookBtn = (e) => {
    e.stopPropagation();
  };
  return (
    <article
      className={`flex gap-10 bg-white shadow-lg hover:shadow-2xl mx-2 p-4 rounded-2xl max-w-[520px] transition-shadow duration-300  ${className}`}
      onClick={handleDetailsClick}
    >
      <figure className="flex flex-col flex-shrink-0 w-[110px]">
        <img
          src={images.main}
          alt={name}
          className="rounded-xl w-full h-full object-cover"
        />
      </figure>
      <div className="flex flex-col flex-1 gap-2">
        <h6 className="font-semibold text-gray-400 text-xs uppercase tracking-wider">
          Hotel
        </h6>
        <h3 className="font-bold text-gray-800 text-lg">{name.slice(0, 31)}</h3>
        <p className="text-gray-500 text-sm">
          <span>
            {`${address.street},${address.city},${address.country}`.slice(
              0,
              41
            ) + "..."}
          </span>
        </p>
        <div className="flex justify-between items-center mt-auto">
          <span className="flex items-center font-semibold text-yellow-500">
            <svg
              className="mr-1 w-4 h-4 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.388-2.46a1 1 0 00-1.175 0l-3.388 2.46c-.784.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z" />
            </svg>
            {rating.score}
          </span>
          <button
            className="bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded-lg font-semibold text-white transition-colors duration-200"
            onClick={handleBookBtn}
          >
            Book Now
          </button>
        </div>
      </div>
    </article>
  );
}

export default SliderCard;
