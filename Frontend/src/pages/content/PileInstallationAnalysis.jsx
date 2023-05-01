import { useState, useEffect } from "react";

const PileInstallationAnalysis = () => {
  const [embeddedDepth, setEmbeddedDepth] = useState("");
  const [driveTime, setDriveTime] = useState("");
  const [timePerFoot, setTimePerFoot] = useState("Require All Fields");

  useEffect(() => {
    if (embeddedDepth !== "" && driveTime !== "") {
      setTimePerFoot(+(driveTime / embeddedDepth).toFixed(4));
    } else setTimePerFoot("Require All Fields");
  }, [embeddedDepth, driveTime]);

  return (
    <div className="flex flex-col gap-4 animate-fadeIn">
      <h1 className="p-4 text-2xl underline">Pile Installation Rate Analysis</h1>
      <div className="grid gap-6 m-auto">
        <div className="flex flex-col gap-2">
          <label htmlFor="embeddedDepth" className="text-left italic">
            Embedded Depth:
          </label>
          <div className="flex gap-2 items-center justify-start">
            <input
              type="number"
              name="embeddedDepth"
              id="embeddedDepth"
              autoComplete="off"
              placeholder="Feet"
              step="1"
              value={embeddedDepth}
              onChange={(e) => setEmbeddedDepth(e.target.value)}
              required
              className={`rounded px-2 py-2 bg-black outline-none ring-1`}
            />{" "}
            <h2 className="text-sm">Feet</h2>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="driveTime" className="text-left italic">
            Drive Time:
          </label>
          <div className="flex gap-2 items-center justify-start">
            <input
              type="number"
              name="driveTime"
              id="driveTime"
              autoComplete="off"
              placeholder="Seconds"
              step="1"
              value={driveTime}
              onChange={(e) => setDriveTime(e.target.value)}
              required
              className={`rounded px-2 py-2 bg-black outline-none ring-1`}
            />{" "}
            <h2 className="text-sm">Seconds</h2>
          </div>
        </div>
      </div>
      <div className="border-2 border-primary m-auto rounded-lg p-4 mt-8">
        <h2 className="text-lg font-bold">Calculated Installation Rate</h2>
        <h2 className="font-bold">
          Drive Time (s/ft) :{" "}
          <span
            className={`font-normal ${
              typeof timePerFoot === "number" ? "text-green-500" : "text-red-500"
            }`}
          >
            {timePerFoot}
          </span>
        </h2>
      </div>
    </div>
  );
};

export default PileInstallationAnalysis;
