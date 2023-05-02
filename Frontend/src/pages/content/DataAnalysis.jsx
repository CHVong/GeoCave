import { useEffect, useState } from "react";
import PageHeading from "../../components/PageHeading";
import ERAnalysis from "./ERAnalysis";
import PercolationAnalysis from "./PercolationAnalysis";
import PileInstallationAnalysis from "./PileInstallationAnalysis";
import PileTestAnalysis from "./PileTestAnalysis";
import SamplingBlowCount from "./SamplingBlowCount";

const DataAnalysis = () => {
  const [task, setTask] = useState("");

  useEffect(() => {
    document.title = "GeoCave - Data Analysis";
  }, []);

  const handleTaskChange = (event) => {
    setTask(event.target.value);
  };
  return (
    <div className="animate-fadeIn">
      <PageHeading heading={"Data Analysis"} />
      <div className="flex justify-center p-3 gap-2">
        <select
          className="rounded bg-primary cursor-pointer text-left flex items-center"
          required
          onChange={handleTaskChange}
        >
          <option value="">Please select your task</option>
          <option name="ertesting">Soil Resistivity</option>
          <option name="perctest">Percolation/Infiltration Rate</option>
          <option name="pileinstall">Pile Installation Rate</option>
          <option name="piletest">Pile Analysis</option>
          <option name="samplingblowcount">Sampling Blow Count</option>
        </select>
      </div>
      <div>
        {task === "Soil Resistivity" ? (
          <ERAnalysis />
        ) : task === "Percolation/Infiltration Rate" ? (
          <PercolationAnalysis />
        ) : task === "Pile Installation Rate" ? (
          <PileInstallationAnalysis />
        ) : task === "Pile Analysis" ? (
          <PileTestAnalysis />
        ) : task === "Sampling Blow Count" ? (
          <SamplingBlowCount />
        ) : null}
      </div>
    </div>
  );
};

export default DataAnalysis;
