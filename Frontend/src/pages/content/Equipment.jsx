import { useEffect, useState } from "react";
import PageHeading from "../../components/PageHeading";
import AddEquipmentForm from "../../components/AddEquipmentForm";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import Searchbar from "../../components/Searchbar";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
        <EquipmentFilter />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 p-2">
        {data.map((e) => {
          return (
            <div
              className="border-4 border-primary rounded-md grid hover:scale-95 transition hover:border-tertiary gap-2"
              key={e._id}
            >
              <div className="flex flex-col justify-stretch items-center">
                <h2 className="text-2xl font-bold bg-slate-800 w-full p-1">{e.name}</h2>
                <div className="flex justify-around items-center w-full h-full">
                  <div className="text-left p-4  h-full w-[50%]">
                    <h2>
                      <span className="text-tertiary">Stock:</span> {e.stock}
                    </h2>
                    <h2>
                      <span className="text-tertiary">Vendor:</span> {e.vendor}
                    </h2>
                    <h2>
                      <span className="text-tertiary">Location:</span> {e.location}
                    </h2>
                  </div>
                  <div className="h-full w-[50%]">
                    {e.image ? (
                      <div className="relative group ">
                        <img
                          src={`${e.image}`}
                          alt={`Image of ${e.name}`}
                          className="w-56 h-40 object-scale-down group-hover:scale-95 cursor-pointer border-primary transition p-2"
                          onClick={() => window.open(e.image, "_blank")}
                        />
                        <div
                          className="absolute inset-0 bg-gray-800 opacity-0 hover:opacity-50 transition duration-300 flex items-center justify-center group-hover:scale-95 cursor-pointer"
                          onClick={() => window.open(e.image, "_blank")}
                        >
                          <FontAwesomeIcon icon={faUpRightFromSquare} size="xl" />
                        </div>
                      </div>
                    ) : (
                      <div className="relative group ">
                        <img
                          src={`https://res.cloudinary.com/dq9umvpmv/image/upload/v1681857805/PictureNotAvailable_qj29ng.png`}
                          alt={`Placeholder image`}
                          className="w-56 h-40 object-scale-down group-hover:scale-95 cursor-pointer border-primary transition p-2"
                          onClick={() =>
                            window.open(
                              "https://res.cloudinary.com/dq9umvpmv/image/upload/v1681857805/PictureNotAvailable_qj29ng.png",
                              "_blank"
                            )
                          }
                        />
                        <div
                          className="absolute inset-0 bg-gray-800 opacity-0 hover:opacity-50 transition duration-300 flex items-center justify-center group-hover:scale-95 cursor-pointer"
                          onClick={() =>
                            window.open(
                              "https://res.cloudinary.com/dq9umvpmv/image/upload/v1681857805/PictureNotAvailable_qj29ng.png",
                              "_blank"
                            )
                          }
                        >
                          <FontAwesomeIcon icon={faUpRightFromSquare} size="xl" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-left p-2 text-gray-400 text-sm h-full">
                <h3>
                  <span className="text-lg underline underline-offset-4">Jobs:</span>{" "}
                  {e.job.join(", ")}
                </h3>
                <h3 className="">
                  <span className="text-lg underline underline-offset-4 ">Description:</span>{" "}
                  {e.description}
                </h3>
                <h6>Created by: {e.createdByUser}</h6>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Equipment;
