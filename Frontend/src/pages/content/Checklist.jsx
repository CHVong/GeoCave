import { useState } from "react";
import PageHeading from "../../components/PageHeading";
import Drilling from "./Drilling";
import ERTest from "./ERTest";
import InfiltrationTest from "./InfiltrationTest";
import Monitoring from "./Monitoring";
import PercolationTest from "./PercolationTest";
import PileInstallation from "./PileInstallation";
import PileTest from "./PileTest";
import USAMarking from "./USAMarking";

const Checklist = () => {
  const [task, setTask] = useState("");
  const handleTaskChange = (event) => {
    setTask(event.target.value);
  };

  return (
    <div className="md:w-3/4 xl:w-1/2 m-auto rounded-lg p-6">
      <PageHeading heading={"Checklist"} />
      <form className="flex justify-center p-3 gap-2">
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
      </form>
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
    </div>
  );
};

export default Checklist;
