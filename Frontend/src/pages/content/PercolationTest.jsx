import React from "react";
import FormCheck from "../../components/FormCheck";

const PercolationTest = () => {
  return (
    <div>
      <h1 className="m-4 underline text-xl font-bold">Required</h1>
      <FormCheck id={"1"} title={`Water tank`} />
      <FormCheck id={"2"} title={`5 Gal. Buckets`} />
      <FormCheck id={"3"} title={"Water level meter"} />
      <FormCheck id={"4"} title={"Stopwatch (can use phone)"} />
      <FormCheck id={"5"} title={"Pliers"} />
      <FormCheck id={"6"} title={`Extra cones`} />
      <FormCheck id={"7"} title={`Backfill (sand/gravel) and capping (cement/asphalt) materials`} />
      <FormCheck id={"8"} title={`Tamper/Shovel/Push broom/Cement taper or plaster`} />
      <FormCheck id={"9"} title={`Extra steel cover plates`} />
      <FormCheck
        id={"10"}
        title={`Hose to refill water if performing multi-day tests in sandy soil`}
      />
      <FormCheck id={"11"} title={`Percolation test field forms`} />
    </div>
  );
};

export default PercolationTest;
