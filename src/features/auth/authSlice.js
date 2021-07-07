import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../constants";

import axios from "axios";
const { token: savedToken } = JSON.parse(localStorage?.getItem("login")) || {
  token: null,
};
export const userLogin = createAsyncThunk(
  "/login",
  async (loginDetails, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, loginDetails);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const userSignUp = createAsyncThunk(
  "/signUp",
  async (signUpDetails, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, signUpDetails);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutButtonClicked = createAction("/posts/logout");
const initialState = {
  token: savedToken,
  loginStatus: "idle",
  signUpStatus: "idle",
  currentUserDataStatus: "idle",
  error: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,

  reducers: {},
  extraReducers: {
    [userLogin.pending]: (state, action) => {
      state.loginStatus = "loading";
    },
    [userLogin.fulfilled]: (state, action) => {
      state.token = action.payload.token;
      state.loginStatus = "succeeded";
    },
    [userLogin.rejected]: (state, action) => {
      state.loginStatus = "failed";
      state.error = action.payload.errorMessage;
    },
    [userSignUp.pending]: (state, action) => {
      state.signUpStatus = "loading";
    },
    [userSignUp.fulfilled]: (state, action) => {
      state.token = action.payload.token;
      state.signUpStatus = "succeeded";
    },
    [userSignUp.rejected]: (state, action) => {
      state.signUpStatus = "failed";
      state.error = action.payload.errorMessage;
    },
    [logoutButtonClicked]: (state, action) => {
      state.token = null;
      state.loginStatus = "idle";
      state.signUpStatus = "idle";
      state.currentUserDataStatus = "idle";
      state.error = null;
    },
  },
});
export const { authReset, userFollowed } = authSlice.actions;
export default authSlice.reducer;
