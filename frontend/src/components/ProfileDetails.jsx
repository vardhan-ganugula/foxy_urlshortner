import React from "react";
import { useProfile } from "../contexts/ProfileProvider";
import { IoMdMail } from "react-icons/io";
import Logo from "../assets/logo.png";

function ProfileDetails() {
  const { profileDetails } = useProfile();
  return (
    <>
      <h4 className="text-2xl font-bold">
        Profile <span className="text-sky-500 font-mono">Details</span>
      </h4>
      <div className="py-3 block">
        <div className="w-full h-auto bg-white rounded flex gap-5 items-center p-5">
          <div className="w-52">
            <img
              src={Logo || profileDetails.profilePhoto}
              alt="profile photo"
              className=" border border-orange-700 w-auto h-full object-cover aspect-square rounded-md"
            />
          </div>
          <div className=" px-8 py-5 text-md w-full text-black">
            <h4 className="uppercase font-extrabold text-center text-3xl">
              {profileDetails.username}
            </h4>
            <h3 className="text-center font-mono text-xs mt-2 flex gap-1 items-center">
              <IoMdMail /> {profileDetails.email}
            </h3>
          </div>
        </div>
        <div className="w-full h-auto bg-white rounded mt-3 text-black">
          <h4 className=" text-center text-black pt-3 font-bold text-2xl">
            Domains
          </h4>
          <ul className="text-sm p-2 w-full flex flex-wrap gap-3 items-center">
            {profileDetails.domains.map((ele, indx) => (
              <li
                key={indx}
                className="py-1 mt-1 hover:bg-zinc-800 transition-all rounded px-2 font-bold cursor-pointer text-xs bg-black text-white "
              >
                {ele}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default ProfileDetails;
