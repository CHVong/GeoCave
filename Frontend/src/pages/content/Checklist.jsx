import { useState, useEffect } from "react";
import PageHeading from "../../components/PageHeading";
import Drilling from "./Drilling";
import ERTest from "./ERTest";
import InfiltrationTest from "./InfiltrationTest";
import Monitoring from "./Monitoring";
import PercolationTest from "./PercolationTest";
import PileInstallation from "./PileInstallation";
import PileTest from "./PileTest";
import USAMarking from "./USAMarking";
import jwt_decode from "jwt-decode";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import FormCheck from "../../components/FormCheck";

const CHECKLIST_URL = "/checklist";

const Checklist = () => {
  const [task, setTask] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const { auth } = useAuth();
  const [data, setData] = useState([]);

  const decoded = auth?.accessToken ? jwt_decode(auth.accessToken) : undefined;
  const username = decoded?.UserInfo.username || [];

  useEffect(() => {
    document.title = "GeoCave - Checklist";
  }, []);

  useEffect(() => {
    document.title = "GeoCave - Checklist";
    const fetchData = async () => {
      try {
        const response = await axios.get(CHECKLIST_URL, {
          params: { user: username, job: task },
          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${auth.accessToken}`,
          },
          withCredentials: true,
        });
        setData(response.data.map((e) => e));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [task]);

  const handleTaskChange = (event) => {
    setTask(event.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);
    payload.user = username;
    payload.job = task;
    console.log(JSON.stringify(payload));

    try {
      const response = await axios.post(CHECKLIST_URL, JSON.stringify(payload), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.accessToken}`,
        },
        withCredentials: true,
      });
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else {
        console.log(err.response.data);
        setErrMsg(`Submission Failed. ${err.response.data.message}`);
      }
    }
  }
  return (
    <div className="md:w-3/4 xl:w-1/2 m-auto rounded-lg animate-fadeIn">
      <PageHeading heading={"Checklist"} />
      <div className="flex justify-center p-3 gap-2">
        <select
          className="rounded bg-primary cursor-pointer text-left flex items-center"
          required
          onChange={handleTaskChange}
        >
          <option value="">Please select your task</option>
          <option name="drilling">Drilling</option>
          <option name="ertesting">Electrical Resistivity Test</option>
          <option name="perctest">Percolation Test</option>
          <option name="infiltest">Infiltration Test</option>
          <option name="pileinstall">Pile Installation</option>
          <option name="piletest">Pile Test</option>
          <option name="usamarking">USA Marking</option>
          <option name="monitoring">Monitoring</option>
        </select>
      </div>
      <div>
        {task === "Drilling" ? (
          <Drilling />
        ) : task === "Electrical Resistivity Test" ? (
          <ERTest />
        ) : task === "Percolation Test" ? (
          <PercolationTest />
        ) : task === "Infiltration Test" ? (
          <InfiltrationTest />
        ) : task === "Pile Installation" ? (
          <PileInstallation />
        ) : task === "Pile Test" ? (
          <PileTest />
        ) : task === "USA Marking" ? (
          <USAMarking />
        ) : task === "Monitoring" ? (
          <Monitoring />
        ) : null}
      </div>

      {task !== "" ? (
        <>
          <h1 className="m-4 underline text-xl font-bold">Optional</h1>
          <div>
            {data.map((e, index) => (
              <FormCheck id={e._id} title={e.item} />
            ))}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="relative flex flex-col gap-2 p-2">
              <div className="relative">
                <p
                  className={
                    errMsg
                      ? "animate-fadeIn rounded-lg absolute bottom-full w-4/5 md:w-full bg-red-500 left-1/2 -translate-x-1/2"
                      : "absolute left-full"
                  }
                  aria-live="assertive"
                >
                  {errMsg}
                </p>
              </div>
              <label htmlFor="item" className="text-left italic">
                New Checklist Item:
              </label>
              <input
                type="text"
                name="item"
                id="item"
                autoComplete="off"
                placeholder="Enter your new checklist item"
                required
                className={`rounded px-8 py-2 bg-black outline-none ring-1`}
              />
            </div>
            <div className="p-2">
              <input
                type="submit"
                value="Save"
                className="bg-green-700 hover:bg-green-600 text-secondary font-bold py-2 px-4 rounded-lg cursor-pointer"
              />
            </div>
          </form>
        </>
      ) : null}
    </div>
  );
};

export default Checklist;
