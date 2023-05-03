import { useState, useEffect } from "react";
import PageHeading from "../../components/PageHeading";
import AddSafetyIncident from "../../components/AddSafetyIncident";

const Safety = () => {
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    document.title = "GeoCave - Safety";
    // fetchData();
  }, []);

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
  return (
    <div>
      <PageHeading heading={"Safety"} />
      <button
        onClick={handleToggle}
        className={`bg-green-700 hover:bg-green-600 text-secondary font-bold py-2 px-4 rounded-lg cursor-pointer block m-4 ml-auto ${
          showAdd ? `bg-red-700 hover:bg-red-600` : ""
        }`}
      >
        {showAdd ? `Close` : `Add Safety Incident`}
      </button>
      {showAdd ? <AddSafetyIncident fetch={fetchData} /> : ``}
    </div>
  );
};

export default Safety;
