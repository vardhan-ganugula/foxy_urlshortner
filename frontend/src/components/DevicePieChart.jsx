import React, { useEffect } from 'react'
import { PieChart, Tooltip, ResponsiveContainer, Pie, Cell } from 'recharts'

function DevicePieChart() {
  useEffect(()=>{
    fetch(import.meta.VITE_SERVER+'/dashboard/analytics/').then(res => res.json()).then(data => console.log(data)).catch(e => {
      console.log(e)
    })
  }, [])
  const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
  { name: 'Group E', value: 278 },
  { name: 'Group F', value: 189 },
  ]
  return (
    <div>


        <PieChart width={400} height={400}>
          <Pie dataKey="value" data={data} cx={200} cy={200}  fill="#82ca9d" />
          <Tooltip content={customToolTip} />
        </PieChart>

    </div>
  )
}


function customToolTip({active, payload}){
  if(active && payload && payload.length){
    return(<div>
      <div className='w-auto h-8 bg-black rounded text-white flex items-center justify-center gap-3 px-2 shadow-md shadow-orange-500/50'>
        <span>Name : </span> <span>{payload[0].name}</span>
      </div>
    </div>)
  }else{
    return null;
  }
}

export default DevicePieChart