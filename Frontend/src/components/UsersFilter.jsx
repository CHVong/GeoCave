import React from "react";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faHistory,
  faArrowDownAZ,
  faArrowUpZA,
  faClock,
  faUserLock,
  faUserCheck,
} from "@fortawesome/free-solid-svg-icons";

const UsersFilter = ({ fetch }) => {
  const options = [
    { value: "oldest", label: "Oldest", icon: faClock },
    { value: "newest", label: "Newest", icon: faClock },
    { value: "active", label: "Active", icon: faUserCheck },
    { value: "inactive", label: "Inactive", icon: faUserLock },
    { value: "nameAZ", label: "Username: A-Z", icon: faArrowDownAZ },
    { value: "nameZA", label: "Username: Z-A", icon: faArrowUpZA },
    { value: "recentlyUpdated", label: "Recently Updated", icon: faHistory },
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

export default UsersFilter;
