import { useEffect, useState } from "react";
import API from "../api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { motion } from "framer-motion";

const COLORS = ["#f59e0b", "#3b82f6", "#10b981"];

const AuthorityDashboard = () => {
  const [posts, setPosts] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetch = async () => {
      try {
        if (!user?.department) return;

        const res = await API.get(`/posts/department/${user.department}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetch();
  }, []);

  // 🔥 STATUS COUNTS
  const pending = posts.filter((p) => p.status === "PENDING").length;
  const progress = posts.filter((p) => p.status === "IN_PROGRESS").length;
  const resolved = posts.filter((p) => p.status === "RESOLVED").length;

  // 🔥 PIE %
  const total = posts.length || 1;

  const pieData = [
    { name: "Pending", value: Math.round((pending / total) * 100) },
    { name: "Progress", value: Math.round((progress / total) * 100) },
    { name: "Resolved", value: Math.round((resolved / total) * 100) },
  ];

  // 🔥 LINE CHART (REAL DATA BY DAY)
  const groupByDate = {};

  posts.forEach((p) => {
    const date = new Date(p.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    if (!groupByDate[date]) {
      groupByDate[date] = 0;
    }

    groupByDate[date] += 1;
  });

  const chartData = Object.keys(groupByDate).map((date) => ({
    name: date,
    value: groupByDate[date],
  }));

  return (
    <div className="w-full h-full bg-transparent min-h-screen space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 text-sm">Overview of complaints</p>
      </div>

      {/* TOP STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { title: "Pending", value: pending, color: "bg-pink-500" },
          { title: "In Progress", value: progress, color: "bg-purple-500" },
          { title: "Resolved", value: resolved, color: "bg-blue-500" },
          { title: "Total", value: posts.length, color: "bg-orange-400" },
        ].map((card, i) => (
          <div
            key={i}
           className={`p-4 md:p-5 rounded-2xl  text-white shadow-md ${card.color}`}
          >
            <p className="text-sm opacity-80">{card.title}</p>
            <h2 className="text-xl md:text-2xl font-bold">{card.value}</h2>
          </div>
        ))}
      </div>

      {/* MAIN */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* LINE CHART */}
        <div className="lg:col-span-2 bg-white p-4 md:p-6 rounded-2xl shadow-md overflow-x-auto">
          <h3 className="font-semibold mb-4">Complaint Trend</h3>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <XAxis dataKey="name" stroke="#888" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#ec4899"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* PIE */}
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-md flex flex-col items-center">
          <h3 className="font-semibold mb-4">Status Distribution</h3>

          <PieChart width={180} height={180}>
            <Pie data={pieData} dataKey="value" outerRadius={80}>
              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>

          <div className="flex justify-around w-full mt-4 text-sm">
            <span className="text-pink-500">{pieData[0].value}%</span>
            <span className="text-blue-500">{pieData[1].value}%</span>
            <span className="text-green-500">{pieData[2].value}%</span>
          </div>
        </div>
      </div>

      {/* SECOND ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* RECENT */}
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-md">
          <h3 className="font-semibold mb-4">Recent Activity</h3>

          {posts.slice(0, 5).map((p) => (
            <div
              key={p.id}
              className="flex justify-between py-2 border-b text-sm"
            >
              <p>{p.content.slice(0, 30)}</p>
              <span className="text-gray-400">{p.status}</span>
            </div>
          ))}
        </div>

        {/* SMALL CARDS (REAL DATA) */}
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
          <div className="bg-gradient-to-r from-pink-400 to-purple-500 text-white p-4 rounded-xl">
            <p>Total Complaints</p>
            <h2 className="text-xl font-bold">{posts.length}</h2>
          </div>

          <div className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white p-4 rounded-xl">
            <p>Resolved Complaints</p>
            <h2 className="text-xl font-bold">{resolved}</h2>
          </div>
        </div>

        {/* MINI CARD */}
        <div className="bg-gradient-to-r from-orange-400 to-yellow-500 text-white p-6 rounded-xl">
          <p>Pending Complaints</p>
          <h2 className="text-xl font-bold">{pending}</h2>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h3 className="font-semibold mb-4">All Complaints</h3>

        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th>ID</th>
              <th>Content</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {posts.map((post) => (
              <tr
                key={post.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td>{post.id.slice(0, 5)}</td>
                <td>{post.content.slice(0, 40)}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-white text-xs ${
                      post.status === "PENDING"
                        ? "bg-pink-500"
                        : post.status === "IN_PROGRESS"
                        ? "bg-blue-500"
                        : "bg-green-500"
                    }`}
                  >
                    {post.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuthorityDashboard;