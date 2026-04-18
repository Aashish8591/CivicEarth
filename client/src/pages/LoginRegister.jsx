import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import logo from "../assets/civicEarthlogo.png";
import leftImg from "../assets/loginLeftImg.jpg";

const LoginRegister = () => {
  const [isActive, setIsActive] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [location, setLocation] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const validateRegister = () => {
    if (!fullName) return "Full name is required";
    if (!email.includes("@")) return "Invalid email";
    if (!location) return "Location required";
    if (password.length < 8) return "Password must be 8+ chars";
    if (password !== confirmPassword) return "Passwords do not match";
    return null;
  };

  const handleLogin = async () => {
    setError("");

    if (!email.includes("@")) return setError("Invalid email");
    if (!password) return setError("Password required");

    try {
      const res = await API.post("/auth/login", { email, password });

      // ✅ FIX 1: store real token (not dummy)
      localStorage.setItem("token", res.data.token);

      localStorage.setItem("role", res.data.role);
      localStorage.setItem("user", JSON.stringify(res.data));

      alert("Login successful ✅");

      navigate("/"); // ✅ FIX 2: no reload needed
      window.location.reload(); 
    } catch {
      setError("Invalid credentials ❌");
    }
  };

  const handleRegister = async () => {
    setError("");

    const err = validateRegister();
    if (err) return setError(err);

    try {
      await API.post("/auth/register", {
        fullName,
        email,
        password,
        location,
      });

      alert("Account created 🎉");
      setIsActive(false);
    } catch {
      setError("Registration failed ❌");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 relative overflow-hidden">

      {/* 🔥 MAIN CARD */}
      <div className="relative w-[1000px] h-[620px] rounded-3xl overflow-hidden shadow-2xl backdrop-blur-lg bg-white/70 border border-white/40">

        {/* 🔐 LOGIN */}
        <div className={`absolute top-0 left-0 w-1/2 h-full flex flex-col justify-center px-12 transition-all duration-700 ${isActive ? "translate-x-full opacity-0" : ""}`}>

          <img src={logo} className="w-16 mx-auto mb-4" />

          <h2 className="text-3xl font-bold text-center mb-6">Welcome Back</h2>

          <input
            className="mb-3 p-3 rounded-xl bg-white/60 backdrop-blur border focus:ring-2 focus:ring-blue-400 outline-none transition"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="mb-3 p-3 rounded-xl bg-white/60 backdrop-blur border focus:ring-2 focus:ring-blue-400 outline-none transition"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          <button
            onClick={handleLogin}
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-xl shadow-lg hover:scale-105 transition"
          >
            Login
          </button>
        </div>

        {/* 📝 REGISTER */}
        <div className={`absolute top-0 left-0 w-1/2 h-full flex flex-col justify-center px-12 transition-all duration-700 ${isActive ? "translate-x-full" : "opacity-0 pointer-events-none"}`}>

          <img src={logo} className="w-16 mx-auto mb-4" />

          <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>

          {[{p:"Full Name",v:fullName,s:setFullName},
            {p:"Email",v:email,s:setEmail},
            {p:"Location",v:location,s:setLocation}
          ].map((f,i)=>(
            <input key={i}
              className="mb-2 p-3 rounded-xl bg-white/60 backdrop-blur border focus:ring-2 focus:ring-green-400 outline-none transition"
              placeholder={f.p}
              value={f.v}
              onChange={(e)=>f.s(e.target.value)}
            />
          ))}

          <input
            className="mb-2 p-3 rounded-xl bg-white/60 border focus:ring-2 focus:ring-green-400"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <input
            className="mb-2 p-3 rounded-xl bg-white/60 border focus:ring-2 focus:ring-green-400"
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          <button
            onClick={handleRegister}
            className="bg-gradient-to-r from-green-500 to-green-700 text-white py-3 rounded-xl shadow-lg hover:scale-105 transition"
          >
            Create Account
          </button>
        </div>

        {/* 🔥 RIGHT PANEL */}
        <div className={`absolute top-0 right-0 w-1/2 h-full flex items-center justify-center transition-all duration-700 ${isActive ? "-translate-x-full" : ""}`}>

          <img src={leftImg} className="absolute w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

          <div className="relative text-center text-white">
            {!isActive ? (
              <>
                <h2 className="text-4xl font-bold">New here?</h2>
                <p className="mt-2 text-sm">Join CivicEarth today</p>
                <button
                  onClick={()=>setIsActive(true)}
                  className="mt-6 px-6 py-2 border rounded-full hover:bg-white hover:text-black transition"
                >
                  Register
                </button>
              </>
            ) : (
              <>
                <h2 className="text-4xl font-bold">Welcome Back!</h2>
                <p className="mt-2 text-sm">Already have account?</p>
                <button
                  onClick={()=>setIsActive(false)}
                  className="mt-6 px-6 py-2 border rounded-full hover:bg-white hover:text-black transition"
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