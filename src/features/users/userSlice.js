import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchUserProfile = createAsyncThunk(
  "users/userProfile",
  async ({ userName, token }) => {
    const response = await axios.get(
      `https://dhrutham-connect-backend.janaki23.repl.co/users/${userName}`,
      {
        headers: {
          authorization: token,
        },
      }
    );
    return response.data.userDetails;
  }
);
export const fetchCurrentUserData = createAsyncThunk(
  "users/currentUser",
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

export const updateUserProfile = createAsyncThunk(
  "users/editProfile",
  async ({ details, token }) => {
    const response = await axios.post(
      `https://dhrutham-connect-backend.janaki23.repl.co/users/editProfile`,
      { details },
      {
        headers: {
          authorization: token,
        },
      }
    );

    return response.data.updatedProfile;
  }
);
export const fetchUserListOnSearch = createAsyncThunk(
  "users/searchUser",
  async ({ searchQuery, token }) => {
    // console.log(searchQuery);
    const response = await axios.get(
      `https://dhrutham-connect-backend.janaki23.repl.co/users/search/query?name=${searchQuery}`,
      {
        headers: {
          authorization: token,
        },
      }
    );

    return response.data.updatedProfile;
  }
);
export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: {},
    userProfile: {},
    userList: {},
    userProfileStatus: "idle",
    currentUserDataStatus: "idle",
    profileUpdateStatus: "idle",
    error: null,
  },
  reducers: {
    userFollowed: (state, action) => {
      state.currentUser.following = state.currentUser.following.concat(
        action.payload.profileUserId
      );
    },
    userUnFollowed: (state, action) => {
      state.currentUser.following = state.currentUser.following.filter(
        (userId) => userId !== action.payload.profileUserId
      );

      // state.currentUser.following.splice(profileUserIndex, 1);
      // // console.log();
      // const currentUserIndex = state.userProfile.followers.indexOf(
      //   action.payload.currentUserId
      // );
      // state.userProfile.followers.splice(currentUserIndex, 1);
    },
    usersReset: (state, action) => {
      state.currentUser = {};
      state.userProfile = {};
      state.userList = {};
      state.userProfileStatus = "idle";
      state.currentUserDataStatus = "idle";
      state.error = null;
    },
  },
  extraReducers: {
    [fetchCurrentUserData.pending]: (state, action) => {
      state.currentUserDataStatus = "loading";
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
      state.userProfileStatus = "loading";
    },
    [fetchUserProfile.fulfilled]: (state, action) => {
      state.userProfile = action.payload;
      state.userProfileStatus = "succeeded";
    },
    [fetchUserProfile.rejected]: (state, action) => {
      state.userProfileStatus = "failed";
      state.error = action.error.message;
    },

    [updateUserProfile.pending]: (state, action) => {
      state.profileUpdateStatus = "loading";
    },
    [updateUserProfile.fulfilled]: (state, action) => {
      state.userProfile = action.payload;
      state.profileUpdateStatus = "succeeded";
    },
    [updateUserProfile.rejected]: (state, action) => {
      state.profileUpdateStatus = "rejected";
    },
    // [logoutButtonClicked]: (state, action) => {
    //   state.userProfile = {};
    //   state.userList = {};
    //   state.userProfileStatus = "idle";
    //   state.error = null;
    // },
  },
});
export const { userFollowed, userUnFollowed, usersReset } = userSlice.actions;
export default userSlice.reducer;
