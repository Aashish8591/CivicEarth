// import React, { useEffect, useState } from "react";
// import { Route, Routes, Navigate } from "react-router-dom";
// import { Toaster } from "react-hot-toast";

// import Login from "./pages/LoginRegister";
// import Feed from "./pages/Feed";
// import UserProfile from "./pages/UserProfile";
// import UserLayout from "./components/UserLayout";
// import AuthorityLayout from "./components/AuthorityLayout";
// import Discover from "./pages/Discover";
// import CreatePost from "./pages/CreatePost";
// import Notifications from "./pages/Notifications";
// import AuthorityDashboard from "./pages/AuthorityDashboard";
// import AuthorityComplaints from "./pages/AuthorityComplaints";
// import AuthorityAnalytics from "./pages/AuthorityAnalytics";
// import AuthorityProfile from "./pages/AuthorityProfile";
// import PostDetails from "./pages/PostDetails";

// const App = () => {
//   const [token, setToken] = useState(localStorage.getItem("token"));
//   const [role, setRole] = useState(localStorage.getItem("role"));

//   useEffect(() => {
//     const updateAuth = () => {
//       setToken(localStorage.getItem("token"));
//       setRole(localStorage.getItem("role"));
//     };

//     window.addEventListener("authChanged", updateAuth);
//     return () => window.removeEventListener("authChanged", updateAuth);
//   }, []);

//   return (
//     <>
//       <Toaster />

//       <Routes>
//         {!token && (
//           <>
//             <Route path="/login" element={<Login />} />
//             <Route path="*" element={<Navigate to="/login" />} />
//           </>
//         )}

//         {token && role !== "ADMIN" && (
//           <Route path="/" element={<UserLayout />}>
//             <Route index element={<Feed />} />
//             <Route path="profile" element={<UserProfile />} />
//             <Route path="discover" element={<Discover />} />
//             <Route path="notifications" element={<Notifications />} />
//             <Route path="create-post" element={<CreatePost />} />
//             <Route path="post/:id" element={<PostDetails />} />
//             <Route path="profile/:id" element={<UserProfile />} />
//           </Route>
//         )}

//         {token && role === "ADMIN" && (
//           <>
//             <Route path="/" element={<Navigate to="/admin" />} />

//             <Route path="/admin" element={<AuthorityLayout />}>
//               <Route index element={<AuthorityDashboard />} />
//               <Route path="complaints" element={<AuthorityComplaints />} />
//               <Route path="analytics" element={<AuthorityAnalytics />} />
//               <Route path="profile" element={<AuthorityProfile />} />
//             </Route>
//           </>
//         )}
//       </Routes>
//     </>
//   );
// };

// export default App;

import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./pages/LoginRegister";
import Feed from "./pages/Feed";
import UserProfile from "./pages/UserProfile";
import UserLayout from "./components/UserLayout";
import AuthorityLayout from "./components/AuthorityLayout";
import Discover from "./pages/Discover";
import CreatePost from "./pages/CreatePost";
import Notifications from "./pages/Notifications";
import AuthorityDashboard from "./pages/AuthorityDashboard";
import AuthorityComplaints from "./pages/AuthorityComplaints";
import AuthorityAnalytics from "./pages/AuthorityAnalytics";
import AuthorityProfile from "./pages/AuthorityProfile";
import PostDetails from "./pages/PostDetails";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const [role, setRole] = useState(localStorage.getItem("role"));

  useEffect(() => {
    const updateAuth = () => {
      setToken(localStorage.getItem("token"));
      setRole(localStorage.getItem("role"));
    };

    window.addEventListener("authChanged", updateAuth);

    return () => {
      window.removeEventListener("authChanged", updateAuth);
    };
  }, []);

  return (
    <>
      <Toaster position="top-center" />

      <Routes>
        {/* LOGIN */}
        <Route
          path="/login"
          element={
            !token ? (
              <Login />
            ) : role === "ADMIN" ? (
              <Navigate to="/admin" />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* USER */}
        <Route
          path="/"
          element={
            token ? (
              role === "ADMIN" ? (
                <Navigate to="/admin" />
              ) : (
                <UserLayout />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          <Route index element={<Feed />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="profile/:id" element={<UserProfile />} />
          <Route path="discover" element={<Discover />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="create-post" element={<CreatePost />} />
          <Route path="post/:id" element={<PostDetails />} />
        </Route>

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            token && role === "ADMIN" ? (
              <AuthorityLayout />
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          <Route index element={<AuthorityDashboard />} />
          <Route path="complaints" element={<AuthorityComplaints />} />
          <Route path="analytics" element={<AuthorityAnalytics />} />
          <Route path="profile" element={<AuthorityProfile />} />
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
};

export default App;
