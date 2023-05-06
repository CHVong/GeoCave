import { useEffect } from "react";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RecentSafetyIncident = ({ data }) => {
  return (
    <div>
      <h2>Latest Reported Safety Incident</h2>
      {data && data.length > 0 ? (
        <div>
          <h2>Project Name: {data[0].projectName}</h2>
          <h2>Project Number: {data[0].projectNumber}</h2>
          <h2>Incident Description: {data[0].description}</h2>
          <h2>Suggestive Action: {data[0].suggestiveAction}</h2>
          <h2>Hazards: {data[0].hazards.join(", ")}</h2>
          <div className="relative group w-80">
            <img
              src={`${
                data[0].image ||
                "https://res.cloudinary.com/dq9umvpmv/image/upload/v1681857805/PictureNotAvailable_qj29ng.png"
              }`}
              alt={`Image of ${data[0].projectName}`}
              className=" object-scale-down group-hover:scale-95 cursor-pointer border-primary transition p-2"
              onClick={() =>
                window.open(
                  data[0].image ||
                    "https://res.cloudinary.com/dq9umvpmv/image/upload/v1681857805/PictureNotAvailable_qj29ng.png",
                  "_blank"
                )
              }
            />
            <div
              className="absolute inset-0 bg-gray-800 opacity-0 hover:opacity-50 transition duration-300 flex items-center justify-center group-hover:scale-95 cursor-pointer"
              onClick={() =>
                window.open(
                  data[0].image ||
                    "https://res.cloudinary.com/dq9umvpmv/image/upload/v1681857805/PictureNotAvailable_qj29ng.png",
                  "_blank"
                )
              }
            >
              <FontAwesomeIcon icon={faUpRightFromSquare} size="xl" />
            </div>
          </div>
        </div>
      ) : (
        <p>No safety incident found</p>
      )}
    </div>
  );
};

export default RecentSafetyIncident;
