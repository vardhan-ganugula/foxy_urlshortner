import React, { useRef, useState } from "react";
import { format } from "date-fns";
import { GoDotFill } from "react-icons/go";

function DashboardTable({ tableData }) {
  const searchFilterValue = useRef("");
  const [filterData, setFilterData] = useState(tableData);
  const handleSearch = () => {
    let value = searchFilterValue.current.value.toLowerCase();
    let filterdData = tableData.filter(
      (record) =>
        record._id.toLowerCase().includes(value) ||
        record.domain.toLowerCase().includes(value) ||
        record.url.toLowerCase().includes(value)
    );
    setFilterData(filterdData);
  };
  return (
    <>
      <div className="w-full bg-zinc-800 rounded">
        <div className="flex gap-3 items-center py-3">
          <div className="flex flex-grow gap-3 items-center">
            <h4 className="ml-3 font-semibold">
              All <span className="text-orange-500">URLs</span>
            </h4>

            <div className="flex justify-between flex-grow pr-5 items-center">
              <div className="flex gap-1 items-center text-xs rounded-lg bg-violet-200 border-violet-800 py-1 px-2 text-violet-800 ">
                <GoDotFill size={6} /> new
              </div>
              <div>
                <input
                  type="search"
                  id=""
                  ref={searchFilterValue}
                  onChange={handleSearch}
                  className="bg-black/0 border-white outline-none rounded px-2 border-2 py-1"
                  placeholder="search..."
                />
              </div>
            </div>
          </div>
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
                {filterData.length > 0 ? (
                  filterData.map((tuple, i) => (
                    <tr
                      className={`border-b-2 border-gray-700 hover:bg-zinc-900/50 cursor-pointer ${(i%2==1)? 'bg-zinc-900/50' : ''}`}
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
