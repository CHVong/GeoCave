import { useContext, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import DashFooter from "./DashFooter";
import DashHeader from "./DashHeader";

const DashLayout = () => {
  const location = useLocation();
  useEffect(() => {
    document.title = "GeoCave - Dashboard";
  }, []);
  useEffect(() => {
    document.getElementById("scroller")?.scrollIntoView({ behavior: "smooth" });
  }, [location]);

  return (
    <div className="flex flex-col min-h-full justify-between p-4 md:p-2 animate-fadeIn md:h-[90vh]">
      <div>
        <DashHeader />
      </div>
      <div className="scrollbar overflow-x-hidden h-full">
        <Outlet />
      </div>
      <div>
        <DashFooter />
      </div>
    </div>
  );
};

export default DashLayout;
