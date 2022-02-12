import { useState, useEffect } from "react";
import PageHeading from "./PageHeading";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import AdminSafetyCard from "./AdminSafetyCard";
import Loading from "./Loading";

const SAFETY_URL = "/safety";

const AdminSafety = () => {
  const { auth } = useAuth();
  const [data, setData] = useState([]);

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
    <div>
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

export default AdminSafety;
