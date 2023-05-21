import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import jwt_decode from "jwt-decode";
import axios from "../api/axios";
import Loading from "./Loading";

const RequireAuth = ({ allowedRoles, allowedStatus }) => {
  const { auth } = useAuth();
  const location = useLocation();
  const [status, setStatus] = useState(null);

  const decoded = auth?.accessToken ? jwt_decode(auth.accessToken) : undefined;
  const roles = decoded?.UserInfo.roles || [];

  const fetchData = async () => {
    try {
      const response = await axios.get("/user/singleUser", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.accessToken}`,
        },
        params: {
          username: decoded?.UserInfo.username,
        },
        withCredentials: true,
      });
      setStatus(response.data.active);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // setData([]);
    }
  };

  fetchData();

  console.log(status);
  if (status === null) {
    // Render loading state or return null
    return <Loading />;
  }

  return roles?.find((role) => allowedRoles?.includes(role)) && status === allowedStatus ? (
    <Outlet />
  ) : !status ? (
    <Navigate to="/inactiveaccount" state={{ from: location }} replace />
  ) : auth?.accessToken ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
