import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchUserProfile = createAsyncThunk(
  "/userProfile",
  async (userName) => {
    const response = await axios.get(
      `https://dhrutham-connect-backend.janaki23.repl.co/users/${userName}`
    );
    return response.data.userDetails;
  }
);
export const userSlice = createSlice({
  name: "user",
  initialState: {
    userProfile: {},
    userList: {},
    userProfileStatus: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: {
    // [fetchLoggedInUserData.pending]: (state, action) => {
    //   state.loggedInUserDataStatus = "idle";
    // },
    // [fetchLoggedInUserData.fulfilled]: (state, action) => {
    //   state.loggedInUserData = action.payload;
    //   state.loggedInUserDataStatus = "succeeded";
    // },
    // [fetchLoggedInUserData.rejected]: (state, action) => {
    //   state.loggedInUserDataStatus = "failed";
    //   state.error = action.error.message;
    // },
    [fetchUserProfile.pending]: (state, action) => {
      state.userProfileStatus = "idle";
    },
    [fetchUserProfile.fulfilled]: (state, action) => {
      state.userProfile = action.payload;
      state.userProfileStatus = "succeeded";
    },
    [fetchUserProfile.rejected]: (state, action) => {
      state.userProfileStatus = "failed";
      state.error = action.error.message;
    },
    // [logoutButtonClicked]: (state, action) => {
    //   state.userProfile = {};
    //   state.userList = {};
    //   state.userProfileStatus = "idle";
    //   state.error = null;
    // },
  },
});

export default userSlice.reducer;
