import { useEffect } from "react";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RecentSafetyIncident = ({ data }) => {
  return (
    <div className="w-1/2 m-auto">
      <h1 className="p-4 text-2xl underline">Latest Reported Safety Incident</h1>
      {data && data.length > 0 ? (
        <div className="text-left border-2 p-8 rounded-md">
          <div className="grid grid-cols-2">
            <h2>Project Name: {data[0].projectName}</h2>
            <h2 className="cols-span-2 text-end">
              Hazards:{" "}
              {data[0].hazards.length > 0 ? data[0].hazards.join(", ") : "No reported hazard tags"}
            </h2>
            <h2>Project Number: {data[0].projectNumber}</h2>
          </div>

          <h2>Incident Description: {data[0].description}</h2>
          <h2>Suggestive Action: {data[0].suggestiveAction}</h2>

          <div className="relative group w-80 m-auto">
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
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RecentSafetyIncident;
