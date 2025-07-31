import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import MultipleItemsSlider from "../../components/MultipleItemsSlider";
import { useNavigate } from "react-router-dom";

function Details() {
  const data = useLoaderData();
  const navigate = useNavigate();
  const {
    images,
    address,
    name,
    rating,
    description,
    amenities,
    pricing,
    recommendedHotels,
  } = data;

  const [mainImage, setMainImage] = useState(images.main);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  return (
    <div className="flex flex-col gap-3">
      <article className="flex md:flex-row flex-col gap-10 bg-white shadow-lg mx-auto mt-8 p-8 rounded-2xl max-w-6xl transition-shadow duration-300">
        <section className="flex flex-col items-center md:w-1/2">
          <img
            className="shadow-lg mb-4 rounded-xl w-full h-[350px] object-cover"
            src={mainImage}
            alt={name}
          />
          <div className="flex justify-center gap-2">
            {images.gallery.map((img, idx) => (
              <img
                key={idx}
                className={`rounded-lg w-20 h-20 object-cover cursor-pointer border-2 transition-all duration-200
              ${
                mainImage === img
                  ? "border-blue-600 shadow-md"
                  : "border-transparent hover:border-blue-400"
              }`}
                src={img}
                alt=""
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </section>

        <section className="flex flex-col flex-1 gap-4">
          <h6 className="font-semibold text-gray-400 text-xs uppercase tracking-wider">
            Hotel
          </h6>
          <h2 className="font-bold text-gray-800 text-2xl">{name}</h2>
          <p className="text-gray-500 text-sm">
            <span>
              {`${address.street}, ${address.city}, ${address.country}`}
            </span>
          </p>
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.388-2.46a1 1 0 00-1.175 0l-3.388 2.46c-.784.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z" />
            </svg>
            <span className="font-semibold text-yellow-500">
              {rating.score}
            </span>
            <span className="ml-2 text-gray-400 text-xs">
              ({rating.reviewCount} reviews)
            </span>
            <span className="ml-2 font-bold text-green-600">
              {rating.status}
            </span>
          </div>
          <div>
            <h4 className="mb-1 font-semibold text-lg">About</h4>
            <p className="text-gray-600">{description}</p>
          </div>
          <div>
            <h4 className="mb-1 font-semibold text-lg">Popular Services</h4>
            <ul className="flex flex-wrap gap-2">
              {amenities.map((amenity, idx) => (
                <li
                  key={idx}
                  className="bg-blue-100 px-3 py-1 rounded-full font-medium text-blue-700 text-xs"
                >
                  {amenity}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-1 font-semibold text-lg">Pricing</h4>
            <ul>
              {pricing.map((p, idx) => (
                <li key={idx} className="flex items-center gap-4 text-gray-700">
                  <span className="text-gray-400 text-sm line-through">
                    {p.originalPrice} {p.currency}
                  </span>
                  <span className="font-bold text-blue-700 text-lg">
                    {p.discountedPrice} {p.currency}
                  </span>
                  <span className="bg-green-100 px-2 py-0.5 rounded-full font-semibold text-green-700 text-xs">
                    {p.discount}
                  </span>
                  <span className="text-gray-500 text-xs">{p.priceUnit}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="mb-1 font-semibold text-lg">Select Dates</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Check-in Date
                </label>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Check-out Date
                </label>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min={fromDate || new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>
          </div>
          
          <button
            className="bg-blue-600 hover:bg-blue-700 mt-4 px-6 py-2 rounded-lg w-full font-semibold text-white transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
            onClick={() =>
              navigate("/payment", {
                state: {
                  hotelName: name,
                  pricing: pricing,
                  fromDate: fromDate,
                  toDate: toDate,
                },
              })
            }
            disabled={!fromDate || !toDate}
          >
            {!fromDate || !toDate ? "Select Dates to Book" : "Pay Now"}
          </button>
        </section>
      </article>
      <div>
        <h3 className="mt-8 mb-8 font-bold text-blue-700 text-4xl text-center">
          Recomened Hotels
        </h3>
        <MultipleItemsSlider
          variableWidth={true}
          className="mx-auto mb-10 w-[calc(100%-100px)] max-w-none"
          recommendedHotels={recommendedHotels}
        />
      </div>
    </div>
  );
}

export default Details;
