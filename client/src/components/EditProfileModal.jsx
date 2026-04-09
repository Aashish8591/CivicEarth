import React, { useState } from "react";

const EditProfileModal = ({ close }) => {
  const [form, setForm] = useState({
    name: "",
    bio: "",
    location: "",
    website: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[400px] rounded-xl p-6 space-y-4">

        <h2 className="text-lg font-bold">Edit Profile</h2>

        <input
          name="name"
          placeholder="Name"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <textarea
          name="bio"
          placeholder="Bio"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <input
          name="location"
          placeholder="Location"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <input
          name="website"
          placeholder="Website"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <div className="flex justify-end gap-2">
          <button onClick={close} className="px-4 py-2 bg-gray-200 rounded">
            Cancel
          </button>

          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;