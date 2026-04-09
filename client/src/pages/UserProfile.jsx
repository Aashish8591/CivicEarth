import React, { useState } from "react";
import PostCard from "../components/PostCard";
import UserImage from "../assets/sample_cover.jpg";
import EditProfileModal from "../components/EditProfileModal";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("posts");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const user = {
    name: "Sairaj boltey hamko",
    username: "@raj_civic",
    bio: "Community advocate and environmental enthusiast. Making our city better one report at a time.",
    location: "kalyan, thane",
    website: "civicearth.org",
    joined: "March 2023",
    followers: 142,
    following: 89,
    issuesResolved: 18,
    profilePic: UserImage,
  };

  // 🔥 DUMMY POSTS
  const posts = [
    {
      id: 1,
      content: "Cleaned the park today 🌱",
      createdAt: new Date(),
      likes: 12,
      reposts: 3,
      status: "Solved",
      user: {
        full_name: "Sairaj",
        profile_picture: UserImage,
      },
      comments: [{ text: "Great work!" }],
    },
    {
      id: 2,
      content: "Reported a road issue 🚧",
      createdAt: new Date(),
      likes: 8,
      reposts: 1,
      status: "Pending",
      user: {
        full_name: "Sairaj",
        profile_picture: UserImage,
      },
    },
  ];

  // 🔥 DUMMY REPLIES
  const replies = [
    {
      id: 3,
      content: "Thanks for reporting this issue 👍",
      createdAt: new Date(),
      likes: 5,
      reposts: 0,
      user: {
        full_name: "Sairaj",
        profile_picture: UserImage,
      },
    },
    {
      id: 4,
      content: "We are working on this problem 🚀",
      createdAt: new Date(),
      likes: 3,
      reposts: 0,
      user: {
        full_name: "Sairaj",
        profile_picture: UserImage,
      },
    },
  ];

  // 🔥 DUMMY LIKES
  const likes = [
    {
      id: 5,
      content: "Amazing initiative by community 👏",
      createdAt: new Date(),
      likes: 20,
      reposts: 2,
      user: {
        full_name: "Other User",
        profile_picture: UserImage,
      },
    },
    {
      id: 6,
      content: "Road fixed quickly 🔥",
      createdAt: new Date(),
      likes: 15,
      reposts: 1,
      user: {
        full_name: "Another User",
        profile_picture: UserImage,
      },
    },
  ];

  // 🔥 RENDER FUNCTION
  const renderContent = () => {
    let data = [];

    if (activeTab === "posts") data = posts;
    if (activeTab === "replies") data = replies;
    if (activeTab === "likes") data = likes;

    return data.map((post) => (
      <PostCard key={post.id} post={post} />
    ));
  };

  return (
    <div className="w-full bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white shadow-sm rounded-xl overflow-hidden">

        {/* 🔥 COVER */}
        <div className="h-48 bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400 relative">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        </div>

        {/* 🔥 PROFILE */}
        <div className="px-6 pb-6 relative">
          <img
            src={user.profilePic}
            className="w-35 h-35 rounded-full border-4 border-white absolute -top-36 left-6 object-cover shadow-lg"
            alt="profile"
          />

          {/* TOP */}
          <div className="mt-20 flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {user.name}
              </h1>
              <p className="text-gray-500">{user.username}</p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2 rounded-full border border-gray-300 hover:bg-blue-500 hover:text-white transition-all duration-300"
            >
              Edit Profile
            </button>
          </div>

          {/* BIO */}
          <p className="mt-4 text-gray-700 leading-relaxed max-w-2xl">
            {user.bio}
          </p>

          {/* INFO */}
          <div className="flex gap-6 mt-4 text-gray-500 text-sm flex-wrap">
            <span>📍 {user.location}</span>
            <span>
              🔗 <span className="text-blue-500">{user.website}</span>
            </span>
            <span>📅 Joined {user.joined}</span>
          </div>

          {/* STATS */}
          <div className="flex gap-8 mt-6 text-sm">
            <div className="hover:text-blue-500 cursor-pointer transition">
              <b className="text-gray-800">{user.following}</b>
              <span className="text-gray-500 ml-1">Following</span>
            </div>

            <div className="hover:text-blue-500 cursor-pointer transition">
              <b className="text-gray-800">{user.followers}</b>
              <span className="text-gray-500 ml-1">Followers</span>
            </div>

            <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-medium">
              {user.issuesResolved} Issues Resolved
            </div>
          </div>
        </div>

        {/* 🔥 TABS */}
        <div className="flex border-t border-b bg-gray-50">
          {["posts", "replies", "likes"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-sm capitalize transition-all duration-200 ${
                activeTab === tab
                  ? "border-b-2 border-blue-500 text-blue-600 font-semibold bg-white"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 🔥 CONTENT */}
        <div className="p-6 space-y-5 bg-gray-50">
          {renderContent()}
        </div>
      </div>

      {/* 🔥 MODAL */}
      {isModalOpen && (
        <EditProfileModal close={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default UserProfile;