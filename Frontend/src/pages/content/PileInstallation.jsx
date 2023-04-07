import React from "react";
import FormCheck from "../../components/FormCheck";

const PileInstallation = () => {
  return (
    <div>
      <h1 className="m-4 underline text-xl font-bold">Required</h1>
      <FormCheck id={"1"} title={`Tape measure`} />
      <FormCheck id={"2"} title={`Pile embedment and pile drive time field form`} />
      <FormCheck
        id={"3"}
        title={"Sheet metal cutter or hammer/flat head screwdriver to open pile straps"}
      />
      <FormCheck id={"4"} title={"Ear plugs"} />
      <FormCheck id={"5"} title={`Big Sharpie`} />
      <FormCheck id={"6"} title={`Thick cushioned work gloves`} />
      <FormCheck id={"7"} title={`Tow straps to transport piles`} />
    </div>
  );
};

export default PileInstallation;
