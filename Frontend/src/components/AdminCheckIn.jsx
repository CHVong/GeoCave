import { useState, useEffect, useCallback } from "react";
import PageHeading from "./PageHeading";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

import AdminCheckInCard from "./AdminCheckInCard";
import Loading from "./Loading";
import Pagination from "./Pagination";

const CHECKIN_URL = "/checkin";

const AdminCheckIn = () => {
  const { auth } = useAuth();
  const [data, setData] = useState([]);

  const [currentItems, setCurrentItems] = useState([]);

  const handleCurrentItems = useCallback((currentItems) => {
    setCurrentItems(currentItems);
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(CHECKIN_URL, {
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
      const response = await axios.delete(CHECKIN_URL, {
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

  useEffect(() => {
    document.title = "GeoCave - Manage Check-Ins";
    fetchData();
  }, []);
  return (
    <div id="scroller">
      <PageHeading heading={"All Submitted Check-Ins"} />
      {data.length !== 0 ? (
        <div className="grid gap-8">
          {currentItems.map((e, index) => (
            <AdminCheckInCard
              deleteItem={deleteItem}
              key={e._id}
              id={e._id}
              user={e.user}
              currentWorkload={e.currentWorkload}
              happyHours={e.happyHours}
              hoursLastWeek={e.hoursLastWeek}
              hoursThisWeek={e.hoursThisWeek}
              needBreak={e.needBreak}
              summary={e.summary}
              weeksOutForFieldWorkNonLocal={e.weeksOutForFieldWorkNonLocal}
              createdAt={e.createdAt}
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

export default AdminCheckIn;
