import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Compass,
  MessageSquare,
  User,
  PlusCircle,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const menu = [
    { name: "Home", path: "/", icon: <Home size={18} /> },
    { name: "Discover", path: "/discover", icon: <Compass size={18} /> },
    { name: "Messages", path: "/messages", icon: <MessageSquare size={18} /> },
    { name: "Profile", path: "/profile", icon: <User size={18} /> },
  ];

  return (
    <div className="h-full flex flex-col justify-between px-5 py-6">

      {/* 🔥 TOP LOGO */}
      <div>
        <h1 className="text-xl font-bold text-blue-600 mb-8">
          CivicEarth
        </h1>

        {/* 🔥 MENU */}
        <div className="space-y-2">
          {menu.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span className={isActive ? "text-blue-600" : ""}>
                  {item.icon}
                </span>
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* 🔥 BOTTOM BUTTON */}
      <div>
        <Link
          to="/create-post"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-blue-600 text-white font-medium shadow-sm hover:bg-blue-700 transition-all"
        >
          <PlusCircle size={18} />
          Report Issue
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;



