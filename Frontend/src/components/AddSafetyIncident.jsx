import { useState } from "react";
import CheckboxForAddEquipment from "./CheckboxForAddEquipment";
import SubmitButton from "./SubmitButton";
import jwt_decode from "jwt-decode";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import UploadProgressBar from "./UploadProgressBar";

const EQUIPMENT_URL = "/#";

const AddSafetyIncident = ({ fetch }) => {
  const [checkedJobs, setCheckedJobs] = useState([]);
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const { auth } = useAuth();
  const decoded = auth?.accessToken ? jwt_decode(auth.accessToken) : undefined;
  const username = decoded?.UserInfo.username || [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);
    // console.log(payload.imgUpload);

    payload.user = username;
    payload.job = checkedJobs;

    try {
      const response = await axios.post(EQUIPMENT_URL, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${auth.accessToken}`,
        },
        onUploadProgress: (progressEvent) => {
          setUploadPercentage(
            parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total))
          );
          setTimeout(() => {
            setUploadPercentage(0);
          }, 10000);
        },

        withCredentials: true,
      });
      fetch();
      console.log(response);
    } catch (err) {
      if (!err?.response) {
        // setErrMsg("No Server Response");
      } else {
        console.log(err.response.data);
        // setErrMsg(`Submission Failed. ${err.response.data.message}`);
      }
    }
  };

  const handleCheckboxChange = (e) => {
    const { value } = e.target;
    if (e.target.checked) {
      setCheckedJobs([...checkedJobs, value]);
    } else {
      setCheckedJobs(checkedJobs.filter((job) => job !== value));
    }
  };

  return (
    <div className="animate-fadeIn">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:w-1/2 xl:w-1/3 m-auto gap-2 border-2 border-primary rounded-lg p-4"
      >
        <label htmlFor="projectname" className="text-left italic">
          Project Name *
        </label>
        <input
          type="text"
          name="projectname"
          id="projectname"
          autoComplete="off"
          placeholder="Enter project name"
          required
          className={`rounded px-8 py-2 bg-black outline-none ring-1`}
        />
        <label htmlFor="projectnumber" className="text-left italic">
          Project Number *
        </label>
        <input
          type="text"
          name="projectnumber"
          id="projectnumber"
          autoComplete="off"
          placeholder="Enter project number"
          required
          className={`rounded px-8 py-2 bg-black outline-none ring-1`}
        />
        <label htmlFor="incidentdescription" className="text-left italic">
          Safety Incident Description *
        </label>
        <textarea
          type="text"
          name="incidentdescription"
          id="incidentdescription"
          autoComplete="off"
          placeholder="Give a description of the event that took place"
          required
          className={`rounded px-8 py-2 bg-black outline-none ring-1`}
        />
        <label htmlFor="suggestiveaction" className="text-left italic">
          Suggestive Action *
        </label>
        <textarea
          type="text"
          name="suggestiveaction"
          id="suggestiveaction"
          autoComplete="off"
          placeholder="Give a suggestion for what could be done differently to have a safer working environment"
          required
          className={`rounded px-8 py-2 bg-black outline-none ring-1`}
        />

        <div className="p-2">
          <label htmlFor="job" className="text-left italic">
            Check all applicable hazards
          </label>
          <CheckboxForAddEquipment
            name={"Biological"}
            checked={checkedJobs.includes("Biological")}
            handleCheckboxChange={handleCheckboxChange}
          />
          <CheckboxForAddEquipment
            name={"Chemical"}
            checked={checkedJobs.includes("Chemical")}
            handleCheckboxChange={handleCheckboxChange}
          />
          <CheckboxForAddEquipment
            name={"Electrical"}
            checked={checkedJobs.includes("Electrical")}
            handleCheckboxChange={handleCheckboxChange}
          />
          <CheckboxForAddEquipment
            name={"Mechanical"}
            checked={checkedJobs.includes("Mechanical")}
            handleCheckboxChange={handleCheckboxChange}
          />
          <CheckboxForAddEquipment
            name={"Physical"}
            checked={checkedJobs.includes("Physical")}
            handleCheckboxChange={handleCheckboxChange}
          />
        </div>
        <div className="flex flex-col items-start">
          <label htmlFor="imgUpload" className="font-bold p-2">
            Upload a photo here:{" "}
          </label>
          <input
            name="imgUpload"
            id="imgUpload"
            type="file"
            accept=".jpg, .JPG, .jpeg, .JPEG, .png, .PNG,"
            className="rounded-md file:border-none bg-primary cursor-pointer file:bg-tertiary file:cursor-pointer w-full"
          />
        </div>
        <UploadProgressBar percentage={uploadPercentage} />
        <SubmitButton />
      </form>
    </div>
  );
};

export default AddSafetyIncident;
