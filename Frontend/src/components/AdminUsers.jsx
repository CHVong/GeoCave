import { useState, useEffect, useCallback } from "react";
import PageHeading from "./PageHeading";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

import AdminUsersCard from "./AdminUsersCard";
import Loading from "./Loading";
import Pagination from "./Pagination";
import Searchbar from "./Searchbar";
import UsersFilter from "./UsersFilter";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const USER_URL = "/user";
const ADD_ROLE_URL = "/user/addRole";
const UPDATE_ROLE_URL = "/user/updateRole";
const UPDATE_STATUS_URL = "/user/updateStatus";
const SEARCH_USERNAME_URL = "/user/searchUsername";

const AdminUsers = () => {
  const { auth } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // const [currentItems, setCurrentItems] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  let pageNumbers = [];
  if (totalPages <= 3) {
    pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  } else if (currentPage === 1) {
    pageNumbers = [1, 2, 3];
  } else if (currentPage === totalPages) {
    pageNumbers = [totalPages - 2, totalPages - 1, totalPages];
  } else {
    pageNumbers = [currentPage - 1, currentPage, currentPage + 1];
  }

  // const handleCurrentItems = useCallback((currentItems) => {
  //   setCurrentItems(currentItems);
  // }, []);

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
      setLoading(false);
      // console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
      setLoading(true);
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
      // console.log(response.data);
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
      // console.log(response.data);
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
      // console.log(response.data);
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

  const fetchSearch = async (searchText) => {
    try {
      const response = await axios.get(SEARCH_USERNAME_URL, {
        params: { searchText },
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${auth.accessToken}`,
        },
        withCredentials: true,
      });
      setData(response.data);
      setLoading(false);
      console.log(response.data);
      // console.log(response.data);
    } catch (error) {
      setData([]);
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  const fetchFilter = async (filter) => {
    try {
      const response = await axios.get(`/user/${filter}`, {
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${auth.accessToken}`,
        },
        withCredentials: true,
      });
      setData(response.data);
      setLoading(false);
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
      setLoading(true);
    }
  };

  useEffect(() => {
    document.getElementById("scroller")?.scrollIntoView({ behavior: "smooth" });
  }, [currentPage]);

  return (
    <div id="scroller">
      <PageHeading heading={"Manage All Users"} />
      <div className="flex items-end md:items-center flex-col-reverse md:flex-row justify-between m-4 gap-4">
        <Searchbar fetch={fetchSearch} />
        <UsersFilter fetch={fetchFilter} />
      </div>
      {loading ? ( // Show loading when loading is true
        <div className="col-span-full">
          <Loading />
        </div>
      ) : data.length !== 0 ? (
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
        "No results were found for users with that name or role."
      )}

      {/* <Pagination data={data} handleCurrentItems={handleCurrentItems} /> */}
      <div className="flex justify-center mt-4 col-span-full">
        {currentPage > 1 && data && (
          <button
            className="mr-2 bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <FontAwesomeIcon icon={faCaretLeft} />
          </button>
        )}

        {pageNumbers.map((number) => (
          <button
            key={number}
            className={`mr-2 ${
              number === currentPage
                ? "bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
                : "bg-blue-100 hover:bg-blue-200 text-gray-800 font-bold py-2 px-4 rounded"
            }`}
            onClick={() => setCurrentPage(number)}
          >
            {number}
          </button>
        ))}

        {currentPage < totalPages && (
          <button
            className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <FontAwesomeIcon icon={faCaretRight} />
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
