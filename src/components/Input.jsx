import React from "react";

function Input({
  register,
  name,
  errors,
  attributes,
  type,
  className,
  labelClassName,
}) {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={name}
        className={`font-medium text-[#4D556F] text-sm ${labelClassName}`}
      >
        {name[0].toUpperCase() + name.slice(1)}
      </label>
      <input
        type={type}
        className={`bg-[#F7F9FB] px-2 border-[#EAEBEC] border-2 outline-none text-xl ${className}`}
        id={name}
        {...register(name, attributes)}
        autoComplete="true"
        placeholder={name}
      />

      {errors[name] && (
        <div style={{ color: "red" }}>{errors[name]?.message}</div>
      )}
    </div>
  );
}

export default Input;
