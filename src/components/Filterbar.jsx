import { useForm } from "react-hook-form";
import Input from "./Input";
import Select from "./Select";
import { countries } from "../countries";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

function Filterbar({ className }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const params = new URLSearchParams();
    if (data.search && data.search.trim())
      params.append("search", data.search.trim());
    if (data.country && data.country.trim())
      params.append("country", data.country.trim());
    if (data.date && data.date.trim()) params.append("date", data.date.trim());

    if (params.toString()) {
      navigate(`/search?${params.toString()}`);
    } else {
      console.log("No search parameters provided");
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`relative flex xl:flex-row flex-col justify-center xl:items-end gap-3 bg-white p-5 pb-6 rounded-4xl w-full xl:max-w-[980px] mx-auto xl:-mt-10 mt-0 ${className}`}
    >
      <Input
        register={register}
        name="search"
        errors={errors}
        type="text"
        className="rounded-2xl h-10"
      />
      <Select
        data={countries}
        register={register}
        name="country"
        className="py-0 rounded-2xl h-10"
      />
      <Input
        register={register}
        name="date"
        errors={errors}
        type="date"
        className="rounded-2xl h-10"
      />
      <Button>Clear Filter</Button>
      <Button className="bg-red-500 hover:bg-red-700 rounded-3xl font-bold text-white">
        Search
      </Button>
    </form>
  );
}

export default Filterbar;
