import React from "react";

const CheckboxForAddEquipment = ({ name, checked, handleCheckboxChange }) => {
  return (
    <div className="flex flex-row gap-2 items-center">
      <input
        type="checkbox"
        name="job"
        id={name}
        value={name}
        checked={checked}
        className={`rounded bg-black outline-none ring-1`}
        onChange={handleCheckboxChange}
      />
      <label htmlFor={name}>{name}</label>
    </div>
  );
};

export default CheckboxForAddEquipment;
