import React from "react";
import BackButton from "./BackButton";
import AdminEquipment from "./AdminEquipment";
import Equipment from "../pages/content/Equipment";

const ManageEquipment = ({ onClick }) => {
  return (
    <div className="animate-fadeIn">
      <BackButton onClick={onClick} />
      <AdminEquipment />
    </div>
  );
};

export default ManageEquipment;
