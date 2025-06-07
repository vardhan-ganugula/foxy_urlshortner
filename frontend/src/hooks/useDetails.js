import React, { useEffect, useCallback } from "react";
import Cookies from "universal-cookie";
import { useProfile } from "../contexts/ProfileProvider";
import { useLocation, useNavigate } from "react-router-dom";
import {toast} from "react-toastify";

function useDetails() {
  const location = useLocation();
  const navigate = useNavigate();
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
  
  const cookie = new Cookies();
  const userId = cookie.get("userId");
  const token = cookie.get("token");

  // Check authentication
  const checkAuth = useCallback(() => {
    if (!userId || !token) {
      toast.error("Please login to continue");
      navigate("/login");
      return false;
    }
    return true;
  }, [userId, token, navigate]);

  // Fetch dashboard data
  const fetchDashboardData = useCallback(async () => {
    if (!checkAuth() || gotDetails) return;

    setLoading(true);
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/dashboard?userId=${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("Session expired. Please login again.");
          cookie.remove("token");
          cookie.remove("userId");
          navigate("/login");
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Handle dashboard data
      if (data?.dashboardData?.length > 0) {
        setData(data.dashboardData);
      }

      // Handle URL data
      if (data.urlData) {
        setTableData(data.urlData);
      }

      // Handle profile data
      if (data.profileData?.[0]) {
        setProfileDetails(data.profileData[0]);
        if (data.profileData[0].domains) {
          setDomains(data.profileData[0].domains);
        }
      }

      upDatedetails(true);
    } catch (error) {
      console.error("Dashboard fetch error:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  }, [
    userId,
    token,
    gotDetails,
    checkAuth,
    setLoading,
    setData,
    setTableData,
    setProfileDetails,
    setDomains,
    upDatedetails,
    cookie,
    navigate,
  ]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData, location.pathname]);

  return {
    data,
    tableData,
    loading,
    profileDetails,
    upDatedetails,
    token,
    userId,
    refetch: fetchDashboardData,
  };
}

export default useDetails;