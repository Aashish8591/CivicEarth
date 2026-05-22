import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import { CheckCircle, Clock } from "lucide-react";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await API.get(`/posts/${id}`);
        setPost(res.data);

        setPost(found);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!post) return <p className="p-6">Post not found</p>;

  // 🔥 TIMELINE STEPS
  const steps = [
    {
      label: "Complaint Created",
      done: true,
      date: post.createdAt,
    },
    {
      label: "Sent to Authority",
      done: true,
    },
    {
      label: "In Progress",
      done: post.status !== "PENDING",
    },
    {
      label: "Work Completed",
      done: post.status === "RESOLVED",
    },
    {
      label: "Resolved",
      done: post.status === "RESOLVED",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-6">
      {/* 🔥 HEADER */}
      <h1 className="text-2xl font-bold mb-4">Complaint Tracking</h1>

      {/* 🔥 CONTENT */}
      <div className="bg-white p-5 rounded-2xl shadow border">
        <p className="text-gray-800 font-medium">{post.content}</p>

        {post.location && (
          <p className="text-sm text-gray-500 mt-1">📍 {post.location}</p>
        )}

        <p className="text-xs text-gray-400 mt-2">
          Created: {new Date(post.createdAt).toLocaleString()}
        </p>

        {/* 🔥 STATUS BADGE */}
        <div className="mt-4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              post.status === "RESOLVED"
                ? "bg-green-100 text-green-600"
                : post.status === "IN_PROGRESS"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-yellow-100 text-yellow-600"
            }`}
          >
            {post.status}
          </span>
        </div>
      </div>

      {/* 🔥 TIMELINE */}
      <div className="mt-6 bg-white p-6 rounded-2xl shadow border">
        <h2 className="font-semibold mb-4">Tracking Timeline</h2>

        <div className="space-y-5">
          {steps.map((step, i) => (
            <div key={i} className="flex items-start gap-4">
              {/* ICON */}
              <div>
                {step.done ? (
                  <CheckCircle className="text-green-500" size={20} />
                ) : (
                  <Clock className="text-gray-400" size={20} />
                )}
              </div>

              {/* TEXT */}
              <div>
                <p
                  className={`font-medium ${
                    step.done ? "text-black" : "text-gray-400"
                  }`}
                >
                  {step.label}
                </p>

                {step.date && (
                  <p className="text-xs text-gray-500">
                    {new Date(step.date).toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🔥 AUTHORITY RESPONSE */}
      {(post.authorityMessage || post.proofImage) && (
        <div className="mt-6 bg-white p-5 rounded-2xl shadow border">
          <h2 className="font-semibold mb-3">Authority Update</h2>

          {post.authorityMessage && (
            <p className="text-gray-700 mb-3">💬 {post.authorityMessage}</p>
          )}

          {post.proofImage && (
            <img
              src={post.proofImage}
              className="rounded-lg w-full max-h-[300px] object-cover"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default PostDetails;
