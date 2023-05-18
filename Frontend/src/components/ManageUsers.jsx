import React from "react";
import BackButton from "./BackButton";
import AdminUsers from "./AdminUsers";

const ManageUsers = ({ onClick }) => {
  return (
    <div className="animate-fadeIn">
      <BackButton onClick={onClick} />
      <AdminUsers />
    </div>
  );
};

export default ManageUsers;
