import { useEffect, useState } from "react";
import PageHeading from "../../components/PageHeading";
import AddEquipmentForm from "../../components/AddEquipmentForm";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import Searchbar from "../../components/Searchbar";

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
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    }
  };
  const fetchSearch = async () => {
    try {
      const response = await axios.get(SEARCH_EQUIPMENT_URL, {
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${auth.accessToken}`,
        },
        withCredentials: true,
      });
      setData(response.data);
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
        className={`bg-green-700 hover:bg-green-600 text-secondary font-bold py-2 px-4 rounded-lg cursor-pointer block ml-auto m-4 ${
          showAdd ? `bg-red-700 hover:bg-red-600` : ""
        }`}
      >
        {showAdd ? `Close` : `Add Equipment`}
      </button>
      {showAdd ? <AddEquipmentForm fetch={fetchData} /> : ``}
      <Searchbar fetch={fetchSearch} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 p-2">
        {data.map((e) => {
          return (
            <div
              className="border-4 border-primary rounded-md grid hover:scale-95 transition hover:border-tertiary p-4"
              key={e._id}
            >
              <div className="flex flex-row justify-between items-center">
                <div className="text-left">
                  <h2 className="text-2xl font-bold">{e.name}</h2>
                  <h2>Stock: {e.stock}</h2>
                  <h2>Vendor: {e.vendor}</h2>
                  <h2>Location: {e.location}</h2>
                </div>
                <div>
                  <h2>
                    {e.image ? (
                      <img
                        src={`${e.image}`}
                        alt={`Image of ${e.name}`}
                        className="w-56 h-40 object-scale-down hover:scale-95 cursor-pointer border-primary transition"
                        onClick={() => window.open(e.image, "_blank")}
                      />
                    ) : (
                      "No image"
                    )}
                  </h2>
                </div>
              </div>
              <div className="text-left">
                <h2>Jobs: {e.job.join(", ")}</h2>
                <h2>Description: {e.description}</h2>
              </div>
            </div>
          );
        })}
      </div>

      {/* <table className="rounded-lg border-red-500 overflow-x-auto">
        <thead className="">
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Location</th>
            <th>Stock</th>
            <th>Vendor</th>
            <th>Jobs</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e) => {
            return (
              <tr className="border-2 divide-x" key={e._id}>
                <td>{e.name}</td>
                <td>{e.description}</td>
                <td>{e.location}</td>
                <td>{e.stock}</td>
                <td>{e.vendor}</td>
                <td>{e.job.join(", ")}</td>
                <td>
                  {e.image ? (
                    <img src={`${e.image}`} alt={`Image of ${e.name}`} className="w-52" />
                  ) : (
                    "No image"
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table> */}
    </div>
  );
};

export default Equipment;
