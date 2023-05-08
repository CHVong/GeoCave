import { useEffect } from "react";
import PageHeading from "../../components/PageHeading";

const Training = () => {
  useEffect(() => {
    document.title = "GeoCave - Training";
  }, []);
  return (
    <div>
      <PageHeading heading={"Training and Professional Development"} />
      <div>Sorry, this page is currently unavailable for the public.</div>
    </div>
  );
};

export default Training;
