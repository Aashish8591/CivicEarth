import React, { useState } from "react";
import logo from "../assets/civicEarthlogo.png";
import leftImg from "../assets/loginLeftImg.jpg";

const LoginRegister = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className="h-screen flex items-center justify-center 
      bg-gradient-to-r from-blue-100 via-blue-200 to-cyan-200 
      relative overflow-hidden"
    >
      {/* 🔥 Glow Effects */}
      <div className="absolute w-[500px] h-[500px] bg-blue-400 opacity-30 rounded-full blur-3xl top-10 left-1/2 -translate-x-1/2 animate-float"></div>
      <div className="absolute w-[400px] h-[400px] bg-cyan-300 opacity-20 rounded-full blur-3xl bottom-10 right-20 animate-float"></div>
      <div className="absolute w-[300px] h-[300px] bg-purple-300 opacity-20 rounded-full blur-3xl top-1/2 left-10 animate-float"></div>

      {/* MAIN CONTAINER */}
      <div className="relative w-[1000px] h-[590px] bg-white rounded-3xl shadow-2xl overflow-hidden z-10">

        {/* SIGN IN */}
        <div
          className={`absolute top-0 left-0 w-1/2 h-full flex flex-col justify-start pt-10 px-10 transition-all duration-700 z-20 
          ${isActive ? "translate-x-full opacity-0 pointer-events-none" : ""}`}
        >
          {/* Logo */}
          <div className="w-full flex justify-center mb-2">
            <img src={logo} alt="logo" className="w-20 object-contain" />
          </div>

          <h2 className="text-3xl font-bold mb-3 text-center">Sign In</h2>

          <p className="text-base text-gray-700 mb-2 w-full text-left">
            Login / Email
          </p>

          <input
            className="mb-3 w-full p-3 border rounded-full bg-gray-100 outline-none shadow-sm hover:shadow-md focus:ring-2 focus:ring-blue-400 focus:bg-white transition"
            placeholder="Enter your email"
          />

          <p className="text-base text-gray-700 mb-2 w-full text-left">
            Password
          </p>

          <input
            className="mb-3 w-full p-3 border rounded-full bg-gray-100 outline-none shadow-sm hover:shadow-md focus:ring-2 focus:ring-blue-400 focus:bg-white transition"
            placeholder="Enter password"
            type="password"
          />

          {/* Checkbox */}
          <div className="flex items-center text-sm mb-3 w-full">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              I'm not a robot
            </label>
          </div>

          {/* Terms */}
          <p className="text-xs text-gray-400 mb-4 w-full text-left">
            I agree to <span className="text-blue-500">Terms of use</span>
          </p>

          <button className="bg-gradient-to-r from-blue-600 to-cyan-400 text-white px-6 py-2 rounded-full w-full shadow-md hover:scale-105 transition duration-300">
            Sign In
          </button>
        </div>

        {/* SIGN UP */}
        <div
          className={`absolute top-0 left-0 w-1/2 h-full flex flex-col justify-start pt-10 px-10 transition-all duration-700 z-10 
          ${isActive ? "translate-x-full" : "opacity-0 pointer-events-none"}`}
        >
          {/* Logo */}
          <div className="w-full flex justify-center -mt-7 -mb-2">
            <img src={logo} alt="logo" className="w-20 object-contain" />
          </div>

          <h2 className="text-3xl font-bold mb-2 text-center">
            Create an account
          </h2>

          <p className="text-base text-gray-700 mb-1 w-full text-left">
            Full Name
          </p>
          <input
            className="mb-2 w-full p-2 border rounded-full shadow-sm hover:shadow-md focus:ring-2 focus:ring-blue-400 focus:bg-white transition"
            placeholder="Enter your name"
          />

          <p className="text-base text-gray-700 mb-1 w-full text-left">
            User Id
          </p>
          <input
            className="mb-2 w-full p-2 border rounded-full shadow-sm hover:shadow-md focus:ring-2 focus:ring-blue-400 focus:bg-white transition"
            placeholder="User Id"
          />

          <p className="text-base text-gray-700 mb-1 w-full text-left">
            Email
          </p>
          <input
            className="mb-2 w-full p-2 border rounded-full shadow-sm hover:shadow-md focus:ring-2 focus:ring-blue-400 focus:bg-white transition"
            placeholder="Email"
          />

          <p className="text-base text-gray-700 mb-1 w-full text-left">
            Password
          </p>
          <input
            className="mb-2 w-full p-2 border rounded-full shadow-sm hover:shadow-md focus:ring-2 focus:ring-blue-400 focus:bg-white transition"
            placeholder="Password"
            type="password"
          />

          <p className="text-base text-gray-700 mb-1 w-full text-left">
            Confirm Password
          </p>
          <input
            className="mb-4 w-full p-2 border rounded-full shadow-sm hover:shadow-md focus:ring-2 focus:ring-blue-400 focus:bg-white transition"
            placeholder="Password"
            type="password"
          />

          <button className="bg-blue-500 text-white px-6 py-2 rounded-full w-full shadow-md hover:scale-105 transition duration-300">
            Register
          </button>
        </div>

        {/* OVERLAY PANEL */}
        <div
          className={`absolute top-0 right-0 w-1/2 h-full text-white flex flex-col items-center justify-center px-10 transition-all duration-700 overflow-hidden
          ${isActive ? "-translate-x-full rounded-r-[100px]" : "rounded-l-[100px]"}`}
        >
          {/* BACKGROUND IMAGE */}
          <img
            src={leftImg}
            alt="bg"
            className="absolute inset-0 w-full h-full object-cover blur-[2px] scale-110"
          />

          {/* COLOR OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-700/20 to-cyan-800/50"></div>

          {/* CONTENT */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center">
            {!isActive ? (
              <>
                <h2 className="text-3xl font-bold">Hello, Friend!</h2>
                <p className="mt-2">Register with your personal details</p>

                <button
                  onClick={() => setIsActive(true)}
                  className="mt-5 border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black hover:scale-105 transition duration-300"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold">Welcome Back!</h2>
                <p className="mt-2">Already have an account?</p>

                <button
                  onClick={() => setIsActive(false)}
                  className="mt-5 border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black hover:scale-105 transition duration-300"
                >
                  Sign In
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