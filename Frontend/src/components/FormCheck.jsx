import { useState } from "react";
import {
  faInfoCircle,
  faUpRightFromSquare,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FormCheck = ({ id, title }) => {
  const [showInfo, setShowInfo] = useState(false);

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };
  return (
    <div className="text-left animate-fadeIn flex flex-row items-center gap-2 md:gap-4 m-2">
      <input
        type="checkbox"
        id={id}
        className="focus:ring-0 focus:ring-offset-0 rounded-full w-6 h-6 checked:text-green-700 peer transition bg-gray-800 cursor-pointer border-2"
      />
      <label
        htmlFor={id}
        className="p-1 peer-checked:text-gray-500 peer-checked:line-through peer-checked:decoration-green-700 transition cursor-pointer w-full hover:opacity-80"
      >
        {title}
      </label>
      <div className="relative">
        <FontAwesomeIcon
          icon={showInfo ? faCircleXmark : faInfoCircle}
          className={`cursor-pointer hover:opacity-80 ${showInfo ? "text-yellow-400" : ""}`}
          onClick={toggleInfo}
        />
        <div
          className={`animate-fadeIn absolute right-full bottom-full border-blue-400 border rounded-md bg-gray-600 ${
            showInfo ? "absolute" : "hidden"
          }`}
        >
          SHOWING PICTURES
        </div>
      </div>

      <FontAwesomeIcon icon={faUpRightFromSquare} className="cursor-pointer hover:opacity-80" />
    </div>
  );
};

export default FormCheck;
