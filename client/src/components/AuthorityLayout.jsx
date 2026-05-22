import { Outlet } from "react-router-dom";
import AuthoritySidebar from "./AuthoritySidebar";
import Topbar from "./Topbar";
import AuthorityMobileTopbar from "./AuthorityMobileTopbar";
import AuthorityMobileNavbar from "./AuthorityMobileNavbar";

const AuthorityLayout = () => {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-pink-50 overflow-x-hidden">
      {/* DESKTOP SIDEBAR */}
      <div className="hidden md:block w-64 h-screen fixed left-0 top-0 border-r border-white/20 bg-white/40 backdrop-blur-xl z-40">
        <AuthoritySidebar />
      </div>

      {/* MAIN AREA */}
      <div className="flex-1 min-w-0 md:ml-64 flex flex-col min-h-screen overflow-x-hidden">
        {/* MOBILE TOPBAR */}
        <AuthorityMobileTopbar />

        {/* DESKTOP TOPBAR */}
        <div className="hidden md:block sticky top-0 z-30 bg-white/60 backdrop-blur-md">
          <Topbar />
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 min-w-0 overflow-x-hidden p-4 md:p-6 pt-20 md:pt-6 pb-40 md:pb-6">
          <Outlet />
        </div>

        {/* MOBILE NAVBAR */}
        <AuthorityMobileNavbar />
      </div>
    </div>
  );
};

export default AuthorityLayout;
