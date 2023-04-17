import { useEffect, useState } from "react";
import PageHeading from "../../components/PageHeading";
import AddEquipmentForm from "../../components/AddEquipmentForm";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

const EQUIPMENT_URL = "/equipment";

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

  useEffect(() => {
    document.title = "GeoCave - Equipment";
    fetchData();
  }, []);

  return (
    <div className="animate-fadeIn">
      <PageHeading heading={"Equipment"} />
      <button
        onClick={handleToggle}
        className={`bg-green-700 hover:bg-green-600 text-secondary font-bold py-2 px-4 rounded-lg cursor-pointer block ml-auto mb-2 ${
          showAdd ? `bg-red-700 hover:bg-red-600` : ""
        }`}
      >
        {showAdd ? `Close` : `Add Equipment`}
      </button>
      {showAdd ? <AddEquipmentForm /> : ``}

      <table className="rounded-lg border-red-500 m-4">
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
      </table>
    </div>
  );
};

export default Equipment;
