import {
  bindActionCreators,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { isValidElement } from "react";
import axios from "axios";

export const userLogin = createAsyncThunk("/login", async (loginDetails) => {
  const response = await axios.post(
    "https://dhrutham-connect-backend.janaki23.repl.co/login",
    loginDetails
  );
  return response.data.token;
});

export const userSignUp = createAsyncThunk("/signUp", async (signUpDetails) => {
  const response = await axios.post(
    "https://dhrutham-connect-backend.janaki23.repl.co/signup",
    signUpDetails
  );
  return response.data.token;
});
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    loginStatus: "idle",
    signUpStatus: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: {
    [userLogin.pending]: (state, action) => {
      state.loginStatus = "idle";
    },
    [userLogin.fulfilled]: (state, action) => {
      state.token = action.payload;
      state.loginStatus = "succeeded";
    },
    [userLogin.rejected]: (state, action) => {
      state.loginStatus = "failed";
      state.token = action.error.message;
    },
    [userSignUp.pending]: (state, action) => {
      state.signUpStatus = "idle";
    },
    [userSignUp.fulfilled]: (state, action) => {
      state.signUpStatus = "succeeded";
      state.token = action.payload;
    },
    [userSignUp.rejected]: (state, action) => {
      state.signUpStatus = "failed";
      state.token = action.error.message;
    },
  },
});

export default authSlice.reducer;
