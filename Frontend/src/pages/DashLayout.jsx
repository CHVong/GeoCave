import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import DashFooter from "./DashFooter";
import DashHeader from "./DashHeader";

const DashLayout = () => {
  useEffect(() => {
    document.title = "GeoCave - Dashboard";
  }, []);

  return (
    <div className="flex flex-col min-h-full justify-between p-4 md:p-2 animate-fadeIn md:min-h-[90vh]">
      <div>
        <DashHeader />
      </div>
      <div className="scrollbar overflow-x-hidden">
        <Outlet />
      </div>
      <div>
        <DashFooter />
      </div>
    </div>
  );
};

export default DashLayout;
