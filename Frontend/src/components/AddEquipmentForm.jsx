import { useState } from "react";
import CheckboxForAddEquipment from "./CheckboxForAddEquipment";
import SubmitButton from "./SubmitButton";
import jwt_decode from "jwt-decode";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

const EQUIPMENT_URL = "/equipment";

const AddEquipmentForm = () => {
  const [checkedJobs, setCheckedJobs] = useState([]);

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
        withCredentials: true,
      });
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
        <label htmlFor="name" className="text-left italic">
          Name *
        </label>
        <input
          type="text"
          name="name"
          id="name"
          autoComplete="off"
          placeholder="Enter equipment name"
          required
          className={`rounded px-8 py-2 bg-black outline-none ring-1`}
        />
        <label htmlFor="description" className="text-left italic">
          Description *
        </label>
        <textarea
          type="text"
          name="description"
          id="description"
          autoComplete="off"
          placeholder="Enter a description of what this equipment does"
          required
          className={`rounded px-8 py-2 bg-black outline-none ring-1`}
        />
        <label htmlFor="location" className="text-left italic">
          Location *
        </label>
        <input
          type="text"
          name="location"
          id="location"
          autoComplete="off"
          placeholder="Where is this equipment?"
          required
          className={`rounded px-8 py-2 bg-black outline-none ring-1`}
        />
        <label htmlFor="stock" className="text-left italic">
          Stock
        </label>
        <input
          type="text"
          name="stock"
          id="stock"
          autoComplete="off"
          placeholder="Estimated number"
          className={`rounded px-8 py-2 bg-black outline-none ring-1`}
        />
        <label htmlFor="vendor" className="text-left italic">
          Vendor
        </label>
        <input
          type="text"
          name="vendor"
          id="vendor"
          autoComplete="off"
          placeholder="Where can this be purchased?"
          className={`rounded px-8 py-2 bg-black outline-none ring-1`}
        />

        <div className="p-2">
          <label htmlFor="job" className="text-left italic">
            Check usage for all applicable jobs
          </label>
          <CheckboxForAddEquipment
            name={"Drilling"}
            checked={checkedJobs.includes("Drilling")}
            handleCheckboxChange={handleCheckboxChange}
          />
          <CheckboxForAddEquipment
            name={"Electrical Resistivity Test"}
            checked={checkedJobs.includes("Electrical Resistivity Test")}
            handleCheckboxChange={handleCheckboxChange}
          />
          <CheckboxForAddEquipment
            name={"Percolation Test"}
            checked={checkedJobs.includes("Percolation Test")}
            handleCheckboxChange={handleCheckboxChange}
          />
          <CheckboxForAddEquipment
            name={"Infiltration Test"}
            checked={checkedJobs.includes("Infiltration Test")}
            handleCheckboxChange={handleCheckboxChange}
          />
          <CheckboxForAddEquipment
            name={"Pile Test"}
            checked={checkedJobs.includes("Pile Test")}
            handleCheckboxChange={handleCheckboxChange}
          />
          <CheckboxForAddEquipment
            name={"USA Marking"}
            checked={checkedJobs.includes("USA Marking")}
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
            accept="image/*"
            className="rounded-md file:border-none bg-primary cursor-pointer file:bg-tertiary file:cursor-pointer"
          />
        </div>
        <SubmitButton />
      </form>
    </div>
  );
};

export default AddEquipmentForm;
