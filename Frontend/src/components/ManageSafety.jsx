import React from "react";
import BackButton from "./BackButton";
import AdminSafety from "./AdminSafety";

const ManageSafety = ({ onClick }) => {
  return (
    <div className="animate-fadeIn">
      <BackButton onClick={onClick} />
      <AdminSafety />
    </div>
  );
};

export default ManageSafety;
