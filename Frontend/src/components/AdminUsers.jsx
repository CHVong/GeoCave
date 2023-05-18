import { useState, useEffect, useCallback } from "react";
import PageHeading from "./PageHeading";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

import AdminUsersCard from "./AdminUsersCard";
import Loading from "./Loading";
import Pagination from "./Pagination";

const USER_URL = "/user";

const AdminUsers = () => {
  const { auth } = useAuth();
  const [data, setData] = useState([]);

  const [currentItems, setCurrentItems] = useState([]);

  const handleCurrentItems = useCallback((currentItems) => {
    setCurrentItems(currentItems);
  }, []);

  useEffect(() => {
    document.title = "GeoCave - Manage Users";
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(USER_URL, {
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
      <PageHeading heading={"Manage All Users"} />

      {data.length !== 0 ? (
        <div className="grid gap-8">
          {currentItems.map((e, index) => (
            <AdminUsersCard
              key={e._id}
              id={e._id}
              username={e.username}
              roles={e.roles}
              active={e.active}
              createdAt={e.createdAt}
              updatedAt={e.updatedAt}
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

export default AdminUsers;
