import { useState, useEffect } from "react";

const PercolationAnalysis = () => {
  const [wellDepth, setWellDepth] = useState("");
  const [initialDTW, setInitialDTW] = useState("Require Readings and Stick-Up");
  const [finalDTW, setFinalDTW] = useState("Require Readings and Stick-Up");
  const [initialReading, setInitialReading] = useState("");
  const [finalReading, setFinalReading] = useState("");
  const [wellStickUp, setWellStickUp] = useState("");
  const [head, setHead] = useState("Require Depth, Initial, and Final DTW");
  const [deltaTime, setDeltaTime] = useState("");
  const [casingDiameter, setCasingDiameter] = useState("");
  const [deltaWaterLevel, setDeltaWaterLevel] = useState("Require Readings");
  const [percolationRate, setPercolationRate] = useState("Require Time and Δ Water Level");
  const [infiltrationRate, setInfiltrationRate] = useState("Require All Fields");

  useEffect(() => {
    if (initialReading !== "" && finalReading !== "" && wellStickUp !== "") {
      let newInitial = +initialReading - +wellStickUp;
      let newFinal = +finalReading - +wellStickUp;
      setInitialDTW(+newInitial.toFixed(4));
      setFinalDTW(+newFinal.toFixed(4));
    } else {
      setInitialDTW("Require Readings and Stick-Up");
      setFinalDTW("Require Readings and Stick-Up");
    }
  }, [initialReading, finalReading, wellStickUp]);
  useEffect(() => {
    if (initialReading !== "" && finalReading !== "") {
      setDeltaWaterLevel(+(finalReading - initialReading).toFixed(4));
    } else setDeltaWaterLevel("Require Initial and Final Readings");
  }, [initialReading, finalReading]);
  useEffect(() => {
    if (initialDTW !== "" && finalDTW !== "" && wellDepth !== "" && wellStickUp !== "") {
      let average = (+finalDTW + +initialDTW) / 2;
      let depthInches = wellDepth * 12;
      setHead(+(depthInches - average).toFixed(4));
    } else setHead("Require Depth, Initial, and Final DTW");
  }, [initialDTW, finalDTW, wellDepth]);
  useEffect(() => {
    if (deltaWaterLevel !== "" && deltaTime !== "") {
      setPercolationRate(+((deltaWaterLevel / deltaTime) * 60).toFixed(4));
    } else setPercolationRate("Require Time and Δ Water Level");
  }, [deltaTime, deltaWaterLevel]);
  useEffect(() => {
    if (deltaTime !== "" && casingDiameter !== "" && head !== "") {
      setInfiltrationRate(
        +(
          (deltaWaterLevel * 60 * casingDiameter) /
          2 /
          (deltaTime * (casingDiameter / 2 + 2 * head))
        ).toFixed(4)
      );
    } else setInfiltrationRate("Require All Fields");
  }, [casingDiameter, wellStickUp, wellDepth, deltaTime, initialReading, finalReading]);

  return (
    <div className="flex flex-col gap-4 animate-fadeIn">
      <h1 className="p-4 text-2xl underline">Percolation/Infiltration Analysis</h1>
      <div className="grid gap-6 lg:grid-cols-2 m-auto">
        <div className="flex flex-col gap-2">
          <label htmlFor="casingDiameter" className="text-left italic">
            Casing Diameter:
          </label>
          <div className="flex gap-2 items-center justify-start">
            <input
              type="number"
              name="casingDiameter"
              id="casingDiameter"
              autoComplete="off"
              placeholder="Inches"
              step="1"
              value={casingDiameter}
              onChange={(e) => setCasingDiameter(e.target.value)}
              required
              className={`rounded px-2 py-2 bg-black outline-none ring-1`}
            />{" "}
            <h2 className="text-sm">Inches</h2>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="wellStickUp" className="text-left italic">
            Well Stick-Up:
          </label>
          <div className="flex gap-2 items-center justify-start">
            <input
              type="number"
              name="wellStickUp"
              id="wellStickUp"
              autoComplete="off"
              placeholder="Inches"
              step="1"
              value={wellStickUp}
              required
              onChange={(e) => setWellStickUp(e.target.value)}
              className={`rounded px-2 py-2 bg-black outline-none ring-1`}
            />
            <h2 className="text-sm">Inches</h2>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="wellDepth" className="text-left italic">
            Well Depth(TD):
          </label>
          <div className="flex gap-2 items-center justify-start">
            <input
              type="number"
              name="wellDepth"
              id="wellDepth"
              autoComplete="off"
              placeholder="Feet"
              step="1"
              value={wellDepth}
              required
              onChange={(e) => setWellDepth(e.target.value)}
              className={`rounded px-2 py-2 bg-black outline-none ring-1`}
            />
            <h2 className="text-sm">Feet</h2>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="timeInterval" className="text-left italic">
            Time Interval:
          </label>
          <div className="flex gap-2 items-center justify-start">
            <input
              type="number"
              name="timeInterval"
              id="timeInterval"
              autoComplete="off"
              placeholder="Minutes"
              step="1"
              value={deltaTime}
              required
              onChange={(e) => setDeltaTime(e.target.value)}
              className={`rounded px-2 py-2 bg-black outline-none ring-1`}
            />
            <h2 className="text-sm">Minutes</h2>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="initialReading" className="text-left italic">
            Initial TOC Reading:
          </label>
          <div className="flex gap-2 items-center justify-start">
            <input
              type="number"
              name="initialReading"
              id="initialReading"
              autoComplete="off"
              placeholder="Inches"
              step="1"
              value={initialReading}
              required
              onChange={(e) => setInitialReading(e.target.value)}
              className={`rounded px-2 py-2 bg-black outline-none ring-1`}
            />
            <h2 className="text-sm">Inches</h2>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="finalReading" className="text-left italic">
            Final TOC Reading:
          </label>
          <div className="flex gap-2 items-center justify-start">
            <input
              type="number"
              name="finalReading"
              id="finalReading"
              autoComplete="off"
              placeholder="Inches"
              step="1"
              value={finalReading}
              required
              onChange={(e) => setFinalReading(e.target.value)}
              className={`rounded px-2 py-2 bg-black outline-none ring-1`}
            />
            <h2 className="text-sm">Inches</h2>
          </div>
        </div>
      </div>
      <div className="border-2 border-primary m-auto rounded-lg p-4 mt-8">
        <h2 className="text-lg font-bold">Calculated Values</h2>
        <h2 className="font-bold">
          Initial DTW (Ft) :{" "}
          <span
            className={`font-normal ${
              typeof initialDTW === "number" ? "text-green-500" : "text-red-500"
            }`}
          >
            {initialDTW}
          </span>
        </h2>
        <h2 className="font-bold">
          Final DTW (Ft) :{" "}
          <span
            className={`font-normal ${
              typeof finalDTW === "number" ? "text-green-500" : "text-red-500"
            }`}
          >
            {finalDTW}
          </span>
        </h2>
        <h2 className="font-bold">
          &#916;Water Level (Ft) :{" "}
          <span
            className={`font-normal ${
              typeof deltaWaterLevel === "number" ? "text-green-500" : "text-red-500"
            }`}
          >
            {deltaWaterLevel}
          </span>
        </h2>
        <h2 className="font-bold">
          Head (In) :{" "}
          <span
            className={`font-normal ${
              typeof head === "number" ? "text-green-500" : "text-red-500"
            }`}
          >
            {head}
          </span>
        </h2>
        <h2 className="font-bold">
          Percolation Rate (In/Hr) :{" "}
          <span
            className={`font-normal ${
              typeof percolationRate === "number" ? "text-green-500" : "text-red-500"
            }`}
          >
            {percolationRate}
          </span>
        </h2>
        <h2 className="font-bold">
          Infiltration Rate (In/Hr) :{" "}
          <span
            className={`font-normal ${
              typeof infiltrationRate === "number" ? "text-green-500" : "text-red-500"
            }`}
          >
            {infiltrationRate}
          </span>
        </h2>
      </div>
    </div>
  );
};

export default PercolationAnalysis;
