import React from "react";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSidebar } from "../contexts/SidebarContext";
import { useProfile } from "../contexts/ProfileProvider";
import Logo from '../assets/logo.png'
function DashboardTopBar({name}) {
  const { setSidebarStatus } = useSidebar();
  const { profileDetails } = useProfile();
  return (
    <div className="w-full mb-5 flex justify-between">
      <div className="flex gap-5 text-lg items-center">
        <FaArrowLeft size={20} /> <span>{name}</span>
      </div>
      <div className="flex gap-5 items-center">
        <div
          className="block cursor-pointer"
          onClick={() => setSidebarStatus((prev) => !prev)}
        >
          <HiMiniBars3BottomRight size={25} />
        </div>
        <Link
          to={"/logout"}
          className="bg-orange-600 text-sm py-2 px-4 rounded-full"
        >
          logout
        </Link>
        <img
          src={profileDetails.profilePhoto || Logo }
          alt=""
          className="h-[40px] w-[40px] bg-white rounded-full"
        />
      </div>
    </div>
  );
}

export default DashboardTopBar;
