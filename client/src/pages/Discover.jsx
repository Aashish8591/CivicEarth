import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import API from "../api";
import PostCard from "../components/PostCard";
import { useNavigate } from "react-router-dom";

const Discover = () => {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [authorities, setAuthorities] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [postRes, userRes] = await Promise.all([
        API.get("/posts"),
        API.get("/users"),
      ]);

      const allUsers = userRes.data || [];

      setPosts(postRes.data || []);
      setUsers(allUsers.filter((u) => u.role !== "ADMIN"));
      setAuthorities(allUsers.filter((u) => u.role === "ADMIN"));

    } catch (err) {
      console.log("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 FILTER POSTS
  const filteredPosts = posts.filter((p) =>
    p.content?.toLowerCase().includes(query.toLowerCase())
  );

  // 🔥 FILTER USERS
  const filteredUsers = users.filter((u) =>
    u.fullName?.toLowerCase().includes(query.toLowerCase())
  );

  // 🔥 FILTER AUTHORITIES
  const filteredAuthorities = authorities.filter((a) =>
    a.fullName?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="w-full max-w-5xl min-w-0 mx-auto px-4 md:px-6 pb-24 pt-20 md:pt-6 overflow-x-hidden">

      {/* 🔥 SEARCH */}
      <div className="bg-white rounded-xl shadow px-3 py-3 md:p-3 flex items-center gap-2 border overflow-hidden">

        <Search
          size={18}
          className="text-gray-500 flex-shrink-0"
        />

        <input
          type="text"
          placeholder="Search complaints, users, authorities..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full min-w-0 outline-none text-sm md:text-base"
        />
      </div>

      {/* 🔥 TABS */}
      <div className="flex gap-3 mt-4 overflow-x-auto pb-1 scrollbar-hide">

        {["all", "complaints", "users", "authorities"].map((tab) => (

          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1 rounded-full text-xs md:text-sm whitespace-nowrap flex-shrink-0 transition ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-100"
            }`}
          >
            {tab}
          </button>

        ))}
      </div>

      {/* 🔥 LOADING */}
      {loading && (
        <p className="text-center mt-6 text-gray-500">
          Loading...
        </p>
      )}

      {/* 🔥 POSTS */}
      {(activeTab === "all" || activeTab === "complaints") && (

        <div className="space-y-5 mt-5 w-full min-w-0">

          {filteredPosts.length > 0 ? (

            filteredPosts.map((post) => (

              <div
                key={post._id || post.id}
                className="w-full min-w-0 overflow-hidden"
              >
                <PostCard post={post} />
              </div>

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

        <div className="bg-white rounded-xl p-4 md:p-5 mt-6 shadow border overflow-hidden">

          <h3 className="font-semibold mb-3 text-gray-700">
            Users
          </h3>

          {filteredUsers.length > 0 ? (

            filteredUsers.map((user) => (

              <div
                key={user._id || user.id}
                onClick={() => navigate(`/profile/${user.id}`)}
                className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-xl cursor-pointer transition min-w-0"
              >

                <img
                  src={user.profilePic}
                  className="w-10 h-10 md:w-11 md:h-11 rounded-full object-cover flex-shrink-0"
                  alt="user"
                />

                <span className="font-medium text-sm md:text-base break-words truncate">
                  {user.fullName}
                </span>

              </div>

            ))

          ) : (

            <p className="text-gray-500 text-sm">
              No users found
            </p>

          )}
        </div>
      )}

      {/* 🔥 AUTHORITIES */}
      {(activeTab === "all" || activeTab === "authorities") && (

        <div className="bg-white rounded-xl p-4 mt-6 shadow border overflow-hidden">

          <h3 className="font-semibold mb-3 text-gray-700">
            Authorities
          </h3>

          {filteredAuthorities.length > 0 ? (

            filteredAuthorities.map((auth) => (

              <div
                key={auth._id || auth.id}
                onClick={() => navigate(`/profile/${auth.id}`)}
                className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded cursor-pointer transition min-w-0"
              >

                <img
                  src={auth.profilePic}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  alt="authority"
                />

                <span className="font-medium truncate">
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