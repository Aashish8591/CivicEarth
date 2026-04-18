import React, { useState, useEffect } from "react";
import { Heart, MessageCircle, BadgeCheck } from "lucide-react";
import moment from "moment";
import API from "../api";

const PostCard = ({ post }) => {
  if (!post) return null;

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const userName =
    post?.user?.full_name || currentUser?.fullName || "User";

  const userImage =
    post?.user?.profile_picture ||
    currentUser?.profilePic ||
    "";

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
    createdTime ? getTimeAgo(createdTime) : "now"
  );

  useEffect(() => {
    if (!createdTime) return;

    const interval = setInterval(() => {
      setTimeAgo(getTimeAgo(createdTime));
    }, 10000);

    return () => clearInterval(interval);
  }, [createdTime]);

  // ✅ FIXED ID + LIKE LOGIC
  const handleLike = async () => {
    try {
      await API.post(`/posts/${post.id}/like?userId=${currentUser.id}`);

      // toggle like count properly
      if (post.likes?.includes(currentUser.id)) {
        setLikes((prev) => prev - 1);
      } else {
        setLikes((prev) => prev + 1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ FIXED COMMENT API
  const handleAddComment = async () => {
    if (!commentInput.trim()) return;

    try {
      await API.post(
        `/posts/${post.id}/comment?text=${commentInput}`
      );

      setComments([...comments, { text: commentInput }]);
      setCommentInput("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">

      {/* 🔥 USER HEADER */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          {userImage ? (
            <img
              src={userImage}
              className="w-10 h-10 rounded-full object-cover"
              alt=""
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200" />
          )}

          <div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-gray-800">
                {userName}
              </span>

              {post?.isAuthority && (
                <BadgeCheck className="w-4 h-4 text-blue-500" />
              )}
            </div>

            <p className="text-xs text-gray-500">{timeAgo}</p>
          </div>
        </div>
      </div>

      {/* 🔥 IMAGE */}
      {(post?.imageUrl || post?.image_urls?.length > 0) && (
        <img
          src={post.imageUrl || post.image_urls[0]}
          className="w-full max-h-[400px] object-cover rounded-xl px-4"
          alt=""
        />
      )}

      {/* 🔥 CONTENT */}
      <div className="px-4 pt-3 text-gray-800 text-sm">
        {post?.content}
      </div>

      {/* 🔥 NEW: LOCATION + CATEGORY */}
      <div className="px-4 mt-2 flex gap-3 text-xs text-gray-500">

        {/* 📍 LOCATION */}
        {post?.location && (
          <span className="flex items-center gap-1 text-blue-600 font-medium">
            📍 {post.location}
          </span>
        )}

        {/* 🏷 CATEGORY */}
        {post?.category && (
          <span className="bg-gray-200 px-2 py-1 rounded-full">
            #{post.category}
          </span>
        )}

      </div>

      {/* 🔥 ACTIONS */}
      <div className="flex items-center justify-between px-4 py-3 text-sm">
        <div className="flex items-center gap-5">

          <button
            onClick={handleLike}
            className="flex items-center gap-1 hover:text-red-500 transition"
          >
            <Heart size={18} />
            {likes}
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1 hover:text-blue-500 transition"
          >
            <MessageCircle size={18} />
            {comments.length}
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
    </div>
  );
};

export default PostCard;