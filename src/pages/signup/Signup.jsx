import React from "react";
import Input from "../../components/Input";
import { useForm } from "react-hook-form";
import Select from "../../components/Select";
import Button from "../../components/Button";

function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password", "");

  // Validation checks
  const isLongEnough = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 max-w-96"
    >
      <Input
        register={register}
        name="name"
        errors={errors}
        attributes={{
          required: "Name is required",
          minLength: {
            value: 4,
            message: "Name must be at least 4 characters",
          },
        }}
        type="text"
      />
      <Input
        register={register}
        name="email"
        errors={errors}
        attributes={{
          required: "email is required",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
            message: "Invalid Email Address",
          },
        }}
        type="email"
      />
      <Input
        register={register}
        name="password"
        errors={errors}
        attributes={{
          required: "Password is required",
          pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
            message: (
              <ul style={{ marginTop: 8, marginBottom: 8 }}>
                <li style={{ color: isLongEnough ? "green" : "red" }}>
                  At least 8 characters
                </li>
                <li style={{ color: hasNumber ? "green" : "red" }}>
                  At least 1 number
                </li>
                <li style={{ color: hasLower ? "green" : "red" }}>
                  At least 1 lowercase letter
                </li>
                <li style={{ color: hasUpper ? "green" : "red" }}>
                  At least 1 uppercase letter
                </li>
              </ul>
            ),
          },
        }}
        type="password"
      />
      <Input
        register={register}
        name="confirmPassword"
        errors={errors}
        attributes={{
          required: "Confirm Password is required",
          validate: (value) => value === password || "Passwords do not match",
        }}
        type="password"
      />
      <Select />
      <Input
        register={register}
        name="phone"
        errors={errors}
        attributes={{
          required: "provide phone numebr",
          pattern: {
            value: /^01[0125][0-9]{8}$/i,
            message: "Invalid phone",
          },
        }}
        type="number"
      />
      <Button value="Signup" bgcolor="#0A6ADA" color="#880000" />
    </form>
  );
}

export default Signup;
