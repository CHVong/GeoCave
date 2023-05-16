import { useState, useEffect } from "react";
import PageHeading from "./PageHeading";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

import AdminSafetyCard from "./AdminSafetyCard";
import Loading from "./Loading";

const SAFETY_URL = "/safety";

const AdminSafety = () => {
  const { auth } = useAuth();
  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
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
  return (
    <div>
      <PageHeading heading={"Manage Safety"} />

      {data.length !== 0 ? (
        <div className="grid 2xl:grid-cols-2 gap-3 p-2">
          {currentItems.map((e, index) => (
            <AdminSafetyCard
              // updateItem={updateItem}
              // updatePicture={updatePicture}
              // deleteItem={deleteItem}
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
    </div>
  );
};

export default AdminSafety;
