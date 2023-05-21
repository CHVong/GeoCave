import React, { useState, useEffect } from "react";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Pagination = ({ data, handleCurrentItems }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  let pageNumbers = [];

  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    handleCurrentItems(currentItems);
  }, [data, currentPage, itemsPerPage, handleCurrentItems]);

  useEffect(() => {
    setCurrentPage((prevCurrentPage) => Math.min(prevCurrentPage, totalPages));
  }, [data, totalPages]);

  useEffect(() => {
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    document.getElementById("scroller")?.scrollIntoView({ behavior: "smooth" });
  }, [currentPage]);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (totalPages <= 3) {
    pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  } else if (currentPage === 1) {
    pageNumbers = [1, 2, 3];
  } else if (currentPage === totalPages) {
    pageNumbers = [totalPages - 2, totalPages - 1, totalPages];
  } else {
    pageNumbers = [currentPage - 1, currentPage, currentPage + 1];
  }

  return (
    <div className="flex justify-center mt-4 col-span-full">
      {currentPage > 1 && (
        <button
          className="mr-2 bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handlePageClick(currentPage - 1)}
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
          onClick={() => handlePageClick(number)}
        >
          {number}
        </button>
      ))}

      {currentPage < totalPages && (
        <button
          className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handlePageClick(currentPage + 1)}
        >
          <FontAwesomeIcon icon={faCaretRight} />
        </button>
      )}
    </div>
  );
};

export default Pagination;
