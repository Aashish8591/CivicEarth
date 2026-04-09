import { Routes, Route } from "react-router-dom";
//import AuthorityDashboard from "../pages/AuthorityDashboard";

const AuthorityLayout = () => {
  return (
    <div>
      <h2>Admin Panel</h2>

      <Routes>
        <Route path="/" element={<AuthorityDashboard />} />
      </Routes>
    </div>
  );
};

export default AuthorityLayout;