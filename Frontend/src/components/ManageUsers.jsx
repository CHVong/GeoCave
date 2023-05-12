import React from "react";
import BackButton from "./BackButton";

const ManageUsers = ({ onClick }) => {
  return (
    <div className="animate-fadeIn">
      ManageUsers
      <BackButton onClick={onClick} />
    </div>
  );
};

export default ManageUsers;
