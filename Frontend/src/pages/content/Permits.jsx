import { useEffect } from "react";
import PageHeading from "../../components/PageHeading";

const Permits = () => {
  useEffect(() => {
    document.title = "GeoCave - Permits";
  }, []);
  return (
    <div>
      <PageHeading heading={"Permits"} />
      <div>
        Sorry, this page is currently unavailable for the public. <br />
        You are either using a guest demo or you do not have the permitted roles.
      </div>
    </div>
  );
};

export default Permits;
