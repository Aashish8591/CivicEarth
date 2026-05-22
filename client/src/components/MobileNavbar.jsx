import { Home, Compass, Bell, User, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const MobileNavbar = () => {

  const navigate = useNavigate();

  return (
    <>
      {/* 🔥 FLOATING REPORT ISSUE BUTTON */}
      <button
        onClick={() => navigate("/create-post")}
        className="md:hidden fixed bottom-18 right-5 z-[999] w-10 h-10 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center hover:bg-blue-700 transition-all duration-300 active:scale-95"
      >
        <Plus size={28} />
      </button>

      {/* 🔥 MOBILE NAVBAR */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t py-3 flex justify-around z-50">

        {/* HOME */}
        <Link
          to="/"
          className="flex items-center justify-center"
        >
          <Home />
        </Link>

        {/* DISCOVER */}
        <Link
          to="/discover"
          className="flex items-center justify-center"
        >
          <Compass />
        </Link>

        {/* NOTIFICATIONS */}
        <Link
          to="/notifications"
          className="flex items-center justify-center"
        >
          <Bell />
        </Link>

        {/* PROFILE */}
        <Link
          to="/profile"
          className="flex items-center justify-center"
        >
          <User />
        </Link>

      </div>
    </>
  );
};

export default MobileNavbar;