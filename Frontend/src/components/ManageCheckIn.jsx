import React from "react";
import BackButton from "./BackButton";
import AdminCheckIn from "./AdminCheckIn";

const ManageCheckIn = ({ onClick }) => {
  return (
    <div className="animate-fadeIn">
      <BackButton onClick={onClick} />
      <AdminCheckIn />
    </div>
  );
};

export default ManageCheckIn;
