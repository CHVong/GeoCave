import { useState } from "react";
import {
  faPenToSquare,
  faTrashCan,
  faFloppyDisk,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import jwt_decode from "jwt-decode";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

const CHECKLIST_URL = "/checklist";

const FormCheckOptional = ({ id, title, job, onClick }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [optionalInput, setOptionalInput] = useState(title);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const { auth } = useAuth();

  const decoded = auth?.accessToken ? jwt_decode(auth.accessToken) : undefined;
  const username = decoded?.UserInfo.username || [];

  const toggleInfo = () => {
    setShowEdit(!showEdit);
  };

  const fetchData = async () => {
    const response = await axios.get(CHECKLIST_URL, {
      params: { user: username, job: job },
      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${auth.accessToken}`,
      },
      withCredentials: true,
    });
    // console.log(response);
    // console.log(response.data);
  };

  const handleDelete = async () => {
    onClick(id);
  };
  // const handleDelete = async () => {
  //   try {
  //     await axios.delete(CHECKLIST_URL, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${auth.accessToken}`,
  //       },
  //       withCredentials: true,
  //       data: { id: id },
  //     });

  //     fetchData();
  //     toggleInfo();
  //   } catch (error) {
  //     console.error("Error Updating Data:", error);
  //   }
  // };

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }
    try {
      const response = await axios.patch(
        CHECKLIST_URL,
        { id: id, user: username, item: optionalInput, job: job },
        {
          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${auth.accessToken}`,
          },
          withCredentials: true,
        }
      );
      fetchData();
      toggleInfo();
      // console.log(response.data);
    } catch (error) {
      console.error("Error Updating Data:", error);
    }
  };

  return (
    <div className="text-left animate-fadeIn flex flex-row items-center gap-2 md:gap-4 m-2">
      {showEdit ? (
        <form
          onSubmit={handleSubmit}
          className="text-left animate-fadeIn flex flex-row items-center gap-2 md:gap-4 w-full"
        >
          <input
            type="text"
            name="item"
            id={id}
            value={optionalInput}
            onChange={(e) => {
              setOptionalInput(e.target.value);
            }}
            autoComplete="off"
            required
            className={`rounded px-4 py-1 bg-black outline-none ring-1 w-full`}
          />
        </form>
      ) : (
        <div className="text-left animate-fadeIn flex flex-row items-center gap-2 md:gap-4 w-full">
          <input
            type="checkbox"
            id={id}
            className="focus:ring-0 focus:ring-offset-0 rounded-full w-6 h-6 checked:text-green-700 peer transition bg-gray-800 cursor-pointer border-2"
          />
          <label
            htmlFor={id}
            className="p-1 peer-checked:text-gray-500 peer-checked:line-through peer-checked:decoration-green-700 transition cursor-pointer w-full hover:opacity-80"
          >
            {optionalInput}
          </label>
        </div>
      )}
      {showConfirmDelete ? (
        <>
          <FontAwesomeIcon
            icon={faXmark}
            className="cursor-pointer hover:opacity-80 text-red-500 animate-fadeIn"
            onClick={() => {
              setShowConfirmDelete(false);
            }}
          />{" "}
          <FontAwesomeIcon
            icon={faCheck}
            className="cursor-pointer hover:opacity-80 text-green-500 animate-fadeIn"
            onClick={() => {
              setShowConfirmDelete(false);
              handleDelete();
            }}
          />
        </>
      ) : (
        showEdit && (
          <FontAwesomeIcon
            icon={faTrashCan}
            className="cursor-pointer hover:opacity-80 text-red-500 animate-fadeIn"
            onClick={() => {
              setShowConfirmDelete(true);
            }}
          />
        )
      )}
      {!showConfirmDelete && (
        <div className="relative">
          <FontAwesomeIcon
            icon={showEdit ? faFloppyDisk : faPenToSquare}
            className={`cursor-pointer hover:opacity-80 ${
              showEdit ? "text-green-500 animate-fadeIn" : ""
            }`}
            onClick={() => {
              if (showEdit) {
                handleSubmit();
              } else {
                toggleInfo();
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default FormCheckOptional;
