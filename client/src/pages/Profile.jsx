import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
import Loading from "../components/Loading";
import authorityImage from "../assets/authorityImage.png";

const Profile = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Filters
  const [sortType, setSortType] = useState("latest");
  const [category, setCategory] = useState("all");
  const [topic, setTopic] = useState("all");

  const topics = ["all", "Roads", "Water", "Drainage", "Garbage", "Electricity"];

  const authority = {
    name: "Municipal Authority",
    area: "Kalyan, Maharashtra",
    description:
      "Handling civic issues like roads, drainage, sanitation and public infrastructure.",
    profilePic: authorityImage,
  };

  const stats = {
    reported: 120,
    solved: 90,
    pending: 30,
    rating: 4.2,
    totalRatings: 85,
  };

  useEffect(() => {
    setPosts([
      {
        _id: "1",
        user: {
          name: authority.name,
          profilePic: authority.profilePic,
        },
        content: "Road damage reported in Kalyan.",
        createdAt: new Date(),
        status: "Pending",
        likes: 12,
        category: "case",
        topic: "Roads",
        comments: [],
      },
      {
        _id: "2",
        user: {
          name: authority.name,
          profilePic: authority.profilePic,
        },
        content: "Water leakage fixed successfully.",
        createdAt: new Date(),
        status: "Solved",
        likes: 25,
        category: "case",
        topic: "Water",
        comments: [],
      },
      {
        _id: "3",
        user: {
          name: authority.name,
          profilePic: authority.profilePic,
        },
        content: "Great work by municipality team 👏",
        createdAt: new Date(),
        status: "Solved",
        likes: 40,
        category: "appreciation",
        topic: "General",
        comments: [],
      },
    ]);
    setLoading(false);
  }, []);

  // 🔥 FILTER + SORT LOGIC
  const filteredPosts = posts
    .filter((post) => {
      if (category !== "case") {
        return category === "all" || post.category === category;
      }

      // Case + Topic filter
      if (topic === "all") return post.category === "case";
      return post.category === "case" && post.topic === topic;
    })
    .sort((a, b) => {
      if (sortType === "latest")
        return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortType === "oldest")
        return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortType === "popular") return b.likes - a.likes;
      return 0;
    });

  return !loading ? (
    <div className="w-full min-h-screen bg-gray-100 py-6">
      <div className="max-w-4xl mx-auto px-4">

        {/* 🔹 Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm p-6 flex gap-5 items-center">
          <img
            src={authority.profilePic}
            className="w-24 h-24 rounded-lg object-cover"
          />

          <div>
            <h1 className="text-2xl font-bold">{authority.name}</h1>
            <p className="text-gray-500 text-sm">{authority.area}</p>
            <p className="mt-2 text-gray-600 text-sm">
              {authority.description}
            </p>
          </div>
        </div>

        {/* 🔹 Dashboard Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mt-6">

          {/* Top Info */}
          <div className="flex justify-between items-center flex-wrap gap-4">

            <div>
              <h2 className="text-lg font-semibold text-gray-700">
                Civic Overview
              </h2>
              <p className="text-sm text-gray-500">
                {authority.area}
              </p>
            </div>

            {/* 🔥 Report Button */}
            <button
              onClick={() => navigate('/report')}
              className="bg-[#1A4E8A] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#153d6f] transition"
            >
              View Report →
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">

            <div className="bg-blue-500 text-white p-4 rounded-xl text-center">
              <h2 className="text-xl font-bold">{stats.reported}</h2>
              <p className="text-sm">Reported</p>
            </div>

            <div className="bg-green-500 text-white p-4 rounded-xl text-center">
              <h2 className="text-xl font-bold">{stats.solved}</h2>
              <p className="text-sm">Solved</p>
            </div>

            <div className="bg-red-500 text-white p-4 rounded-xl text-center">
              <h2 className="text-xl font-bold">{stats.pending}</h2>
              <p className="text-sm">Pending</p>
            </div>

            <div className="bg-yellow-400 text-white p-4 rounded-xl text-center">
              <h2 className="text-xl font-bold">⭐ {stats.rating}</h2>
              <p className="text-sm">{stats.totalRatings} Ratings</p>
            </div>

          </div>

          {/* 🔥 EXTRA (SMART ADDITION) */}
          <div className="mt-6 p-4 bg-gray-100 rounded-xl">
            <p className="text-sm text-gray-600">
              🔥 Most reported issue: <span className="font-semibold">Roads</span>
            </p>
            <p className="text-sm text-gray-600">
              ⚡ Response Time: <span className="font-semibold">2.3 days avg</span>
            </p>
          </div>

        </div>

        {/* 🔥 FILTER SECTION */}
        <div className="flex flex-wrap gap-3 mt-6 bg-white p-4 rounded-xl shadow-sm justify-between items-center">

          {/* Sort */}
          <div className="flex gap-2">
            <button
              onClick={() => setSortType("latest")}
              className={`px-3 py-1 rounded-full text-sm ${sortType === "latest" ? "bg-black text-white" : "bg-gray-200"
                }`}
            >
              Latest
            </button>

            <button
              onClick={() => setSortType("oldest")}
              className={`px-3 py-1 rounded-full text-sm ${sortType === "oldest" ? "bg-black text-white" : "bg-gray-200"
                }`}
            >
              Oldest
            </button>

            <button
              onClick={() => setSortType("popular")}
              className={`px-3 py-1 rounded-full text-sm ${sortType === "popular" ? "bg-black text-white" : "bg-gray-200"
                }`}
            >
              Most Reacted
            </button>
          </div>

          {/* Category */}
          <div className="flex gap-2">
            <button
              onClick={() => {
                setCategory("all");
                setTopic("all");
              }}
              className={`px-3 py-1 rounded-full text-sm ${category === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
            >
              All
            </button>

            <button
              onClick={() => setCategory("case")}
              className={`px-3 py-1 rounded-full text-sm ${category === "case" ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
            >
              Cases
            </button>

            <button
              onClick={() => {
                setCategory("appreciation");
                setTopic("all");
              }}
              className={`px-3 py-1 rounded-full text-sm ${category === "appreciation"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
                }`}
            >
              Appreciation
            </button>
          </div>
        </div>

        {/* 🔥 Topic Dropdown (ONLY for Cases) */}
        {category === "case" && (
          <div className="mt-3 bg-white p-3 rounded-xl shadow-sm">
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              {topics.map((t, i) => (
                <option key={i} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* 🔹 Posts */}
        <div className="mt-8 space-y-5">
          {filteredPosts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>

      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Profile;