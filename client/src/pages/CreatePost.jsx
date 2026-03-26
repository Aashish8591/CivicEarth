import React, { useState } from "react";
import { Image, AtSign, Send } from "lucide-react";

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

    // reset
    setContent("");
    setImage(null);
    setSelectedAuthority(null);
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-5 space-y-4">

      {/* 🔹 USER */}
      <div className="flex items-center gap-3">
        <img src="https://i.pravatar.cc/150?img=3" className="w-10 h-10 rounded-full" />
        <span className="font-semibold">Sairaj Vichare</span>
      </div>

      {/* 🔹 TEXTAREA */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Report an issue or share feedback..."
        className="w-full border rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-400 resize-none"
        rows={3}
      />

      {/* 🔥 MENTION TRIGGER */}
      {!showMention && !selectedAuthority && (
        <button
          onClick={() => setShowMention(true)}
          className="text-sm text-blue-600 flex items-center gap-1 hover:underline"
        >
          <AtSign size={16} />
          Mention authority
        </button>
      )}

      {/* 🔥 MENTION INPUT */}
      {showMention && (
        <div className="bg-gray-50 p-3 rounded-lg space-y-2">

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type authority name..."
            className="w-full border px-2 py-1 rounded text-sm"
          />

          <div className="max-h-32 overflow-y-auto">
            {filtered.map((auth, i) => (
              <div
                key={i}
                onClick={() => handleSelect(auth)}
                className="flex items-center gap-2 p-2 hover:bg-gray-200 cursor-pointer rounded"
              >
                <img src={auth.profilePic} className="w-6 h-6 rounded-full" />
                <span className="text-sm">{auth.name}</span>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* 🔥 SELECTED AUTHORITY */}
      {selectedAuthority && (
        <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg text-sm">
          <img src={selectedAuthority.profilePic} className="w-5 h-5 rounded-full" />
          <span>{selectedAuthority.name}</span>
        </div>
      )}

      {/* 🔹 ACTION BAR */}
      <div className="flex items-center justify-between border-t pt-3">

        {/* LEFT SIDE */}
        <div className="flex items-center gap-4 text-gray-600">

          {/* 📸 MEDIA */}
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

        {/* RIGHT SIDE */}
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Send size={16} />
          Post
        </button>

      </div>

      {/* 🔹 IMAGE PREVIEW */}
      {image && (
        <img src={image} className="w-full max-h-60 object-cover rounded-lg" />
      )}

    </div>
  );
};

export default CreatePost;