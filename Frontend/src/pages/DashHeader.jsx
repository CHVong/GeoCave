import React from "react";
import { Link } from "react-router-dom";
const DashHeader = () => {
  return (
    <header>
      <h1>Header</h1>
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
    </header>
  );
};

export default DashHeader;
