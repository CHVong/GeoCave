import React from "react";
import FormCheck from "../../components/FormCheck";

const ERTest = () => {
  return (
    <div>
      <h1 className="m-4 underline text-xl font-bold">Required</h1>
      <FormCheck id={"1"} title={`ER console box (MiniSting, AEMC Model6472, or L&R MiniRes)`} />
      <FormCheck id={"2"} title={`Charging ports or extra batteries depending on console`} />
      <FormCheck id={"3"} title={"At least 5 grounding electrode stakes"} />
      <FormCheck id={"4"} title={"4 wire spools"} />
      <FormCheck
        id={"5"}
        title={`Measuring tape reels (number of reels and length will be dependent on "a" spacings)`}
      />
      <FormCheck id={"6"} title={`Field forms with calculated "a" spacings`} />
      <FormCheck id={"7"} title={`Hammer`} />
    </div>
  );
};

export default ERTest;
