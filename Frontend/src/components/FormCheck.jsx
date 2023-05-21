import { useState } from "react";
import {
  faInfoCircle,
  faUpRightFromSquare,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FormCheck = ({ id, title, imgUrl, link }) => {
  const [showInfo, setShowInfo] = useState(false);

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  const handleClick = () => {
    if (link) {
      window.open(link, "_blank");
    }
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
        {showInfo ? (
          <FontAwesomeIcon
            icon={faCircleXmark}
            className={`cursor-pointer hover:opacity-80 text-yellow-400`}
            onClick={toggleInfo}
          />
        ) : (
          <FontAwesomeIcon
            icon={faInfoCircle}
            className={`cursor-pointer hover:opacity-80 ${
              imgUrl ? "hover:text-green-400" : "hover:text-red-400"
            }`}
            onClick={toggleInfo}
          />
        )}
        <div
          className={`animate-fadeIn absolute right-full bottom-full border-blue-500 border-2 rounded-md  w-40 ${
            showInfo ? "absolute" : "hidden"
          }`}
        >
          {imgUrl ? (
            <img src={imgUrl} alt={`Image of ${title}`} className="rounded" />
          ) : (
            <p className="text-center">Pictures Currently Unavailable</p>
          )}
        </div>
      </div>

      <FontAwesomeIcon
        icon={faUpRightFromSquare}
        className={`cursor-pointer hover:opacity-80 ${
          link ? "hover:text-green-400" : "hover:text-red-400"
        }`}
        onClick={handleClick}
      />
    </div>
  );
};

export default FormCheck;
