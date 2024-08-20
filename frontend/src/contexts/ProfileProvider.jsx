import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";

export const ProfileContext = createContext({
  data: [ { totalClicks: 0, _id: "no data found" }, ],
  profileDetails: {},
  tableData: [],
  loading: true,
  gotDetails: false,
  upDatedetails: () => {},
  setLoading: () => {},
  setTableData: () => {},
  setProfileDetails: () => {},
  setDomains: () => {},
  domains : [],
});

export const ProfileContextProvider = ({ children }) => {
  const [data, setData] = useState([{
    totalClicks: 0,
    _id: "no data found",
  }]);
  const [tableData, setTableData] = useState([]);
  const [profileDetails, setProfileDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [gotDetails, upDatedetails] = useState(false);
  const [domains, setDomains] = useState([]);
  return (
    <ProfileContext.Provider
      value={{
        data,
        profileDetails,
        tableData,
        loading,
        gotDetails,
        upDatedetails,
        setLoading,
        setData,
        setTableData,
        setProfileDetails,
        domains, setDomains
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  return useContext(ProfileContext);
};
