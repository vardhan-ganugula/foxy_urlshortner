import React, { useEffect, useState } from "react";
import CheckLogin from "../../../utils/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Cookies from "universal-cookie";
import { format } from "date-fns";
import { useProfile } from "../../contexts/ProfileProvider";

import {
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";

import DashboardTopBar from "../../components/DashboardTopBar";

function Dashboard() {
  const navigate = useNavigate();
  const {
    data,
    tableData,
    loading,
    setLoading,
    setData,
    setTableData,
    setProfileDetails,
    gotDetails,
    upDatedetails,
  } = useProfile();

  useEffect(() => {
    const userId = new Cookies().get("userId");
    const token = new Cookies().get("token");

    if (!CheckLogin()) {
      navigate("/login");
      return;
    }
    if (!gotDetails) {
      fetch(import.meta.env.VITE_SERVER + `/dashboard?userId=${userId}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          authorization: "Bearer " + token,
        },
      })
        .then((resp) => resp.json())
        .then((resp) => {
          if (resp.dashboardData.length > 0){
            setData(resp.dashboardData)
          };
          if (resp.urlData) setTableData(resp.urlData);
          if (resp.profileData) setProfileDetails(resp.profileData);
          setLoading(false);
          upDatedetails(true);
          
        })
        .catch((err) => console.error(err));
    }
  }, [navigate]);
  return (
    <div className="w-screen h-screen overflow-hidden bg-zinc-900 flex ">
      <Sidebar />
      <div className="flex-grow bg-black text-white p-5 h-full w-auto overflow-y-auto">
        <DashboardTopBar name="Dashboard" />
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <p>Loading...</p>
          </div>
        ) : (
          <div id="main_area">
            <div className="min-h-80 w-full bg-zinc-800 rounded-lg py-3 text-xs">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={ data }>
                  <defs>
                    <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FFB52E" stopOpacity={0.4} />
                      <stop
                        offset="75%"
                        stopColor="#FFB52E"
                        stopOpacity={0.05}
                      />
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

            <div className="w-full flex gap-3 flex-col-reverse md:flex-row p-2 mt-5">
              <div className="w-full">
                <div>
                  <h4 className="mb-3">All URLs</h4>
                </div>
                <div>
                  <div className="text-xs bg-zinc-800/80 rounded-sm overflow-x-auto whitespace-nowrap">
                    <table className="w-full table-auto text-center">
                      <thead className="w-full bg-white text-black">
                        <tr className="w-full">
                          <th className="p-3">Short Id</th>
                          <th className="p-3">Domain</th>
                          <th className="p-3">URL</th>
                          <th className="p-3">Date</th>
                          <th className="p-3">Total Clicks</th>
                        </tr>
                      </thead>
                      <tbody className="bg-zinc-800/80 text-xs text-center">
                        {tableData.length > 0 ? (
                          tableData.map((tuple) => (
                            <tr
                              className="border-b-2 border-gray-700 hover:bg-zinc-900/50 cursor-pointer"
                              key={tuple._id}
                            >
                              <td className="p-2">{tuple._id}</td>
                              <td className="p-2 w-auto text-ellipsis overflow-hidden block">
                                {tuple.domain}
                              </td>
                              <td className="p-2 text-left">{tuple.url}</td>
                              <td className="p-2">
                                {format(
                                  new Date(tuple["createdAt"]),
                                  "yyyy-MM-dd"
                                )}
                              </td>
                              <td className="p-2 text-center">
                                {tuple.totalClicks}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="5" className="py-2">
                              No data found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
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

export default Dashboard;
