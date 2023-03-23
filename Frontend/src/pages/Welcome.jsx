import { useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import jwt_decode from "jwt-decode";
import DashboardLinks from "../components/DashboardLinks";

const Welcome = () => {
  const { auth } = useAuth();
  const decoded = auth?.accessToken ? jwt_decode(auth.accessToken) : undefined;
  const username = decoded?.UserInfo.username || [];

  useEffect(() => {
    document.title = "GeoCave - Dashboard";
  }, []);
  return (
    <div>
      <h1>Welcome {username}!</h1>
      <div className="grid grid-cols-2 gap-3">
        <DashboardLinks url={"/dash/worklifebalance"} name={"Check In"} />
        <DashboardLinks url={"/dash/Safety"} name={"Safety"} />
        <DashboardLinks url={"/dash/checklist"} name={"Checklist"} />
        <DashboardLinks url={"/dash/equipment"} name={"Equipment"} />
        <DashboardLinks url={"/dash/supplies"} name={"Supplies"} />
        <DashboardLinks url={"/dash/lab"} name={"Lab"} />
        <DashboardLinks url={"/dash/office"} name={"Office"} />
        <DashboardLinks url={"/dash/templates"} name={"Template"} />
      </div>
    </div>
  );
};

export default Welcome;
