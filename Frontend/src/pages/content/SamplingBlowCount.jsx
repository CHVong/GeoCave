import { useState, useEffect } from "react";

const SamplingBlowCount = () => {
  const [SPTCount, setSPTCount] = useState("");
  const [ringCount, setRingCount] = useState("");
  const [RingDensity, setRingDensity] = useState("Check coarse-grained and fill in all fields");
  const [SPTDensity, setSPTDensity] = useState("Check coarse-grained and fill in all fields");
  const [ringConsistency, setRingConsistency] = useState(
    "Check fine-grained and fill in all fields"
  );
  const [SPTConsistency, setSPTConsistency] = useState("Check fine-grained and fill in all fields");
  const [checkedFine, setCheckedFine] = useState(false);
  const [checkedCoarse, setCheckedCoarse] = useState(false);

  useEffect(() => {
    if (ringCount !== "" && checkedCoarse) {
      if (ringCount >= 0 && ringCount <= 6) {
        setRingDensity("Very Loose");
      } else if (ringCount >= 7 && ringCount <= 18) {
        setRingDensity("Loose");
      } else if (ringCount >= 19 && ringCount <= 58) {
        setRingDensity("Medium Dense");
      } else if (ringCount >= 59 && ringCount <= 98) {
        setRingDensity("Dense");
      } else if (ringCount > 98) {
        setRingDensity("Very Dense");
      }
    } else setRingDensity("Check coarse-grained and fill in all fields");
  }, [ringCount, checkedCoarse]);
  useEffect(() => {
    if (ringCount !== "" && checkedFine) {
      if (ringCount >= 0 && ringCount <= 2) {
        setRingConsistency("Very Soft");
      } else if (ringCount >= 3 && ringCount <= 4) {
        setRingConsistency("Soft");
      } else if (ringCount >= 5 && ringCount <= 9) {
        setRingConsistency("Medium-Stiff");
      } else if (ringCount >= 10 && ringCount <= 18) {
        setRingConsistency("Stiff");
      } else if (ringCount >= 19 && ringCount <= 42) {
        setRingConsistency("Very Stiff");
      } else if (ringCount > 42) {
        setRingConsistency("Hard");
      }
    } else setRingConsistency("Check fine-grained and fill in all fields");
  }, [ringCount, checkedFine]);
  useEffect(() => {
    if (SPTCount !== "" && checkedCoarse) {
      if (SPTCount >= 0 && SPTCount <= 3) {
        setSPTDensity("Very Loose");
      } else if (SPTCount >= 4 && SPTCount <= 9) {
        setSPTDensity("Loose");
      } else if (SPTCount >= 10 && SPTCount <= 29) {
        setSPTDensity("Medium Dense");
      } else if (SPTCount >= 30 && SPTCount <= 50) {
        setSPTDensity("Dense");
      } else if (SPTCount > 50) {
        setSPTDensity("Very Dense");
      }
    } else setSPTDensity("Check coarse-grained and fill in all fields");
  }, [SPTCount, checkedCoarse]);
  useEffect(() => {
    if (SPTCount !== "" && checkedFine) {
      if (SPTCount >= 0 && SPTCount <= 1) {
        setSPTConsistency("Very Soft");
      } else if (SPTCount >= 2 && SPTCount <= 3) {
        setSPTConsistency("Soft");
      } else if (SPTCount >= 4 && SPTCount <= 7) {
        setSPTConsistency("Medium-Stiff");
      } else if (SPTCount >= 8 && SPTCount <= 15) {
        setSPTConsistency("Stiff");
      } else if (SPTCount >= 15 && SPTCount <= 30) {
        setSPTConsistency("Very Stiff");
      } else if (SPTCount > 30) {
        setSPTConsistency("Hard");
      }
    } else setSPTConsistency("Check fine-grained and fill in all fields");
  }, [SPTCount, checkedFine]);

  return (
    <div className="flex flex-col gap-4 animate-fadeIn">
      <h1 className="p-4 text-2xl underline">SPT & Ring Blow Count Calculator</h1>
      <div className="grid gap-6 m-auto justify-items-center">
        <div className="grid lg:grid-cols-2 lg:gap-4">
          <div className="flex flex-row items-center">
            <input
              type="checkbox"
              name="soiltype"
              id="coarse-grained"
              value="coarse-grained"
              checked={checkedCoarse}
              className={`rounded bg-black outline-none ring-1 cursor-pointer`}
              onChange={(e) => {
                setCheckedCoarse(e.target.checked);
              }}
            />
            <label htmlFor="coarse-grained" className="cursor-pointer p-2">
              Coarse-grained
            </label>
          </div>
          <div className="flex flex-row items-center">
            <input
              type="checkbox"
              name="soiltype"
              id="fine-grained"
              value="fine-grained"
              checked={checkedFine}
              className={`rounded bg-black outline-none ring-1 cursor-pointer`}
              onChange={(e) => {
                setCheckedFine(e.target.checked);
              }}
            />
            <label htmlFor="fine-grained" className="cursor-pointer p-2">
              Fine-grained
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="sptcount" className="text-left italic">
            SPT Count:
          </label>
          <div className="flex gap-2 items-center justify-start">
            <input
              type="number"
              min="0"
              name="sptcount"
              id="sptcount"
              autoComplete="off"
              placeholder="#"
              step="1"
              value={SPTCount}
              onChange={(e) => setSPTCount(e.target.value)}
              required
              className={`rounded px-2 py-2 bg-black outline-none ring-1`}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="ringcount" className="text-left italic">
            Ring Count:
          </label>
          <div className="flex gap-2 items-center justify-start">
            <input
              type="number"
              min="0"
              name="ringcount"
              id="ringcount"
              autoComplete="off"
              placeholder="#"
              step="1"
              value={ringCount}
              onChange={(e) => setRingCount(e.target.value)}
              required
              className={`rounded px-2 py-2 bg-black outline-none ring-1`}
            />
          </div>
        </div>
      </div>
      <div className="border-2 border-primary m-auto rounded-lg p-4 mt-8">
        <h2 className="text-lg font-bold">Calculated Density/Consistency</h2>
        <h2 className="font-bold">
          Ring Consistency :{" "}
          <span
            className={`font-normal ${
              ringConsistency === "Check fine-grained and fill in all fields"
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {ringConsistency}
          </span>
        </h2>
        <h2 className="font-bold">
          SPT Consistency :{" "}
          <span
            className={`font-normal ${
              SPTConsistency === "Check fine-grained and fill in all fields"
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {SPTConsistency}
          </span>
        </h2>
        <h2 className="font-bold">
          Ring Density :{" "}
          <span
            className={`font-normal ${
              RingDensity === "Check coarse-grained and fill in all fields"
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {RingDensity}
          </span>
        </h2>
        <h2 className="font-bold">
          SPT Density :{" "}
          <span
            className={`font-normal ${
              SPTDensity === "Check coarse-grained and fill in all fields"
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {SPTDensity}
          </span>
        </h2>
      </div>
    </div>
  );
};

export default SamplingBlowCount;
