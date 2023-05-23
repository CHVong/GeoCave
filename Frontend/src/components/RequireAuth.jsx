import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import jwt_decode from "jwt-decode";
import axios from "../api/axios";
import Loading from "./Loading";

const RequireAuth = ({ allowedRoles, allowedStatus }) => {
  const { auth } = useAuth();
  const location = useLocation();
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const decoded = auth?.accessToken ? jwt_decode(auth.accessToken) : undefined;
  const roles = decoded?.UserInfo.roles || [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (auth.accessToken) {
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
          // console.log(response.data);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setStatus(false);
        setIsLoading(false);
        // Handle error
      }
    };

    fetchData();
  }, [auth.accessToken, decoded?.UserInfo.username]);

  if (isLoading) {
    return <Loading />; // Render a loading component while data is being fetched
  }

  if (roles?.find((role) => allowedRoles?.includes(role)) && status === allowedStatus) {
    return <Outlet />; // Render the component if the user has the allowed role
  } else if (roles?.find((role) => allowedRoles?.includes(role)) && status !== allowedStatus) {
    return <Navigate to="/inactiveaccount" state={{ from: location }} replace />; // Redirect to inactive account page if the status does not match
  } else if (auth?.accessToken) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />; // Redirect to unauthorized page if user has an access token
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />; // Redirect to login page if user is not authenticated
  }
};

export default RequireAuth;
