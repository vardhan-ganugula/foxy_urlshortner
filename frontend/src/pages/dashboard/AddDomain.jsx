import React, { useEffect, useState } from "react";
import DashboardTopBar from "../../components/DashboardTopBar";
import Sidebar from "../../components/Sidebar";
import useDetails from "../../hooks/useDetails";
import { useProfile } from "../../contexts/ProfileProvider";
import CheckLogin from "../../../utils/AuthProvider";
import { useNavigate } from "react-router-dom";
import ProfileDetails from "../../components/ProfileDetails";
import {toast} from 'react-toastify'
function AddDomain() {
  let { loading } = useDetails();
  let { gotDetails } = useProfile();
  let navigate = useNavigate();
  let [domain, setDomain] = useState('');
  useEffect(() => {
    if (!CheckLogin()) {
      navigate("/login");
      return;
    }
  }, [navigate]);
  if (!gotDetails) return <> page not found</>;
  const  checkForRecord = async (e) => {
    e.preventDefault();
    try{
      const resp = await fetch(import.meta.env.VITE_SERVER + `/dashboard/lookup?addr=${domain}`)
      const response = await resp.json();
      if(response.status === 'success'){
        toast.success('domain verified successfully')
      }else{
        toast.error(response.msg)
      }
    }catch(e){
      console.error(e)
    }
  };
  const handleSSL = (e) => {
    e.preventDefault();
    toast.error("This option will be available soon")
  };
  return (
    <div className="w-screen h-screen overflow-hidden bg-zinc-900 flex ">
      <Sidebar />
      <div className="flex-grow bg-black text-white p-5 h-full w-auto overflow-y-auto">
        <DashboardTopBar name="Add URL" />
        <div id="main_area">
          <div className="flex flex-col-reverse md:flex-row w-full h-auto gap-1 ">
            <div className="md:w-2/3 w-full p-2">
              <div className="w-full h-auto">
                <h4 className="text-3xl font-bold">
                  Add <span className="text-yellow-500">Domain</span>
                </h4>
                <p className="font-mono text-gray-500 mt-3">
                  please add a A record in your domain provider
                </p>
                <details className="w-full bg-white rounded">
                  
                  <summary className="bg-yellow-500 p-3 rounded text-black cursor-pointer">
                    How to Add <strong>"A"</strong> record
                  </summary>
                  <div className="text-wrap bg-white text-black pl-4 ">
                    <ol className="list-decimal pl-4 mt-4">
                      <li>
                        <h5>Log in to Your Domain Registrar:</h5>
                        <ul className="list-disc ml-5">
                          <li>
                            Access the website where your domain is registered
                            (e.g., GoDaddy, Namecheap).
                          </li>
                          <li>
                            Use your credentials to log in to your account.
                          </li>
                        </ul>
                      </li>
                      <li>
                        <h5> Access DNS Management: </h5>
                        <ul className="list-disc ml-5">
                          <li>
                            Navigate to the DNS settings, often found under
                            sections like "DNS Management," "Manage DNS," or
                            "DNS Zone File."
                          </li>
                        </ul>
                      </li>
                      <li>
                        <h5>Add a New A Record:</h5>
                        <ul className="list-disc ml-5">
                          <li>Click "Add Record" or "Add DNS Record." </li>
                          <li>Choose "A" as the record type.</li>
                          <li>Name: Enter the subdomain (@).</li>
                          <li>
                            IP Address: <strong>{import.meta.env.VITE_BASE_IP} </strong>
                          </li>
                          <li>TTL: Leave as default or set to 1 hour.</li>
                        </ul>
                      </li>
                      <li>
                        <h5>Save the A Record:</h5>
                        <ul className="list-disc ml-5">
                          <li>Save the changes to apply the new A record.</li>
                        </ul>
                      </li>
                      <li>
                        <h5>Wait for Propagation:</h5>
                        <ul className="list-disc ml-5">
                          <li>
                            DNS changes can take from a few minutes up to 48
                            hours to propagate.
                          </li>
                        </ul>
                      </li>
                      <li className="py-5 mb-5">
                        <span className="bg-red-500 text-white p-2 rounded">NOTE :</span> <span className="ml-3">if you are using cloudflare, please turn off <strong className="underline decoration-wavy decoration-red-500 underline-offset-2">proxy status</strong></span>
                      </li>
                    </ol>
                  </div>
                </details>
                <div className="mt-5 relative before:contents[*] before:absolute before:left-0 before:top-0 before:w-2 rounded before:h-full before:bg-teal-500 px-5 border py-5 border-teal-500">
                  <h2 className="font-bold text-3xl">
                    Check <span className="text-teal-500">Status</span>
                  </h2>
                  <form onSubmit={checkForRecord} className="px-5" autoComplete="off">
                    <div className="mt-5 flex flex-col">
                      <label htmlFor="domainName" className="font-mono text-md mb-2">Enter your Domain</label>
                      <input type="text" id="domainName" className="bg-black border-white border rounded px-4 py-2 outline-none md:w-2/5 w-full" required value={domain} onChange={e => setDomain(e.target.value)}/>
                    </div>
                    <button type="submit" className="mt-5 px-5 py-2 bg-teal-500 rounded">submit</button>
                  </form>
                </div>

                <div className="mt-5 relative before:contents[*] before:absolute before:left-0 before:top-0 before:w-2 rounded before:h-full before:bg-indigo-500 px-5 border py-5 border-indigo-500">
                  <h2 className="font-bold text-3xl">
                    Order <span className="text-indigo-500">SSL</span>
                  </h2>
                  <form onSubmit={handleSSL} className="px-5" autoComplete="off">
                    <div className="mt-5 flex flex-col">
                      <label htmlFor="sslDomainName" className="font-mono text-md mb-2">Enter your Domain</label>
                      <input type="text" id="sslDomainName" className="bg-black border-white border rounded px-4 py-2 outline-none w-full md:w-2/5" required value={domain} disabled/>
                    </div>
                    <button type="submit" className="mt-5 px-5 py-2 bg-indigo-500 rounded">submit</button>
                  </form>
                </div>
              </div>
            </div>
            <div className="md:w-1/3 w-full">
              <ProfileDetails />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddDomain;
