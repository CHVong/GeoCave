import { useEffect } from "react";
import PageHeading from "../../components/PageHeading";

const Tests = () => {
  useEffect(() => {
    document.title = "GeoCave - Tests";
  }, []);
  return (
    <div>
      <PageHeading heading={"Tests"} />
      <div>Sorry, this page is currently unavailable for the public.</div>
    </div>
  );
};

export default Tests;
