import React from 'react'
import DashboardTopBar from '../../components/DashboardTopBar'
import Sidebar from '../../components/Sidebar'
function AddDomain() {
  return (
    <div className="w-screen h-screen overflow-hidden bg-zinc-900 flex ">
      <Sidebar />
      <div className="flex-grow bg-black text-white p-5 h-full w-auto overflow-y-auto">
        <DashboardTopBar name="Add URL"/>
        <div id="main_area"></div>
      </div>
    </div>
  )
}

export default AddDomain