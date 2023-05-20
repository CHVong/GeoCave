import { useState } from "react";

const ManageRoles = ({ newRoles, roles, e }) => {
  const [assigned, setAssigned] = useState(false);
  const [updatedRoles, setUpdatedRoles] = useState([...newRoles]);

  const handleClick = () => {
    // console.log(updatedRoles);
    // console.log(e);
    if (updatedRoles.includes(e)) {
      const index = updatedRoles.indexOf(e);

      updatedRoles.splice(index, 1);

      setAssigned(false);
    } else if (!updatedRoles.includes(e)) {
      updatedRoles.push(e);
      setAssigned(true);
    }

    setUpdatedRoles([...updatedRoles]); // Trigger re-render by updating the state with the modified array
    console.log(updatedRoles);
  };

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
        onClick={handleClick}
      >
        {e}
      </div>
    </>
  );
};

export default ManageRoles;
