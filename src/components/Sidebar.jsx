import React, {useState, useEffect} from 'react'
import Logo from "../assets/logo.png";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { BiHomeAlt } from "react-icons/bi";
import { FaGlobeAfrica } from "react-icons/fa";
import { IoIosLink } from "react-icons/io";
import { NavLink } from 'react-router-dom';

function Sidebar() {
  const [sidebarStatus, setSidebarStatus] = useState(window.innerWidth < 700 ? false : true);
  
  useEffect(() => {
    
    if (!sidebarStatus) {
      document.querySelectorAll(".sidebar_item").forEach((item) => {
        item.querySelector("span").style.display = "none";
      });
    } else {
      document.querySelectorAll(".sidebar_item").forEach((item) => {
        setTimeout( ()=> {
          item.querySelector("span").style.display = "block";
        }, 200)
      });
    }
  }, [sidebarStatus]);
  
  return (
    <>
        <div className={`bg-zinc-900 ${ sidebarStatus ? 'w-[250px]' : 'w-[80px]' } p-1 transition-all duration-500`}>
          <div className="flex justify-between items-center mb-5">
            <img src={Logo} className="w-11 h-14" />
            <div
              className="cursor-pointer text-zinc-500"
              onClick={() => setSidebarStatus((status) => !status)}
            >
              <HiMiniBars3BottomRight size={25} />
            </div>
          </div>
          <div className="w-full p-2 flex flex-col gap-2 text-sm">
            <div className="sidebar_item ">
              <NavLink
                to="/dashboard"
                className="bg-zinc-800/80 text-white  w-full flex text-center py-2 gap-2 px-3 rounded-lg"
              >
                <BiHomeAlt size={20} /> <span> Dashboard</span>
              </NavLink>
            </div>
            <div className="sidebar_item">
              <NavLink
                to="/add-domain"
                className="bg-zinc-800/80 text-white w-full flex text-center py-2 gap-2 px-3 rounded-lg "
              >
                <FaGlobeAfrica size={20} /> <span> Add Domain</span>
              </NavLink>
            </div>
            <div className="sidebar_item">
              <NavLink
                to="/add-domain"
                className="bg-zinc-800/80 text-white w-full flex text-center py-2 gap-2 px-3 rounded-lg "
              >
                <IoIosLink size={20} /> <span> Create</span>
              </NavLink>
            </div>
          </div>
        </div>
    </>
  )
}

export default Sidebar