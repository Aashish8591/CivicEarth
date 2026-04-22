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
    <div className="w-full h-full bg-transparent min-h-screen space-y-6">

      {/* 🔥 HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Complaints Panel</h1>
        <p className="text-sm text-gray-500">Manage all complaints</p>
      </div>

      {/* 🔥 TABS */}
      <div className="flex gap-3">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
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
            className="bg-white/40 backdrop-blur-lg p-5 rounded-2xl shadow flex justify-between items-center"
          >

            {/* LEFT */}
            <div>
              <p className="font-medium">{post.content}</p>
              <p className="text-sm text-gray-500">{post.location}</p>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3">

              {/* STATUS */}
              <span className={`px-3 py-1 text-xs rounded-full text-white ${
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
                  className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm"
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