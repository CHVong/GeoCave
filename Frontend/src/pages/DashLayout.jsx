import React from "react";
import { Outlet } from "react-router-dom";
import DashFooter from "./DashFooter";
import DashHeader from "./DashHeader";

const DashLayout = () => {
  return (
    <div>
      <DashHeader></DashHeader>
      <div>
        <Outlet />
      </div>
      <DashFooter></DashFooter>
    </div>
  );
};

export default DashLayout;
