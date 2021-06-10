import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/users/userSlice";
import authReducer from "../features/auth/authSlice";
import postsReducer from "../features/posts/postsSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    posts: postsReducer,
  },
});
