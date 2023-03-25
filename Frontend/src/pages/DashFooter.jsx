import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CurrentTime from "../components/CurrentTime";

const DashFooter = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onGoHomeClicked = () => navigate("/dash");
  let goHomeButton = null;
  if (pathname === "/dash") {
    goHomeButton = <CurrentTime />;
  }

  return (
    <div className={`pt-5`}>
      <CurrentTime />
    </div>
  );
};

export default DashFooter;
