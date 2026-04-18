import React, { useState } from "react";
import { Search } from "lucide-react";
import PostCard from "../components/PostCard";

const Discover = () => {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // 🔥 PROPER POSTS DATA (MATCH PostCard)
  const posts = [
    {
      id: "1",
      user: {
        full_name: "Sairaj",
        profile_picture: "https://i.pravatar.cc/150?img=3",
      },
      authority: {
        name: "Kalyan Municipal Corporation",
        profilePic: "https://i.pravatar.cc/150?img=12",
      },
      content: "Road damage near station 🚧",
      status: "Pending",
      createdAt: new Date(),
      likes: 10,
      reposts: 2,
      comments: [{ text: "Same issue here!" }],
      image_urls: [
        "https://images.unsplash.com/photo-1597764699510-7c8c1f2c4c6f",
      ],
      isAuthority: false,
    },
    {
      id: "2",
      user: {
        full_name: "Traffic Police",
        profile_picture: "https://i.pravatar.cc/150?img=8",
      },
      content: "Traffic congestion resolved near signal 🚦",
      status: "Solved",
      createdAt: new Date(),
      likes: 22,
      reposts: 4,
      comments: [],
      image_urls: [],
      isAuthority: true,
    },
  ];

  // 🔥 AUTHORITIES
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

  // 🔥 FILTER LOGIC
  const filteredPosts = posts.filter((p) =>
    p.content.toLowerCase().includes(query.toLowerCase())
  );

  const filteredAuthorities = authorities.filter((a) =>
    a.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="w-full max-w-5xl mx-auto px-5 py-1">
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

        {/* 🔥 POSTS */}
        {(activeTab === "all" || activeTab === "complaints") && (
          <div className="space-y-4">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))
            ) : (
              <p className="text-center text-gray-500">
                No complaints found
              </p>
            )}
          </div>
        )}

        {/* 🔥 AUTHORITIES */}
        {(activeTab === "all" || activeTab === "authorities") && (
          <div className="bg-white rounded-xl p-4 space-y-3">
            <h3 className="font-semibold text-gray-700">
              Authorities
            </h3>

            {filteredAuthorities.length > 0 ? (
              filteredAuthorities.map((auth, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded cursor-pointer"
                >
                  <img
                    src={auth.profilePic}
                    className="w-10 h-10 rounded-full"
                    alt="authority"
                  />
                  <span className="font-medium">{auth.name}</span>
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
    </div>
  );
};

export default Discover;