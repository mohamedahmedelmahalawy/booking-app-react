import SearchErrorImg from "../../assets/images/SearchError.png";

function SearchError() {
  return (
    <div className="flex flex-col gap-4 pt-10 w-full">
      <figure className="mx-auto">
        <img
          src={SearchErrorImg}
          alt="Error in Home page"
          className="w-96 h-full object-cover"
        />
      </figure>
      <div>
        <p className="font-bold text-[#282E44] text-2xl text-center tracking-widest">
          No Result Found
        </p>
      </div>
    </div>
  );
}

export default SearchError;
