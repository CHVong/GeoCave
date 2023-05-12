import React from "react";
import BackButton from "./BackButton";

const ManageSafety = ({ onClick }) => {
  return (
    <div className="animate-fadeIn">
      ManageSafety
      <BackButton onClick={onClick} />
    </div>
  );
};

export default ManageSafety;
