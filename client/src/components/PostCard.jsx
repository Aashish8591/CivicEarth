import React, { useState } from "react";
import { BadgeCheck } from "lucide-react";
import moment from "moment";

const PostCard = ({ post }) => {
  if (!post) return null; // 🔥 prevent crash

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes || 0);

  const [showComments, setShowComments] = useState(false);
  const [showResponse, setShowResponse] = useState(false);

  const [commentInput, setCommentInput] = useState("");
  const [responseInput, setResponseInput] = useState("");

  const [comments, setComments] = useState(post.comments || []);
  const [responses, setResponses] = useState([]);

  const handleLike = () => {
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
    setLiked(!liked);
  };

  const handleAddComment = () => {
    if (!commentInput.trim()) return;
    setComments([...comments, { text: commentInput }]);
    setCommentInput("");
  };

  const handleAddResponse = () => {
    if (!responseInput.trim()) return;
    setResponses([...responses, { text: responseInput }]);
    setResponseInput("");
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 w-full relative space-y-3">

      {/* 🔥 STATUS */}
      {post.status && (
        <span className={`absolute top-3 right-3 px-3 py-1 text-xs rounded-full ${
          post.status.toLowerCase() === "solved"
            ? "bg-green-100 text-green-700"
            : post.status.toLowerCase() === "pending"
            ? "bg-red-100 text-red-700"
            : "bg-yellow-100 text-yellow-700"
        }`}>
          {post.status}
        </span>
      )}

      {/* 🔹 USER */}
      <div className="flex items-center gap-3">
        <img
          src={post?.user?.profile_picture || "https://via.placeholder.com/40"}
          alt="user"
          className="w-10 h-10 rounded-full"
        />

        <div>
          <div className="flex items-center gap-1">
            <span className="font-semibold">
              {post?.user?.full_name || "User"}
            </span>

            {post?.isAuthority && (
              <BadgeCheck className="w-4 h-4 text-blue-500" />
            )}
          </div>

          <p className="text-xs text-gray-500">
            {post?.createdAt
              ? moment(post.createdAt).fromNow()
              : "just now"}
          </p>
        </div>
      </div>

      {/* 🔥 AUTHORITY MENTION */}
      {post?.authority && !post?.isAuthority && (
        <div className="flex items-center gap-2 ml-12 bg-gray-50 p-2 rounded-lg">
          <img
            src={post?.authority?.profilePic || "https://via.placeholder.com/30"}
            className="w-6 h-6 rounded-full"
          />
          <span className="text-sm text-gray-700">
            Assigned to{" "}
            <span className="font-semibold">
              {post?.authority?.name || "Authority"}
            </span>
          </span>
        </div>
      )}

      {/* 🔹 CONTENT */}
      <p className="text-gray-800 text-sm">{post?.content}</p>

      {/* 🔹 IMAGE */}
      {post?.image_urls?.length > 0 && (
        <img src={post.image_urls[0]} alt='post' className='w-full rounded-lg object-cover max-h-96' />
      )}

      {/* 🔹 ACTIONS */}
      <div className="flex justify-between pt-2 border-t text-sm">

        <button onClick={handleLike}>
          👍 {likes}
        </button>

        <button onClick={() => setShowComments(!showComments)}>
          💬 Comment
        </button>

        <button onClick={() => setShowResponse(!showResponse)}>
          🏛️ Respond
        </button>

        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied!");
          }}
        >
          🔗 Share
        </button>

      </div>

      {/* 💬 COMMENTS */}
      {showComments && (
        <div className="bg-gray-50 p-3 rounded-lg space-y-2">
          {comments.map((c, i) => (
            <p key={i}>{c.text}</p>
          ))}

          <div className="flex gap-2">
            <input
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              className="flex-1 border px-2 py-1 rounded"
            />
            <button onClick={handleAddComment}>Post</button>
          </div>
        </div>
      )}

      {/* 🏛️ RESPONSES */}
      {showResponse && (
        <div className="bg-green-50 p-3 rounded-lg space-y-2">
          {responses.map((r, i) => (
            <p key={i}>🏛️ {r.text}</p>
          ))}

          <div className="flex gap-2">
            <input
              value={responseInput}
              onChange={(e) => setResponseInput(e.target.value)}
              className="flex-1 border px-2 py-1 rounded"
            />
            <button onClick={handleAddResponse}>Respond</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default PostCard;