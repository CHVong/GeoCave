import React from "react";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faHistory,
  faArrowDownAZ,
  faArrowUpZA,
  faArrowUp91,
  faArrowDown19,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

const EquipmentFilter = ({ fetch }) => {
  const options = [
    { value: "recentlyUpdated", label: "Recently Updated", icon: faHistory },
    { value: "nameAZ", label: "Name: A-Z", icon: faArrowDownAZ },
    { value: "nameZA", label: "Name: Z-A", icon: faArrowUpZA },
    { value: "stockHighToLow", label: "Stock-High", icon: faArrowUp91 },
    { value: "stockLowToHigh", label: "Stock-Low", icon: faArrowDown19 },
    { value: "newest", label: "Newest", icon: faClock },
    { value: "oldest", label: "Oldest", icon: faClock },
  ];
  const getOptionLabel = ({ label, icon = faFilter }) => (
    <div className="flex items-center">
      <FontAwesomeIcon icon={icon} className="mr-2" />
      <span>{label}</span>
    </div>
  );

  return (
    <div className="">
      <Select
        options={options}
        getOptionLabel={getOptionLabel}
        isSearchable={false}
        className="w-48"
        onChange={(selectedOption) => fetch(selectedOption.value)}
        placeholder={
          <div className="">
            <FontAwesomeIcon icon={faFilter} />
            <span> Select Filter</span>
          </div>
        }
        styles={{
          control: (provided) => ({
            ...provided,
            backgroundColor: "black",
            borderColor: "#3b82f680",
            borderWidth: "2px",
          }),
          singleValue: (provided) => ({
            ...provided,
            color: "#a5a5a5",
          }),
          menu: (provided) => ({
            ...provided,
            backgroundColor: "black",
          }),
          option: (provided, state) => ({
            ...provided,

            backgroundColor: state.isSelected ? "#1e3a8a" : state.isFocused ? "#334155" : undefined,
            color: state.isSelected ? "white" : state.isFocused ? "white" : "#a5a5a5",
            ":hover": {
              backgroundColor: state.isSelected ? "#334155" : "#1e293b",
              color: state.isSelected ? "#a5a5a5" : "white",
            },
            cursor: "pointer",
            ":active": {
              backgroundColor: state.isSelected ? "" : "rgba(30, 58, 138, 0.5)",
            },
          }),
        }}
      />
    </div>
  );
};

export default EquipmentFilter;
