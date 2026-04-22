// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api";
// import logo from "../assets/civicEarthlogo.png";
// import leftImg from "../assets/loginLeftImg.jpg";

// const LoginRegister = () => {
//   const [isActive, setIsActive] = useState(false);

//   // 🔥 LOGIN STATE
//   const [loginEmail, setLoginEmail] = useState("");
//   const [loginPassword, setLoginPassword] = useState("");

//   // 🔥 REGISTER STATE
//   const [fullName, setFullName] = useState("");
//   const [registerEmail, setRegisterEmail] = useState("");
//   const [location, setLocation] = useState("");
//   const [registerPassword, setRegisterPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const [error, setError] = useState("");

//   const navigate = useNavigate();

//   // 🔥 VALIDATION
//   const validateRegister = () => {
//     if (!fullName) return "Full name is required";
//     if (!registerEmail.includes("@")) return "Invalid email";
//     if (!location) return "Location required";
//     if (registerPassword.length < 6) return "Password must be 6+ chars";
//     if (registerPassword !== confirmPassword) return "Passwords do not match";
//     return null;
//   };

//   // 🔥 LOGIN
//   const handleLogin = async () => {
//     setError("");

//     if (!loginEmail.includes("@")) return setError("Invalid email");
//     if (!loginPassword) return setError("Password required");

//     try {
//       const res = await API.post("/auth/login", {
//         email: loginEmail,
//         password: loginPassword,
//       });

//       // ✅ STORE CORRECT DATA
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("role", res.data.role);
//       if (res.data.user) {
//         localStorage.setItem("user", JSON.stringify(res.data.user));
//       } else {
//         localStorage.removeItem("user");
//       }

//       alert("Login successful ✅");

//       window.dispatchEvent(new Event("authChanged"));

//       navigate("/"); // no reload
//     } catch (err) {
//       console.log(err);
//       setError("Invalid credentials ❌");
//     }
//   };

//   // 🔥 REGISTER
//   const handleRegister = async () => {
//     setError("");

//     const err = validateRegister();
//     if (err) return setError(err);

//     try {
//       await API.post("/auth/register", {
//         fullName,
//         email: registerEmail,
//         password: registerPassword,
//         location,
//       });

//       alert("Account created 🎉");

//       // reset fields
//       setFullName("");
//       setRegisterEmail("");
//       setRegisterPassword("");
//       setConfirmPassword("");
//       setLocation("");

//       setIsActive(false); // switch to login
//     } catch (err) {
//       console.log(err);
//       setError("Registration failed ❌");
//     }
//   };

//   return (
//     <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200">
//       <div className="relative w-[1000px] h-[620px] rounded-3xl overflow-hidden shadow-2xl bg-white/70 backdrop-blur-lg">
//         {/* 🔐 LOGIN */}
//         <div
//           className={`absolute w-1/2 h-full flex flex-col justify-center px-12 transition-all duration-700 ${isActive ? "translate-x-full opacity-0" : ""}`}
//         >
//           <img src={logo} className="w-16 mx-auto mb-4" />

//           <h2 className="text-3xl font-bold text-center mb-6">Welcome Back</h2>

//           <input
//             className="mb-3 p-3 rounded-xl border outline-none"
//             placeholder="Email"
//             value={loginEmail}
//             onChange={(e) => setLoginEmail(e.target.value)}
//           />

//           <input
//             className="mb-3 p-3 rounded-xl border outline-none"
//             placeholder="Password"
//             type="password"
//             value={loginPassword}
//             onChange={(e) => setLoginPassword(e.target.value)}
//           />

//           {error && <p className="text-red-500 text-sm">{error}</p>}

//           <button
//             onClick={handleLogin}
//             className="bg-blue-600 text-white py-3 rounded-xl mt-3"
//           >
//             Login
//           </button>
//         </div>

//         {/* 📝 REGISTER */}
//         <div
//           className={`absolute w-1/2 h-full flex flex-col justify-center px-12 transition-all duration-700 ${isActive ? "translate-x-full" : "opacity-0 pointer-events-none"}`}
//         >
//           <img src={logo} className="w-16 mx-auto mb-4" />

//           <h2 className="text-3xl font-bold text-center mb-6">
//             Create Account
//           </h2>

//           <input
//             placeholder="Full Name"
//             value={fullName}
//             onChange={(e) => setFullName(e.target.value)}
//             className="mb-2 p-3 rounded-xl border"
//           />

//           <input
//             placeholder="Email"
//             value={registerEmail}
//             onChange={(e) => setRegisterEmail(e.target.value)}
//             className="mb-2 p-3 rounded-xl border"
//           />

//           <input
//             placeholder="Location"
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//             className="mb-2 p-3 rounded-xl border"
//           />

//           <input
//             placeholder="Password"
//             type="password"
//             value={registerPassword}
//             onChange={(e) => setRegisterPassword(e.target.value)}
//             className="mb-2 p-3 rounded-xl border"
//           />

//           <input
//             placeholder="Confirm Password"
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             className="mb-2 p-3 rounded-xl border"
//           />

//           {error && <p className="text-red-500 text-sm">{error}</p>}

//           <button
//             onClick={handleRegister}
//             className="bg-green-600 text-white py-3 rounded-xl mt-3"
//           >
//             Register
//           </button>
//         </div>

//         {/* 🔥 RIGHT PANEL */}
//         <div
//           className={`absolute right-0 w-1/2 h-full flex items-center justify-center transition-all duration-700 ${isActive ? "-translate-x-full" : ""}`}
//         >
//           <img src={leftImg} className="absolute w-full h-full object-cover" />
//           <div className="absolute inset-0 bg-black/50"></div>

