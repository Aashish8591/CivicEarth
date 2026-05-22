import {
  LayoutDashboard,
  ClipboardList,
  BarChart3,
  User,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

const AuthorityMobileNavbar = () => {
  const location = useLocation();

  const navItems = [
    {
      icon: LayoutDashboard,
      path: "/admin",
      label: "Dashboard",
    },
    {
      icon: ClipboardList,
      path: "/admin/complaints",
      label: "Complaints",
    },
    {
      icon: BarChart3,
      path: "/admin/analytics",
      label: "Analytics",
    },
    {
      icon: User,
      path: "/admin/profile",
      label: "Profile",
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t flex justify-around py-3 z-50">

      {navItems.map((item) => {
        const Icon = item.icon;

        const active = location.pathname === item.path;

        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center text-xs ${
              active
                ? "text-blue-600"
                : "text-gray-500"
            }`}
          >
            <Icon size={22} />
            <span className="mt-1">
              {item.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default AuthorityMobileNavbar;