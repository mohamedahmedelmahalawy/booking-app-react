import HomeErrorImg from "../../assets/images/homeError.png";

function HomeError() {
  return (
    <div className="flex flex-col gap-4 pt-10 w-full">
      <figure className="mx-auto">
        <img
          src={HomeErrorImg}
          alt="Error in Home page"
          className="w-96 h-full object-cover"
        />
      </figure>
      <div>
        {" "}
        <h2 className="font-bold text-[#282E44] text-9xl text-center">404</h2>
        <p className="font-bold text-[#282E44] text-2xl text-center tracking-widest">
          Page not Fount
        </p>
      </div>
    </div>
  );
}

export default HomeError;
