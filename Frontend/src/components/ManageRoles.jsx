import { useState, useEffect } from "react";

const ManageRoles = ({ e, handleClick, updatedRoles }) => {
  const [assigned, setAssigned] = useState(false);
  useEffect(() => {
    setAssigned(updatedRoles.includes(e));
  }, [updatedRoles, e]);
  return (
    <>
      <div
        className={`text-xs font-medium border-2 rounded-2xl px-2 cursor-pointer transition-all ${
          e === "Employee" && updatedRoles.includes("Employee")
            ? "bg-blue-900 border-blue-500 hover:border-blue-400"
            : e === "Admin" && updatedRoles.includes("Admin")
            ? "bg-red-900 border-red-500 hover:border-red-400"
            : e === "Manager" && updatedRoles.includes("Manager")
            ? "bg-orange-900 border-orange-500 hover:border-orange-400"
            : !updatedRoles.includes(e) && !assigned
            ? "bg-gray-900 border-gray-500 hover:border-gray-400"
            : "bg-teal-900 border-teal-500 hover:border-teal-400"
        }`}
        onClick={() => {
          handleClick(e);
          if (updatedRoles.includes(e)) {
            setAssigned(false);
          } else if (!updatedRoles.includes(e)) {
            setAssigned(true);
          }
        }}
      >
        {e}
      </div>
    </>
  );
};

export default ManageRoles;
