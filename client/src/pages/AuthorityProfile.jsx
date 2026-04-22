import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // 🔥 NEW
import API from "../api";
import PostCard from "../components/PostCard";
import AuthorityEditProfile from "../components/AuthorityEditProfile";
import { MapPin, CalendarDays } from "lucide-react";

const AuthorityProfile = () => {
  const [activeTab, setActiveTab] = useState("posts");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [preview, setPreview] = useState(null);
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate(); // 🔥 NEW

  // 🔥 CURRENT LOGGED USER
  const currentUser = JSON.parse(localStorage.getItem("user"));

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

    if (!localUser) return;

    setUser(localUser);

    // 🔥 FETCH POSTS BY DEPARTMENT
    API.get(`/posts/department/${localUser.department}`)
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  }, []);

  // 🔥 CHECK OWNER
  const isOwner = currentUser?.id === user?.id;

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

      const updatedUser = {
        ...user,
        profilePic: result.secure_url,
      };

      await API.put(`/users/${user.id}`, {
        profilePic: result.secure_url,
      });

      localStorage.setItem("user", JSON.stringify(updatedUser));
      window.dispatchEvent(new Event("userUpdated"));

      setUser(updatedUser);
      setPreview(null);
    } catch (err) {
      console.log(err);
      alert("Image upload failed ❌");
    }
  };

  // 🔥 TRANSPARENCY FILTER
  const visiblePosts = isOwner
    ? posts
    : posts.filter((p) => p.status === "RESOLVED");

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-6">
      <div className="h-16" />

      {/* 🔥 PROFILE CARD */}
      <div className="bg-white rounded-2xl shadow-xl p-6 relative">
        <div className="flex justify-between items-start">
          {/* LEFT */}
          <div className="flex gap-6 items-start">
            {/* PROFILE IMAGE */}
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

                {isOwner && (
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                )}
              </div>
            </label>

            {/* INFO */}
            <div className="mt-2">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-gray-800">
                  {user?.fullName}
                </h1>

                <p className="text-gray-500 text-sm">{user?.email}</p>

                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                    Verified Authority
                  </p>

                  <p className="text-xs text-white bg-blue-500 px-3 py-1 rounded-full">
                    {user?.department} Department
                  </p>
                </div>
              </div>

              <p className="text-gray-600 mt-3 max-w-md text-sm">
                {user?.bio ||
                  "Responsible for managing and resolving public complaints."}
              </p>

              <div className="flex flex-wrap items-center gap-6 mt-4 text-sm text-gray-500">
                {user?.location && (
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    {user.location}
                  </div>
                )}

                {user?.createdAt && (
                  <div className="flex items-center gap-2">
                    <CalendarDays size={16} />
                    {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                )}
              </div>

              <p className="text-xs text-green-600 mt-2">
                High Response Authority
              </p>

              {/* 🔥 OWNER ONLY BUTTONS */}
              {isOwner && (
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-2 bg-black text-white rounded-lg text-sm"
                  >
                    Edit Profile
                  </button>

                  <button
                    onClick={() => navigate("/admin")}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
                  >
                    Dashboard
                  </button>
                </div>
              )}

              {/* 🔥 USER VIEW LABEL */}
              {!isOwner && (
                <p className="text-xs text-gray-500 mt-2">
                  Showing verified resolved complaints only
                </p>
              )}
            </div>
          </div>

          {/* 🔥 RIGHT STATS */}
          <div className="flex gap-10 text-center mt-4">
            <div>
              <p className="text-xl font-bold">{visiblePosts.length}</p>
              <p className="text-gray-500 text-xs">Handled</p>
            </div>

            <div>
              <p className="text-xl font-bold">
                {visiblePosts.filter((p) => p.status === "RESOLVED").length}
              </p>
              <p className="text-gray-500 text-xs">Resolved</p>
            </div>

            <div>
              <p className="text-xl font-bold">
                {isOwner
                  ? posts.filter((p) => p.status === "PENDING").length
                  : "-"}
              </p>
              <p className="text-gray-500 text-xs">Pending</p>
            </div>
          </div>
        </div>
      </div>

      {/* 🔥 POSTS */}
      <div className="mt-6 grid md:grid-cols-2 gap-6">
        {visiblePosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {isOwner && isModalOpen && (
        <AuthorityEditProfile close={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default AuthorityProfile;
