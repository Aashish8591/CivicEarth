import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, ClipboardList, BarChart, User } from "lucide-react";

const AuthoritySidebar = () => {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/admin", icon: <LayoutDashboard size={18} /> },
    {
      name: "Complaints",
      path: "/admin/complaints",
      icon: <ClipboardList size={18} />,
    },
    {
      name: "Analytics",
      path: "/admin/analytics",
      icon: <BarChart size={18} />,
    },
        {
      name: "profile",
      path: "/admin/profile",
      icon: <User size={18} />,
    },
  ];

  return (
    <div className="h-full flex flex-col justify-between px-5 py-6">
      <div>
        <h1 className="text-xl font-bold text-blue-600 mb-8">
          Authority Panel
        </h1>

        <div className="space-y-2">
          {menu.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AuthoritySidebar;
