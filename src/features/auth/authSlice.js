import {
  bindActionCreators,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

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

const initialState = {
  token: savedToken,
  // currentUser: {},
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
      state.token = null;
      state.loginStatus = "idle";
      state.signUpStatus = "idle";
    },
    userFollowed: (state, action) => {
      state.currentUser.following.push(action.payload);
    },
  },
  extraReducers: {
    [userLogin.pending]: (state, action) => {
      state.loginStatus = "idle";
    },
    [userLogin.fulfilled]: (state, action) => {
      state.token = action.payload.token;
      state.loginStatus = "succeeded";
    },
    [userLogin.rejected]: (state, action) => {
      state.loginStatus = "failed";
      state.error = action.error;
    },
    [userSignUp.pending]: (state, action) => {
      state.signUpStatus = "idle";
    },
    [userSignUp.fulfilled]: (state, action) => {
      state.token = action.payload.token;
      state.signUpStatus = "succeeded";
    },
    [userSignUp.rejected]: (state, action) => {
      state.signUpStatus = "failed";
      state.error = action.error.message;
    },
  },
});
export const { logoutButtonClicked, userFollowed } = authSlice.actions;
export default authSlice.reducer;
