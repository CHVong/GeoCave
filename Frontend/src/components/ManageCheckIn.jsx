import React from "react";
import BackButton from "./BackButton";

const ManageCheckIn = ({ onClick }) => {
  return (
    <div className="animate-fadeIn">
      ManageCheckIn
      <BackButton onClick={onClick} />
    </div>
  );
};

export default ManageCheckIn;
