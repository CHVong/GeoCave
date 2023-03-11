import React from "react";
import { Link } from "react-router-dom";
const Welcome = () => {
  return (
    <div>
      <h1>Welcome to geocave welcome component</h1>
      <p>
        <Link to="/dash/checklist">View Checklist</Link>
      </p>
      <p>
        <Link to="/dash/equipment">View Equipment</Link>
      </p>
    </div>
  );
};

export default Welcome;
