function Select({ register, name, attributes, countries }) {
  return (
    <select
      className="bg-[#F7F9FB] py-2 border-[#EAEBEC] border-2 outline-none font-medium text-[#4D556F] text-sm"
      {...register(name, attributes)}
      defaultValue=""
    >
      <option value="" disabled>
        Country Name
      </option>
      {countries.map((country) => (
        <option key={country.id} value={country.value}>
          {country.flag} {country.value}
        </option>
      ))}
    </select>
  );
}

export default Select;
