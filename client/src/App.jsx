import React from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./pages/LoginRegister";
import Feed from "./pages/Feed";
import UserProfile from "./pages/UserProfile";
import UserLayout from "./components/UserLayout";
import AuthorityLayout from "./components/AuthorityLayout";
import Discover from "./pages/Discover";
import CreatePost from "./pages/CreatePost";
import Messages from "./pages/Messages";
//import AuthorityDashboard from "./pages/AuthorityDashboard";

const App = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return (
    <>
      <Toaster />

      <Routes>
        <Route
          path="/"
          element={
            !token ? (
              <Login />
            ) : role === "ADMIN" ? (
              <AuthorityLayout />
            ) : (
              <UserLayout />
            )
          }
        >
          {/* USER ROUTES */}
          {role !== "ADMIN" && (
            <>
              <Route index element={<Feed />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="discover" element={<Discover/>}/>
              <Route path="messages" element={<Messages/>}/>
              <Route path="/create-post" element={<CreatePost/>}/>
            </>
          )}

          {/* ADMIN ROUTES */}
          {role === "ADMIN" && (
            <>
              <Route index element={<AuthorityDashboard />} />
              <Route path="admin" element={<AuthorityDashboard />} />
            </>
          )}
        </Route>
      </Routes>
    </>
  );
};

export default App;