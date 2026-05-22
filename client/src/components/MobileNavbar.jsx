import { Home, Compass, Bell, User } from "lucide-react";
import { Link } from "react-router-dom";

const MobileNavbar = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t py-3 flex justify-around z-50">

      <Link to="/">
        <Home />
      </Link>

      <Link to="/discover">
        <Compass />
      </Link>

      <Link to="/notifications">
        <Bell />
      </Link>

      <Link to="/profile">
        <User />
      </Link>

    </div>
  );
};

export default MobileNavbar;