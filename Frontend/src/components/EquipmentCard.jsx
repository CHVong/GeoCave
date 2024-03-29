import { useState } from "react";
import {
  faUpRightFromSquare,
  faPenToSquare,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EquipmentCard = ({
  job,
  stock,
  name,
  image,
  vendor,
  description,
  createdByUser,
  location,
  id,
  updateStock,
  cloudinaryId,
}) => {
  const [editStock, setEditStock] = useState(false);
  const [stockNumber, setStockNumber] = useState(stock);
  const [expandName, setExpandName] = useState(false);

  return (
    <div className="border-4 border-primary rounded-md grid  transition-all hover:border-tertiary gap-2 animate-fadeIn break-all">
      <div className="flex flex-col justify-stretch items-center">
        <h2
          className="text-2xl font-bold bg-slate-800 w-full p-1 flex items-center justify-center"
          onMouseEnter={() => setExpandName(true)}
          onMouseLeave={() => setExpandName(false)}
        >
          <div className="flex items-center flex-wrap text-start">
            <span className={`animate-fadeIn flex-1 ${expandName ? "text-wrap" : "text-ellipsis"}`}>
              {expandName ? name : name && name.length > 15 ? `${name.substring(0, 15)}...` : name}
            </span>
          </div>
        </h2>
        <div className="flex justify-around items-center w-full h-full">
          <div className="text-left p-4  h-full w-[50%]">
            <h2>
              <span className="text-tertiary">Stock: </span>
              {editStock ? (
                <>
                  <input
                    type="number"
                    name="stock"
                    id="stock"
                    autoComplete="off"
                    placeholder={stock}
                    required
                    className={`rounded px-2 py-0 bg-black outline-none ring-1 w-16 animate-fadeIn`}
                    onChange={(e) => {
                      setStockNumber(e.target.value);
                    }}
                  />
                  <div
                    className="inline p-2 cursor-pointer"
                    onClick={(e) => {
                      setEditStock(!editStock);
                      updateStock(e, id, stockNumber);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faFloppyDisk}
                      className="animate-fadeIn text-green-500 hover:scale-95 transition hover:text-green-600"
                    />
                  </div>
                </>
              ) : (
                <>
                  <span className="animate-fadeIn">{stock}</span>
                  <div
                    className="inline p-2 cursor-pointer animate-fadeIn"
                    onClick={(e) => setEditStock(!editStock)}
                  >
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      className="hover:scale-95 hover:text-gray-500 transition"
                    />
                  </div>
                </>
              )}
            </h2>
            <h2>
              <span className="text-tertiary">Vendor:</span> {vendor}
            </h2>
            <h2>
              <span className="text-tertiary">Location:</span> {location}
            </h2>
          </div>
          <div className="h-full w-[50%]">
            {image ? (
              <div className="relative group ">
                <img
                  src={`https://res.cloudinary.com/dq9umvpmv/image/upload/q_10/${cloudinaryId}`}
                  alt={`Image of ${name}`}
                  className="w-56 h-40 object-scale-down group-hover:scale-95 cursor-pointer border-primary transition p-2 inline"
                  onClick={() => window.open(image, "_blank")}
                />
                <div
                  className="absolute inset-0 bg-gray-800 opacity-0 hover:opacity-50 transition duration-300 flex items-center justify-center group-hover:scale-95 cursor-pointer"
                  onClick={() => window.open(image, "_blank")}
                >
                  <FontAwesomeIcon icon={faUpRightFromSquare} size="xl" />
                </div>
              </div>
            ) : (
              <div className="relative group ">
                <img
                  src={`https://res.cloudinary.com/dq9umvpmv/image/upload/q_50/v1681857805/PictureNotAvailable_qj29ng.png`}
                  alt={`Placeholder image`}
                  className="w-56 h-40 object-scale-down group-hover:scale-95 cursor-pointer border-primary transition p-2"
                  onClick={() =>
                    window.open(
                      "https://res.cloudinary.com/dq9umvpmv/image/upload/v1681857805/PictureNotAvailable_qj29ng.png",
                      "_blank"
                    )
                  }
                />
                <div
                  className="absolute inset-0 bg-gray-800 opacity-0 hover:opacity-50 transition duration-300 flex items-center justify-center group-hover:scale-95 cursor-pointer"
                  onClick={() =>
                    window.open(
                      "https://res.cloudinary.com/dq9umvpmv/image/upload/v1681857805/PictureNotAvailable_qj29ng.png",
                      "_blank"
                    )
                  }
                >
                  <FontAwesomeIcon icon={faUpRightFromSquare} size="xl" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="text-left p-2 text-gray-400 text-sm h-full">
        <h3>
          <span className="text-lg underline underline-offset-4">Jobs:</span> {job.join(", ")}
        </h3>
        <h3>
          <span className="text-lg underline underline-offset-4">Description:</span> {description}
        </h3>
        <h6 className="italic">Created by: {createdByUser}</h6>
      </div>
    </div>
  );
};

export default EquipmentCard;
