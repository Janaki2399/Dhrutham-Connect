import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { logoutButtonClicked } from "../auth/authSlice";
import { API_URL } from "../../constants";

export const fetchUserProfile = createAsyncThunk(
  "users/userProfile",
  async ({ userName, token }) => {
    const response = await axios.get(`${API_URL}/users/${userName}`, {
      headers: {
        authorization: token,
      },
    });

    return response.data.userDetails;
  }
);

export const fetchCurrentUserData = createAsyncThunk(
  "users/currentUser",
  async (token) => {
    const response = await axios.get(`${API_URL}/users`, {
      headers: {
        authorization: token,
      },
    });
    return response.data;
  }
);

export const fetchConnections = createAsyncThunk(
  "users/connections",
  async ({ pathname, token }) => {
    const { data, status } = await axios.get(`${API_URL}${pathname}`, {
      headers: {
        authorization: token,
      },
    });
    return data.list;
  }
);

export const updateUserProfile = createAsyncThunk(
  "users/editProfile",
  async ({ details, token }) => {
    const response = await axios.post(
      `${API_URL}/users/editProfile`,
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
    const response = await axios.get(
      `${API_URL}/users/search/query?name=${searchQuery}`,
      {
        headers: {
          authorization: token,
        },
      }
    );

    return response.data.updatedProfile;
  }
);

export const followUser = createAsyncThunk(
  "users/followUsers",
  async (details) => {
    await axios.post(
      `${API_URL}/users/follow`,
      {
        _id: details.profileUserId,
      },
      {
        headers: {
          authorization: details.token,
        },
      }
    );

    return details;
  }
);

export const unFollowUser = createAsyncThunk(
  "users/unfollowUser",
  async (details) => {
    await axios.post(
      `${API_URL}/users/unfollow`,
      {
        _id: details.profileUserId,
      },
      {
        headers: {
          authorization: details.token,
        },
      }
    );

    return details;
  }
);
export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: {},
    userProfile: {},
    userList: {},
    connections: [],
    userProfileStatus: "idle",
    currentUserDataStatus: "idle",
    profileUpdateStatus: "idle",
    followStatus: "idle",
    unFollowStatus: "idle",
    connectionsStatus: "idle",
    error: null,
  },
  reducers: {
    userProfileReset: (state, action) => {
      state.userProfile = {};
      state.userProfileStatus = "idle";
    },
    connectionsReset: (state, action) => {
      state.connections = [];
      state.connectionsStatus = "idle";
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
    [fetchConnections.pending]: (state, action) => {
      state.connectionsStatus = "loading";
    },
    [fetchConnections.fulfilled]: (state, action) => {
      state.connections = action.payload;
      state.connectionsStatus = "succeeded";
    },
    [fetchConnections.rejected]: (state, action) => {
      state.connectionsStatus = "failed";
      state.error = action.error.message;
    },
    [updateUserProfile.pending]: (state, action) => {
      state.profileUpdateStatus = "loading";
    },
    [updateUserProfile.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
      state.userProfile = action.payload;
      state.profileUpdateStatus = "succeeded";
    },
    [updateUserProfile.rejected]: (state, action) => {
      state.profileUpdateStatus = "failed";
    },
    [followUser.pending]: (state, action) => {
      state.followStatus = "loading";
    },
    [followUser.fulfilled]: (state, action) => {
      state.currentUser.following = state.currentUser.following.concat(
        action.payload.profileUserId
      );
      if (state.userProfile.followers) {
        state.userProfile.followers = state.userProfile.followers.concat(
          action.payload.currentUserId
        );
      }
      state.followStatus = "succeeded";
    },
    [followUser.rejected]: (state, action) => {
      state.followStatus = "failed";
    },
    [unFollowUser.pending]: (state, action) => {
      state.unfollowStatus = "loading";
    },
    [unFollowUser.fulfilled]: (state, action) => {
      state.currentUser.following = state.currentUser.following.filter(
        (userId) => userId !== action.payload.profileUserId
      );
      if (state.userProfile.followers) {
        state.userProfile.followers = state.userProfile.followers.filter(
          (userId) => userId !== action.payload.currentUserId
        );
      }
      state.unfollowStatus = "succeeded";
    },
    [unFollowUser.rejected]: (state, action) => {
      state.unfollowStatus = "failed";
    },
    [logoutButtonClicked]: (state, action) => {
      state.currentUser = {};
      state.userProfile = {};
      state.userList = {};
      state.followStatus = "idle";
      state.unfollowStatus = "idle";
      state.userProfileStatus = "idle";
      state.currentUserDataStatus = "idle";
      state.profileUpdateStatus = "idle";
      state.error = null;
    },
  },
});
export const {
  userFollowed,
  userUnFollowed,
  userProfileReset,
  connectionsReset,
} = userSlice.actions;
export default userSlice.reducer;
