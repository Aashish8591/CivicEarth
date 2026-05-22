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

  // 🔥 COUNTS
  const pending = posts.filter((p) => p.status === "PENDING").length;
  const progress = posts.filter((p) => p.status === "IN_PROGRESS").length;
  const resolved = posts.filter((p) => p.status === "RESOLVED").length;

  // 🔥 GROUP BY LOCATION
  const locationMap = {};

  posts.forEach((p) => {
    const loc = p.location || "Unknown";
    locationMap[loc] = (locationMap[loc] || 0) + 1;
  });

  const locationData = Object.entries(locationMap).map(([loc, val]) => ({
    name: loc,
    value: val,
  }));

  // 🔥 TREND DATA
  const dateMap = {};

  posts.forEach((p) => {
    if (!p.createdAt) return;

    const date = new Date(p.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    if (!dateMap[date]) {
      dateMap[date] = 0;
    }

    dateMap[date] += 1;
  });

  const trendData = Object.keys(dateMap).map((date) => ({
    name: date,
    value: dateMap[date],
  }));

  // 🔥 PIE DATA
  const pieData = [
    { name: "Pending", value: pending },
    { name: "Progress", value: progress },
    { name: "Resolved", value: resolved },
  ];

  return (
    <div className="w-full min-h-screen space-y-5 md:space-y-6 overflow-x-hidden">

      {/* HEADER */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">
          Analytics
        </h1>

        <p className="text-sm text-gray-500">
          Insights & performance
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

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
            whileHover={{ scale: 1.03 }}
            className={`bg-gradient-to-r ${card.color} text-white p-4 md:p-5 rounded-2xl shadow`}
          >
            <p className="text-xs md:text-sm opacity-90">
              {card.title}
            </p>

            <h2 className="text-xl md:text-2xl font-bold">
              {card.value}
            </h2>
          </motion.div>
        ))}
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* LINE CHART */}
        <motion.div
          className="lg:col-span-2 bg-white/30 backdrop-blur-lg border border-white/20 p-4 md:p-5 rounded-2xl overflow-x-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >

          <h3 className="font-semibold mb-3">
            Complaint Trend
          </h3>

          <div className="w-full min-w-0">
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
          </div>
        </motion.div>

        {/* PIE CHART */}
        <motion.div
          className="bg-white/30 backdrop-blur-lg border border-white/20 p-4 md:p-5 rounded-2xl flex flex-col items-center overflow-hidden"
        >

          <h3 className="font-semibold mb-3">
            Status Ratio
          </h3>

          <PieChart width={180} height={180}>
            <Pie
              data={pieData}
              dataKey="value"
              outerRadius={65}
            >
              {pieData.map((_, i) => (
                <Cell
                  key={i}
                  fill={COLORS[i]}
                />
              ))}
            </Pie>
          </PieChart>

          {/* LABELS */}
          <div className="flex justify-around w-full mt-4 text-xs md:text-sm">
            <span className="text-yellow-500">
              Pending
            </span>

            <span className="text-blue-500">
              Progress
            </span>

            <span className="text-green-500">
              Resolved
            </span>
          </div>
        </motion.div>
      </div>

      {/* LOCATION */}
      <div className="bg-white/30 backdrop-blur-lg border border-white/20 p-4 md:p-5 rounded-2xl overflow-hidden">

        <h3 className="font-semibold mb-3">
          Top Locations
        </h3>

        <div className="space-y-2">

          {locationData.map((item, i) => (
            <div
              key={i}
              className="flex justify-between gap-4 text-sm py-2 border-b border-white/20"
            >

              <span className="break-all text-gray-700">
                {item.name}
              </span>

              <span className="font-medium text-gray-800 flex-shrink-0">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorityAnalytics;