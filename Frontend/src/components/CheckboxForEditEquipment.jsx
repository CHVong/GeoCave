import React from "react";

const CheckboxForEditEquipment = ({ name, checked, handleCheckboxChange, id }) => {
  const checkboxId = id ? `${id}-${name}` : name;

  return (
    <div className="flex flex-row gap-2 items-baseline">
      <input
        type="checkbox"
        name="job"
        id={checkboxId}
        value={name}
        checked={checked}
        className={`rounded bg-black outline-none ring-1 cursor-pointer`}
        onChange={handleCheckboxChange}
      />
      <label htmlFor={checkboxId} className="cursor-pointer">
        {name}
      </label>
    </div>
  );
};

export default CheckboxForEditEquipment;
