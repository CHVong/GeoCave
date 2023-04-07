import React from "react";
import FormCheck from "../../components/FormCheck";

const USAMarking = () => {
  return (
    <div>
      <h1 className="m-4 underline text-xl font-bold">Required</h1>
      <FormCheck id={"1"} title={`White paint and/or stakes`} />
      <FormCheck id={"2"} title={`Hammer`} />
      <FormCheck id={"3"} title={"Pink flagging/surveying tape"} />
      <FormCheck id={"4"} title={"Pens and Sharpies"} />
      <FormCheck id={"5"} title={`Marking field forms`} />
      <FormCheck id={"6"} title={`GPS Garmin/KMZ files`} />
      <FormCheck id={"7"} title={`Shovel`} />
      <FormCheck id={"8"} title={`Extra cones`} />
      <FormCheck id={"9"} title={`Caution tape`} />
      <FormCheck id={"10"} title={`No parking signs (If permitted)`} />
    </div>
  );
};

export default USAMarking;
