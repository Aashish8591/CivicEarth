import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const UserLayout = () => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Topbar />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        {/* SCROLL ONLY CONTENT */}
        <div className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;