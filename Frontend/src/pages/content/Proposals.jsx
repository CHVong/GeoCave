import { useEffect } from "react";
import PageHeading from "../../components/PageHeading";

const Proposals = () => {
  useEffect(() => {
    document.title = "GeoCave - Proposals";
  }, []);
  return (
    <div>
      <PageHeading heading={"Proposals"} />
      <div>
        Sorry, this page is currently unavailable for the public. <br />
        You are either using a guest demo or you do not have the permitted roles.
      </div>
    </div>
  );
};

export default Proposals;
