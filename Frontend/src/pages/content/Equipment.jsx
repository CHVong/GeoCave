import { useEffect, useState } from "react";
import PageHeading from "../../components/PageHeading";
import AddEquipmentForm from "../../components/AddEquipmentForm";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import Searchbar from "../../components/Searchbar";
import EquipmentCard from "../../components/EquipmentCard";
import EquipmentFilter from "../../components/EquipmentFilter";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from "../../components/Loading";

const EQUIPMENT_URL = "/equipment";
const SEARCH_EQUIPMENT_URL = "/equipment/search";
const UPDATE_STOCK_URL = "/equipment/stock";

const Equipment = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  let pageNumbers = [];
  if (totalPages <= 3) {
    pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  } else if (currentPage === 1) {
    pageNumbers = [1, 2, 3];
  } else if (currentPage === totalPages) {
    pageNumbers = [totalPages - 2, totalPages - 1, totalPages];
  } else {
    pageNumbers = [currentPage - 1, currentPage, currentPage + 1];
  }

  const { auth } = useAuth();

  const handleToggle = () => {
    setShowAdd(!showAdd);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(EQUIPMENT_URL, {
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${auth.accessToken}`,
        },
        withCredentials: true,
      });
      setData(response.data);
      setLoading(false);
      // console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
      setLoading(true);
    }
  };
  const fetchSearch = async (searchText) => {
    try {
      const response = await axios.get(SEARCH_EQUIPMENT_URL, {
        params: { searchText },
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${auth.accessToken}`,
        },
        withCredentials: true,
      });
      setData(response.data);
      setLoading(false);
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
      setLoading(false);
    }
  };
  const fetchFilter = async (filter) => {
    try {
      const response = await axios.get(`/equipment/${filter}`, {
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${auth.accessToken}`,
        },
        withCredentials: true,
      });
      setData(response.data);
      setLoading(false);
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
      setLoading(true);
    }
  };

  const updateStock = async (e, id, stockNumber) => {
    if (e) {
      e.preventDefault();
    }
    // console.log(id, stockNumber);
    try {
      const response = await axios.patch(
        UPDATE_STOCK_URL,
        { id: id, stock: stockNumber },
        {
          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${auth.accessToken}`,
          },
          withCredentials: true,
        }
      );
      setData((prevData) => {
        const newData = [...prevData];
        const index = newData.findIndex((item) => item._id === response.data._id);
        newData[index] = response.data;
        return newData;
      });
    } catch (error) {
      console.error("Error Updating Data:", error);
    }
  };

  useEffect(() => {
    document.title = "GeoCave - Equipment";
    fetchData();
  }, []);

  useEffect(() => {
    document.getElementById("scroller")?.scrollIntoView({ behavior: "smooth" });
  }, [currentPage]);

  return (
    <div className="animate-fadeIn" id="scroller">
      <PageHeading heading={"Equipment"} />
      <button
        onClick={handleToggle}
        className={`bg-green-700 hover:bg-green-600 text-secondary font-bold py-2 px-4 rounded-lg cursor-pointer block m-4 ml-auto ${
          showAdd ? `bg-red-700 hover:bg-red-600` : ""
        }`}
      >
        {showAdd ? `Close` : `Add Equipment`}
      </button>
      {showAdd ? <AddEquipmentForm fetch={fetchData} /> : ``}
      <div className="flex items-end md:items-center flex-col-reverse md:flex-row justify-between m-4 gap-4">
        <Searchbar fetch={fetchSearch} />
        <EquipmentFilter fetch={fetchFilter} />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 p-2">
        {loading ? ( // Show loading when loading is true
          <div className="col-span-full">
            <Loading />
          </div>
        ) : currentItems.length !== 0 ? (
          currentItems.map((e, index) => (
            <EquipmentCard
              updateStock={updateStock}
              key={e._id}
              id={e._id}
              stock={e.stock}
              image={e.image}
              name={e.name}
              job={e.job}
              vendor={e.vendor}
              location={e.location}
              description={e.description}
              createdByUser={e.createdByUser}
            />
          ))
        ) : (
          <div className="col-span-full">
            No results were found for equipment with that search query.
          </div>
        )}
        {/* CONSIDER ADDING PAGINATION? */}
        <div className="flex justify-center mt-4 col-span-full">
          {currentPage > 1 && data && (
            <button
              className="mr-2 bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <FontAwesomeIcon icon={faCaretLeft} />
            </button>
          )}

          {pageNumbers.map((number) => (
            <button
              key={number}
              className={`mr-2 ${
                number === currentPage
                  ? "bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
                  : "bg-blue-100 hover:bg-blue-200 text-gray-800 font-bold py-2 px-4 rounded"
              }`}
              onClick={() => setCurrentPage(number)}
            >
              {number}
            </button>
          ))}

          {currentPage < totalPages && (
            <button
              className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <FontAwesomeIcon icon={faCaretRight} />
            </button>
          )}
        </div>
        {/* CONSIDER ADDING PAGINATION? */}
      </div>
    </div>
  );
};

export default Equipment;
