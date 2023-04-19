import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

const EquipmentFilter = () => {
  const getFilterOptionLabel = (option) => (
    <>
      <FontAwesomeIcon icon={faFilter} className="mr-2" />
      {option.label}
    </>
  );
  return (
    <div className="">
      <select className="rounded bg-primary cursor-pointer text-left flex items-center" required>
        <option value="">Select Filter</option>
        <option name="drilling" getOptionLabel={getFilterOptionLabel}>
          Drilling
        </option>
        <option name="perctest">Percolation Test</option>
        <option name="infiltest">Infiltration Test</option>
        <option name="pileinstall">Pile Installation</option>
        <option name="piletest">Pile Test</option>
        <option name="usamarking">USA Marking</option>
        <option name="monitoring">Monitoring</option>
      </select>
    </div>
  );
};

export default EquipmentFilter;
