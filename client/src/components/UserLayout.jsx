import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const UserLayout = () => {
  return (
    <div className="h-screen flex">

      {/* 🔥 SIDEBAR */}
      <div className="w-64 border-r border-white/20 bg-white/40 backdrop-blur-xl">
        <Sidebar />
      </div>

      {/* 🔥 MAIN AREA */}
      <div className="flex-1 flex flex-col">

        {/* TOPBAR */}
        <Topbar />

        {/* CONTENT */}
        <div className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default UserLayout;