import { useState, useEffect } from "react";

const ERAnalysis = () => {
  const [spacingFeet, setSpacingFeet] = useState("");
  const [spacingCentimeters, setSpacingCentimeters] = useState("");
  const [depthInches, setDepthInches] = useState("");
  const [depthCentimeters, setDepthCentimeters] = useState("");
  const [NSResistance, setNSResistance] = useState("");
  const [EWResistance, setEWResistance] = useState("");
  const [calculatedNSResistance, setCalculatedNSResistance] = useState(
    "Please Fill Out All Fields"
  );
  const [calculatedEWResistance, setCalculatedEWResistance] = useState(
    "Please Fill Out All Fields"
  );

  useEffect(() => {
    if (spacingCentimeters !== "" && depthCentimeters !== "" && NSResistance !== "") {
      const NSResult = Math.round(
        (4 * Math.PI * spacingCentimeters * NSResistance) /
          (1 +
            (2 * spacingCentimeters) /
              Math.sqrt(Math.pow(spacingCentimeters, 2) + 4 * Math.pow(depthCentimeters, 2)) -
            spacingCentimeters /
              Math.sqrt(Math.pow(spacingCentimeters, 2) + Math.pow(depthCentimeters, 2)))
      );

      setCalculatedNSResistance(NSResult);
    } else {
      setCalculatedNSResistance("Please Fill Out All Fields");
    }

    if (spacingCentimeters !== "" && depthCentimeters !== "" && EWResistance !== "") {
      const EWResult = Math.round(
        (4 * Math.PI * spacingCentimeters * EWResistance) /
          (1 +
            (2 * spacingCentimeters) /
              Math.sqrt(Math.pow(spacingCentimeters, 2) + 4 * Math.pow(depthCentimeters, 2)) -
            spacingCentimeters /
              Math.sqrt(Math.pow(spacingCentimeters, 2) + Math.pow(depthCentimeters, 2)))
      );
      setCalculatedEWResistance(EWResult);
    } else {
      setCalculatedEWResistance("Please Fill Out All Fields");
    }
  }, [spacingCentimeters, depthCentimeters, NSResistance, EWResistance]);

  function convertSpacingFeet(event) {
    setSpacingFeet(event.target.value * 0.328084);
    setSpacingCentimeters(event.target.value);
  }
  function convertSpacingCentimeters(event) {
    setSpacingCentimeters(event.target.value * 30.48);
    setSpacingFeet(event.target.value);
  }
  function convertDepthInches(event) {
    setDepthInches(event.target.value * 0.39370079);
    setDepthCentimeters(event.target.value);
  }
  function convertDepthCentimeters(event) {
    setDepthCentimeters(event.target.value * 2.54);
    setDepthInches(event.target.value);
  }
  function handleNSResistance(event) {
    setNSResistance(event.target.value);
  }
  function handleEWResistance(event) {
    setEWResistance(event.target.value);
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="p-4 text-2xl underline">Electrical Resistivity Data Analysis</h1>
      <div className="grid gap-6 lg:grid-cols-2 m-auto">
        <div className="flex flex-col gap-2">
          <label htmlFor="aspacing" className="text-left italic">
            Electrode "A" Spacing:
          </label>
          <div className="flex gap-2 items-center justify-start">
            <input
              type="number"
              name="aspacing"
              id="aspacing"
              autoComplete="off"
              placeholder="feet"
              step="1"
              value={spacingFeet}
              onChange={convertSpacingCentimeters}
              required
              className={`rounded px-2 py-2 bg-black outline-none ring-1`}
            />{" "}
            <h2 className="text-sm">Feet</h2>
          </div>
          <div className="flex gap-2 items-center justify-start">
            <input
              type="number"
              name="aspacing"
              id="aspacing"
              autoComplete="off"
              placeholder="centimeters"
              step="1"
              value={spacingCentimeters}
              onChange={convertSpacingFeet}
              required
              className={`rounded px-2 py-2 bg-black outline-none ring-1`}
            />
            <h2 className="text-sm">Centimeters</h2>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="depth" className="text-left italic">
            Electrode Depth:
          </label>
          <div className="flex gap-2 items-center justify-start">
            <input
              type="number"
              name="depth"
              id="depth"
              autoComplete="off"
              placeholder="inches"
              step="1"
              value={depthInches}
              onChange={convertDepthCentimeters}
              required
              className={`rounded px-2 py-2 bg-black outline-none ring-1`}
            />{" "}
            <h2 className="text-sm">Inches</h2>
          </div>
          <div className="flex gap-2 items-center justify-start">
            <input
              type="number"
              name="depth"
              id="depth"
              autoComplete="off"
              placeholder="centimeters"
              step="1"
              value={depthCentimeters}
              onChange={convertDepthInches}
              required
              className={`rounded px-2 py-2 bg-black outline-none ring-1`}
            />
            <h2 className="text-sm">Centimeters</h2>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="NSResistance" className="text-left italic">
            North-South Measured Resistance:
          </label>
          <div className="flex gap-2 items-center justify-start">
            <input
              type="number"
              name="NSResistance"
              id="NSResistance"
              autoComplete="off"
              placeholder="N-S Resistance"
              step="1"
              value={NSResistance}
              onChange={handleNSResistance}
              required
              className={`rounded px-2 py-2 bg-black outline-none ring-1`}
            />{" "}
            <h2 className="text-sm">&#x2126;</h2>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="EWResistance" className="text-left italic">
            East-West Measured Resistance:
          </label>
          <div className="flex gap-2 items-center justify-start">
            <input
              type="number"
              name="EWResistance"
              id="EWResistance"
              autoComplete="off"
              placeholder="E-W Resistance"
              step="1"
              value={EWResistance}
              onChange={handleEWResistance}
              required
              className={`rounded px-2 py-2 bg-black outline-none ring-1`}
            />{" "}
            <h2 className="text-sm">&#x2126;</h2>
          </div>
        </div>
      </div>

      <div className="border m-auto rounded-lg p-4 mt-8">
        <h2 className="text-lg font-bold">Calculated Apparrent Resistivity &#961; (&#x2126;-cm)</h2>
        <h2 className="font-bold">
          N-S:{" "}
          <span
            className={`font-normal ${
              typeof calculatedNSResistance === "number" ? "text-green-500" : "text-red-500"
            }`}
          >
            {calculatedNSResistance}
          </span>
        </h2>
        <h2 className="font-bold">
          E-W:{" "}
          <span
            className={`font-normal ${
              typeof calculatedEWResistance === "number" ? "text-green-500" : "text-red-500"
            }`}
          >
            {calculatedEWResistance}
          </span>
        </h2>
      </div>
    </div>
  );
};

export default ERAnalysis;
