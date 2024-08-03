import React, { useEffect, useState } from "react";
import CheckLogin from "../../utils/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { FaArrowLeft } from "react-icons/fa6";
import Logo from "../assets/logo.png";
import Cookies from "universal-cookie";
import {format} from 'date-fns'
import { HiMiniBars3BottomRight } from "react-icons/hi2";

import {
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";
import {useSidebar} from "../contexts/SidebarContext";

function Dashboard() {
  const navigate = useNavigate();
  const cookie = new Cookies();
  const userId = cookie.get('userId')
  let [data, setData] = useState([{
    totalClicks : 0, _id : 'no data found'
  }]);
  let {sidebarStatus, setSidebarStatus} = useSidebar();
  useEffect(() => {
    if (!CheckLogin()) navigate("/login");
    fetch(import.meta.env.VITE_SERVER + "/dashboard", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body : JSON.stringify({
        userId
      })
    }).then(res => res.json())
    .then( res=> setData(res.resp)).catch(err => console.error(err))
  }, []);


  return (
    <>
      <div className="w-screen h-screen overflow-hidden bg-zinc-900 flex ">
        <Sidebar/>
        <div className="flex-grow bg-black text-white p-5 h-full w-auto overflow-y-auto">
          <div className="w-full mb-5 flex justify-between">
            <div className="flex gap-5 text-lg items-center">
              <FaArrowLeft size={20} /> <span>Dashboard</span>
            </div>
            <div className="flex gap-5 items-center">
              <div className="block cursor-pointer" onClick={()=> setSidebarStatus(prev => !prev)}>
                <HiMiniBars3BottomRight size={25}/>
              </div>
              <Link
                to={"/profile"}
                className="bg-orange-600 text-sm py-2 px-4 rounded-full"
              >
                profile
              </Link>
              <img
                src={Logo}
                alt=""
                className="h-[40px] w-[40px] bg-white rounded-full"
              />
            </div>
          </div>
          <div id="main_area">
            <div className="min-h-80 w-full bg-zinc-800 rounded-lg p-5 text-xs">
              <ResponsiveContainer width="100%" height={300}>
                
                <AreaChart data={data}>
                <defs>
                  <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FFB52E" stopOpacity={0.4} />
                    <stop offset="75%" stopColor="#FFB52E" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <Tooltip />
                  <XAxis dataKey="_id" axisLine={false} />
                  <YAxis dataKey="totalClicks" axisLine={false} />
                  <Area dataKey="totalClicks" fill="url(#color)" stroke="#FFB52E" type="linear" />
                  <CartesianGrid opacity={0.1} vertical={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>


            <div className="w-full flex gap-3 flex-col-reverse md:flex-row p-2 mt-5">
              <div className="md:w-2/3 w-full">
                <div> <h4 className=" mb-3">All urls</h4></div>
                <div>
                  <div className="text-xs bg-zinc-800/80 rounded-sm overflow-hidden">
                    <table className="w-full table-auto text-center ">
                      <thead className="w-full bg-white text-black ">
                        <tr className="w-full">
                          <th className="p-3">Short Id</th>
                          <th className="p-3"> URL </th>
                          <th className="p-3"> Domain </th>
                          <th className="p-3"> Total Clicks </th>
                        </tr>
                      </thead>
                      <tbody className="bg-zinc-800/80 text-xs">
                        <tr className="border-b-2 border-gray-700 hover:bg-zinc-700 cursor-pointer">
                          <td className='p-2'>
                            adffasdfasd
                          </td>
                          <td className='p-2'>
                            https://google.com
                          </td>
                          <td className='p-2'>
                          { format( new Date('2024-07-20T07:42:56.160+00:00'), 'yyyy-mm-dd') }
                          </td>
                          <td className='p-2'>
                            15
                          </td>
                        </tr>
                        <tr className="border-b-2 border-gray-700 hover:bg-zinc-700 cursor-pointer">
                          <td className='p-2'>
                            adffasdfasd
                          </td>
                          <td className='p-2'>
                            https://google.com
                          </td>
                          <td className='p-2'>
                          { format( new Date('2024-07-20T07:42:56.160+00:00'), 'yyyy-mm-dd') }
                          </td>
                          <td className='p-2'>
                            15
                          </td>
                        </tr>
                        <tr className="border-b-2 border-gray-700 hover:bg-zinc-700 cursor-pointer">
                          <td className='p-2'>
                            adffasdfasd
                          </td>
                          <td className='p-2'>
                            https://google.com
                          </td>
                          <td className='p-2'>
                          { format( new Date('2024-07-20T07:42:56.160+00:00'), 'yyyy-mm-dd') }
                          </td>
                          <td className='p-2'>
                            15
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