//           <div className="relative text-white text-center">
//             {!isActive ? (
//               <>
//                 <h2 className="text-4xl font-bold">New here?</h2>
//                 <button
//                   onClick={() => setIsActive(true)}
//                   className="mt-6 px-6 py-2 border rounded-full"
//                 >
//                   Register
//                 </button>
//               </>
//             ) : (
//               <>
//                 <h2 className="text-4xl font-bold">Welcome Back!</h2>
//                 <button
//                   onClick={() => setIsActive(false)}
//                   className="mt-6 px-6 py-2 border rounded-full"
//                 >
//                   Login
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginRegister;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import logo from "../assets/civicEarthlogo.png";
import leftImg from "../assets/loginLeftImg.jpg";

const LoginRegister = () => {
  const [isActive, setIsActive] = useState(false);

  const [department, setDepartment] = useState("");
  const [adminCode, setAdminCode] = useState("");

  // LOGIN
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // REGISTER
  const [fullName, setFullName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [location, setLocation] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 🔥 NEW ROLE STATE
  const [role, setRole] = useState("USER");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const validateRegister = () => {
    if (!fullName) return "Full name is required";
    if (!registerEmail.includes("@")) return "Invalid email";
    if (!location) return "Location required";
    if (registerPassword.length < 6) return "Password must be 6+ chars";
    if (registerPassword !== confirmPassword) return "Passwords do not match";

    // 🔥 NEW VALIDATION
    if (role === "ADMIN") {
      if (!department) return "Department required for authority";
      if (!adminCode) return "Admin code required";
    }

    return null;
  };

  // 🔐 LOGIN
  const handleLogin = async () => {
    setError("");

    if (!loginEmail.includes("@")) return setError("Invalid email");
    if (!loginPassword) return setError("Password required");

    try {
      const res = await API.post("/auth/login", {
        email: loginEmail,
        password: loginPassword,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }

      window.dispatchEvent(new Event("authChanged"));

      // 🔥 ROLE BASED REDIRECT
      if (res.data.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      setError("Invalid credentials ❌");
    }
  };

  // 📝 REGISTER
  const handleRegister = async () => {
    setError("");

    const err = validateRegister();
    if (err) return setError(err);

    try {
      await API.post("/auth/register", {
        fullName,
        email: registerEmail,
        password: registerPassword,
        location,
        role,
        department, // 🔥 NEW
        adminCode, // 🔥 NEW
      });

      alert("Account created 🎉");

      setFullName("");
      setRegisterEmail("");
      setRegisterPassword("");
      setConfirmPassword("");
      setLocation("");
      setRole("USER");

      setIsActive(false);
    } catch (err) {
      console.log(err);
      setError("Registration failed ❌");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200">
      <div className="relative w-[1000px] h-[620px] rounded-3xl overflow-hidden shadow-2xl bg-white/70 backdrop-blur-lg">
        {/* LOGIN */}
        <div
          className={`absolute w-1/2 h-full flex flex-col justify-center px-12 transition-all duration-700 ${isActive ? "translate-x-full opacity-0" : ""}`}
        >
          <img src={logo} className="w-16 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-center mb-6">Welcome Back</h2>

          <input
            className="mb-3 p-3 rounded-xl border"
            placeholder="Email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />

          <input
            className="mb-3 p-3 rounded-xl border"
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            onClick={handleLogin}
            className="bg-blue-600 text-white py-3 rounded-xl mt-3"
          >
            Login
          </button>
        </div>

        {/* REGISTER */}
        <div
          className={`absolute w-1/2 h-full flex flex-col justify-start px-12 pt-6 overflow-y-auto transition-all duration-700 ${isActive ? "translate-x-full" : "opacity-0 pointer-events-none"}`}
        >
          <img src={logo} className="w-16 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-center mb-6">
            Create Account
          </h2>

          {/* 🔥 ROLE SELECT (ONLY ADDITION) */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mb-2 p-3 rounded-xl border"
          >
            <option value="USER">User</option>
            <option value="ADMIN">Authority</option>
          </select>

          <input
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mb-2 p-3 rounded-xl border"
          />

          <input
            placeholder="Email"
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
            className="mb-2 p-3 rounded-xl border"
          />

          <input
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mb-2 p-3 rounded-xl border"
          />

          {/* 🔥 ONLY SHOW FOR ADMIN */}
          {role === "ADMIN" && (
            <>
              <input
                placeholder="Department (e.g. Municipal, Police)"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="mb-2 p-3 rounded-xl border"
              />

              <input
                placeholder="Admin Code"
                value={adminCode}
                onChange={(e) => setAdminCode(e.target.value)}
                className="mb-2 p-3 rounded-xl border"
              />
            </>
          )}

          <input
            placeholder="Password"
            type="password"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
            className="mb-2 p-3 rounded-xl border"
          />

          <input
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mb-2 p-3 rounded-xl border"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            onClick={handleRegister}
            className="bg-green-600 text-white py-3 rounded-xl mt-3"
          >
            Register
          </button>
        </div>

        {/* RIGHT PANEL */}
        <div
          className={`absolute right-0 w-1/2 h-full flex items-center justify-center transition-all duration-700 ${isActive ? "-translate-x-full" : ""}`}
        >
          <img src={leftImg} className="absolute w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50"></div>

          <div className="relative text-white text-center">
            {!isActive ? (
              <>
                <h2 className="text-4xl font-bold">New here?</h2>
                <button
                  onClick={() => setIsActive(true)}
                  className="mt-6 px-6 py-2 border rounded-full"
                >
                  Register
                </button>
              </>
            ) : (
              <>
                <h2 className="text-4xl font-bold">Welcome Back!</h2>
                <button
                  onClick={() => setIsActive(false)}
                  className="mt-6 px-6 py-2 border rounded-full"
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
