import React, {useState, useEffect} from 'react'
import Logo from "../assets/logo.png";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { BiHomeAlt } from "react-icons/bi";
import { FaGlobeAfrica } from "react-icons/fa";
import { IoIosLink } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import {useSidebar} from '../contexts/SidebarContext';



function Sidebar() {
  let {sidebarStatus, setSidebarStatus } = useSidebar();
  return (
    
      <>
        <div className={`bg-zinc-900 h-screen z-30 ${ sidebarStatus ? 'md:w-[250px] w-full fixed md:static md:translate-x-0' : 'w-full fixed top-0 left-0 h-full bg-zinc-800/80  -translate-x-[100%]' } p-1 transition-all duration-500`}>
          <div className="flex gap-3 font-bold text-white justify-between items-center mb-5">
            <div className='flex gap-2 items-center'>
              <img src={Logo} className="w-11 h-14 ml-5" />
              FoxyURL
            </div>
            <div className='mx-3 md:hidden' onClick={() => setSidebarStatus(prev => !prev)}>
              <HiMiniBars3BottomRight size={25}/>
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