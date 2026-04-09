import { Bell, Search } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/civicEarthlogo.png";

const Topbar = () => {
  return (
    <div className="bg-white border-b px-6 py-3 flex items-center justify-between">

      {/* LEFT - Logo */}
      <div className="flex items-center gap-2">
        <img src={logo} alt="CivicEarth" className="w-12 h-12 object-contain" />
        <span className="text-xl font-bold text-blue-600">CivicEarth</span>
      </div>

      {/* CENTER - Search */}
      <div className="w-[40%] relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search issues, locations, or users..."
          className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 outline-none"
        />
      </div>

      {/* RIGHT - Icons */}
      <div className="flex items-center gap-4">

        <Bell className="text-gray-600 cursor-pointer" />

        {/* ✅ PROFILE CLICKABLE */}
        <Link to="/profile">
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="w-10 h-10 rounded-full cursor-pointer hover:scale-105 transition"
          />
        </Link>

      </div>
    </div>
  );
};

export default Topbar;