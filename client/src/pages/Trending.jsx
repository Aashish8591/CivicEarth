import React from "react";
import PostCard from "../components/PostCard";
import { Flame, TrendingUp } from "lucide-react";

const Trending = () => {

  // 🔥 Dummy Data
  const trendingTopics = [
    "#Potholes",
    "#WaterLeak",
    "#Garbage",
    "#Traffic",
  ];

  const trendingPosts = [
    {
      _id: "1",
      user: {
        name: "Sairaj",
        profilePic: "https://i.pravatar.cc/150?img=3",
      },
      authority: {
        name: "KMC",
        profilePic: "https://i.pravatar.cc/150?img=12",
      },
      content: "Huge potholes causing accidents near station",
      status: "Pending",
      createdAt: new Date(),
      likes: 120,
      comments: [],
      isAuthority: false,
    },
    {
      _id: "2",
      user: {
        name: "Rahul",
        profilePic: "https://i.pravatar.cc/150?img=5",
      },
      authority: {
        name: "Traffic Police",
        profilePic: "https://i.pravatar.cc/150?img=8",
      },
      content: "Traffic jam every morning near highway",
      status: "Pending",
      createdAt: new Date(),
      likes: 95,
      comments: [],
      isAuthority: false,
    },
  ];

  const topAuthorities = [
    {
      name: "Kalyan Municipal Corporation",
      profilePic: "https://i.pravatar.cc/150?img=12",
      solved: 120,
    },
    {
      name: "Traffic Police",
      profilePic: "https://i.pravatar.cc/150?img=8",
      solved: 95,
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-100 py-6">

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* 🔥 LEFT - MAIN TRENDING POSTS */}
        <div className="xl:col-span-2 space-y-5">

          <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-700">
            <Flame className="text-orange-500" size={20} />
            Trending Complaints
          </h2>

          {trendingPosts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}

        </div>

        {/* 🔥 RIGHT SIDEBAR */}
        <div className="space-y-5">

          {/* 🔹 Trending Topics */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <TrendingUp size={16} />
              Trending Topics
            </h3>

            <div className="flex flex-wrap gap-2">
              {trendingTopics.map((topic, i) => (
                <span
                  key={i}
                  className="bg-gray-100 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-gray-200"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {/* 🔹 Top Authorities */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold mb-3">
              Top Authorities
            </h3>

            {topAuthorities.map((auth, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded"
              >
                <img
                  src={auth.profilePic}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium">{auth.name}</p>
                  <p className="text-xs text-gray-500">
                    {auth.solved} cases solved
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
};

export default Trending;