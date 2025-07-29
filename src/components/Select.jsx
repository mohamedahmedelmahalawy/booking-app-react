function Select({ register, name, attributes, data, className }) {
  return (
    <select
      className={`bg-[#F7F9FB]  border-[#EAEBEC] border-2 outline-none font-medium text-[#4D556F] text-sm ${className}`}
      {...register(name, attributes)}
      defaultValue=""
      autoComplete="true"
    >
      <option value="" disabled>
        Country Name
      </option>
      {data.map((country) => (
        <option key={country.id} value={country.value}>
          {country.flag} {country.value}
        </option>
      ))}
    </select>
  );
}

export default Select;
