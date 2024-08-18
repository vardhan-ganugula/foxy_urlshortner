import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import DashboardTopBar from "../../components/DashboardTopBar";
import { useProfile } from "../../contexts/ProfileProvider";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import CheckLogin from "../../../utils/AuthProvider";
import {ToastContainer, toast} from 'react-toastify'

function CreateUrl() {
  let {
    profileDetails,
    gotDetails,
    upDatedetails,
    setLoading,
    setData,
    setTableData,
    setProfileDetails,
  } = useProfile();
  let [domains, setDomains] = useState(profileDetails[0]?.domains || []);
  let [output, setOutput] = useState("");
  const navigate = useNavigate();
  const [domain, setDomain] = useState("ul.techessayist.ninja")
  const [url, setUrl] = useState("")
  const [shortCode, setShortcode] = useState("")
  const userId = new Cookies().get("userId");
  const token = new Cookies().get("token");
  useEffect(() => {
    
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
  }, []);

  const  handleCreateURL = async (e) => {
    e.preventDefault();
    try{
      const data = await fetch(import.meta.env.VITE_SERVER + `/dashboard/create_url`, {
        method : "POST",
        headers : {
          "Content-type": "application/json",
          authorization: "Bearer " + token,
        },
        body : JSON.stringify({domain, url, shortId  :shortCode, userId})
      })
      const response = await data.json();
      if(response.status === 'success'){
        toast.success("successfully created");
        setOutput(response.url)
        upDatedetails(false)
      }
      else{
        toast.error(response.msg)
      }
    }catch(e) {
      console.error(e)
    }
  };
  const copyShortUrl = () =>{
    navigator.clipboard.writeText(output)
    toast.success('link copied successfully')
  }
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
                    required
                      type="url"
                      id="url"
                      autoComplete="off"
                      className="w-full bg-black border-zinc-800 border-2 rounded-lg px-5 py-2 outline-none text-white"
                      placeholder="enter the url"
                      value={url}
                      onChange={ (e) => setUrl(e.target.value)}
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
                    required
                      name="domain"
                      id="domain"
                      value={domain}
                      onChange={ (e) => setDomain(e.target.value)}
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
                      value={shortCode}
                      onChange={e => setShortcode(e.target.value)}
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
                        onClick={ copyShortUrl}
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
