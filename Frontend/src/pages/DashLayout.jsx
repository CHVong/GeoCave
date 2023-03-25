import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import DashFooter from "./DashFooter";
import DashHeader from "./DashHeader";

const DashLayout = () => {
  useEffect(() => {
    document.title = "GeoCave - Dashboard";
  }, []);

  return (
    <div className="flex flex-col min-h-full justify-between p-4 md:p-2 animate-fadeIn">
      <div>
        <DashHeader />
      </div>
      <div className="scrollbar h-[80vh] md:h-[68vh] overflow-x-hidden">
        <Outlet />
      </div>
      <div>
        <DashFooter />
      </div>
    </div>
  );
};

export default DashLayout;
