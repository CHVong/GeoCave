import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import DashFooter from "./DashFooter";
import DashHeader from "./DashHeader";

const DashLayout = () => {
  useEffect(() => {
    document.title = "GeoCave - Dashboard";
  }, []);

  return (
    <div className="flex flex-col h-screen justify-between">
      <div>
        <DashHeader />
      </div>
      <div>
        <Outlet />
      </div>
      <div>
        <DashFooter />
      </div>
    </div>
  );
};

export default DashLayout;
