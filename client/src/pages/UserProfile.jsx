import { useEffect, useState } from "react";
import API from "../api";
import PostCard from "../components/PostCard";
import EditProfileModal from "../components/EditProfileModal";
import { MapPin, CalendarDays } from "lucide-react";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("posts");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [preview, setPreview] = useState(null);
  const [posts, setPosts] = useState([]);

  // ✅ USE id (NOT _id)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    let localUser = null;

    try {
      localUser =
        storedUser && storedUser !== "undefined"
          ? JSON.parse(storedUser)
          : null;
    } catch {
      localUser = null;
    }

    if (!localUser?.id) return;

    // 🔥 FIX: SET USER HERE
    setUser(localUser);

    // fetch posts
    API.get(`/posts/user/${localUser.id}`)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // 🔥 IMAGE UPLOAD
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "civic_upload");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dbrvcsgzq/image/upload",
        {
          method: "POST",
          body: data,
        },
      );

      const result = await res.json();

      const storedUser = localStorage.getItem("user");

      let localUser = null;

      try {
        localUser =
          storedUser && storedUser !== "undefined"
            ? JSON.parse(storedUser)
            : null;
      } catch {
        localUser = null;
      }

      if (!localUser) return;

      await API.put(`/users/${localUser.id}`, {
        profilePic: result.secure_url,
      });

      // ✅ FIX: merge user (IMPORTANT)
      const updatedUser = {
        ...localUser,
        profilePic: result.secure_url,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));

      // 🔥 notify Topbar
      window.dispatchEvent(new Event("userUpdated"));

      setUser(updatedUser);
      setPreview(null);
    } catch (err) {
      console.log(err);
      alert("Image upload failed ❌");
    }
  };

  const replies = [];
  const likes = [];

  const renderContent = () => {
    let data = [];

    if (activeTab === "posts") data = posts;
    if (activeTab === "replies") data = replies;
    if (activeTab === "likes") data = likes;

    return data.map((post) => <PostCard key={post.id} post={post} />);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-6">
      {/* 🔥 SPACE */}
      <div className="h-16" />

      {/* 🔥 PROFILE CARD */}
      <div className="bg-white rounded-2xl shadow-xl p-6 relative">
        <div className="flex justify-between items-start">
          {/* LEFT */}
          <div className="flex gap-6 items-start">
            {/* 🔥 FLOATING IMAGE */}
            <label className="cursor-pointer">
              <div className="relative -mt-16">
                {preview || user?.profilePic ? (
                  <img
                    src={preview || user?.profilePic}
                    className="w-28 h-28 rounded-2xl object-cover shadow-lg border-4 border-white"
                  />
                ) : (
                  <div className="w-28 h-28 bg-gray-200 rounded-2xl flex items-center justify-center border-4 border-white">
                    No Image
                  </div>
                )}

                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>
            </label>

            {/* USER INFO */}
            <div className="mt-2">
              <h1 className="text-2xl font-bold text-gray-800">
                {user?.fullName}
              </h1>

              <p className="text-gray-500 text-sm">{user?.email}</p>

              {/* 🔥 BIO */}
              <p className="text-gray-600 mt-2 max-w-md text-sm">
                {user?.bio || "No bio added"}
              </p>

              {/* 🔥 EXTRA INFO */}
              <div className="flex flex-wrap items-center gap-6 mt-3 text-sm text-gray-500">
                {/* 📍 LOCATION */}
                {user?.location && (
                  <div className="flex items-center gap-2 hover:text-gray-700 transition">
                    <MapPin size={16} className="text-blue-500" />
                    <span className="font-medium">{user.location}</span>
                  </div>
                )}

                {/* 📅 JOIN DATE */}
                {user?.createdAt && (
                  <div className="flex items-center gap-2 hover:text-gray-700 transition">
                    <CalendarDays size={16} className="text-purple-500" />
                    <span>
                      Joined{" "}
                      <span className="font-medium text-gray-700">
                        {new Date(user.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </span>
                  </div>
                )}
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-4 py-2 bg-black text-white rounded-lg text-sm shadow"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT STATS */}
          <div className="flex gap-10 text-center mt-4">
            <div>
              <p className="text-xl font-bold">{posts.length}</p>
              <p className="text-gray-500 text-xs">Posts</p>
            </div>

            <div>
              <p className="text-xl font-bold">{user?.following || 0}</p>
              <p className="text-gray-500 text-xs">Following</p>
            </div>
          </div>
        </div>
      </div>

      {/* 🔥 TABS */}
      <div className="flex gap-8 mt-6 border-b text-sm">
        {["posts", "replies", "likes"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 capitalize ${
              activeTab === tab
                ? "border-b-2 border-black text-black font-semibold"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 🔥 POSTS */}
      <div className="mt-6 grid md:grid-cols-2 gap-6">{renderContent()}</div>

      {isModalOpen && <EditProfileModal close={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default UserProfile;
