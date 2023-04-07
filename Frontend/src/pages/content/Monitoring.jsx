import React from "react";
import FormCheck from "../../components/FormCheck";

const Monitoring = () => {
  return (
    <div>
      <h1 className="m-4 underline text-xl font-bold">Required</h1>
      <FormCheck id={"1"} title={`Paperwork (PTP, proposal, permits, etc.)`} />
      <FormCheck
        id={"2"}
        title={`Camera( or make sure your phone has ample space for lots of pictures!)`}
      />
      <FormCheck id={"3"} title={"Pens and Sharpies"} />
    </div>
  );
};

export default Monitoring;
