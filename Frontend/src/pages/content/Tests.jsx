import { useEffect } from "react";
import PageHeading from "../../components/PageHeading";

const Tests = () => {
  useEffect(() => {
    document.title = "GeoCave - Tests";
  }, []);
  return (
    <div>
      <PageHeading heading={"Tests"} />
      <div>
        Sorry, this page is currently unavailable for the public. <br />
        You are either using a guest demo or you do not have the permitted roles.
      </div>
    </div>
  );
};

export default Tests;
