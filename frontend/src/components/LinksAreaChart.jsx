import React from "react";
import {
    XAxis,
    YAxis,
    ResponsiveContainer,
    Tooltip,
    CartesianGrid,
    AreaChart,
    Area,
  } from "recharts";
  
function LinksAreaChart({data}) {
  return (
    <>
      <div className="min-h-80 w-full bg-zinc-800 rounded-lg py-3 text-xs">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFB52E" stopOpacity={0.4} />
                <stop offset="75%" stopColor="#FFB52E" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <Tooltip content={customTooltip} />
            <XAxis dataKey="_id" />
            <YAxis dataKey="totalClicks" axisLine={false} />
            <Area
              dataKey="totalClicks"
              fill="url(#color)"
              stroke="#FFB52E"
              type="linear"
            />
            <CartesianGrid opacity={0.1} vertical={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

const customTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="w-auto rounded-md bg-black p-3 shadow-lg">
        <h4>
          <span className="font-bold">Short Id: </span>
          {label}
        </h4>
        <h3>
          <span className="font-bold">Total Clicks: </span>
          {payload[0].value}
        </h3>
      </div>
    );
  }
  return null;
};

export default LinksAreaChart;
