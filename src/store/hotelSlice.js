import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchBestOffers = createAsyncThunk(
  "hotel/fetchBestOffers",
  async () => {
    const response = await fetch(
      "https://booking-app-db.vercel.app/best_offer"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch best offers");
    }
    return response.json();
  }
);


export const fetchRecommendedHotels = createAsyncThunk(
  "hotel/fetchRecommendedHotels",
  async () => {
    const response = await fetch(
      "https://booking-app-db.vercel.app/recommended_hotels"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch recommended hotels");
    }
    return response.json();
  }
);


export const fetchHotels = createAsyncThunk(
  "hotel/fetchHotels",
  async (searchParams = {}) => {
    const url = new URL("https://booking-app-db.vercel.app/hotels");

    
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) {
        url.searchParams.append(key, value);
      }
    });

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error("Failed to fetch hotels");
    }
    return response.json();
  }
);


export const fetchHotelDetails = createAsyncThunk(
  "hotel/fetchHotelDetails",
  async (hotelId) => {
    const response = await fetch(
      `https://booking-app-db.vercel.app/hotels/${hotelId}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch hotel details");
    }
    return response.json();
  }
);

const hotelSlice = createSlice({
  name: "hotel",
  initialState: {
    bestOffers: [],
    recommendedHotels: [],
    allHotels: [],
    currentHotel: null,
    searchResults: [],
    loading: {
      bestOffers: false,
      recommendedHotels: false,
      allHotels: false,
      hotelDetails: false,
      search: false,
    },
    error: {
      bestOffers: null,
      recommendedHotels: null,
      allHotels: null,
      hotelDetails: null,
      search: null,
    },
  },
  reducers: {
    clearHotelError: (state, action) => {
      const { type } = action.payload;
      if (state.error[type]) {
        state.error[type] = null;
      }
    },
    clearCurrentHotel: (state) => {
      state.currentHotel = null;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchBestOffers.pending, (state) => {
        state.loading.bestOffers = true;
        state.error.bestOffers = null;
      })
      .addCase(fetchBestOffers.fulfilled, (state, action) => {
        state.loading.bestOffers = false;
        state.bestOffers = action.payload;
      })
      .addCase(fetchBestOffers.rejected, (state, action) => {
        state.loading.bestOffers = false;
        state.error.bestOffers = action.error.message;
      })
      
      .addCase(fetchRecommendedHotels.pending, (state) => {
        state.loading.recommendedHotels = true;
        state.error.recommendedHotels = null;
      })
      .addCase(fetchRecommendedHotels.fulfilled, (state, action) => {
        state.loading.recommendedHotels = false;
        state.recommendedHotels = action.payload;
      })
      .addCase(fetchRecommendedHotels.rejected, (state, action) => {
        state.loading.recommendedHotels = false;
        state.error.recommendedHotels = action.error.message;
      })
      
      .addCase(fetchHotels.pending, (state) => {
        state.loading.allHotels = true;
        state.error.allHotels = null;
      })
      .addCase(fetchHotels.fulfilled, (state, action) => {
        state.loading.allHotels = false;
        state.allHotels = action.payload;
        state.searchResults = action.payload;
      })
      .addCase(fetchHotels.rejected, (state, action) => {
        state.loading.allHotels = false;
        state.error.allHotels = action.error.message;
      })
      
      .addCase(fetchHotelDetails.pending, (state) => {
        state.loading.hotelDetails = true;
        state.error.hotelDetails = null;
      })
      .addCase(fetchHotelDetails.fulfilled, (state, action) => {
        state.loading.hotelDetails = false;
        state.currentHotel = action.payload;
      })
      .addCase(fetchHotelDetails.rejected, (state, action) => {
        state.loading.hotelDetails = false;
        state.error.hotelDetails = action.error.message;
      });
  },
});

export const { clearHotelError, clearCurrentHotel, clearSearchResults } =
  hotelSlice.actions;


export const selectBestOffers = (state) => state.hotel.bestOffers;
export const selectRecommendedHotels = (state) => state.hotel.recommendedHotels;
export const selectAllHotels = (state) => state.hotel.allHotels;
export const selectCurrentHotel = (state) => state.hotel.currentHotel;
export const selectSearchResults = (state) => state.hotel.searchResults;

export const selectHotelLoading = (state) => state.hotel.loading;
export const selectHotelError = (state) => state.hotel.error;

export default hotelSlice.reducer;
