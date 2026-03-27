import React, { useState } from "react";

const Report = () => {
  const [selectedTopic, setSelectedTopic] = useState("all");

  const authority = {
    name: "Municipal Authority",
    area: "Kalyan, Maharashtra",
  };

  const topics = ["all", "Roads", "Water", "Drainage", "Garbage", "Electricity"];

  return (
    <div className="w-full min-h-screen bg-gray-100 py-6">
      <div className="max-w-5xl mx-auto px-4">

        {/* 🔥 TITLE */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h1 className="text-2xl font-bold">
            Report on {authority.area}
          </h1>
          <p className="text-gray-500 mt-1">{authority.name}</p>
        </div>

        {/* 🔥 FILTER */}
        <div className="mt-6 bg-white p-4 rounded-xl shadow-sm">
          <h2 className="text-sm text-gray-500 mb-2">Filter by Topic</h2>

          <div className="flex gap-2 overflow-x-auto">
            {topics.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTopic(t)}
                className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                  selectedTopic === t
                    ? "bg-black text-white"
                    : "bg-gray-200"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* 🔥 GRAPH / PIE CHART (PLACEHOLDER) */}
        <div className="mt-6 bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="font-semibold mb-4">Issue Distribution</h2>

          <div className="h-64 flex items-center justify-center bg-gray-100 rounded-xl">
            📊 Graph / Pie Chart (Backend + Chart.js later)
          </div>
        </div>

        {/* 🔥 STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">

          <div className="bg-blue-500 text-white p-4 rounded-xl text-center">
            <h2 className="text-xl font-bold">120</h2>
            <p className="text-sm">Reported</p>
          </div>

          <div className="bg-green-500 text-white p-4 rounded-xl text-center">
            <h2 className="text-xl font-bold">90</h2>
            <p className="text-sm">Solved</p>
          </div>

          <div className="bg-red-500 text-white p-4 rounded-xl text-center">
            <h2 className="text-xl font-bold">30</h2>
            <p className="text-sm">Pending</p>
          </div>

          <div className="bg-yellow-400 text-white p-4 rounded-xl text-center">
            <h2 className="text-xl font-bold">⭐ 4.2</h2>
            <p className="text-sm">Ratings</p>
          </div>

        </div>

        {/* 🔥 DESCRIPTION */}
        <div className="mt-6 bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="font-semibold mb-2">Latest Situation</h2>

          <p className="text-gray-600 text-sm">
            There has been a rise in road-related complaints in the last 2 weeks.
            Most issues are related to potholes and drainage blockage due to heavy rainfall.
            Authorities are actively working on resolving high-priority cases.
          </p>
        </div>

        {/* 🔥 SUGGESTIONS */}
        <div className="mt-6 bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="font-semibold mb-2">Suggestions</h2>

          <ul className="text-sm text-gray-600 space-y-2">
            <li>✅ Increase frequency of road inspections</li>
            <li>✅ Improve drainage cleaning system</li>
            <li>✅ Faster response team for emergency complaints</li>
            <li>✅ Public awareness for reporting issues early</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Report;