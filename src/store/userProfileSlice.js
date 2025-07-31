import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loginUserProfile = createAsyncThunk(
  "userProfile/loginUserProfile",
  async (credentials) => {
    
    return { email: credentials.email, name: credentials.name || "User" };
  }
);

export const logoutUserProfile = createAsyncThunk(
  "userProfile/logoutUserProfile",
  async () => true
);

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState: {
    currentUserProfile: JSON.parse(localStorage.getItem("userProfile")) || null,
    isUserLoggedIn: !!localStorage.getItem("userProfile"),
    loginStatus: "idle",
    loginError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUserProfile.pending, (state) => {
        state.loginStatus = "loading";
        state.loginError = null;
      })
      .addCase(loginUserProfile.fulfilled, (state, action) => {
        state.currentUserProfile = action.payload;
        state.isUserLoggedIn = true;
        state.loginStatus = "succeeded";
        localStorage.setItem("userProfile", JSON.stringify(action.payload));
      })
      .addCase(loginUserProfile.rejected, (state, action) => {
        state.loginError = action.error.message;
        state.loginStatus = "failed";
      })
      .addCase(logoutUserProfile.fulfilled, (state) => {
        state.currentUserProfile = null;
        state.isUserLoggedIn = false;
        state.loginStatus = "idle";
        localStorage.removeItem("userProfile");
      });
  },
});

export const selectCurrentUserProfile = (state) =>
  state.userProfile.currentUserProfile;

export default userProfileSlice.reducer;
