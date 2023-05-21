import { useState, useEffect, useCallback } from "react";
import PageHeading from "./PageHeading";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

import AdminUsersCard from "./AdminUsersCard";
import Loading from "./Loading";
import Pagination from "./Pagination";

const USER_URL = "/user";
const ADD_ROLE_URL = "/user/addRole";
const UPDATE_ROLE_URL = "/user/updateRole";
const UPDATE_STATUS_URL = "/user/updateStatus";

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

  const addRole = async (id, role) => {
    try {
      const response = await axios.patch(
        ADD_ROLE_URL,
        { id: id, role: role },
        {
          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${auth.accessToken}`,
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
      setData((prevData) => {
        const newData = [...prevData];
        const index = newData.findIndex((item) => item._id === response.data.updatedResult._id);
        newData[index] = response.data.updatedResult;
        return newData;
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const updateRole = async (id, roles) => {
    try {
      const response = await axios.patch(
        UPDATE_ROLE_URL,
        { id: id, roles: roles },
        {
          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${auth.accessToken}`,
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
      setData((prevData) => {
        const newData = [...prevData];
        const index = newData.findIndex((item) => item._id === response.data.updatedResult._id);
        newData[index] = response.data.updatedResult;
        return newData;
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const response = await axios.patch(
        UPDATE_STATUS_URL,
        { id: id, status: status },
        {
          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${auth.accessToken}`,
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
      setData((prevData) => {
        const newData = [...prevData];
        const index = newData.findIndex((item) => item._id === response.data.updatedResult._id);
        newData[index] = response.data.updatedResult;
        return newData;
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <PageHeading heading={"Manage All Users"} />

      {data.length !== 0 ? (
        <div className="grid gap-8 p-2">
          {currentItems.map((e, index) => (
            <AdminUsersCard
              updateStatus={updateStatus}
              addRole={addRole}
              updateRole={updateRole}
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
