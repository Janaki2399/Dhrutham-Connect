import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/users/userSlice";
import authReducer from "../features/auth/authSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});
