import React from "react";
import { format } from "date-fns";
function StatsTable({ data }) {
  return (
    <>
      <table className="w-full">
        <thead className="bg-white text-black border">
          <tr >
            <th className="py-2">Date</th>
            <th className="py-2">IP</th>
            <th className="py-2">Device</th>
            <th className="py-2">CORDS</th>
          </tr>
        </thead>
        <tbody className="border">
            {data.map(item => (
                <tr key={item.date}>
                    <td className="text-center py-2">{format(new Date(item.date), "yyyy-MM-dd")} </td>
                    <td className="text-center py-2">{item.ip}</td>
                    <td className="text-center py-2">{item.device}</td>
                    <td className="text-center py-2"><a href={`https://tools.keycdn.com/geo?host=${item.ip}`} target="_blank" className="p-1 rounded bg-[#4cd137] mt-2 text-sm px-3">get cords</a></td>
                </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default StatsTable;
