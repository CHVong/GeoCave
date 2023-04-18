import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Searchbar = ({ fetch }) => {
  const [searchText, setSearchText] = useState("");

  return (
    <div
      className={`flex items-center rounded px-4  bg-black outline-none ring-1 md:w-1/4 m-4 md:ml-auto`}
    >
      <input
        type="text"
        name="searchbar"
        id="searchbar"
        autoComplete="off"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
        placeholder="Type to search..."
        className={`rounded px-4 py-2 bg-black outline-none ring-0 border-0 focus:border-0 focus:outline-none focus:ring-0 w-full`}
      />
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className="cursor-pointer opacity-75 hover:opacity-100"
      />
    </div>
  );
};

export default Searchbar;
