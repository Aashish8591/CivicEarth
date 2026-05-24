import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import logo from "../assets/civicEarthlogo.png";
import leftImg from "../assets/loginLeftImg.jpg";

const LoginRegister = () => {
  const navigate = useNavigate();

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

  const [role, setRole] = useState("USER");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const departments = [
    { label: "Roads", value: "ROAD" },
    { label: "Water Supply", value: "WATER" },
    { label: "Drainage", value: "DRAINAGE" },
    { label: "Garbage", value: "GARBAGE" },
    { label: "Electricity", value: "ELECTRICITY" },
  ];

  const validateRegister = () => {
    if (!fullName) return "Full name is required";

    if (!registerEmail.includes("@")) {
      return "Invalid email";
    }

    if (!location) return "Location required";

    if (registerPassword.length < 6) {
      return "Password must be 6+ chars";
    }

    if (registerPassword !== confirmPassword) {
      return "Passwords do not match";
    }

    if (role === "ADMIN") {
      if (!department) return "Department required";

      if (!adminCode) return "Admin code required";
    }

    return null;
  };

  // LOGIN
  const handleLogin = async () => {
    setError("");

    if (!loginEmail.includes("@")) {
      return setError("Invalid email");
    }

    if (!loginPassword) {
      return setError("Password required");
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/login", {
        email: loginEmail,
        password: loginPassword,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      if (res.data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );
      }

      window.dispatchEvent(
        new Event("authChanged")
      );

      if (res.data.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (err) {
      console.log(err);
      setError("Invalid credentials ❌");
    } finally {
      setLoading(false);
    }
  };

  // REGISTER
  const handleRegister = async () => {
    setError("");

    const err = validateRegister();

    if (err) return setError(err);

    try {
      setLoading(true);

      await API.post("/auth/register", {
        fullName,
        email: registerEmail,
        password: registerPassword,
        location,
        role,
        department,
        adminCode,
      });

      alert("Account created 🎉");

      setFullName("");
      setRegisterEmail("");
      setRegisterPassword("");
      setConfirmPassword("");
      setLocation("");
      setDepartment("");
      setAdminCode("");
      setRole("USER");

      setIsActive(false);

    } catch (err) {
      console.log(err);
      setError("Registration failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 overflow-y-auto">

      {/* MOBILE TOGGLE */}
      <div className="md:hidden fixed top-5 z-50 flex bg-white p-1 rounded-full shadow-md">
        <button
          onClick={() => setIsActive(false)}
          className={`px-6 py-2 rounded-full text-sm font-medium transition duration-200 ${
            !isActive
              ? "bg-blue-600 text-white"
              : "text-gray-700"
          }`}
        >
          Login
        </button>

        <button
          onClick={() => setIsActive(true)}
          className={`px-6 py-2 rounded-full text-sm font-medium transition duration-200 ${
            isActive
              ? "bg-green-600 text-white"
              : "text-gray-700"
          }`}
        >
          Register
        </button>
      </div>

      {/* MAIN CONTAINER */}
      <div className="relative w-full max-w-5xl bg-white shadow-md md:rounded-3xl overflow-hidden md:h-[620px]">

        {/* LOGIN */}
        {!isActive && (
          <div className="w-full md:w-1/2 min-h-screen md:min-h-full flex flex-col justify-center px-6 md:px-12 bg-white">

            <div className="w-full max-w-md mx-auto">

              <img
                src={logo}
                className="w-16 mx-auto mb-5"
                loading="lazy"
                alt="logo"
              />

              <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">
                Welcome Back
              </h2>

              <input
                className="w-full mb-4 px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email"
                value={loginEmail}
                onChange={(e) =>
                  setLoginEmail(e.target.value)
                }
              />

              <input
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) =>
                  setLoginPassword(e.target.value)
                }
                className="w-full mb-4 px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500"
              />

              {error && (
                <p className="text-red-500 text-sm mb-3">
                  {error}
                </p>
              )}

              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full py-4 rounded-2xl font-semibold text-white bg-blue-600 hover:bg-blue-700 transition duration-200 disabled:opacity-60"
              >
                {loading ? "Please wait..." : "Login"}
              </button>

            </div>
          </div>
        )}

        {/* REGISTER */}
        {isActive && (
          <div className="w-full md:w-1/2 min-h-screen md:min-h-full overflow-y-auto px-6 md:px-12 pt-24 md:pt-8 bg-white">

            <div className="w-full max-w-md mx-auto pb-10">

              <img
                src={logo}
                className="w-16 mx-auto mb-5"
                loading="lazy"
                alt="logo"
              />

              <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
                Create Account
              </h2>

              {/* ROLE */}
              <div className="flex bg-gray-100 rounded-2xl p-1 mb-4">

                <button
                  type="button"
                  onClick={() => setRole("USER")}
                  className={`flex-1 py-3 rounded-xl text-sm font-medium transition duration-200 ${
                    role === "USER"
                      ? "bg-blue-600 text-white"
                      : "text-gray-600"
                  }`}
                >
                  User
                </button>

                <button
                  type="button"
                  onClick={() => setRole("ADMIN")}
                  className={`flex-1 py-3 rounded-xl text-sm font-medium transition duration-200 ${
                    role === "ADMIN"
                      ? "bg-green-600 text-white"
                      : "text-gray-600"
                  }`}
                >
                  Authority
                </button>
              </div>

              <input
                placeholder="Full Name"
                value={fullName}
                onChange={(e) =>
                  setFullName(e.target.value)
                }
                className="w-full mb-4 px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50 outline-none focus:ring-2 focus:ring-green-500"
              />

              <input
                placeholder="Email"
                value={registerEmail}
                onChange={(e) =>
                  setRegisterEmail(e.target.value)
                }
                className="w-full mb-4 px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50 outline-none focus:ring-2 focus:ring-green-500"
              />

              <input
                placeholder="Location"
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
                className="w-full mb-4 px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50 outline-none focus:ring-2 focus:ring-green-500"
              />

              {role === "ADMIN" && (
                <>
                  <select
                    value={department}
                    onChange={(e) =>
                      setDepartment(e.target.value)
                    }
                    className="w-full mb-4 px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50 outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">
                      Select Department
                    </option>

                    {departments.map((dept) => (
                      <option
                        key={dept.value}
                        value={dept.value}
                      >
                        {dept.label}
                      </option>
                    ))}
                  </select>

                  <input
                    placeholder="Admin Code"
                    value={adminCode}
                    onChange={(e) =>
                      setAdminCode(e.target.value)
                    }
                    className="w-full mb-4 px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50 outline-none focus:ring-2 focus:ring-green-500"
                  />
                </>
              )}

              <input
                type="password"
                placeholder="Password"
                value={registerPassword}
                onChange={(e) =>
                  setRegisterPassword(e.target.value)
                }
                className="w-full mb-4 px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50 outline-none focus:ring-2 focus:ring-green-500"
              />

              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                className="w-full mb-4 px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50 outline-none focus:ring-2 focus:ring-green-500"
              />

              {error && (
                <p className="text-red-500 text-sm mb-3">
                  {error}
                </p>
              )}

              <button
                onClick={handleRegister}
                disabled={loading}
                className="w-full py-4 rounded-2xl font-semibold text-white bg-green-600 hover:bg-green-700 transition duration-200 disabled:opacity-60"
              >
                {loading
                  ? "Please wait..."
                  : "Register"}
              </button>

            </div>
          </div>
        )}

        {/* DESKTOP RIGHT IMAGE */}
        <div className="hidden md:flex absolute right-0 top-0 w-1/2 h-full items-center justify-center">

          <img
            src={leftImg}
            loading="lazy"
            alt="background"
            className="absolute w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/40"></div>

          <div className="relative text-white text-center px-6">

            {!isActive ? (
              <>
                <h2 className="text-5xl font-bold">
                  New here?
                </h2>

                <button
                  onClick={() => setIsActive(true)}
                  className="mt-6 px-8 py-3 border rounded-full hover:bg-white hover:text-black transition duration-200"
                >
                  Register
                </button>
              </>
            ) : (
              <>
                <h2 className="text-5xl font-bold">
                  Welcome Back!
                </h2>

                <button
                  onClick={() => setIsActive(false)}
                  className="mt-6 px-8 py-3 border rounded-full hover:bg-white hover:text-black transition duration-200"
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