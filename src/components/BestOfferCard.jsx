import React from "react";

function BestOfferCard({ id, image, location, name }) {
  return (
    <li key={id} className="flex gap-5 bg-[#ecf0f3] p-3 rounded-4xl w-[285px]">
      <figure className="w-[50px] h-[50px]">
        <img
          src={image}
          alt={location}
          className="rounded-full w-full h-full object-cover"
        />
      </figure>
      <div>
        <h3 className="font-bold text-lg">{location}</h3>
        <p className="font-normal text-[#475073] text-sm">{name}</p>
      </div>
    </li>
  );
}

export default BestOfferCard;
