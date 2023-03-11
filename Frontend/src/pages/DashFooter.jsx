import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
const DashFooter = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onGoHomeClicked = () => navigate("/dash");
  let goHomeButton = null;
  if (pathname !== "/dash") {
    goHomeButton = <button onClick={onGoHomeClicked}>GoHome</button>;
  }

  return (
    <div>
      {goHomeButton}
      <h1>Footer, current user</h1>
    </div>
  );
};

export default DashFooter;
