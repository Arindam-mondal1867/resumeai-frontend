import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const ATSChart = ({ score = 0 }) => {
  const data = [
    { name: "Matched", value: score },
    { name: "Missing", value: 100 - score },
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <div
      style={{
        width: "100%",
        height: 250,
        minHeight: "250px"
      }}
    >
      {/* 🔥 FIXED */}
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            innerRadius={60}
            outerRadius={90}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      {/* CENTER TEXT */}
      <h3
        style={{
          textAlign: "center",
          marginTop: "-150px",
          color: "white",
        }}
      >
        {score}%
      </h3>
    </div>
  );
};

export default ATSChart;