import React, { useEffect } from "react";
import Cookies from "universal-cookie";
import { useProfile } from "../contexts/ProfileProvider";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function useDetails() {
 
  const location = useLocation();
  const {
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
    setDomains,
  } = useProfile();
  const userId = new Cookies().get("userId");
  const token = new Cookies().get("token");

  useEffect(() => {
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
          if (resp.dashboardData.length > 0) {
            setData(resp.dashboardData);
          }
          if (resp.urlData) setTableData(resp.urlData);
          if (resp.profileData) {
            setProfileDetails(resp.profileData[0]);
            setDomains(resp.profileData[0].domains)
          }
          setLoading(false);
          upDatedetails(true);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [userId, token, gotDetails, location]);
  return {
    data,
    tableData,
    loading,
    profileDetails,
    upDatedetails,
    token,
    userId,
  };
}

export default useDetails;
