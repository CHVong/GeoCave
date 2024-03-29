import { useState, useEffect } from "react";
import moment from "moment";
import useAuth from "../hooks/useAuth";
import jwt_decode from "jwt-decode";
import {
  faPenToSquare,
  faFloppyDisk,
  faToggleOn,
  faToggleOff,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ManageRoles from "./ManageRoles";

const availableRoles = ["Employee", "Manager", "Admin"];

const AdminUsersCard = ({
  id,
  username,
  roles,
  active,
  createdAt,
  updatedAt,
  addRole,
  updateStatus,
  updateRole,
}) => {
  const { auth } = useAuth();
  const decoded = auth?.accessToken ? jwt_decode(auth.accessToken) : undefined;
  const USER = decoded?.UserInfo.username || [];
  const [editRoles, setEditRoles] = useState(false);
  const newRoles = [...roles];
  const [updatedRoles, setUpdatedRoles] = useState(newRoles);
  useEffect(() => {
    setUpdatedRoles(newRoles);
  }, [roles]);

  const handleClick = (e) => {
    // console.log(updatedRoles);
    if (updatedRoles.includes(e)) {
      const index = updatedRoles.indexOf(e);
      updatedRoles.splice(index, 1);
    } else if (!updatedRoles.includes(e)) {
      updatedRoles.push(e);
    }
    setUpdatedRoles([...updatedRoles]);
    // Trigger re-render by updating the state with the modified array
    // console.log(updatedRoles);
  };

  const handleKeyDown = (e) => {
    if (e.target.value.toLowerCase() === "admin" || e.target.value.toLowerCase() === "manager") {
      return;
    }

    if (e.target.value.trim() === "") {
      // Check if the trimmed value is empty
      return;
    }

    if (roles.includes(e.target.value)) {
      return;
    }

    if (e.keyCode === 13) {
      addRole(id, e.target.value.trim()); // Trim the value before adding the role
      e.target.value = "";
    }
  };

  return (
    <div className="border-b border-slate-700 px-10 grid sm:grid-cols-4 gap-2">
      <div className="text-start group/username">
        <div className="text-sm text-slate-500 group-hover/username:text-slate-300 transition">
          Username
        </div>
        <div className="text-lg font-bold animate-fadeIn">{username}</div>
      </div>
      <div className="text-start mr-auto group/roles">
        <div className="flex gap-2 items-center text-sm text-slate-500">
          <div className="group-hover/roles:text-slate-300 transition">Roles</div>
          <div>
            {roles.includes("Admin") && username !== USER ? (
              ""
            ) : (
              <>
                {!editRoles && (
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    className="hover:scale-90 hover:cursor-pointer transition hover:text-slate-300"
                    onClick={() => setEditRoles(true)}
                  />
                )}
                {editRoles ? (
                  <FontAwesomeIcon
                    icon={faFloppyDisk}
                    className="hover:scale-90 hover:cursor-pointer transition hover:text-green-600"
                    onClick={() => {
                      setEditRoles(false);
                      updateRole(id, updatedRoles);
                    }}
                  />
                ) : (
                  ""
                )}
              </>
            )}
          </div>
        </div>

        <div className="flex gap-2 flex-wrap items-center p-2">
          {roles.length === 0 && !editRoles ? (
            <h3 className="text-xs font-medium border-2 rounded-2xl px-2 cursor-pointer transition-all animate-fadeIn bg-stone-700 border-stone-600 hover:border-stone-500">
              Unassigned
            </h3>
          ) : (
            ""
          )}
          {!editRoles &&
            roles.map((e, i) => {
              return (
                <div
                  key={i}
                  className={`text-xs font-medium border-2 rounded-2xl px-2 cursor-default transition-all animate-fadeIn ${
                    e === "Employee"
                      ? "bg-blue-900 border-blue-500 hover:border-blue-400"
                      : e === "Admin"
                      ? "bg-red-900 border-red-500 hover:border-red-400"
                      : e === "Manager" && roles.includes("Manager")
                      ? "bg-orange-900 border-orange-500 hover:border-orange-400"
                      : "bg-teal-900 border-teal-500 hover:border-teal-400"
                  }`}
                >
                  {e}
                </div>
              );
            })}
          {editRoles && (
            <>
              {[...new Set([...availableRoles, ...roles])].map((e, i) => {
                return (
                  <ManageRoles
                    key={i}
                    e={e}
                    handleClick={handleClick}
                    updatedRoles={updatedRoles}
                  />
                  // <div
                  //   key={i}
                  //   className={`text-xs font-medium border-2 rounded-2xl px-2 cursor-pointer transition-all ${
                  //     e === "Employee" && roles.includes("Employee")
                  //       ? "bg-blue-900 border-blue-500 hover:border-blue-400"
                  //       : e === "Admin" && roles.includes("Admin")
                  //       ? "bg-red-900 border-red-500 hover:border-red-400"
                  //       : e === "Manager" && roles.includes("Manager")
                  //       ? "bg-orange-900 border-orange-500 hover:border-orange-400"
                  //       : !roles.includes(e)
                  //       ? "bg-gray-900 border-gray-500 hover:border-gray-400"
                  //       : "bg-teal-900 border-teal-500 hover:border-teal-400"
                  //   }`}
                  //   onClick={() => {
                  //     console.log(newRoles);
                  //     console.log(e);
                  //     if (newRoles.includes(e)) {
                  //       console.log(newRoles.filter((role) => role !== e));
                  //     } else {
                  //       newRoles.push(e);
                  //       console.log(newRoles);
                  //     }
                  //   }}
                  // >
                  //   {e}
                  // </div>
                );
              })}
              <div className="w-full">
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="off"
                  placeholder="Custom Role"
                  required
                  className={`rounded-3xl bg-black outline-none ring-1 text-xs font-medium w-28 h-5 hover:cursor-pointer hover:ring-blue-500 text-center`}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </>
          )}
        </div>
      </div>
      <div className="text-start mr-auto group/active">
        <div className="flex flex-row gap-2 text-sm text-slate-500">
          <div className="group-hover/active:text-slate-300 transition">Status</div>
          <div className="transition">
            {roles.includes("Admin") ? (
              ""
            ) : (
              <>
                {active && (
                  <FontAwesomeIcon
                    icon={faToggleOn}
                    className="align-middle hover:cursor-pointer transition hover:text-green-600"
                    onClick={() => {
                      updateStatus(id, false);
                    }}
                  />
                )}
                {!active ? (
                  <FontAwesomeIcon
                    icon={faToggleOff}
                    className="align-middle hover:cursor-pointer hover:text-yellow-500 transition"
                    onClick={() => {
                      updateStatus(id, true);
                    }}
                  />
                ) : (
                  ""
                )}
              </>
            )}
          </div>
        </div>

        <div className="flex gap-2 flex-wrap p-2">
          <div
            className={`text-xs font-medium border-2 rounded-2xl px-2 cursor-default transition-all animate-fadeIn ${
              active
                ? "bg-green-900 border-green-500 hover:border-green-400"
                : !active
                ? "bg-yellow-800 border-yellow-500 hover:border-yellow-400"
                : ""
            }`}
          >
            {active ? "Active" : "Inactive"}
          </div>
        </div>
      </div>
      <div className="text-start group/created">
        <div className="text-sm text-slate-500 group-hover/created:text-slate-300 transition">
          Created
        </div>
        <div className="font-bold animate-fadeIn">{moment(createdAt).format("LLL")}</div>
      </div>
    </div>
  );
};

export default AdminUsersCard;
