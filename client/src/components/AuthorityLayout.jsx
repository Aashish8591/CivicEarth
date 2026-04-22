import { Outlet } from "react-router-dom";
import AuthoritySidebar from "./AuthoritySidebar";
import Topbar from "./Topbar";

const AuthorityLayout = () => {
  return (
    <div className="h-screen flex">

      {/* SIDEBAR */}
      <div className="w-64 border-r border-white/20 bg-white/40 backdrop-blur-xl">
        <AuthoritySidebar />
      </div>

      {/* MAIN */}
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

export default AuthorityLayout;