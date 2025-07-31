import { useLoaderData } from "react-router-dom";
import SliderCard from "../../components/SliderCard";

function Search() {
  const results = useLoaderData();
  return (
    <div className="flex flex-col gap-10 pt-10 w-full">
      <div className="flex flex-col bg-white p-5 rounded-4xl">
        <div className="flex justify-between items-center gap-3 px-8 pb-8">
          <h3 className="font-bold text-2xl">Search Results</h3>
          <p>{results?.length || 0} hotels found</p>
        </div>
        {results && results.length > 0 ? (
          <ul className="flex flex-wrap justify-center gap-5 w-full">
            {results.map((hotel) => (
              <li key={hotel.id} className="max-w-[380px]">
                <SliderCard {...hotel} className="h-[200px]" />
              </li>
            ))}
          </ul>
        ) : (
          <div className="py-10 text-gray-500 text-center">
            <h3 className="mb-2 font-bold text-xl">No Results Found</h3>
            <p>No hotels found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
