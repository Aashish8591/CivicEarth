import React, { useState } from "react";
import API from "../api";

const AuthorityEditProfile = ({ close }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    fullName: user.fullName || "",
    email: user.email || "",
    bio: user.bio || "",
    location: user.location || "",
    profilePic: user.profilePic || "",
    department: user.department || "", // 🔥 NEW
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setForm({
        ...form,
        profilePic: URL.createObjectURL(file),
      });
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      let updatedData = { ...form };

      // 🔥 IMAGE UPLOAD
      if (imageFile) {
        const data = new FormData();
        data.append("file", imageFile);
        data.append("upload_preset", "civic_upload");

        const uploadRes = await fetch(
          "https://api.cloudinary.com/v1_1/dbrvcsgzq/image/upload",
          {
            method: "POST",
            body: data,
          }
        );

        const result = await uploadRes.json();
        updatedData.profilePic = result.secure_url;
      }

      // 🔥 UPDATE BACKEND
      await API.put(`/users/${user.id}`, updatedData);

      const oldUser = JSON.parse(localStorage.getItem("user"));

      const updatedUser = {
        ...oldUser,
        ...updatedData,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));

      window.dispatchEvent(
        new CustomEvent("userUpdated", { detail: updatedUser })
      );

      alert("Profile updated ✅");
      close();

    } catch (err) {
      console.log(err);
      alert("Update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[700px] rounded-2xl shadow-xl overflow-hidden">

        {/* HEADER */}
        <div className="text-center py-4 border-b text-xl font-semibold">
          Edit Profile
        </div>

        <div className="flex">

          {/* LEFT */}
          <div className="w-1/3 bg-gray-50 flex flex-col items-center p-6 gap-4">

            <label className="cursor-pointer">
              <img
                src={form.profilePic || "https://via.placeholder.com/100"}
                alt="profile"
                className="w-24 h-24 rounded-full object-cover border hover:opacity-80"
              />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>

            <p className="text-sm text-gray-500">Click to change photo</p>
          </div>

          {/* RIGHT */}
          <div className="w-2/3 p-6 space-y-4">

            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="border p-2 rounded w-full"
            />

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="border p-2 rounded w-full"
            />

            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Location"
              className="border p-2 rounded w-full"
            />

            {/* 🔥 SHOW ONLY FOR AUTHORITY */}
            {user.role === "ADMIN" && (
              <input
                name="department"
                value={form.department}
                onChange={handleChange}
                placeholder="Department"
                className="border p-2 rounded w-full"
              />
            )}

            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              placeholder="Bio"
              className="border p-2 rounded w-full"
              rows="4"
            />
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-between items-center p-4 border-t">
          <button
            onClick={close}
            className="px-6 py-2 bg-gray-200 rounded-full"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="px-6 py-2 bg-green-500 text-white rounded-full disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthorityEditProfile;