import { useState } from "react";
import FormCheck from "../../components/FormCheck";

const Drilling = () => {
  return (
    <div>
      <h1 className="m-4 underline text-xl font-bold">Required</h1>
      <FormCheck id={"1"} title={`Rings (2.5"x1")`} />
      <FormCheck id={"2"} title={`Ring Sleeves (2.5"x6")`} />
      <FormCheck id={"3"} title={"Plastic liners to bag ring samples"} />
      <FormCheck id={"4"} title={"Bulk bags"} />
      <FormCheck id={"5"} title={"SPT bags"} />
      <FormCheck id={"6"} title={"Paperwork (PTP, logs, proposal, permits, etc.)"} />
      <FormCheck
        id={"7"}
        title={`Writing/labeling supplies (Pens, sharpies, clipboard, masking tape)`}
      />
    </div>
  );
};

export default Drilling;
