import { useEffect } from "react";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";

const RecentSafetyIncident = ({ data }) => {
  const createdAtMoment = moment(data[0]?.createdAt);

  return (
    <div className="lg:w-1/2 m-auto">
      <h1 className="p-8 text-2xl underline">Latest Reported Safety Incident</h1>
      {data && data.length > 0 ? (
        <div className="text-left border-2 border-primary p-4 lg:p-8 rounded-md relative">
          <div className="grid grid-cols-2 pb-6">
            <h2 className="text-lg text-slate-300">
              Project Name: <span className="text-base text-slate-400">{data[0].projectName}</span>
            </h2>
            <h2 className="row-span-2 text-end text-lg text-slate-300">
              Hazards{" "}
              <div className="bg-gradient-to-l from-slate-800 rounded-lg">
                {data[0].hazards.length > 0
                  ? data[0].hazards.map((e, index) => (
                      <span
                        key={index}
                        className={`p-1 rounded-md inline-block text-base ${
                          e === "Biological"
                            ? "text-green-600"
                            : e === "Chemical"
                            ? "text-red-600"
                            : e === "Electrical"
                            ? "text-yellow-600"
                            : e === "Mechanical"
                            ? "text-blue-600"
                            : e === "Physical"
                            ? "text-slate-900"
                            : ""
                        }`}
                      >
                        {e}
                        {/* <span className="text-secondary"> | </span> */}
                      </span>
                    ))
                  : "No reported hazard tags"}
              </div>
            </h2>
            <h2 className="text-lg text-slate-300">
              Project Number:{" "}
              <span className="text-base text-slate-400">{data[0].projectNumber}</span>
            </h2>
          </div>

          <h2 className="pb-6 text-xl text-slate-400">
            Incident Description:{" "}
            <span className="text-base text-slate-500">{data[0].description}</span>
          </h2>
          <h2 className="pb-6 text-xl text-slate-400">
            Suggestive Action:{" "}
            <span className="text-base text-slate-500">{data[0].suggestiveAction}</span>
          </h2>

          <div className="relative group w-full lg:w-80 m-auto">
            <img
              src={`${
                data[0].image ||
                "https://res.cloudinary.com/dq9umvpmv/image/upload/v1681857805/PictureNotAvailable_qj29ng.png"
              }`}
              alt={`Image of ${data[0].projectName}`}
              className=" object-scale-down group-hover:scale-95 cursor-pointer border-primary transition p-2 rounded-xl"
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

          <div className="text-xs text-slate-500 absolute bottom-0 right-0 p-2">
            {/* Show the relative time */}
            Submitted{" "}
            <span className="text-slate-400 italic">
              {moment(data[0]?.createdAt).fromNow()}
            </span> by <span className="text-slate-400 font-bold">{data[0].createdByUser}</span>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RecentSafetyIncident;
