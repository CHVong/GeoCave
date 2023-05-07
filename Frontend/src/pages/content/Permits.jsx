import { useEffect } from "react";
import PageHeading from "../../components/PageHeading";

const Permits = () => {
  useEffect(() => {
    document.title = "GeoCave - Permits";
  }, []);
  return (
    <div>
      <PageHeading heading={"Permits"} />
      <div>Sorry, this page is currently unavailable for the public.</div>
    </div>
  );
};

export default Permits;
