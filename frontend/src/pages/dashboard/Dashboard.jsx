import React, { useEffect } from "react";
import CheckLogin from "../../../utils/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import useDetails from '../../hooks/useDetails'
import LinksAreaChart from "../../components/LinksAreaChart";
import DashboardTable from "../../components/DashboardTable";
import DashboardTopBar from "../../components/DashboardTopBar";

function Dashboard() {
  const navigate = useNavigate();
  const {
    data,
    tableData,
    loading,
  } = useDetails();

  useEffect(() => {
    if (!CheckLogin()) {
      navigate("/login");
      return;
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
            <LinksAreaChart data={data} />
            <div className="w-full flex gap-3 flex-col-reverse md:flex-row p-2 mt-5">
              <DashboardTable tableData={tableData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
