import { useEffect } from "react";
import PageHeading from "../../components/PageHeading";

const SOPs = () => {
  useEffect(() => {
    document.title = "GeoCave - SOPs";
  }, []);
  return (
    <div>
      <PageHeading heading={"SOPs"} />
      <div>
        Sorry, this page is currently unavailable for the public. <br />
        You are either using a guest demo or you do not have the permitted roles.
      </div>
    </div>
  );
};

export default SOPs;
