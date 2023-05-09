import { useState, useEffect } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

const AdminStatCard = ({ title, url }) => {
  const [data, setData] = useState([]);
  const { auth } = useAuth();

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get(url, {
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
    <div className="border h-40 w-64 rounded-lg flex flex-col justify-around">
      <h2 className="text-5xl">{data.length}</h2>
      <h2>{title}</h2>
      <h2 className="border w-max m-auto rounded-lg px-3 py-1 cursor-pointer">Manage</h2>
    </div>
  );
};

export default AdminStatCard;
