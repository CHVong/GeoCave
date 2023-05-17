import { useState, useEffect, useCallback } from "react";
import PageHeading from "./PageHeading";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

import AdminSafetyCard from "./AdminSafetyCard";
import Loading from "./Loading";
import Pagination from "./Pagination";

const SAFETY_URL = "/safety";

const AdminSafety = () => {
  const { auth } = useAuth();
  const [data, setData] = useState([]);

  const [currentItems, setCurrentItems] = useState([]);

  const handleCurrentItems = useCallback((currentItems) => {
    setCurrentItems(currentItems);
  }, []);

  useEffect(() => {
    document.title = "GeoCave - Manage Safety";
    fetchData();
  }, []);

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
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    }
  };

  const deleteItem = async (id) => {
    console.log("delete item");
    console.log(id);
    try {
      const response = await axios.delete(`/safety`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.accessToken}`,
        },
        data: {
          id: id,
        },
        withCredentials: true,
      });

      console.log(response.data);
      setData((prevData) => {
        return prevData.filter((item) => item._id !== response.data.deletedSafety._id);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    }
  };

  return (
    <div id="scroller">
      <PageHeading heading={"All Submitted Safety Incidents"} />

      {data.length !== 0 ? (
        <div className="grid gap-8">
          {currentItems.map((e, index) => (
            <AdminSafetyCard
              deleteItem={deleteItem}
              key={e._id}
              id={e._id}
              projectName={e.projectName}
              image={e.image}
              projectNumber={e.projectNumber}
              hazards={e.hazards}
              suggestiveAction={e.suggestiveAction}
              createdAt={e.createdAt}
              description={e.description}
              createdByUser={e.createdByUser}
            />
          ))}
        </div>
      ) : (
        <>
          <div className="col-span-full">
            <Loading />
          </div>
        </>
      )}

      <Pagination data={data} handleCurrentItems={handleCurrentItems} />
    </div>
  );
};

export default AdminSafety;
