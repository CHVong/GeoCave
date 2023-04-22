import { useEffect, useState } from "react";
import PageHeading from "../../components/PageHeading";
import AddEquipmentForm from "../../components/AddEquipmentForm";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import Searchbar from "../../components/Searchbar";
import EquipmentCard from "../../components/EquipmentCard";

import EquipmentFilter from "../../components/EquipmentFilter";

const EQUIPMENT_URL = "/equipment";
const SEARCH_EQUIPMENT_URL = "/equipment/search";

const Equipment = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [data, setData] = useState([]);

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
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
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
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
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
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    }
  };

  useEffect(() => {
    document.title = "GeoCave - Equipment";
    fetchData();
  }, []);

  return (
    <div className="animate-fadeIn">
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
        {data.length !== 0 ? (
          data.map((e, index) => (
            <EquipmentCard
              key={e._id}
              id={e._id}
              stock={e.stock}
              image={e.image}
              name={e.name}
              job={e.job}
              vendor={e.vendor}
              location={e.location}
              createdByUser={e.createdByUser}
            />
          ))
        ) : (
          <div className="col-span-full">
            There are no equipment items available for display. Please try refreshing the page.
          </div>
        )}
      </div>
    </div>
  );
};

export default Equipment;
