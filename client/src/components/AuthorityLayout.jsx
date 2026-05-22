import { Outlet } from "react-router-dom";
import AuthoritySidebar from "./AuthoritySidebar";
import Topbar from "./Topbar";
import AuthorityMobileTopbar from "./AuthorityMobileTopbar";
import AuthorityMobileNavbar from "./AuthorityMobileNavbar";

const AuthorityLayout = () => {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-pink-50 overflow-hidden">
      {/* DESKTOP SIDEBAR */}
      <div className="hidden md:block w-64 h-screen fixed left-0 top-0 border-r border-white/20 bg-white/40 backdrop-blur-xl z-40">
        <AuthoritySidebar />
      </div>

      {/* MAIN AREA */}
      <div className="flex-1 md:ml-64 flex flex-col h-screen">
        {/* MOBILE TOPBAR */}
        <AuthorityMobileTopbar />

        {/* DESKTOP TOPBAR */}
        <div className="hidden md:block sticky top-0 z-30 bg-white/60 backdrop-blur-md">
          <Topbar />
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 pb-24">
          <Outlet />
        </div>

        {/* MOBILE NAVBAR */}
        <AuthorityMobileNavbar />
      </div>
    </div>
  );
};

export default AuthorityLayout;
