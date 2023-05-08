import { useEffect } from "react";
import PageHeading from "../../components/PageHeading";

const Templates = () => {
  useEffect(() => {
    document.title = "GeoCave - Templates";
  }, []);
  return (
    <div>
      <PageHeading heading={"Templates"} />
      <div>
        Sorry, this page is currently unavailable for the public. <br />
        You are either using a guest demo or you do not have the permitted roles.
      </div>
    </div>
  );
};

export default Templates;
