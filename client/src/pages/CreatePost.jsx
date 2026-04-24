import React, { useState, useEffect } from "react";
import { Image, AtSign, Send, X, MapPin, Tag } from "lucide-react";
import API from "../api";

const CreatePost = ({ onPost }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");

  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  const [loading, setLoading] = useState(false); // 🔥 NEW

  const [showMention, setShowMention] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedAuthority, setSelectedAuthority] = useState(null);

  const categories = ["Roads", "Water", "Drainage", "Garbage", "Electricity"];

  const [authorities, setAuthorities] = useState([]);
  useEffect(() => {
    const fetchAuthorities = async () => {
      try {
        const res = await API.get("/users");

        // 🔥 filter only ADMIN
        const admins = res.data.filter((u) => u.role === "ADMIN");

        setAuthorities(admins);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAuthorities();
  }, []);

  const nearbyAuthorities = authorities;

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  };

  const filtered = nearbyAuthorities.filter((a) =>
    a.fullName.toLowerCase().includes(query.toLowerCase()),
  );

  const handleSelect = (auth) => {
    setSelectedAuthority(auth);
    setShowMention(false);
    setQuery("");
  };

  // 📍 LOCATION
  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const latitude = pos.coords.latitude;
        const longitude = pos.coords.longitude;

        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
        );

        const data = await res.json();

        setLocation(data.display_name);
        setLat(latitude);
        setLng(longitude);
      },
      (err) => {
        console.log(err);
        alert("Enable location access");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  };

  // 🔥 SUBMIT
  const handleSubmit = async () => {
    if (!content.trim()) return;

    setLoading(true); // 🔥 START LOADING

    try {
      let imageUrl = "";

      // 🔥 IMAGE UPLOAD (MAIN DELAY)
      if (imageFile) {
        const data = new FormData();
        data.append("file", imageFile);
        data.append("upload_preset", "civic_upload");

        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dbrvcsgzq/image/upload",
          {
            method: "POST",
            body: data,
          },
        );

        const result = await res.json();
        imageUrl = result.secure_url;
      }

      const user = JSON.parse(localStorage.getItem("user"));

      const categoryDepartmentMap = {
        Roads: "Road department",
        Water: "Water department",
        Garbage: "Municipal department",
        Electricity: "Electricity department",
        Drainage: "Drainage department",
      };

      await API.post("/posts", {
        userId: user.id,
        content,
        imageUrl,
        authorityName: selectedAuthority?.name || "",
        location,
        category,
        latitude: lat,
        longitude: lng,

        // 🔥 IMPORTANT ADD THIS
        department: categoryDepartmentMap[category] || "General",
      });

      // 🔥 UPDATE UI
      if (onPost) onPost();

      // 🔄 RESET
      setContent("");
      setImage(null);
      setImageFile(null);
      setSelectedAuthority(null);
      setLocation("");
      setCategory("");
      setLat(null);
      setLng(null);
    } catch (err) {
      console.log(err);
    }

    setLoading(false); // 🔥 END LOADING
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 space-y-5 border">
        {/* USER */}
        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/150?img=3"
            className="w-11 h-11 rounded-full shadow"
          />
          <span className="font-semibold text-gray-800">User</span>
        </div>

        {/* TEXT */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Report issue in your area..."
          className="w-full bg-gray-50 border rounded-xl p-4 text-sm outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* LOCATION + CATEGORY */}
        <div className="flex gap-3">
          {/* LOCATION */}
          <div
            onClick={getLocation}
            className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-sm cursor-pointer"
          >
            <MapPin size={16} />
            <span className="truncate max-w-[200px]">
              {location || "Add Location"}
            </span>
          </div>

          {/* CATEGORY */}
          <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-sm">
            <Tag size={16} />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-transparent outline-none"
            >
              <option value="">Category</option>
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* AUTHORITY */}
        {!selectedAuthority && (
          <button
            onClick={() => {
              if (!location) {
                alert("Please select location first");
                return;
              }

              setShowMention(true);
            }}
            className="text-sm text-blue-600 flex items-center gap-1"
          >
            <AtSign size={16} />
            Mention authority
          </button>
        )}

        {showMention && (
          <div className="border rounded-xl p-3 bg-gray-50">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search authority..."
              className="w-full border px-3 py-2 rounded-lg text-sm"
            />

            {filtered.map((auth, i) => (
              <div
                key={i}
                onClick={() => handleSelect(auth)}
                className="p-2 hover:bg-gray-200 cursor-pointer rounded-lg"
              >
                {auth.fullName}
              </div>
            ))}
          </div>
        )}

        {/* IMAGE */}
        {image && (
          <div className="relative">
            <img src={image} className="w-full rounded-xl" />
            <button
              onClick={() => {
                setImage(null);
                setImageFile(null);
              }}
              className="absolute top-2 right-2 bg-black text-white p-1 rounded-full"
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* ACTION */}
        <div className="flex justify-between border-t pt-4">
          <label className="cursor-pointer flex items-center gap-1">
            <Image size={18} />
            <input
              type="file"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                setImage(URL.createObjectURL(file));
                setImageFile(file);
              }}
            />
          </label>

          {/* 🔥 BUTTON FIX */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 text-white px-5 py-2 rounded-full flex items-center gap-2"
          >
            {loading ? (
              "Posting..."
            ) : (
              <>
                <Send size={16} />
                Post
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
