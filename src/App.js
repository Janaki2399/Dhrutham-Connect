import React, { useEffect } from "react";
import "./App.css";
import { Navbar } from "./app/Navbar";
import { Routes, Route } from "react-router-dom";
import { Login } from "./features/auth/Login";
import { PostsList } from "./features/posts/PostsList";
import { CreatePost } from "./features/posts/CreatePost";
import { SignUp } from "./features/auth/SignUp";
import { PrivateRoute } from "./features/auth/PrivateRoute";
import { UserProfile } from "./features/users/UserProfile";
import { NotificationList } from "./features/notifications/NotificationList";
import { FollowerFollowingList } from "./features/users/FollowerFollowingList";
import { fetchCurrentUserData } from "./features/users/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Feed } from "./features/posts/Feed";

function App() {
  const status = useSelector((state) => state.user.currentUserDataStatus);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      dispatch(fetchCurrentUserData(token));
    }
  }, [dispatch, token]);

  return (
    <div className="App">
      {token && <Navbar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/feed" element={<PostsList />} /> */}
        <PrivateRoute path={"/users/:userName"} element={<UserProfile />} />
        <PrivateRoute
          path="/users/:userName/following"
          element={<FollowerFollowingList />}
        />
        <PrivateRoute
          path="/users/:userName/followers"
          element={<FollowerFollowingList />}
        />
        <PrivateRoute path={"/feed"} element={<Feed />} />
        <PrivateRoute path={"/notification"} element={<NotificationList />} />
      </Routes>
    </div>
  );
}

export default App;
