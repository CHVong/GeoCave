import React from "react";
import moment from "moment";

const AdminUsersCard = ({ id, username, roles, active, createdAt, updatedAt }) => {
  return (
    <div className="border-b border-slate-700 px-10 grid sm:grid-cols-4 ">
      <div className="text-start group/username">
        <div className="text-sm text-slate-500 group-hover/username:text-slate-300">Username</div>
        <div className="text-lg font-bold">{username}</div>
      </div>
      <div className="text-start mr-auto group/roles">
        <div className="text-sm text-slate-500 group-hover/roles:text-slate-300">Roles</div>
        <div className="flex gap-2 flex-wrap p-2">
          {roles.map((e, i) => {
            return (
              <div
                className={`text-xs font-bold border-2 rounded-2xl px-2 cursor-pointer transition-all ${
                  e === "Employee"
                    ? "bg-blue-900 border-blue-500 hover:border-blue-400"
                    : e === "Admin"
                    ? "bg-red-900 border-red-500 hover:border-red-400"
                    : ""
                }`}
              >
                {e}
              </div>
            );
          })}
        </div>
      </div>
      <div className="text-start mr-auto group/active">
        <div className="text-sm text-slate-500 group-hover/active:text-slate-300">Status</div>
        <div className="flex gap-2 flex-wrap p-2">
          <div
            className={`text-xs font-bold border-2 rounded-2xl px-2 cursor-pointer transition-all ${
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
        <div className="text-sm text-slate-500 group-hover/created:text-slate-300">Created</div>
        <div className="font-bold">{moment(createdAt).format("LLL")}</div>
      </div>
    </div>
  );
};

export default AdminUsersCard;
