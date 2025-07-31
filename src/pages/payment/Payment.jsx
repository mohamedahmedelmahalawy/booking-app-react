import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  addHotelBooking,
  selectBookingStatus,
  selectBookingError,
} from "../../store/hotelBookingSlice";
import { selectUser } from "../../store/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "../../components/Select";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { countries } from "../../countries";
import { useState, useEffect } from "react";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const bookingStatus = useSelector(selectBookingStatus);
  const bookingError = useSelector(selectBookingError);

  const { hotelName, pricing, fromDate, toDate } = location.state || {};
  const [totalPrice, setTotalPrice] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "Mr",
      firstName: user?.name?.split(" ")[0] || "",
      lastName: user?.name?.split(" ").slice(1).join(" ") || "",
      email: user?.email || "",
      country: user?.country || "",
      phone: user?.phone || "",
    },
  });

  useEffect(() => {
    if (fromDate && toDate && pricing && pricing.length > 0) {
      const start = new Date(fromDate);
      const end = new Date(toDate);
      const days = Math.ceil((end - start) / (1000 * 3600 * 24));

      const pricePerDay = pricing[0]?.discountedPrice || pricing[0]?.price || 0;

      if (pricePerDay > 0 && days > 0) {
        setTotalPrice(pricePerDay * days);
      } else {
        setTotalPrice(0);
      }
    } else {
      setTotalPrice(0);
    }
  }, [fromDate, toDate, pricing]);

  const onSubmit = async (data) => {
    if (!user) {
      alert("Please log in to make a booking");
      navigate("/login");
      return;
    }

    const bookingData = {
      hotel: { name: hotelName, pricing },
      fromDate,
      toDate,
      total: `${totalPrice} ${pricing?.[0]?.currency || "USD"}`,
      customerDetails: data,
    };

    try {
      await dispatch(addHotelBooking(bookingData)).unwrap();
      alert("Booking successful!");
      navigate("/profile");
    } catch (error) {
      alert("Booking failed: " + error);
    }
  };

  if (!location.state) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h1 className="mb-4 font-bold text-2xl">No booking data found</h1>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto p-6 max-w-6xl">
      <div className="gap-8 grid grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="bg-white shadow-md p-6 rounded-lg">
              <h2 className="mb-4 font-bold text-2xl">Your Details</h2>

              {bookingError && (
                <div className="bg-red-100 mb-4 px-4 py-3 border border-red-400 rounded text-red-700">
                  {bookingError}
                </div>
              )}

              <div className="gap-4 grid grid-cols-1 md:grid-cols-3 mb-4">
                <div>
                  <label className="block mb-2 font-medium text-sm">
                    Title
                  </label>
                  <Select
                    data={[
                      { value: "Mr", label: "Mr" },
                      { value: "Mrs", label: "Mrs" },
                      { value: "Ms", label: "Ms" },
                      { value: "Dr", label: "Dr" },
                    ]}
                    register={register}
                    name="title"
                    selectTitle="Title"
                    className="py-2"
                    attributes={{ required: "Title is required" }}
                  />
                  {errors.title && (
                    <p className="mt-1 text-red-600 text-sm">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-2 font-medium text-sm">
                    First Name
                  </label>
                  <Input
                    register={register}
                    name="firstName"
                    errors={errors}
                    attributes={{
                      required: "First name is required",
                      minLength: {
                        value: 2,
                        message: "First name must be at least 2 characters",
                      },
                    }}
                    type="text"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium text-sm">
                    Last Name
                  </label>
                  <Input
                    register={register}
                    name="lastName"
                    errors={errors}
                    attributes={{
                      required: "Last name is required",
                      minLength: {
                        value: 2,
                        message: "Last name must be at least 2 characters",
                      },
                    }}
                    type="text"
                  />
                </div>
              </div>

              <div className="gap-4 grid grid-cols-1 md:grid-cols-2 mb-4">
                <div>
                  <label className="block mb-2 font-medium text-sm">
                    Email
                  </label>
                  <Input
                    register={register}
                    name="email"
                    errors={errors}
                    attributes={{
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    }}
                    type="email"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium text-sm">
                    Phone
                  </label>
                  <Input
                    register={register}
                    name="phone"
                    errors={errors}
                    attributes={{
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Phone number must be numbers only",
                      },
                      maxLength: {
                        value: 12,
                        message: "Phone number must be at most 12 digits",
                      },
                    }}
                    type="number"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-medium text-sm">
                  Country
                </label>
                <Select
                  data={countries}
                  register={register}
                  name="country"
                  selectTitle="Select Country"
                  className="py-2"
                  attributes={{ required: "Country is required" }}
                />
                {errors.country && (
                  <p className="mt-1 text-red-600 text-sm">
                    {errors.country.message}
                  </p>
                )}
              </div>
            </div>

            <div className="bg-white shadow-md p-6 rounded-lg">
              <h2 className="mb-4 font-bold text-2xl">Payment Details</h2>

              <div className="mb-4">
                <label className="block mb-2 font-medium text-sm">
                  Card Number
                </label>
                <Input
                  register={register}
                  name="cardNumber"
                  errors={errors}
                  attributes={{
                    required: "Card number is required",
                    pattern: {
                      value: /^[0-9]{13,19}$/,
                      message: "Card number must be 13-19 digits",
                    },
                  }}
                  type="text"
                  placeholder="1234 5678 9012 3456"
                />
              </div>

              <div className="gap-4 grid grid-cols-1 md:grid-cols-3 mb-4">
                <div>
                  <label className="block mb-2 font-medium text-sm">CVV</label>
                  <Input
                    register={register}
                    name="cvv"
                    errors={errors}
                    attributes={{
                      required: "CVV is required",
                      pattern: {
                        value: /^[0-9]{3,4}$/,
                        message: "CVV must be 3-4 digits",
                      },
                    }}
                    type="text"
                    placeholder="123"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium text-sm">
                    Expiry Date
                  </label>
                  <Input
                    register={register}
                    name="expiryDate"
                    errors={errors}
                    attributes={{
                      required: "Expiry date is required",
                      pattern: {
                        value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                        message: "Use format MM/YY",
                      },
                    }}
                    type="text"
                    placeholder="MM/YY"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium text-sm">
                    Card Holder
                  </label>
                  <Input
                    register={register}
                    name="cardHolder"
                    errors={errors}
                    attributes={{
                      required: "Card holder name is required",
                      minLength: {
                        value: 3,
                        message:
                          "Card holder name must be at least 3 characters",
                      },
                    }}
                    type="text"
                    placeholder="JOHN DOE"
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg w-full font-semibold text-white text-lg transition-colors duration-200"
              disabled={bookingStatus === "loading"}
            >
              {bookingStatus === "loading" ? "Processing..." : "Pay Now"}
            </Button>
          </form>
        </div>

        <div className="lg:col-span-1">
          <div className="top-6 sticky bg-white shadow-md p-6 rounded-lg">
            <h2 className="mb-4 font-bold text-xl">Booking Summary</h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{hotelName}</h3>
                <p className="text-gray-600">Hotel</p>
              </div>

              <div className="gap-4 grid grid-cols-2">
                <div>
                  <p className="text-gray-600 text-sm">Check-in</p>
                  <p className="font-medium">
                    {new Date(fromDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Check-out</p>
                  <p className="font-medium">
                    {new Date(toDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Price per night</span>
                  <span className="font-medium">
                    {pricing?.[0]?.discountedPrice} {pricing?.[0]?.currency}
                  </span>
                </div>

                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-600 text-sm">
                    Number of nights
                  </span>
                  <span className="font-medium">
                    {Math.ceil(
                      (new Date(toDate) - new Date(fromDate)) /
                        (1000 * 3600 * 24)
                    )}
                  </span>
                </div>

                <div className="flex justify-between items-center mt-4 pt-4 border-t">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-blue-600 text-lg">
                    {totalPrice} {pricing?.[0]?.currency}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
