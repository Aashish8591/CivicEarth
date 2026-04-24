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

const AuthorityAnalytics = () => {
  const [posts, setPosts] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetch = async () => {
      const res = await API.get(`/posts/department/${user.department}`);
      setPosts(res.data);
    };
    fetch();
  }, []);

  // 🔥 COUNTS
  const pending = posts.filter((p) => p.status === "PENDING").length;
  const progress = posts.filter((p) => p.status === "IN_PROGRESS").length;
  const resolved = posts.filter((p) => p.status === "RESOLVED").length;

  // 🔥 GROUP BY LOCATION
  const locationMap = {};
  posts.forEach((p) => {
    locationMap[p.location] = (locationMap[p.location] || 0) + 1;
  });

  const locationData = Object.entries(locationMap).map(([loc, val]) => ({
    name: loc,
    value: val,
  }));

  // 🔥 MONTHLY TREND (mock or enhance later)
  const trendData = posts.map((p, i) => ({
    name: `#${i + 1}`,
    value: p.status === "RESOLVED" ? 3 : p.status === "IN_PROGRESS" ? 2 : 1,
  }));

  const pieData = [
    { name: "Pending", value: pending },
    { name: "Progress", value: progress },
    { name: "Resolved", value: resolved },
  ];

  return (
    <div className="w-full h-full bg-transparent min-h-screen space-y-6">
      {/* 🔥 HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Analytics</h1>
        <p className="text-sm text-gray-500">Insights & performance</p>
      </div>

      {/* 🔥 STATS */}
      <div className="grid grid-cols-4 gap-4">
        {[
          {
            title: "Total",
            value: posts.length,
            color: "from-pink-400 to-purple-500",
          },
          {
            title: "Pending",
            value: pending,
            color: "from-yellow-400 to-orange-500",
          },
          {
            title: "In Progress",
            value: progress,
            color: "from-blue-400 to-indigo-500",
          },
          {
            title: "Resolved",
            value: resolved,
            color: "from-green-400 to-emerald-500",
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className={`bg-gradient-to-r ${card.color} text-white p-5 rounded-2xl shadow`}
          >
            <p className="text-sm">{card.title}</p>
            <h2 className="text-xl font-bold">{card.value}</h2>
          </motion.div>
        ))}
      </div>

      {/* 🔥 CHARTS */}
      <div className="grid grid-cols-3 gap-4">
        {/* LINE */}
        <motion.div
          className="col-span-2 bg-white/30 backdrop-blur-lg border border-white/20 p-5 rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h3 className="font-semibold mb-3">Complaint Trend</h3>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trendData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#6366f1"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* PIE */}
        <motion.div className="bg-white/30 backdrop-blur-lg border border-white/20 p-5 rounded-2xl flex flex-col items-center">
          <h3 className="font-semibold mb-3">Status Ratio</h3>

          <PieChart width={200} height={200}>
            <Pie data={pieData} dataKey="value" outerRadius={70}>
              {pieData.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
          </PieChart>
        </motion.div>
      </div>

      {/* 🔥 LOCATION ANALYTICS */}
      <div className="bg-white/30 backdrop-blur-lg border border-white/20 p-5 rounded-2xl">
        <h3 className="font-semibold mb-3">Top Locations</h3>

        {locationData.map((item, i) => (
          <div
            key={i}
            className="flex justify-between text-sm py-2 border-b border-white/20"
          >
            <span>{item.name}</span>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthorityAnalytics;
