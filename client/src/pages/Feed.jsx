import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import Loading from "../components/Loading";
import PostCard from "../components/PostCard";

const Feed = () => {
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    // 🔥 Dummy Data (User + Authority)
    const dummyFeeds = [
      {
        _id: "101",
        user: {
          name: "Sairaj Vichare",
          profilePic: "https://i.pravatar.cc/150?img=3",
        },
        authority: {
          name: "Kalyan Municipal Corporation",
          profilePic: "https://i.pravatar.cc/150?img=12",
        },
        content:
          "There is a huge pothole near Kalyan station causing traffic issues daily. Please fix it.",
        status: "Pending",
        createdAt: new Date(),
        likes: 14,
        comments: [
          { text: "Facing same issue!" },
          { text: "Please fix soon 🙏" },
        ],
        isAuthority: false,
      },
      {
        _id: "102",
        user: {
          name: "Kalyan Municipal Corporation",
          profilePic: "https://i.pravatar.cc/150?img=12",
        },
        content:
          "The pothole near Kalyan station has been repaired successfully.",
        status: "Solved",
        createdAt: new Date(),
        likes: 40,
        comments: [],
        isAuthority: true,
      },
    ];

    setFeeds(dummyFeeds);
    setLoading(false);

  }, []);

  return !loading ? (
    <div className="w-full h-full bg-[#F8F9FA]">
      <div className="max-w-6xl mx-auto px-4 flex gap-6 h-full">

        {/* Feed */}
        <div className="flex-1 overflow-y-auto py-6 space-y-5 no-scrollbar">
          <h2 className="text-lg font-semibold text-[#212529]">Community Feed</h2>
          {feeds.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>

        {/* Right Sidebar */}
        <div className="hidden xl:block w-80 overflow-y-auto py-6 space-y-4 no-scrollbar">
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h2 className="font-semibold text-lg mb-3 text-[#212529]">Sponsored</h2>
            <img src={assets?.sponsored_img} alt="sponsored" className="w-full rounded-lg mb-3" />
            <p className="text-sm text-[#6C757D]">Boost your community impact 🚀</p>
          </div>
        </div>

      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Feed;