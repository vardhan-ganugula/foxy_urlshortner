import React from "react";
import { FaCopy } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";
import { TiTick } from "react-icons/ti";

function Alert(props) {
    const alertInfo = props;


  return (
    <div className="fixed w-[400px] min-h-[200px] bg-white rounded z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-5 flex justify-center items-center flex-col shadow-2xl" id="alertDiv">
      <div className="text-2xl absolute top-2 right-2 cursor-pointer" onClick={ ()=> document.querySelector('#alertDiv').style.display = 'none'} >
        <IoIosClose size={30} />
      </div>
      <div className={`${alertInfo.type ==='success' ? 'text-green-500 bg-green-200' : 'text-red-500 bg-red-200'} p-4 rounded-full mt-2`}>
      { alertInfo.type==='success' ?<TiTick size={50} /> : <IoIosClose size={50} /> } 
      </div>
      <div className="mt-4">
      { alertInfo.type==='success' ?<h2>Success</h2> : <h2>Failed</h2> } 
      </div>
      {alertInfo.data && <div className="w-full bg-sky-300 py-2 px-2 rounded mt-2 text-center">
          <span className="font-mono text-">{ alertInfo.data }</span>
      </div>}
      
    </div>
  );
}

export default Alert;
