import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import Loading from "../components/Loading";
import authorityImage from "../assets/authorityImage.png";

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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
        comments: [],
      },
      {
        _id: "2",
        user: {
          name: authority.name,
          profilePic: authority.profilePic,
        },
        content: "Street light issue resolved.",
        createdAt: new Date(),
        status: "Solved",
        likes: 30,
        comments: [],
      },
    ]);
    setLoading(false);
  }, []);

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

        {/* 🔹 Dashboard (COLORED 🔥) */}
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

        {/* 🔹 Posts */}
        <div className="mt-8 space-y-5">
          {posts.map((post) => (
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