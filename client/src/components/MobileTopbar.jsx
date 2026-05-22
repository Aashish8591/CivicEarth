import { Bell, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MobileTopbar = () => {
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();

  // 🔥 LOAD USER
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    setUser(stored);

    const handleUpdate = () => {
      const updated = JSON.parse(localStorage.getItem("user"));
      setUser(updated);
    };

    window.addEventListener("userUpdated", handleUpdate);

    return () => {
      window.removeEventListener("userUpdated", handleUpdate);
    };
  }, []);

  // 🔥 LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    navigate("/login");
  };

  return (
    <div className="md:hidden sticky top-0 z-50 bg-white border-b px-4 py-3 flex items-center justify-between">

      {/* LEFT */}
      <h1
        onClick={() => navigate("/")}
        className="text-lg font-bold text-blue-600 cursor-pointer"
      >
        CivicEarth
      </h1>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* SEARCH */}
        <Search
          size={20}
          className="text-gray-700 cursor-pointer"
          onClick={() => navigate("/discover")}
        />

        {/* NOTIFICATION */}
        <Bell
          size={20}
          className="text-gray-700 cursor-pointer"
          onClick={() => navigate("/notifications")}
        />

        {/* PROFILE */}
        <div className="relative">

          {user?.profilePic ? (
            <img
              src={`${user.profilePic}?t=${Date.now()}`}
              alt="profile"
              onClick={() => setShowMenu(!showMenu)}
              className="w-9 h-9 rounded-full object-cover border cursor-pointer"
            />
          ) : (
            <div
              onClick={() => setShowMenu(!showMenu)}
              className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-sm text-gray-700 cursor-pointer"
            >
              ?
            </div>
          )}

          {/* DROPDOWN */}
          {showMenu && (
            <div className="absolute right-0 mt-3 w-44 bg-white rounded-xl shadow-lg border overflow-hidden z-[99999]">

              {/* PROFILE */}
              <button
                onClick={() => {
                  navigate(
                    user?.role === "ADMIN"
                      ? "/admin/profile"
                      : "/profile"
                  );

                  setShowMenu(false);
                }}
                className="w-full text-left px-4 py-3 hover:bg-gray-100 text-sm"
              >
                My Profile
              </button>

              {/* LOGOUT */}
              <button
                onClick={() => {
                  handleLogout();
                  setShowMenu(false);
                }}
                className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-500 text-sm"
              >
                Logout
              </button>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileTopbar;