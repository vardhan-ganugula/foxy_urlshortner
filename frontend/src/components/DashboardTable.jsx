import React from "react";
import { format } from "date-fns";

function DashboardTable({ tableData }) {
  return (
    <>
      <div className="w-full">
        <div>
          <h4 className="mb-3">
            All <span className="text-orange-600">URLs</span>
          </h4>
        </div>
        <div>
          <div className="text-xs bg-zinc-800/80 rounded-sm overflow-x-auto whitespace-nowrap">
            <table className="w-full table-auto text-center">
              <thead className="w-full bg-white text-black">
                <tr className="w-full">
                  <th className="p-3">Short Id</th>
                  <th className="p-3">Domain</th>
                  <th className="p-3">URL</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Total Clicks</th>
                </tr>
              </thead>
              <tbody className="bg-zinc-800/80 text-xs text-center">
                {tableData.length > 0 ? (
                  tableData.map((tuple) => (
                    <tr
                      className="border-b-2 border-gray-700 hover:bg-zinc-900/50 cursor-pointer"
                      key={tuple._id}
                    >
                      <td className="p-2">{tuple._id}</td>
                      <td className="p-2 w-auto text-ellipsis overflow-hidden block">
                        {tuple.domain}
                      </td>
                      <td className="p-2 text-left">{tuple.url}</td>
                      <td className="p-2">
                        {format(new Date(tuple["createdAt"]), "yyyy-MM-dd")}
                      </td>
                      <td className="p-2 text-center">{tuple.totalClicks}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-2">
                      No data found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardTable;
