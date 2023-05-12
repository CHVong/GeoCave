import { useState } from "react";
import {
  faUpRightFromSquare,
  faPenToSquare,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CheckboxForAddEquipment from "./CheckboxForAddEquipment";

const AdminEquipmentCard = ({
  job,
  stock,
  name,
  image,
  vendor,
  description,
  createdByUser,
  location,
  id,
  updateItem,
}) => {
  const [editStock, setEditStock] = useState(false);
  const [editVendor, setEditVendor] = useState(false);
  const [editLocation, setEditLocation] = useState(false);
  const [editJobs, setEditJobs] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [editImage, setEditImage] = useState(false);

  const [stockNumber, setStockNumber] = useState(stock);
  const [vendorText, setVendorText] = useState(vendor);
  const [locationText, setLocationText] = useState(location);
  const [jobsArray, setJobsArray] = useState(job);
  const [descriptionText, setDescriptionText] = useState(description);
  const [imagePicture, setImagePicture] = useState(image);

  const [checkedJobs, setCheckedJobs] = useState([]);

  const handleCheckboxChange = (e) => {
    const { value } = e.target;
    if (e.target.checked) {
      setCheckedJobs([...checkedJobs, value]);
    } else {
      setCheckedJobs(checkedJobs.filter((job) => job !== value));
    }
  };

  return (
    <div className="border-4 border-primary rounded-md grid  transition-all hover:border-tertiary gap-2 animate-fadeIn">
      <div className="flex flex-col justify-stretch items-center">
        <h2 className="text-2xl font-bold bg-slate-800 w-full p-1">{name}</h2>
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
                      updateItem(e, id, "stock", stockNumber, "/equipment");
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
              <span className="text-tertiary">Vendor: </span>
              {editVendor ? (
                <>
                  <input
                    type="text"
                    name="stock"
                    id="stock"
                    autoComplete="off"
                    placeholder={vendor}
                    required
                    className={`rounded px-2 py-0 bg-black outline-none ring-1 w-full animate-fadeIn`}
                    onChange={(e) => {
                      setVendorText(e.target.value);
                    }}
                  />
                  <div
                    className="inline p-2 cursor-pointer"
                    onClick={(e) => {
                      setEditVendor(!editVendor);
                      updateItem(e, id, "vendor", vendorText, "/equipment");
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
                  <span className="animate-fadeIn">{vendor}</span>
                  <div
                    className="inline p-2 cursor-pointer animate-fadeIn"
                    onClick={(e) => setEditVendor(!editVendor)}
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
              <span className="text-tertiary">Location: </span>
              {editLocation ? (
                <>
                  <input
                    type="text"
                    name="stock"
                    id="stock"
                    autoComplete="off"
                    placeholder={location}
                    required
                    className={`rounded px-2 py-0 bg-black outline-none ring-1 w-full animate-fadeIn`}
                    onChange={(e) => {
                      setLocationText(e.target.value);
                    }}
                  />
                  <div
                    className="inline p-2 cursor-pointer"
                    onClick={(e) => {
                      setEditLocation(!editLocation);
                      updateItem(e, id, "location", locationText, "/equipment");
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
                  <span className="animate-fadeIn">{location}</span>
                  <div
                    className="inline p-2 cursor-pointer animate-fadeIn"
                    onClick={(e) => setEditLocation(!editLocation)}
                  >
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      className="hover:scale-95 hover:text-gray-500 transition"
                    />
                  </div>
                </>
              )}
            </h2>
          </div>
          <div className="h-full w-[50%]">
            {image ? (
              <div className="relative group ">
                <img
                  src={`${image}`}
                  alt={`Image of ${name}`}
                  className="w-56 h-40 object-scale-down group-hover:scale-95 cursor-pointer border-primary transition p-2"
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
                  src={`https://res.cloudinary.com/dq9umvpmv/image/upload/v1681857805/PictureNotAvailable_qj29ng.png`}
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
        <h2>
          <span className="text-lg underline underline-offset-4 ">Jobs:</span>
          {editJobs ? (
            <>
              <CheckboxForAddEquipment
                name={"Drilling"}
                checked={checkedJobs.includes("Drilling")}
                handleCheckboxChange={handleCheckboxChange}
                id={id}
              />
              <CheckboxForAddEquipment
                name={"Electrical Resistivity Test"}
                checked={checkedJobs.includes("Electrical Resistivity Test")}
                handleCheckboxChange={handleCheckboxChange}
                id={id}
              />
              <CheckboxForAddEquipment
                name={"Percolation Test"}
                checked={checkedJobs.includes("Percolation Test")}
                handleCheckboxChange={handleCheckboxChange}
                id={id}
              />
              <CheckboxForAddEquipment
                name={"Infiltration Test"}
                checked={checkedJobs.includes("Infiltration Test")}
                handleCheckboxChange={handleCheckboxChange}
                id={id}
              />
              <CheckboxForAddEquipment
                name={"Pile Test"}
                checked={checkedJobs.includes("Pile Test")}
                handleCheckboxChange={handleCheckboxChange}
                id={id}
              />
              <CheckboxForAddEquipment
                name={"USA Marking"}
                checked={checkedJobs.includes("USA Marking")}
                handleCheckboxChange={handleCheckboxChange}
                id={id}
              />
              <div
                className="inline p-2 cursor-pointer"
                onClick={(e) => {
                  setEditJobs(!editJobs);
                  updateItem(e, id, "job", checkedJobs, "/equipment");
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
              <span className="animate-fadeIn"> {job.join(", ")}</span>
              <div
                className="inline p-2 cursor-pointer animate-fadeIn"
                onClick={(e) => setEditJobs(!editJobs)}
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
          <span className="text-lg underline underline-offset-4 ">Description:</span>
          {editDescription ? (
            <>
              <input
                type="text"
                name="stock"
                id="stock"
                autoComplete="off"
                placeholder={description}
                required
                className={`rounded px-2 py-0 bg-black outline-none ring-1 w-full animate-fadeIn`}
                onChange={(e) => {
                  setDescriptionText(e.target.value);
                }}
              />
              <div
                className="inline p-2 cursor-pointer"
                onClick={(e) => {
                  setEditDescription(!editDescription);
                  updateItem(e, id, "description", descriptionText, "/equipment");
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
              <span className="animate-fadeIn"> {description}</span>
              <div
                className="inline p-2 cursor-pointer animate-fadeIn"
                onClick={(e) => setEditDescription(!editDescription)}
              >
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  className="hover:scale-95 hover:text-gray-500 transition"
                />
              </div>
            </>
          )}
        </h2>
        <h6 className="italic">Created by: {createdByUser}</h6>
      </div>
    </div>
  );
};

export default AdminEquipmentCard;