import React, { useState } from "react";
import { Search } from "lucide-react";
import PostCard from "../components/PostCard";

const Discover = () => {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // 🔥 Dummy Data
  const posts = [
    {
      _id: "1",
      user: {
        name: "Sairaj",
        profilePic: "https://i.pravatar.cc/150?img=3",
      },
      authority: {
        name: "Kalyan Municipal Corporation",
        profilePic: "https://i.pravatar.cc/150?img=12",
      },
      content: "Road damage near station",
      status: "Pending",
      createdAt: new Date(),
      likes: 10,
      comments: [],
      isAuthority: false,
    },
  ];

  const authorities = [
    {
      name: "Kalyan Municipal Corporation",
      profilePic: "https://i.pravatar.cc/150?img=12",
    },
    {
      name: "Traffic Police",
      profilePic: "https://i.pravatar.cc/150?img=8",
    },
  ];

  // 🔍 FILTER LOGIC
  const filteredPosts = posts.filter((p) =>
    p.content.toLowerCase().includes(query.toLowerCase())
  );

  const filteredAuthorities = authorities.filter((a) =>
    a.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-gray-100 py-6">

      <div className="max-w-4xl mx-auto px-4 space-y-5">

        {/* 🔍 SEARCH BAR */}
        <div className="bg-white rounded-xl shadow-sm p-3 flex items-center gap-2">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search complaints, authorities..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full outline-none text-sm"
          />
        </div>

        {/* 🔹 TABS */}
        <div className="flex gap-3">
          {["all", "complaints", "authorities"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1 rounded-full text-sm ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 🔥 RESULTS */}

        {/* POSTS */}
        {(activeTab === "all" || activeTab === "complaints") && (
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}

        {/* AUTHORITIES */}
        {(activeTab === "all" || activeTab === "authorities") && (
          <div className="bg-white rounded-xl p-4 space-y-3">
            <h3 className="font-semibold text-gray-700">
              Authorities
            </h3>

            {filteredAuthorities.map((auth, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded cursor-pointer"
              >
                <img
                  src={auth.profilePic}
                  className="w-10 h-10 rounded-full"
                />
                <span className="font-medium">{auth.name}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Discover;