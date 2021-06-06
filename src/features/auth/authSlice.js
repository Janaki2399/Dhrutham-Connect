import {
  bindActionCreators,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { isValidElement } from "react";
import axios from "axios";
const { token: savedToken } = JSON.parse(localStorage?.getItem("login")) || {
  token: null,
};
export const userLogin = createAsyncThunk("/login", async (loginDetails) => {
  const response = await axios.post(
    "https://dhrutham-connect-backend.janaki23.repl.co/login",
    loginDetails
  );
  return response.data;
});

export const userSignUp = createAsyncThunk("/signUp", async (signUpDetails) => {
  const response = await axios.post(
    "https://dhrutham-connect-backend.janaki23.repl.co/signup",
    signUpDetails
  );
  return response.data;
});
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

const initialState = {
  token: savedToken,
  currentUser: {},
  loginStatus: "idle",
  signUpStatus: "idle",
  currentUserDataStatus: "idle",
  error: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,

  reducers: {
    logoutButtonClicked: (state, action) => {
      // state = initialState;
      state.token = null;
      state.loginStatus = "idle";
      state.signUpStatus = "idle";
      state.currentUser = {};
    },
  },
  extraReducers: {
    [userLogin.pending]: (state, action) => {
      state.loginStatus = "idle";
    },
    [userLogin.fulfilled]: (state, action) => {
      state.token = action.payload.token;
      state.currentUser = action.payload.userDetails;
      state.loginStatus = "succeeded";
    },
    [userLogin.rejected]: (state, action) => {
      state.loginStatus = "failed";
      state.error = action.error.message;
    },
    [userSignUp.pending]: (state, action) => {
      state.signUpStatus = "idle";
    },
    [userSignUp.fulfilled]: (state, action) => {
      state.token = action.payload.token;
      state.currentUser = action.payload.userDetails;
      state.signUpStatus = "succeeded";
    },
    [userSignUp.rejected]: (state, action) => {
      state.signUpStatus = "failed";
      state.error = action.error.message;
    },
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
  },
});
export const { logoutButtonClicked } = authSlice.actions;
export default authSlice.reducer;
