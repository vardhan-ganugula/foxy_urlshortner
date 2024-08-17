import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import DashboardTopBar from "../../components/DashboardTopBar";
import { useProfile } from "../../contexts/ProfileProvider";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import CheckLogin from "../../../utils/AuthProvider";


function CreateUrl() {
  let {
    profileDetails,
    loading,
    gotDetails,
    upDatedetails,
    setLoading,
    setData,
    setTableData,
    setProfileDetails,
  } = useProfile();
  let [domains, setDomains] = useState(profileDetails[0]?.domains || []);

  let [output, setOutput] = useState("");
  console.log(gotDetails)
  const navigate = useNavigate();
  useEffect(() => {
    const userId = new Cookies().get("userId");
    const token = new Cookies().get("token");
    if (!CheckLogin()) {
      navigate("/login");
      return;
    }
    if (!gotDetails) {
      fetch(import.meta.env.VITE_SERVER + `/dashboard?userId=${userId}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          authorization: "Bearer " + token,
        },
      })
        .then((resp) => resp.json())
        .then((resp) => {
          if (resp.dashboardData) setData(resp.dashboardData);
          if (resp.urlData) setTableData(resp.urlData);
          if (resp.profileData) setProfileDetails(resp.profileData);
          setLoading(false);
          upDatedetails(true);
          setDomains(resp.profileData[0].domains)
        })
        .catch((err) => console.error(err));
    }
  }, [navigate]);

  const handleCreateURL = (e) => {
    e.preventDefault();
  };
  return (
    <div className="w-screen h-screen overflow-hidden bg-zinc-900 flex ">
      <Sidebar />
      <div className="flex-grow bg-black text-white p-5 h-full w-auto overflow-y-auto">
        <DashboardTopBar name="Create URL" />
        <div id="main_area ">
          <div id="createUrlArea" className="bg-zinc-900 rounded">
            <div className="p-5">
              <h4 className="text-3xl">
                <span className="text-gray-300">Short</span>
                <span className="text-orange-500">URL</span>
              </h4>
              <form
                onSubmit={handleCreateURL}
                autoComplete="off"
                className="md:w-2/3 mx-auto sm:w-full"
              >
                <div className="px-5 py-2 mt-5 flex gap-3 items-center">
                  <div className="w-full">
                    <label htmlFor="url" className="text-md px-1 text-zinc-500">
                      enter the url
                    </label>
                    <input
                      type="url"
                      id="url"
                      autoComplete="off"
                      className="w-full bg-black border-zinc-800 border-2 rounded-lg px-5 py-2 outline-none text-white"
                      placeholder="enter the url"
                    />
                  </div>
                </div>
                <div className="px-5 py-2 flex gap-3 items-center flex-col md:flex-row">
                  <div className="md:w-1/2 w-full">
                    <label
                      htmlFor="url"
                      id="domain"
                      className="text-md px-1 text-zinc-500"
                    >
                      domain
                    </label>
                    <select
                      name="domain"
                      id="domain"
                      className="w-full bg-black border-zinc-800 border-2 rounded-lg px-5 py-2 outline-none text-white"
                    >
                      {domains.map((elem, indx) => (
                        <option key={indx}> {elem} </option>
                      ))}
                    </select>
                  </div>
                  <div className="md:w-1/2 w-full">
                    <label
                      htmlFor="alias"
                      className="text-md px-1 text-zinc-500"
                    >
                      short code
                    </label>
                    <input
                      type="text"
                      id="alias"
                      name="alias"
                      className="w-full bg-black border-zinc-800 border-2 rounded-lg px-5 py-2 outline-none text-white"
                      placeholder="my_short_url"
                    />
                  </div>
                </div>
                {output && (
                  <div className="px-5 py-2 mt-5 flex gap-3 items-center">
                    <div className="w-full flex gap-3">
                      <input
                        type="url"
                        id="output_url"
                        autoComplete="off"
                        className="w-full bg-black border-zinc-800 border-2 rounded-lg px-5 py-2 outline-none text-white"
                        disabled
                        value={output}
                      />
                      <button
                        type="button"
                        className="px-5 py-2 rounded-md bg-white text-black"
                      >
                        copy
                      </button>
                    </div>
                  </div>
                )}
                <div className="px-5 py-2 mt-5 flex gap-3 items-center">
                  <button
                    className="w-full bg-white text-black py-2 rounded-md"
                    type="submit"
                  >
                    create url
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateUrl;
