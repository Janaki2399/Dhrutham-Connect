import React from "react";
import "./App.css";
import { Navbar } from "./app/Navbar";
import { Routes, Route } from "react-router-dom";
import { Login } from "./features/auth/Login";
import { PostList } from "./features/posts/PostList";
import { SignUp } from "./features/auth/SignUp";
import { UserProfile } from "./features/users/UserProfile";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/feed" element={<PostList />} />
        <Route path="/:userName" element={<UserProfile />} />
      </Routes>
    </div>
  );
}

export default App;
