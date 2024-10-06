import React, { useEffect } from "react";
import { PieChart, Tooltip, ResponsiveContainer, Pie, Cell } from "recharts";

function DevicePieChart({ data }) {
  const COLORS = ['#2ecc71', '#3498db', '#f1c40f'];
  return (
    <div className="border border-black">
      <PieChart width={400} height={400}>
        <Pie dataKey="value" data={data} cx={200} cy={200} fill="#f1c40f" >

        {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
        </Pie>
        <Tooltip content={customToolTip} />
      </PieChart>
    </div>
  );
}

function customToolTip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div>
        <div className="w-auto p-2 bg-black rounded text-white px-2 ">
          <div>
            <span>Name : </span> <span>{payload[0].name}</span>
          </div>
          <div>
            <span>Value : </span> <span>{payload[0].value}</span>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default DevicePieChart;
