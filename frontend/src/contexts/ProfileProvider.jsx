import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";

export const ProfileContext = createContext({
  data: [],
  tableData: [],
  domains: [],
});

export const ProfileContextProvider = ({ children }) => {
  const [data, setData] = useState({
    totalClicks: 0,
    _id: "no data found",
  });
  const [tableData, setTableData] = useState([]);
  const [domains, setDomains] = useState([]);
  const cookie = new Cookies();
  useEffect( ()=> {
    const userId = cookie.get("userId");
    fetch(import.meta.env.VITE_SERVER + "/dashboard", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          userId,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.resp.length) setData(res.resp);
        })
        .catch((err) => console.error(err));
  
      fetch(
        import.meta.env.VITE_SERVER + `/dashboard/get-links?userId=${userId}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((res) => {
          if (res.data.length > 0) {
            setTableData(res.data);
          }
        })
        .catch((err) => console.error(err));
  
     

  }, [])
  return <ProfileContext.Provider value={ {data, domains, tableData}}> {children} </ProfileContext.Provider>;
};

export const useProfile = () => {
  return useContext(ProfileContext);
};
