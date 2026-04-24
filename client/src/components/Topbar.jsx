import { Bell, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Topbar = () => {
  const [user, setUser] = useState(null);

  // 🔥 Safe load user
  const loadUser = () => {
    try {
      const data = JSON.parse(localStorage.getItem("user"));
      setUser(data);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    loadUser(); // first load

    const handleUserUpdate = () => {
      loadUser(); // update when profile changes
      setUser(JSON.parse(localStorage.getItem("user")));
    };

    window.addEventListener("userUpdated", handleUserUpdate);

    return () => {
      window.removeEventListener("userUpdated", handleUserUpdate);
    };
  }, []);

  return (
    <div className="flex justify-between items-center gap-6 px-6 py-3 bg-white/60 backdrop-blur-md">
      {/* LEFT */}
      <div>
        <p className="text-sm text-gray-500">Welcome,</p>
        <h2 className="text-lg font-semibold text-gray-800">
          {user?.fullName || "User"}
        </h2>
      </div>

      {/* CENTER */}
      <div className="flex-1 max-w-md relative">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search issues..."
          className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {/* 🔔 Notification */}
        <Link to="/notifications">
          <button className="p-2 rounded-full hover:bg-gray-100 transition">
            <Bell size={20} className="text-gray-600" />
          </button>
        </Link>

        {/* 👤 Profile */}
        <Link to="/profile">
          {user?.profilePic ? (
            <img
              src={`${user.profilePic}?t=${Date.now()}`} // 🔥 FIX: avoid cache
              alt="profile"
              className="w-10 h-10 rounded-full object-cover border cursor-pointer hover:scale-105 transition"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm text-gray-600">
              ?
            </div>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
