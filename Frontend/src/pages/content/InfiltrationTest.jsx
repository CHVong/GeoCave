import React from "react";
import FormCheck from "../../components/FormCheck";

const InfiltrationTest = () => {
  return (
    <div>
      <h1 className="m-4 underline text-xl font-bold">Required</h1>
      <FormCheck id={"1"} title={`Water tank`} />
      <FormCheck id={"2"} title={`Drive ring (outer ring)`} />
      <FormCheck id={"3"} title={"Collection ring (inner ring)"} />
      <FormCheck id={"4"} title={`Flow Meter`} />
      <FormCheck id={"5"} title={"Mariotte Tubes"} />
      <FormCheck id={"6"} title={"Brass fittings"} />
      <FormCheck id={"7"} title={"Clear vinyl tubings"} />
      <FormCheck id={"8"} title={`Hammer, driving caps & cover`} />
      <FormCheck id={"9"} title={"Tape measure"} />
      <FormCheck id={"10"} title={`Stopwatch (can use phone)`} />
      <FormCheck id={"11"} title={`Hand Auger`} />
      <FormCheck
        id={"12"}
        title={`Hose to refill water if performing multi-day tests in sandy soil`}
      />
      <FormCheck id={"13"} title={`Infiltration test field forms`} />
    </div>
  );
};

export default InfiltrationTest;
