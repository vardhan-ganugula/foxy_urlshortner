import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DevicePieChart from "../../components/DevicePieChart";
import Sidebar from "../../components/Sidebar";
import DashboardTopBar from "../../components/DashboardTopBar";
import StatsTable from "../../components/StatsTable";
function Stats() {
  const { id } = useParams();
  const [statsData, setStatsData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [isError, setError] = useState(false);
  function getStats() {
    fetch(import.meta.env.VITE_SERVER + "/dashboard/analytics?id=" + id, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.status === "success") {
          setTableData(resp.data)
          setStatsData([
            { name: "mobile", value: resp.devices.mobile },
            { name: "desktop", value: resp.devices.desktop },
            { name: "tablet", value: resp.devices.tablet },
          ]);
        } else {
          toast.error("Not a Valid ShortId");
          setError(true);
        }
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    getStats();
  }, []);
  if (isError) {
    return (
      <>
        <div className="bg-zinc-800 flex items-center justify-center w-screen h-screen">
          <h1 className="font-bold text-5xl text-white">Wrong URL</h1>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="w-screen h-screen overflow-hidden bg-zinc-900 flex ">
        <Sidebar />
        <div className="flex-grow bg-black text-white p-5 h-full w-auto overflow-y-auto ">
          <DashboardTopBar name="Dashboard" />
          <div id="main_area">
            <div id="chart_area" className="flex gap-2 flex-col md:flex-row items-center">
              <DevicePieChart  data={statsData} />
              <div className="p-5 flex gap-3 flex-col">
                <div><span className="inline-block bg-[#2ecc71] text-center py-2  w-24 px-3 rounded">Mobile</span> {statsData.length && statsData[0].value }</div>
                <div><span className="inline-block bg-[#3498db]  text-center py-2 w-24 px-3 rounded">Desktop</span> {statsData.length && statsData[1].value }</div>
                <div><span className="inline-block bg-[#f1c40f]  text-center py-2 w-24 px-3 rounded">Tablet</span> {statsData.length && statsData[2].value }</div>
              </div>
            </div>
            <div id="stats_table " className="w-full mt-5 border-t-2 border-white">
              <StatsTable data={tableData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Stats;
