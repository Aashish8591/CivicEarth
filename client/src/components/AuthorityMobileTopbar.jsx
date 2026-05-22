import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthorityMobileTopbar = () => {
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    setUser(stored);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    navigate("/login");
  };

  return (
    <div className="md:hidden sticky top-0 z-50 bg-white border-b px-4 py-3 flex items-center justify-between">

      {/* LEFT */}
      <h1 className="text-lg font-bold text-blue-600">
        Authority Panel
      </h1>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        <Bell
          size={20}
          className="text-gray-700"
          onClick={() => navigate("/notifications")}
        />

        {/* PROFILE */}
        <div className="relative">

          <img
            src={user?.profilePic}
            onClick={() => setShowMenu(!showMenu)}
            className="w-9 h-9 rounded-full object-cover border cursor-pointer"
          />

          {/* DROPDOWN */}
          {showMenu && (
            <div className="absolute right-0 mt-3 w-44 bg-white rounded-xl shadow-lg border overflow-hidden z-[99999]">

              <button
                onClick={() => {
                  navigate("/admin/profile");
                  setShowMenu(false);
                }}
                className="w-full text-left px-4 py-3 hover:bg-gray-100 text-sm"
              >
                My Profile
              </button>

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

export default AuthorityMobileTopbar;