import React, { useState, useEffect } from "react";
import { Heart, MessageCircle, BadgeCheck } from "lucide-react";
import moment from "moment";
import API from "../api";

const PostCard = ({ post }) => {
  if (!post) return null;

  const storedUser = localStorage.getItem("user");
  const role = localStorage.getItem("role");

  const [showStatus, setShowStatus] = useState(false);

  // 🔥 NEW MODAL STATES
  const [showResolveModal, setShowResolveModal] = useState(false);
  const [authorityMessage, setAuthorityMessage] = useState("");
  const [proofImage, setProofImage] = useState(null);
  const [proofFile, setProofFile] = useState(null);

  // 🔥 NEW EXPAND STATE
  const [expanded, setExpanded] = useState(false);

  let currentUser = null;

  try {
    currentUser =
      storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
  } catch (err) {
    currentUser = null;
  }

  const [status, setStatus] = useState(post.status);

  const isAuthorityOwner =
    role === "ADMIN" &&
    post.authorityName &&
    currentUser?.fullName === post.authorityName;

  const userName = post?.user?.fullName || currentUser?.fullName || "User";
  const userImage = post?.user?.profilePic || currentUser?.profilePic || "";

  const [likes, setLikes] = useState(post.likes?.length || 0);
  const [comments, setComments] = useState(post.comments || []);
  const [commentInput, setCommentInput] = useState("");
  const [showComments, setShowComments] = useState(false);

  const createdTime = post?.createdAt || post?.created_at;

  const getTimeAgo = (date) => {
    if (!date) return "now";

    const now = moment();
    const created = moment(date);

    const seconds = now.diff(created, "seconds");
    const minutes = now.diff(created, "minutes");
    const hours = now.diff(created, "hours");
    const days = now.diff(created, "days");

    if (seconds < 10) return "now";
    if (seconds < 60) return `${seconds}s`;
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    return `${days}d`;
  };

  const [timeAgo, setTimeAgo] = useState(
    createdTime ? getTimeAgo(createdTime) : "now",
  );

  useEffect(() => {
    if (!createdTime) return;

    const interval = setInterval(() => {
      setTimeAgo(getTimeAgo(createdTime));
    }, 10000);

    return () => clearInterval(interval);
  }, [createdTime]);

  // ❤️ LIKE
  const handleLike = async () => {
    try {
      await API.post(`/posts/${post.id}/like?userId=${currentUser.id}`);

      if (post.likes?.includes(currentUser.id)) {
        setLikes((prev) => prev - 1);
      } else {
        setLikes((prev) => prev + 1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 💬 COMMENT
  const handleAddComment = async () => {
    if (!commentInput.trim()) return;

    try {
      await API.post(`/posts/${post.id}/comment?text=${commentInput}`);

      setComments([...comments, { text: commentInput }]);
      setCommentInput("");
    } catch (err) {
      console.log(err);
    }
  };

  // 🔵 START WORK
  const updateStatus = async (newStatus) => {
    try {
      const res = await API.put(`/posts/${post.id}/status`, {
        status: newStatus,
        authorityMessage: "Work started",
      });

      setStatus(res.data.status);
    } catch (err) {
      console.log(err);
    }
  };

  // 🟢 RESOLVE FUNCTION
  const handleResolve = async () => {
    try {
      let imageUrl = "";

      if (proofFile) {
        const data = new FormData();
        data.append("file", proofFile);
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

      const res = await API.put(`/posts/${post.id}/status`, {
        status: "RESOLVED",
        proofImage: imageUrl,
        authorityMessage,
      });

      setStatus(res.data.status);

      setShowResolveModal(false);
      setAuthorityMessage("");
      setProofImage(null);
      setProofFile(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
      {/* HEADER */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          {userImage ? (
            <img src={userImage} className="w-10 h-10 rounded-full" />
          ) : (
            <div className="w-10 h-10 bg-gray-200 rounded-full" />
          )}

          <div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-gray-800">{userName}</span>
              {post?.isAuthority && (
                <BadgeCheck className="w-4 h-4 text-blue-500" />
              )}
            </div>
            <p className="text-xs text-gray-500">{timeAgo}</p>
          </div>
        </div>

        {/* STATUS */}
        <button
          onClick={() => setShowStatus(true)}
          className={`text-xs px-3 py-1 rounded-full font-medium
          ${
            status === "RESOLVED"
              ? "bg-green-100 text-green-600"
              : status === "IN_PROGRESS"
                ? "bg-blue-100 text-blue-600"
                : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {status || "PENDING"}
        </button>
      </div>

      {/* IMAGE */}
      {(post?.imageUrl || post?.image_urls?.length > 0) && (
        <img
          src={post.imageUrl || post.image_urls[0]}
          className="w-full max-h-[400px] object-cover rounded-xl px-4"
        />
      )}

      {/* 🔥 CONTENT WITH MORE */}
      <div className="px-4 pt-3 text-sm text-gray-800">
        {expanded
          ? post?.content
          : post?.content?.slice(0, 120) +
            (post?.content?.length > 120 ? "..." : "")}

        {post?.content?.length > 120 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-blue-500 ml-2 text-xs font-medium"
          >
            {expanded ? "Show less" : "More"}
          </button>
        )}
      </div>

      {/* 📍 LOCATION + CATEGORY */}
      <div className="px-4 mt-2 flex flex-wrap gap-2 text-xs text-gray-500">
        {post?.location && (
          <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full max-w-[200px] truncate">
            📍 {post.location}
          </span>
        )}

        {post?.category && (
          <span className="bg-gray-200 px-2 py-1 rounded-full">
            #{post.category}
          </span>
        )}
      </div>

      {/* AUTHORITY ACTION */}
      {isAuthorityOwner && (
        <div className="px-4 mt-3 flex gap-2">
          {status === "PENDING" && (
            <button
              onClick={() => updateStatus("IN_PROGRESS")}
              className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs"
            >
              Start Work
            </button>
          )}

          {status === "IN_PROGRESS" && (
            <button
              onClick={() => setShowResolveModal(true)}
              className="bg-green-500 text-white px-3 py-1 rounded-full text-xs"
            >
              Mark Resolved
            </button>
          )}
        </div>
      )}

      {/* 🔥 ACTIONS (LIKE + COMMENT) */}
      <div className="flex items-center justify-between px-4 py-3 text-sm">
        <div className="flex items-center gap-5">
          {/* ❤️ LIKE */}
          <button
            onClick={handleLike}
            className="flex items-center gap-1 hover:text-red-500 transition"
          >
            <Heart size={18} />
            <span>{likes}</span>
          </button>

          {/* 💬 COMMENT */}
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1 hover:text-blue-500 transition"
          >
            <MessageCircle size={18} />
            <span>{comments.length}</span>
          </button>
        </div>
      </div>

      {/* 🔥 COMMENTS */}
      {showComments && (
        <div className="px-4 pb-4 space-y-2">
          {comments.map((c, i) => (
            <p key={i} className="text-sm text-gray-700">
              {c.text}
            </p>
          ))}

          <div className="flex gap-2">
            <input
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 border rounded-full px-3 py-1 text-sm outline-none"
            />
            <button
              onClick={handleAddComment}
              className="text-blue-500 text-sm font-medium"
            >
              Post
            </button>
          </div>
        </div>
      )}

      {/* 🔥 RESOLVE MODAL */}
      {showResolveModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[400px] shadow-lg space-y-4">
            <h2 className="text-lg font-semibold">Resolve Issue</h2>

            <textarea
              placeholder="Enter resolution message..."
              value={authorityMessage}
              onChange={(e) => setAuthorityMessage(e.target.value)}
              className="w-full border rounded-lg p-2 text-sm outline-none"
            />

            {proofImage && (
              <img src={proofImage} className="w-full rounded-lg" />
            )}

            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                setProofImage(URL.createObjectURL(file));
                setProofFile(file);
              }}
            />

            <div className="flex gap-2">
              <button
                onClick={handleResolve}
                className="flex-1 bg-green-500 text-white py-2 rounded-lg"
              >
                Submit
              </button>

              <button
                onClick={() => setShowResolveModal(false)}
                className="flex-1 bg-gray-200 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STATUS MODAL */}
      {showStatus && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[350px] shadow-lg">
            <h2 className="text-lg font-semibold mb-3">Issue Status</h2>

            <p className="text-sm mb-2">
              Status: <b>{status || "PENDING"}</b>
            </p>

            {status === "RESOLVED" && (
              <>
                {post.proofImage && (
                  <img
                    src={post.proofImage}
                    className="w-full rounded-lg mb-3"
                  />
                )}

                <p className="text-sm text-gray-600">
                  {post.authorityMessage || "Issue resolved"}
                </p>
              </>
            )}

            <button
              onClick={() => setShowStatus(false)}
              className="mt-4 w-full bg-black text-white py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
