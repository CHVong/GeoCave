import { useEffect, useState } from "react";
import PageHeading from "../../components/PageHeading";
import AddEquipmentForm from "../../components/AddEquipmentForm";

const Equipment = () => {
  const [showAdd, setShowAdd] = useState(false);

  const handleToggle = () => {
    setShowAdd(!showAdd);
  };

  useEffect(() => {
    document.title = "GeoCave - Equipment";
  }, []);

  return (
    <div className="animate-fadeIn">
      <PageHeading heading={"Equipment"} />
      <button
        onClick={handleToggle}
        className={`bg-green-700 hover:bg-green-600 text-secondary font-bold py-2 px-4 rounded-lg cursor-pointer block ml-auto mb-2 ${
          showAdd ? `bg-red-700 hover:bg-red-600` : ""
        }`}
      >
        {showAdd ? `Close` : `Add Equipment`}
      </button>
      {showAdd ? <AddEquipmentForm /> : ``}
    </div>
  );
};

export default Equipment;
