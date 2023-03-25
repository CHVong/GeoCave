import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import DashFooter from "./DashFooter";
import DashHeader from "./DashHeader";

const DashLayout = () => {
  useEffect(() => {
    document.title = "GeoCave - Dashboard";
  }, []);

  return (
    <div className="flex flex-col min-h-full justify-between p-5 animate-fadeIn">
      <div>
        <DashHeader />
      </div>
      <div className="scrollbar h-[80vh] md:h-[64vh] overflow-x-hidden">
        <Outlet />
      </div>
      <div>
        <DashFooter />
      </div>
    </div>
  );
};

export default DashLayout;
