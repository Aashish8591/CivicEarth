import { Link, useLocation } from "react-router-dom";
import { Home, Compass, MessageSquare, User, PlusCircle } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const menu = [
    { name: "Home", path: "/", icon: <Home size={20} /> },
    { name: "Discover", path: "/discover", icon: <Compass size={20} /> },
    { name: "Messages", path: "/messages", icon: <MessageSquare size={20} /> },
    { name: "Profile", path: "/profile", icon: <User size={20} /> },
  ];

  return (
    <div className="w-64 bg-white border-r p-5 flex flex-col h-screen sticky top-0">

      <div className="flex flex-col h-full">

        {/* MENU */}
        <div className="space-y-3">
          {menu.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 p-3 rounded-lg ${
                location.pathname === item.path
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </div>

        {/* ✅ REPORT ISSUE BUTTON */}
        <Link
          to="/create-post"
          className={`mt-85 flex items-center justify-center gap-2 p-3 rounded-full shadow-md transition ${
            location.pathname === "/create-post"
              ? "bg-blue-600 text-white"
              : "bg-blue-500 text-white hover:scale-105"
          }`}
        >
          <PlusCircle size={18} />
          Report Issue
        </Link>

      </div>
    </div>
  );
};

export default Sidebar;