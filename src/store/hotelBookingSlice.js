import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addHotelBooking = createAsyncThunk(
  "hotelBooking/addHotelBooking",
  async ({ hotel, fromDate, toDate, total, customerDetails }) => {
    
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const booking = {
      id: Date.now().toString(),
      hotel,
      fromDate,
      toDate,
      total,
      customerDetails,
      bookedAt: new Date().toISOString(),
      status: "confirmed",
    };

    return booking;
  }
);

const hotelBookingSlice = createSlice({
  name: "hotelBooking",
  initialState: {
    hotelBookingsList:
      JSON.parse(localStorage.getItem("hotelBookingsList")) || [],
    bookingStatus: "idle",
    bookingError: null,
  },
  reducers: {
    clearBookingError: (state) => {
      state.bookingError = null;
    },
    clearBookingStatus: (state) => {
      state.bookingStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addHotelBooking.pending, (state) => {
        state.bookingStatus = "loading";
        state.bookingError = null;
      })
      .addCase(addHotelBooking.fulfilled, (state, action) => {
        state.hotelBookingsList.push(action.payload);
        state.bookingStatus = "succeeded";
        localStorage.setItem(
          "hotelBookingsList",
          JSON.stringify(state.hotelBookingsList)
        );
      })
      .addCase(addHotelBooking.rejected, (state, action) => {
        state.bookingError = action.error.message;
        state.bookingStatus = "failed";
      });
  },
});

export const { clearBookingError, clearBookingStatus } =
  hotelBookingSlice.actions;

export const selectHotelBookingsList = (state) =>
  state.hotelBooking.hotelBookingsList;

export const selectBookingStatus = (state) => state.hotelBooking.bookingStatus;

export const selectBookingError = (state) => state.hotelBooking.bookingError;

export default hotelBookingSlice.reducer;
