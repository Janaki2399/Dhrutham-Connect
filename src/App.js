import React, { useEffect } from "react";
import "./App.css";
import { Navbar } from "./app/Navbar";
import { Routes, Route } from "react-router-dom";
import { Login } from "./features/auth/Login";
import { PostList } from "./features/posts/PostList";
import { SignUp } from "./features/auth/SignUp";
import { UserProfile } from "./features/users/UserProfile";
import { FollowingList } from "./features/users/FollowingList";
import { FollowersList } from "./features/users/FollowersList";
import { fetchCurrentUserData } from "./features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const status = useSelector((state) => state.auth.currentUserDataStatus);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  useEffect(() => {
    if (token && status === "idle") {
      dispatch(fetchCurrentUserData(token));
    }
  }, [dispatch, token]);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/feed" element={<PostList />} />
        <Route path="/users/:userName" element={<UserProfile />} />
        <Route path="/users/:userName/following" element={<FollowingList />} />
        <Route path="/users/:userName/followers" element={<FollowersList />} />
      </Routes>
    </div>
  );
}

export default App;
