import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";

const DashHeader = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header>
      <h1>GeoCave</h1>
      <Link to="/dash/checklist">
        <h1>Checklist</h1>
      </Link>
      <Link to="/dash/equipment">
        <h1>Equipment</h1>
      </Link>
      <Link to="/dash/admin">
        <h1>admin</h1>
      </Link>
      <button onClick={signOut} className="bg-red-400">
        Logout
      </button>
    </header>
  );
};

export default DashHeader;
