import { Bell, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; // ✅ added
import { useEffect, useState } from "react";
import API from "../api"; // ✅ added

const Topbar = () => {
  const [user, setUser] = useState(null);

  // 🔥 NEW STATES
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({
    posts: [],
    users: [],
    authorities: [],
  });
  const [showResults, setShowResults] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate(); // ✅

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    navigate("/login");

    window.dispatchEvent(new Event("authChanged"));
  };

  // 🔥 Safe load user
  const loadUser = () => {
    try {
      const data = JSON.parse(localStorage.getItem("user"));
      setUser(data);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    loadUser();

    const handleUserUpdate = () => {
      loadUser();
      setUser(JSON.parse(localStorage.getItem("user")));
    };

    window.addEventListener("userUpdated", handleUserUpdate);

    return () => {
      window.removeEventListener("userUpdated", handleUserUpdate);
    };
  }, []);

  // 🔥 SEARCH LOGIC
  useEffect(() => {
    const fetchSearch = async () => {
      if (!query.trim()) {
        setResults({ posts: [], users: [], authorities: [] });
        return;
      }

      try {
        const [postRes, userRes] = await Promise.all([
          API.get("/posts"),
          API.get("/users"),
        ]);

        const allUsers = userRes.data || [];

        const users = allUsers.filter(
          (u) =>
            u.role !== "ADMIN" &&
            u.fullName.toLowerCase().includes(query.toLowerCase()),
        );

        const authorities = allUsers.filter(
          (u) =>
            u.role === "ADMIN" &&
            u.fullName.toLowerCase().includes(query.toLowerCase()),
        );

        const posts = postRes.data.filter((p) =>
          p.content?.toLowerCase().includes(query.toLowerCase()),
        );

        setResults({ posts, users, authorities });
      } catch (err) {
        console.log(err);
      }
    };

    const delay = setTimeout(fetchSearch, 300); // debounce
    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div className="hidden md:flex relative z-[9999] flex justify-between items-center gap-6 px-6 py-3 bg-white/60 backdrop-blur-md">
      {/* LEFT */}
      <div>
        <p className="text-sm text-gray-500">Welcome,</p>
        <h2 className="text-lg font-semibold text-gray-800">
          {user?.fullName || "User"}
        </h2>
      </div>

      {/* CENTER */}
      <div className="flex-1 max-w-md relative">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search users, authorities, complaints..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowResults(true);
          }}
          className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        />

        {/* 🔥 SEARCH DROPDOWN */}
        {showResults && query && (
          <div className="absolute top-12 left-0 w-full bg-white border rounded-xl shadow-lg max-h-80 overflow-y-auto z-50 p-2 space-y-2">
            {/* USERS */}
            {results.users.map((u) => (
              <div
                key={u.id}
                onClick={() => {
                  navigate(`/profile/${u.id}`);
                  setShowResults(false);
                  setQuery("");
                }}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer"
              >
                <img src={u.profilePic} className="w-8 h-8 rounded-full" />
                <span>{u.fullName}</span>
              </div>
            ))}

            {/* AUTHORITIES */}
            {results.authorities.map((a) => (
              <div
                key={a.id}
                onClick={() => {
                  navigate(`/profile/${a.id}`);
                  setShowResults(false);
                  setQuery("");
                }}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer"
              >
                <img src={a.profilePic} className="w-8 h-8 rounded-full" />
                <span>{a.fullName} (Authority)</span>
              </div>
            ))}

            {/* POSTS */}
            {results.posts.map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  navigate(`/post/${p.id}`);
                  setShowResults(false);
                  setQuery("");
                }}
                className="p-2 hover:bg-gray-100 rounded cursor-pointer text-sm"
              >
                📢 {p.content.slice(0, 50)}...
              </div>
            ))}

            {/* EMPTY */}
            {results.posts.length === 0 &&
              results.users.length === 0 &&
              results.authorities.length === 0 && (
                <p className="text-center text-gray-400 text-sm">
                  No results found
                </p>
              )}
          </div>
        )}
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {/* NOTIFICATION */}
        <Link to="/notifications">
          <button className="p-2 rounded-full hover:bg-gray-100 transition">
            <Bell size={20} className="text-gray-600" />
          </button>
        </Link>

        {/* PROFILE DROPDOWN */}
        <div className="relative">
          {/* PROFILE IMAGE */}
          {user?.profilePic ? (
            <img
              src={`${user.profilePic}?t=${Date.now()}`}
              alt="profile"
              onClick={() => setShowMenu(!showMenu)}
              className="w-10 h-10 rounded-full object-cover border cursor-pointer hover:scale-105 transition"
            />
          ) : (
            <div
              onClick={() => setShowMenu(!showMenu)}
              className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm text-gray-600 cursor-pointer"
            >
              ?
            </div>
          )}

          {/* DROPDOWN MENU */}
          {showMenu && (
            <div className="absolute right-0 mt-3 w-44 bg-white rounded-xl shadow-lg border overflow-hidden z-[99999]">
              {/* PROFILE */}
              <button
                onClick={() => {
                  navigate(
                    user?.role === "ADMIN" ? "/admin/profile" : "/profile",
                  );
                  setShowMenu(false);
                }}
                className="w-full text-left px-4 py-3 hover:bg-gray-100 text-sm"
              >
                My Profile
              </button>

              {/* LOGOUT */}
              <button
                onClick={() => {
                  handleLogout();
                  setShowMenu(false);
                }}
                className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-500 text-sm"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
