import React, { useState } from "react";
import { Image, AtSign, Send, X } from "lucide-react";

const CreatePost = ({ onPost }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const [showMention, setShowMention] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedAuthority, setSelectedAuthority] = useState(null);

  const authorities = [
    { name: "Kalyan Municipal Corporation", profilePic: "https://i.pravatar.cc/150?img=12" },
    { name: "Traffic Police", profilePic: "https://i.pravatar.cc/150?img=8" },
    { name: "Water Department", profilePic: "https://i.pravatar.cc/150?img=15" },
    { name: "Electricity Board", profilePic: "https://i.pravatar.cc/150?img=20" },
  ];

  const filtered = authorities.filter((a) =>
    a.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (auth) => {
    setSelectedAuthority(auth);
    setShowMention(false);
    setQuery("");
  };

  const handleSubmit = () => {
    if (!content.trim()) return;

    const newPost = {
      _id: Date.now().toString(),
      user: {
        name: "Sairaj Vichare",
        profilePic: "https://i.pravatar.cc/150?img=3",
      },
      authority: selectedAuthority,
      content,
      image,
      status: "Pending",
      createdAt: new Date(),
      likes: 0,
      comments: [],
      isAuthority: false,
    };

    onPost(newPost);

    setContent("");
    setImage(null);
    setSelectedAuthority(null);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">

      <div className="bg-white rounded-2xl shadow-md p-6 space-y-5 border">

        {/* 🔥 USER */}
        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/150?img=3"
            className="w-11 h-11 rounded-full shadow"
          />
          <span className="font-semibold text-gray-800">
            Sairaj Vichare
          </span>
        </div>

        {/* 🔥 TEXTAREA */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's happening in your area? Report issue..."
          className="w-full bg-gray-50 border rounded-xl p-4 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-[100px]"
        />

        {/* 🔥 SELECTED AUTHORITY */}
        {selectedAuthority && (
          <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg text-sm w-fit">
            <img src={selectedAuthority.profilePic} className="w-5 h-5 rounded-full" />
            <span>{selectedAuthority.name}</span>
          </div>
        )}

        {/* 🔥 MENTION BUTTON */}
        {!showMention && !selectedAuthority && (
          <button
            onClick={() => setShowMention(true)}
            className="text-sm text-blue-600 flex items-center gap-1 hover:underline"
          >
            <AtSign size={16} />
            Mention authority
          </button>
        )}

        {/* 🔥 MENTION DROPDOWN */}
        {showMention && (
          <div className="border rounded-xl p-3 bg-gray-50 space-y-2">

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search authority..."
              className="w-full border px-3 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-400"
            />

            <div className="max-h-40 overflow-y-auto space-y-1">
              {filtered.map((auth, i) => (
                <div
                  key={i}
                  onClick={() => handleSelect(auth)}
                  className="flex items-center gap-2 p-2 hover:bg-gray-200 cursor-pointer rounded-lg transition"
                >
                  <img src={auth.profilePic} className="w-7 h-7 rounded-full" />
                  <span className="text-sm">{auth.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 🔥 IMAGE PREVIEW */}
        {image && (
          <div className="relative">
            <img
              src={image}
              className="w-full max-h-60 object-cover rounded-xl"
            />
            <button
              onClick={() => setImage(null)}
              className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-full"
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* 🔥 ACTION BAR */}
        <div className="flex items-center justify-between border-t pt-4">

          {/* LEFT */}
          <div className="flex items-center gap-5 text-gray-600">

            <label className="cursor-pointer hover:text-blue-600 flex items-center gap-1">
              <Image size={18} />
              <input
                type="file"
                className="hidden"
                onChange={(e) =>
                  setImage(URL.createObjectURL(e.target.files[0]))
                }
              />
            </label>

          </div>

          {/* RIGHT */}
          <button
            onClick={handleSubmit}
            disabled={!content.trim()}
            className={`px-5 py-2 rounded-full flex items-center gap-2 transition ${
              content.trim()
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <Send size={16} />
            Post
          </button>

        </div>

      </div>
    </div>
  );
};

export default CreatePost;