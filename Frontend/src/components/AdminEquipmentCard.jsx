import { useState } from "react";
import {
  faUpRightFromSquare,
  faPenToSquare,
  faFloppyDisk,
  faFileArrowUp,
  faTrashCan,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CheckboxForEditEquipment from "./CheckboxForEditEquipment";

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
  updatePicture,
  deleteItem,
}) => {
  const [editStock, setEditStock] = useState(false);
  const [editVendor, setEditVendor] = useState(false);
  const [editLocation, setEditLocation] = useState(false);
  const [editJobs, setEditJobs] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [editName, setEditName] = useState(false);

  const [stockNumber, setStockNumber] = useState(stock);
  const [vendorText, setVendorText] = useState(vendor);
  const [locationText, setLocationText] = useState(location);
  const [descriptionText, setDescriptionText] = useState(description);
  const [nameText, setNameText] = useState(name);

  const [checkedJobs, setCheckedJobs] = useState([]);
  const [expandName, setExpandName] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleCheckboxChange = (e) => {
    const { value } = e.target;
    if (e.target.checked) {
      setCheckedJobs([...checkedJobs, value]);
    } else {
      setCheckedJobs(checkedJobs.filter((job) => job !== value));
    }
  };

  const handleFileUpload = async (e, id) => {
    const inputElement = document.getElementById("imgUpload");

    // Clear the value of the file input element
    inputElement.value = null;

    // Open the file selection dialog
    inputElement.click();

    // Wait for the user to select a file
    await new Promise((resolve) => {
      inputElement.addEventListener("change", resolve, { once: true });
    });

    // Access the selected file
    const file = inputElement.files[0];
    if (file) {
      updatePicture(e, id, file);
    }
  };

  return (
    <div className="border-4 border-primary rounded-md grid  transition-all hover:border-tertiary gap-2 animate-fadeIn">
      <div className="flex flex-col justify-stretch items-center">
        <h2
          className="text-2xl font-bold bg-slate-800 w-full p-1 flex items-center justify-between"
          onMouseEnter={() => setExpandName(true)}
          onMouseLeave={() => setExpandName(false)}
        >
          {editName ? (
            <div className="flex items-center flex-wrap">
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="off"
                placeholder={name}
                required
                className={`rounded px-2 py-0 bg-black outline-none ring-1 w-max animate-fadeIn mt-1`}
                onChange={(e) => {
                  setNameText(e.target.value);
                }}
              />
              <div
                className="inline p-2 cursor-pointer"
                onClick={(e) => {
                  setEditName(!editName);
                  updateItem(e, id, "name", nameText, "/equipment");
                }}
              >
                <FontAwesomeIcon
                  icon={faFloppyDisk}
                  className="animate-fadeIn text-green-500 hover:scale-95 transition hover:text-green-600"
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center flex-wrap text-start">
              <span
                className={`animate-fadeIn flex-1 break-all ${
                  expandName ? "text-wrap" : "text-ellipsis"
                }`}
              >
                {expandName ? name : name.length > 15 ? `${name.substring(0, 15)}...` : name}
              </span>
              <div
                className="inline p-2 cursor-pointer animate-fadeIn"
                onClick={(e) => setEditName(!editName)}
              >
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  className="hover:scale-95 hover:text-gray-500 transition"
                />
              </div>
            </div>
          )}
          <div className="flex flex-row gap-2">
            {showConfirmDelete ? (
              <>
                <FontAwesomeIcon
                  icon={faXmark}
                  size="sm"
                  className="hover:text-gray-500 cursor-pointer hover:scale-90 transition"
                  onClick={() => {
                    setShowConfirmDelete(false);
                  }}
                />
                <FontAwesomeIcon
                  icon={faCheck}
                  size="sm"
                  className="hover:text-green-500 cursor-pointer hover:scale-90 transition"
                  onClick={() => {
                    deleteItem(id);
                  }}
                />
              </>
            ) : (
              <FontAwesomeIcon
                icon={faTrashCan}
                size="sm"
                className="hover:text-red-500 cursor-pointer hover:scale-90 transition"
                onClick={() => {
                  setShowConfirmDelete(true);
                }}
              />
            )}
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
                  {" "}
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
                  <input
                    type="text"
                    name="stock"
                    id="stock"
                    autoComplete="off"
                    placeholder={vendor}
                    required
                    className={`rounded px-2 py-0 bg-black outline-none ring-1 w-full animate-fadeIn mt-1`}
                    onChange={(e) => {
                      setVendorText(e.target.value);
                    }}
                  />
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
                  <input
                    type="text"
                    name="stock"
                    id="stock"
                    autoComplete="off"
                    placeholder={location}
                    required
                    className={`rounded px-2 py-0 bg-black outline-none ring-1 w-full animate-fadeIn mt-1`}
                    onChange={(e) => {
                      setLocationText(e.target.value);
                    }}
                  />
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
            <div className="flex gap-6 justify-end pr-4">
              <label htmlFor="imgUpload" className="font-bold p-2"></label>
              <input
                name="imgUpload"
                id="imgUpload"
                type="file"
                accept=".jpg, .JPG, .jpeg, .JPEG, .png, .PNG,"
                className="hidden" // hide the input element
              />
              <FontAwesomeIcon
                icon={faFileArrowUp}
                className="hover:scale-95 hover:text-sky-500 transition cursor-pointer"
                onClick={(e) => handleFileUpload(e, id)} // trigger file upload on click
              />
              {/* <FontAwesomeIcon
                icon={faFileArrowUp}
                className="hover:scale-95 hover:text-sky-500 transition cursor-pointer"
              /> */}
              {/* <FontAwesomeIcon
                icon={faTrashCan}
                className="hover:scale-95 hover:text-red-500 transition cursor-pointer"
              /> */}
            </div>
          </div>
        </div>
      </div>
      <div className="text-left p-2 text-gray-400 text-sm h-full">
        <h2>
          <span className="text-lg underline underline-offset-4 ">Jobs:</span>
          {editJobs ? (
            <>
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
              <div className=" grid grid-cols-2 mt-1">
                <CheckboxForEditEquipment
                  name={"Drilling"}
                  checked={checkedJobs.includes("Drilling")}
                  handleCheckboxChange={handleCheckboxChange}
                  id={id}
                />

                <CheckboxForEditEquipment
                  name={"Percolation Test"}
                  checked={checkedJobs.includes("Percolation Test")}
                  handleCheckboxChange={handleCheckboxChange}
                  id={id}
                />
                <CheckboxForEditEquipment
                  name={"Infiltration Test"}
                  checked={checkedJobs.includes("Infiltration Test")}
                  handleCheckboxChange={handleCheckboxChange}
                  id={id}
                />
                <CheckboxForEditEquipment
                  name={"Pile Test"}
                  checked={checkedJobs.includes("Pile Test")}
                  handleCheckboxChange={handleCheckboxChange}
                  id={id}
                />
                <CheckboxForEditEquipment
                  name={"USA Marking"}
                  checked={checkedJobs.includes("USA Marking")}
                  handleCheckboxChange={handleCheckboxChange}
                  id={id}
                />
                <CheckboxForEditEquipment
                  name={"Electrical Resistivity Test"}
                  checked={checkedJobs.includes("Electrical Resistivity Test")}
                  handleCheckboxChange={handleCheckboxChange}
                  id={id}
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
              <input
                type="text"
                name="stock"
                id="stock"
                autoComplete="off"
                placeholder={description}
                required
                className={`rounded px-2 py-0 bg-black outline-none ring-1 w-full animate-fadeIn mt-1`}
                onChange={(e) => {
                  setDescriptionText(e.target.value);
                }}
              />
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
