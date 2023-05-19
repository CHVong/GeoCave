import { useState } from "react";
import moment from "moment";
import {
  faPenToSquare,
  faFloppyDisk,
  faCheck,
  faXmark,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const availableRoles = ["Employee", "Manager", "Admin"];

const AdminUsersCard = ({ id, username, roles, active, createdAt, updatedAt, addRole }) => {
  const [editRoles, setEditRoles] = useState(false);

  const handleKeyDown = (e) => {
    if (e.target.value === "") {
      return;
    }
    if (e.keyCode === 13) {
      addRole(id, e.target.value);
      e.target.value = "";
    }
  };
  return (
    <div className="border-b border-slate-700 px-10 grid sm:grid-cols-4 ">
      <div className="text-start group/username">
        <div className="text-sm text-slate-500 group-hover/username:text-slate-300 transition">
          Username
        </div>
        <div className="text-lg font-bold">{username}</div>
      </div>
      <div className="text-start mr-auto group/roles">
        <div className="flex gap-2 items-center text-sm text-slate-500">
          <div className="group-hover/roles:text-slate-300 transition">Roles</div>
          <div>
            {roles.includes("Admin") ? (
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
                    icon={faRotateLeft}
                    className="hover:scale-90 hover:cursor-pointer transition hover:text-green-600"
                    onClick={() => setEditRoles(false)}
                  />
                ) : (
                  ""
                )}
              </>
            )}
          </div>
        </div>

        <div className="flex gap-2 flex-wrap items-center p-2">
          {!editRoles &&
            roles.map((e, i) => {
              return (
                <div
                  key={i}
                  className={`text-xs font-medium border-2 rounded-2xl px-2 cursor-pointer transition-all ${
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
                  <div
                    key={i}
                    className={`text-xs font-medium border-2 rounded-2xl px-2 cursor-pointer transition-all ${
                      e === "Employee" && roles.includes("Employee")
                        ? "bg-blue-900 border-blue-500 hover:border-blue-400"
                        : e === "Admin" && roles.includes("Admin")
                        ? "bg-red-900 border-red-500 hover:border-red-400"
                        : e === "Manager" && roles.includes("Manager")
                        ? "bg-orange-900 border-orange-500 hover:border-orange-400"
                        : !roles.includes(e)
                        ? "bg-gray-900 border-gray-500 hover:border-gray-400"
                        : "bg-teal-900 border-teal-500 hover:border-teal-400"
                    }`}
                  >
                    {e}
                  </div>
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
        <div className="text-sm text-slate-500 group-hover/active:text-slate-300 transition">
          Status
        </div>
        <div className="flex gap-2 flex-wrap p-2">
          <div
            className={`text-xs font-medium border-2 rounded-2xl px-2 cursor-pointer transition-all ${
              active
                ? "bg-green-900 border-green-500 hover:border-green-400"
                : active
                ? "bg-red-900 border-red-500 hover:border-red-400"
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
        <div className="font-bold">{moment(createdAt).format("LLL")}</div>
      </div>
    </div>
  );
};

export default AdminUsersCard;