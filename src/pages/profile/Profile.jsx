import { useSelector, useDispatch } from "react-redux";
import {
  selectUser,
  selectIsAuthenticated,
  logoutUser,
} from "../../store/authSlice";
import { selectHotelBookingsList } from "../../store/hotelBookingSlice";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const bookings = useSelector(selectHotelBookingsList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/login");
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h1 className="mb-4 font-bold text-2xl">
            Please log in to view your profile
          </h1>
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="mb-2 font-bold text-3xl">My Profile</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 px-4 py-2 rounded text-white transition-colors"
          >
            Logout
          </button>
        </div>
        <p className="text-gray-600">
          Manage your account and view your bookings
        </p>
      </div>

      <div className="bg-white shadow-md mb-8 p-6 rounded-lg">
        <h2 className="mb-4 font-semibold text-xl">Profile Information</h2>
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
          <div className="space-y-3">
            <div>
              <p className="text-gray-600 text-sm">Full Name</p>
              <p className="font-medium">{user?.name || "Not provided"}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Email Address</p>
              <p className="font-medium">{user?.email}</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-gray-600 text-sm">Phone Number</p>
              <p className="font-medium">{user?.phone || "Not provided"}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Country</p>
              <p className="font-medium">{user?.country || "Not provided"}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md p-6 rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-semibold text-xl">My Bookings</h2>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white text-sm transition-colors"
          >
            Explore More Hotels
          </button>
        </div>

        {bookings && bookings.length > 0 ? (
          <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white shadow-md hover:shadow-lg border border-gray-200 rounded-lg overflow-hidden transition-shadow"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold text-gray-900 text-xl">
                      {booking.hotel.name}
                    </h3>
                    <span className="bg-green-100 px-2 py-1 rounded-full font-medium text-green-800 text-xs">
                      {booking.status}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Check-in:</span>
                      <span className="font-medium">
                        {new Date(booking.fromDate).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Check-out:</span>
                      <span className="font-medium">
                        {new Date(booking.toDate).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Nights:</span>
                      <span className="font-medium">
                        {Math.ceil(
                          (new Date(booking.toDate) -
                            new Date(booking.fromDate)) /
                            (1000 * 3600 * 24)
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Total:</span>
                      <span className="font-bold text-blue-600 text-lg">
                        {booking.total}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-gray-200 border-t">
                    <div className="text-gray-500 text-sm">
                      <p>
                        Booked on:{" "}
                        {new Date(booking.bookedAt).toLocaleDateString()}
                      </p>
                      <p>Booking ID: {booking.id}</p>
                    </div>
                  </div>

                  {booking.customerDetails && (
                    <div className="mt-4 pt-4 border-gray-200 border-t">
                      <h4 className="mb-2 font-medium text-gray-900">
                        Guest Details
                      </h4>
                      <div className="text-gray-600 text-sm">
                        <p>
                          {booking.customerDetails.title}{" "}
                          {booking.customerDetails.firstName}{" "}
                          {booking.customerDetails.lastName}
                        </p>
                        <p>{booking.customerDetails.email}</p>
                        <p>{booking.customerDetails.phone}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <div className="mb-4">
              <svg
                className="mx-auto w-12 h-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h3 className="mb-2 font-medium text-gray-900 text-lg">
              No bookings yet
            </h3>
            <p className="mb-6 text-gray-600">
              Start exploring hotels and make your first booking!
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-white transition-colors"
            >
              Explore Hotels
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
