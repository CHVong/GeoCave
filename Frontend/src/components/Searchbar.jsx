import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Searchbar = ({ fetch }) => {
  const handleSearch = (text) => {
    fetch(text);
  };
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      // Check if Enter key is pressed
      handleSearch();
    }
  };

  return (
    <div
      className={`flex items-center rounded px-4 bg-black outline-none ring-2 w-full md:w-1/2 lg:w-1/4 focus-within:ring-blue-500`}
    >
      <input
        type="text"
        name="searchbar"
        id="searchbar"
        autoComplete="off"
        //value={searchText}
        onKeyDown={handleKeyDown}
        onChange={(e) => {
          //setSearchText(e.target.value);
          handleSearch(e.target.value);
        }}
        placeholder="Type to search..."
        className={`rounded px-4 py-2 bg-black outline-none ring-0 border-0 focus:border-0 focus:outline-none focus:ring-0 w-full`}
      />
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className="cursor-pointer opacity-75 hover:opacity-100 hover:scale-90 transition"
        onClick={handleSearch}
      />
    </div>
  );
};

export default Searchbar;
