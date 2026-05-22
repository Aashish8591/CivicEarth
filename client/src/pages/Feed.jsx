import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import PostCard from "../components/PostCard";
import API from "../api";
import { SlidersHorizontal } from "lucide-react";

const Feed = () => {
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("latest");
  const [showFilter, setShowFilter] = useState(false);

  // 🔥 FETCH POSTS BASED ON FILTER
  const fetchPosts = async () => {
    try {
      setLoading(true);

      let url = "/posts";

      if (filter === "trending" || filter === "likes") {
        url = "/posts?sort=likes";
      } else if (filter === "nearby") {
        url = "/posts?location=mumbai";
      }

      const res = await API.get(url);

      // ✅ SIMPLE (NO EXTRA API CALLS)
      setFeeds(res.data);
    } catch (err) {
      console.log("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 RUN WHEN FILTER CHANGES
  useEffect(() => {
    fetchPosts();
  }, [filter]);

  return !loading ? (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-6 pb-10 pt-20 md:pt-6">
      {/* 🔥 HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Feed</h1>

        <div className="relative">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-md border rounded-xl shadow-sm hover:shadow-md transition"
          >
            <SlidersHorizontal size={16} />
            <span className="text-sm font-medium capitalize">{filter}</span>
          </button>

          {/* 🔥 DROPDOWN */}
          {showFilter && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border p-2 z-50">
              <button
                onClick={() => {
                  setFilter("latest");
                  setShowFilter(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 text-sm"
              >
                Latest
              </button>

              <button
                onClick={() => {
                  setFilter("trending");
                  setShowFilter(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 text-sm"
              >
                Trending 🔥
              </button>

              <button
                onClick={() => {
                  setFilter("nearby");
                  setShowFilter(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 text-sm"
              >
                Nearby 📍
              </button>

              <button
                onClick={() => {
                  setFilter("likes");
                  setShowFilter(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 text-sm"
              >
                Most Liked ❤️
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 🔥 POSTS */}
      <div className="space-y-6">
        {feeds.length > 0 ? (
          feeds.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <PostCard post={post} />
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center mt-10">
            No posts available 🚀
          </p>
        )}
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Feed;
