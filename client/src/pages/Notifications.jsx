import React, { useEffect, useState } from "react";
import API from "../api";
import { Bell, CheckCircle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user?.id) return;

        const res = await API.get(`/posts/user/${user.id}`);

        setNotifications(res.data.reverse()); // latest first
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // 🔥 FILTER LOGIC
  const filteredData =
    filter === "ALL"
      ? notifications
      : notifications.filter((n) => n.status === filter);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-6 pb-10 pt-20 md:pt-6">
      {/* 🔥 HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
          <Bell size={22} />
          Notifications
        </h1>

        {/* 🔥 FILTER */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {["ALL", "PENDING", "IN_PROGRESS", "RESOLVED"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-full text-xs md:text-sm whitespace-nowrap flex-shrink-0 ${
                filter === f
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* 🔥 LOADING */}
      {loading ? (
        <div className="text-center text-gray-500 mt-10">
          Loading notifications...
        </div>
      ) : filteredData.length === 0 ? (
        <div className="text-center text-gray-400 mt-10">
          No notifications yet 🚀
        </div>
      ) : (
        <div className="space-y-5">
          {filteredData.map((post) => (
            <div
              key={post.id}
              className="bg-white p-5 rounded-2xl shadow-sm border hover:shadow-md transition-all"
            >
              {/* 🔥 TOP */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                <div>
                  <p className="text-sm text-gray-800">
                    📢 Complaint:
                    <span className="font-medium ml-2 break-words">
                      {post.content.slice(0, 60)}...
                    </span>
                  </p>

                  {/* 🔥 LOCATION */}
                  {post.location && (
                    <p className="text-xs text-gray-500 mt-1">
                      📍 {post.location}
                    </p>
                  )}
                </div>

                {/* 🔥 STATUS BADGE */}
                <span
                  className={`w-fit px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1
                  ${
                    post.status === "RESOLVED"
                      ? "bg-green-100 text-green-600"
                      : post.status === "IN_PROGRESS"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {post.status === "RESOLVED" && <CheckCircle size={14} />}
                  {post.status === "IN_PROGRESS" && <Clock size={14} />}
                  {post.status === "PENDING" && <Clock size={14} />}
                  {post.status}
                </span>
              </div>

              {/* 🔥 AUTHORITY MESSAGE */}
              {post.authorityMessage && (
                <div className="mt-3 bg-gray-50 p-3 rounded-lg text-sm text-gray-700">
                  💬 {post.authorityMessage}
                </div>
              )}

              {/* 🔥 PROOF IMAGE */}
              {post.proofImage && (
                <img
                  src={post.proofImage}
                  className="mt-3 w-full h-auto max-h-[220px] md:max-h-[250px] object-cover rounded-lg"
                />
              )}

              {/* 🔥 TRACK BUTTON */}
              <div className="mt-4 flex justify-start sm:justify-end">
                <button
                  onClick={() => navigate(`/post/${post.id}`)}
                  className="text-blue-500 text-sm font-medium hover:underline"
                >
                  Track →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
