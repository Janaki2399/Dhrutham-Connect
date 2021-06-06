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
export const fetchCurrentUserData = createAsyncThunk(
  "/currentUser",
  async (token) => {
    const response = await axios.get(
      `https://dhrutham-connect-backend.janaki23.repl.co/users`,
      {
        headers: {
          authorization: token,
        },
      }
    );
    return response.data;
  }
);
export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: {},
    userProfile: {},
    userList: {},
    userProfileStatus: "idle",
    currentUserStatus: "idle",
    error: null,
  },
  reducers: {
    userFollowed: (state, action) => {
      state.currentUser.following.push(action.payload.profileUserId);
      state.userProfile.followers.push(action.payload.currentUserId);
    },
    userUnFollowed: (state, action) => {
      state.currentUser.following.pull(action.payload.profileUserId);
      state.userProfile.followers.pull(action.payload.currentUserId);
    },
  },
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
    [fetchCurrentUserData.pending]: (state, action) => {
      state.currentUserDataStatus = "idle";
    },
    [fetchCurrentUserData.fulfilled]: (state, action) => {
      state.currentUser = action.payload.user;
      state.currentUserDataStatus = "succeeded";
    },
    [fetchCurrentUserData.rejected]: (state, action) => {
      state.currentUserDataStatus = "failed";
      state.error = action.error.message;
    },
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
export const { userFollowed, userUnFollowed } = userSlice.actions;
export default userSlice.reducer;
