import { useState, useEffect } from "react";

const PileTestAnalysis = () => {
  const [gauge1, setGauge1] = useState("");
  const [gauge2, setGauge2] = useState("");
  const [correctedDeflectionAverage, setCorrectedDeflectionAverage] =
    useState("Require All Fields");

  useEffect(() => {
    if (gauge1 !== "" && gauge2 !== "") {
      setCorrectedDeflectionAverage(+(gauge1 / gauge2).toFixed(4));
    } else setCorrectedDeflectionAverage("Require All Fields");
  }, [gauge1, gauge2]);

  return (
    <div className="flex flex-col gap-4 animate-fadeIn">
      <h1 className="p-4 text-2xl underline">Axial and Lateral Load Analysis</h1>
      <div className="grid gap-6 m-auto">
        <div className="flex flex-col gap-2">
          <label htmlFor="gauge1" className="text-left italic">
            &#916; Gauge 1 Deflection:
          </label>
          <div className="flex gap-2 items-center justify-start">
            <input
              type="number"
              name="gauge1"
              id="gauge1"
              autoComplete="off"
              placeholder="Inches"
              step="0.25"
              value={gauge1}
              onChange={(e) => setGauge1(e.target.value)}
              required
              className={`rounded px-2 py-2 bg-black outline-none ring-1`}
            />{" "}
            <h2 className="text-sm">Inches</h2>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="gauge2" className="text-left italic">
            &#916; Gauge 2 Deflection:
          </label>
          <div className="flex gap-2 items-center justify-start">
            <input
              type="number"
              name="gauge2"
              id="gauge2"
              autoComplete="off"
              placeholder="Inches"
              step="0.25"
              value={gauge2}
              onChange={(e) => setGauge2(e.target.value)}
              required
              className={`rounded px-2 py-2 bg-black outline-none ring-1`}
            />{" "}
            <h2 className="text-sm">Inches</h2>
          </div>
        </div>
      </div>
      <div className="border-2 border-primary m-auto rounded-lg p-4 mt-8">
        <h2 className="text-lg font-bold">Calculated Load Deflections</h2>
        <h2 className="font-bold">
          Corrected Deflection &#916; Average (In) :{" "}
          <span
            className={`font-normal ${
              typeof correctedDeflectionAverage === "number" ? "text-green-500" : "text-red-500"
            }`}
          >
            {correctedDeflectionAverage}
          </span>
        </h2>
      </div>
    </div>
  );
};

export default PileTestAnalysis;
