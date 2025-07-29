import React from "react";

function SliderCard({ images, address, name, rating }) {
  return (
    <article className="flex gap-[30px] max-w-[462px]">
      <figure className="w-[110px] h-[140px]">
        <img
          src={images.main}
          alt=""
          className="rounded-2xl w-full h-full object-cover"
        />
      </figure>
      <div className="flex flex-col gap-[9px]">
        <h6>Hotel</h6>
        <h3>{name}</h3>
        <p>
          <span>{address.street},</span>
          <span>{address.city},</span>
          <span>{address.country}</span>
        </p>
        <div className="flex justify-between">
          <span>{rating.score}</span>
          <button>Book Now</button>
        </div>
      </div>
    </article>
  );
}

export default SliderCard;
