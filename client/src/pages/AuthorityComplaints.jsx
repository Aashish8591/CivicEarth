import { useEffect, useState } from "react";
import API from "../api";
import { motion } from "framer-motion";

const tabs = ["ALL", "PENDING", "IN_PROGRESS", "RESOLVED"];

const AuthorityComplaints = () => {
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("ALL");

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchPosts = async () => {
    try {
      const res = await API.get(`/posts/department/${user.department}`);
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // 🔥 FILTER
  const filteredPosts =
    activeTab === "ALL"
      ? posts
      : posts.filter((p) => p.status === activeTab);

  // 🔥 STATUS UPDATE
  const updateStatus = async (id, status) => {
    try {
      await API.put(`/posts/${id}/status`, { status });
      fetchPosts();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full min-h-screen space-y-5 md:space-y-6 overflow-x-hidden">

      {/* 🔥 HEADER */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">Complaints Panel</h1>
        <p className="text-sm text-gray-500">Manage all complaints</p>
      </div>

      {/* 🔥 TABS */}
      <div className="w-full flex gap-1 overflow-x-auto overflow-y-hidden pb-1 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`min-w-fit px-4 py-2 rounded-full text-xs md:text-sm whitespace-nowrap flex-shrink-0 font-medium transition ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-white/40 backdrop-blur text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 🔥 POSTS */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <motion.div
            key={post.id}
            whileHover={{ scale: 1.01 }}
            className="bg-white/40 backdrop-blur-lg p-4 md:p-5 rounded-2xl shadow space-y-4"
          >

            {/* LEFT */}
            <div className="space-y-2">
              <p className="font-medium break-words text-sm md:text-base">{post.content}</p>
              <p className="text-xs md:text-sm text-gray-500 break-words">{post.location}</p>
            </div>

            {/* RIGHT */}
            <div className="flex items-center justify-between gap-3">

              {/* STATUS */}
              <span className={`px-3 py-1 text-xs rounded-full text-white font-medium ${
                post.status === "PENDING"
                  ? "bg-yellow-500"
                  : post.status === "IN_PROGRESS"
                  ? "bg-blue-500"
                  : "bg-green-500"
              }`}>
                {post.status}
              </span>

              {/* ACTION BUTTON */}
              {post.status !== "RESOLVED" && (
                <button
                  onClick={() => updateStatus(post.id, "RESOLVED")}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg text-xs md:text-sm whitespace-nowrap"
                >
                  Resolve
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
};

export default AuthorityComplaints;