import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import API from "../api";
import PostCard from "../components/PostCard";

const Discover = () => {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [authorities, setAuthorities] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔥 FETCH DATA
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // ✅ FETCH POSTS + USERS
      const [postRes, userRes] = await Promise.all([
        API.get("/posts"),
        API.get("/users"),
      ]);

      const allUsers = userRes.data || [];

      setPosts(postRes.data || []);

      // ✅ NORMAL USERS
      setUsers(allUsers.filter((u) => u.role !== "ADMIN"));

      // ✅ AUTHORITIES
      setAuthorities(allUsers.filter((u) => u.role === "ADMIN"));
    } catch (err) {
      console.log("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔍 SEARCH
  const filteredPosts = posts.filter((p) =>
    p.content?.toLowerCase().includes(query.toLowerCase())
  );

  const filteredUsers = users.filter((u) =>
    u.fullName?.toLowerCase().includes(query.toLowerCase())
  );

  const filteredAuthorities = authorities.filter((a) =>
    a.fullName?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="w-full max-w-5xl mx-auto px-5 py-4">

      {/* 🔍 SEARCH */}
      <div className="bg-white rounded-xl shadow p-3 flex items-center gap-2 border">
        <Search size={18} className="text-gray-500" />
        <input
          type="text"
          placeholder="Search complaints, users, authorities..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full outline-none text-sm"
        />
      </div>

      {/* 🔹 TABS */}
      <div className="flex gap-3 mt-4">
        {["all", "complaints", "users", "authorities"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1 rounded-full text-sm transition ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-100"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 🔄 LOADING */}
      {loading && (
        <p className="text-center mt-6 text-gray-500">Loading...</p>
      )}

      {/* 🔥 POSTS */}
      {(activeTab === "all" || activeTab === "complaints") && (
        <div className="space-y-4 mt-4">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <PostCard key={post._id || post.id} post={post} />
            ))
          ) : (
            <p className="text-center text-gray-500">
              No complaints found
            </p>
          )}
        </div>
      )}

      {/* 🔥 USERS */}
      {(activeTab === "all" || activeTab === "users") && (
        <div className="bg-white rounded-xl p-4 mt-6 shadow border">
          <h3 className="font-semibold mb-3 text-gray-700">Users</h3>

          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user._id || user.id}
                className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded cursor-pointer transition"
              >
                <img
                  src={user.profilePic}
                  className="w-10 h-10 rounded-full object-cover"
                  alt="user"
                />
                <span className="font-medium">
                  {user.fullName}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No users found</p>
          )}
        </div>
      )}

      {/* 🔥 AUTHORITIES */}
      {(activeTab === "all" || activeTab === "authorities") && (
        <div className="bg-white rounded-xl p-4 mt-6 shadow border">
          <h3 className="font-semibold mb-3 text-gray-700">
            Authorities
          </h3>

          {filteredAuthorities.length > 0 ? (
            filteredAuthorities.map((auth) => (
              <div
                key={auth._id || auth.id}
                className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded cursor-pointer transition"
              >
                <img
                  src={auth.profilePic}
                  className="w-10 h-10 rounded-full object-cover"
                  alt="authority"
                />
                <span className="font-medium">
                  {auth.fullName}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">
              No authorities found
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Discover;