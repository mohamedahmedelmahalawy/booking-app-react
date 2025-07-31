import React from "react";
import Input from "../../components/Input";
import { useForm } from "react-hook-form";
import Select from "../../components/Select";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import SignupBg from "../../assets/images/signup-BG.jpg";
import Logo from "../../assets/images/Logo.svg";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  selectAuthLoading,
  selectAuthError,
} from "../../store/authSlice";

function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const password = watch("password", "");
  const isLongEnough = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);

  const onSubmit = async (data) => {
    try {
      const result = await dispatch(
        loginUser({ email: data.email, password: data.password })
      ).unwrap();
      if (result) {
        navigate("/profile");
      }
    } catch (error) {
      console.log("Login failed:", error);
    }
  };

  return (
    <div className="flex md:flex-row flex-col justify-start md:justify-center items-center h-screen">
      <ToastContainer />
      <div className="flex justify-center px-20 w-full md:w-1/2">
        <div className="flex flex-col justify-center gap-8 min-w-[26rem] max-w-[30rem] h-screen">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <figure className="flex justify-center">
              <img src={Logo} alt="" />
            </figure>
            <h2 className="font-bold text-4xl text-center">Login</h2>

            {error && (
              <div className="bg-red-100 px-4 py-3 border border-red-400 rounded text-red-700">
                {error}
              </div>
            )}

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
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/,
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
                      <li
                        style={{
                          color: /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(
                            password
                          )
                            ? "green"
                            : "red",
                        }}
                      >
                        At least 1 special character
                      </li>
                    </ul>
                  ),
                },
              }}
              type="password"
            />
            <Button className="bg-[#0A6ADA] text-white" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
          <p className="text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium text-[#0A6ADA]">
              Register
            </Link>
          </p>
          <h3 className="text-center">
            <span className="font-medium">Login</span> with Others
          </h3>
          <Button
            icon={<FaGoogle />}
            className="border-[#EAEBEC] border-2 rounded-2xl"
          >
            Login with <span className="font-bold">google</span>
          </Button>
          <Button
            icon={<FaFacebookF />}
            className="border-[#EAEBEC] border-2 rounded-2xl"
          >
            Login with <span className="font-bold">Facebook</span>
          </Button>
        </div>
      </div>
      <figure className="hidden md:block w-1/2">
        <img
          src={SignupBg}
          alt=""
          className="rounded-3xl w-full h-screen object-cover"
        />
      </figure>
    </div>
  );
}

export default Login;
