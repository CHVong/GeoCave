import { useState, useEffect } from "react";

const PercolationAnalysis = () => {
  const [wellDepth, setWellDepth] = useState("");
  const [DTW, setDTW] = useState("");
  const [initialDTW, setInitialDTW] = useState("");
  const [finalDTW, setFinalDTW] = useState("");
  const [head, setHead] = useState("");
  const [deltaTime, setDeltaTime] = useState("");
  const [casingDiameter, setCasingDiameter] = useState("");
  const [deltaWaterLevel, setDeltaWaterLevel] = useState("Please Enter Initial and Final DTW");
  const [percolationRate, setPercolationRate] = useState("");
  const [infiltrationRate, setInfiltrationRate] = useState("");
  const [wellStickUp, setWellStickUp] = useState("");

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
            Well Depth:
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
          <label htmlFor="initialDTW" className="text-left italic">
            Initial Depth-to-Water:
          </label>
          <div className="flex gap-2 items-center justify-start">
            <input
              type="number"
              name="initialDTW"
              id="initialDTW"
              autoComplete="off"
              placeholder="Inches"
              step="1"
              value={initialDTW}
              required
              onChange={(e) => setInitialDTW(e.target.value)}
              className={`rounded px-2 py-2 bg-black outline-none ring-1`}
            />
            <h2 className="text-sm">Inches</h2>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="finalDTW" className="text-left italic">
            Final Depth-to-Water:
          </label>
          <div className="flex gap-2 items-center justify-start">
            <input
              type="number"
              name="finalDTW"
              id="finalDTW"
              autoComplete="off"
              placeholder="Inches"
              step="1"
              value={finalDTW}
              required
              onChange={(e) => setFinalDTW(e.target.value)}
              className={`rounded px-2 py-2 bg-black outline-none ring-1`}
            />
            <h2 className="text-sm">Inches</h2>
          </div>
        </div>
      </div>
      <div className="border-2 border-primary m-auto rounded-lg p-4 mt-8">
        <h2 className="text-lg font-bold">Calculated Values</h2>
        <h2 className="font-bold">
          &#916;Water Level:{" "}
          <span
            className={`font-normal ${
              typeof deltaWaterLevel === "number" ? "text-green-500" : "text-red-500"
            }`}
          >
            {deltaWaterLevel}
          </span>
        </h2>
      </div>
    </div>
  );
};

export default PercolationAnalysis;
