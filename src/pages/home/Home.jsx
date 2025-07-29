import React from "react";
import { AxiosInterceptor } from "../../interceptor/interceptor";
import { useLoaderData } from "react-router-dom";
import BestOfferCard from "../../components/bestOfferCard";
import MultipleItemsSlider from "../../components/MultipleItemsSlider";

function Home() {
  const bestOffers = useLoaderData().bestOffers;
  const recommendedHotels = useLoaderData().recommendedHotels;
  return (
    <div className="flex flex-col pt-10 w-full">
      <MultipleItemsSlider
        variableWidth={true}
        className="mx-auto w-[calc(100%-100px)] max-w-none"
        recommendedHotels={recommendedHotels}
      />

      <div className="flex flex-col bg-white p-5 rounded-4xl">
        <div className="flex justify-between items-center gap-3 px-8 pb-8">
          <h3 className="font-bold text-2xl">Best Offers</h3>
          <p>View all</p>
        </div>
        <ul className="flex flex-wrap justify-center gap-5 w-full">
          {bestOffers.map((offer) => {
            return <BestOfferCard key={offer.id} {...offer} />;
          })}
        </ul>
      </div>
    </div>
  );
}
export default Home;

export function HydrateFallback() {
  return <div>Loading best offer…</div>;
}
