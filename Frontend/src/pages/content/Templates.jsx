import { useEffect } from "react";
import PageHeading from "../../components/PageHeading";

const Templates = () => {
  useEffect(() => {
    document.title = "GeoCave - Templates";
  }, []);
  return (
    <div>
      <PageHeading heading={"Templates"} />
      <div>Sorry, this page is currently unavailable for the public.</div>
    </div>
  );
};

export default Templates;
