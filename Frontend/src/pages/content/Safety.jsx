import { useState, useEffect } from "react";
import PageHeading from "../../components/PageHeading";
import AddSafetyIncidentForm from "../../components/AddSafetyIncidentForm";
import RecentSafetyIncident from "../../components/RecentSafetyIncident";

import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

const SAFETY_URL = "/safety/latest";

const Safety = () => {
  const [data, setData] = useState([]);
  const [showAdd, setShowAdd] = useState(false);

  const { auth } = useAuth();

  useEffect(() => {
    document.title = "GeoCave - Safety";
    fetchData();
  }, []);

  const handleToggle = () => {
    setShowAdd(!showAdd);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(SAFETY_URL, {
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
  return (
    <div>
      <PageHeading heading={"Safety"} />
      <button
        onClick={handleToggle}
        className={`bg-green-700 hover:bg-green-600 text-secondary font-bold py-2 px-4 rounded-lg cursor-pointer block m-4 ml-auto ${
          showAdd ? `bg-red-700 hover:bg-red-600` : ""
        }`}
      >
        {showAdd ? `Close` : `Add New Incident`}
      </button>
      {showAdd ? <AddSafetyIncidentForm fetch={fetchData} /> : ``}
      <RecentSafetyIncident data={data} />
    </div>
  );
};

export default Safety;
