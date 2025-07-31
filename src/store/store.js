import { configureStore } from "@reduxjs/toolkit";
import userProfileReducer from "./userProfileSlice";
import hotelBookingReducer from "./hotelBookingSlice";
import authReducer from "./authSlice";
import hotelReducer from "./hotelSlice";

export const store = configureStore({
  reducer: {
    userProfile: userProfileReducer,
    hotelBooking: hotelBookingReducer,
    auth: authReducer,
    hotel: hotelReducer,
  },
});
