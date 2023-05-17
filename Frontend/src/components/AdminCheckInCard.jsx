import { useEffect, useState } from "react";
import {
  faUpRightFromSquare,
  faXmark,
  faCheck,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";

const AdminCheckInCard = ({
  id,
  user,
  currentWorkload,
  happyHours,
  hoursLastWeek,
  hoursThisWeek,
  needBreak,
  summary,
  weeksOutForFieldWorkNonLocal,
  createdAt,
  deleteItem,
}) => {
  const createdAtMoment = moment(createdAt);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  return (
    <div className="lg:w-1/2 m-auto animate-fadeIn">
      <div className="text-left border-2 border-primary p-4 lg:p-8 rounded-md relative">
        <div className="flex justify-end flex-row gap-2 pb-2">
          {showConfirmDelete ? (
            <>
              <FontAwesomeIcon
                icon={faXmark}
                className="hover:text-gray-500 cursor-pointer hover:scale-90 transition"
                onClick={() => {
                  setShowConfirmDelete(false);
                }}
              />
              <FontAwesomeIcon
                icon={faCheck}
                className="hover:text-green-500 cursor-pointer hover:scale-90 transition"
                onClick={() => {
                  deleteItem(id);
                }}
              />
            </>
          ) : (
            <FontAwesomeIcon
              icon={faTrashCan}
              className="hover:text-red-500 cursor-pointer hover:scale-90 transition"
              onClick={() => {
                setShowConfirmDelete(true);
              }}
            />
          )}
        </div>
        <h2 className="text-lg text-slate-300">
          Weeks Away:{" "}
          <span
            className={`text-base ${
              weeksOutForFieldWorkNonLocal === "3 Weeks"
                ? "text-orange-400"
                : weeksOutForFieldWorkNonLocal === "4+ Weeks"
                ? "text-red-400"
                : "text-green-400"
            }`}
          >
            {weeksOutForFieldWorkNonLocal}
          </span>
        </h2>
        <h2 className="text-lg text-slate-300">
          Hours Last Week:{" "}
          <span
            className={`text-base ${
              hoursLastWeek === "41 to 45" || hoursLastWeek === "46 to 50"
                ? "text-orange-400"
                : hoursLastWeek === "51 to 55" || hoursLastWeek === "56+"
                ? "text-red-400"
                : "text-green-400"
            }`}
          >
            {hoursLastWeek}
          </span>
        </h2>

        <h2 className="text-lg text-slate-300">
          Hours This Week:{" "}
          <span
            className={`text-base ${
              hoursThisWeek === "41 to 45" || hoursThisWeek === "46 to 50"
                ? "text-orange-400"
                : hoursThisWeek === "51 to 55" || hoursThisWeek === "56+"
                ? "text-red-400"
                : "text-green-400"
            }`}
          >
            {hoursThisWeek}
          </span>
        </h2>

        <h2 className="text-lg text-slate-300">
          Happy With Current Hours: <span className="text-base text-slate-400">{happyHours}</span>
        </h2>
        <h2 className="text-lg text-slate-300">
          Need a Break: <span className="text-base text-slate-400">{needBreak}</span>
        </h2>

        <div className="pt-4">
          <h2 className="pb-2 text-xl text-slate-400">
            Current Workload:
            <span className="text-base text-slate-500"> {currentWorkload}</span>
          </h2>
          <h2 className="pb-2 text-xl text-slate-400">
            Issues, suggestions, and comments:
            <span className="text-base text-slate-500"> {summary}</span>
          </h2>
        </div>
        <div className="text-xs text-slate-500 absolute bottom-0 right-0 p-2">
          {/* Show the relative time */}
          Submitted <span className="text-slate-400 italic">
            {moment(createdAt).fromNow()}
          </span> by <span className="text-slate-400 font-bold">{user}</span>
        </div>
      </div>
    </div>
  );
};

export default AdminCheckInCard;
