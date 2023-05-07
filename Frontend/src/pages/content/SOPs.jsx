import { useEffect } from "react";
import PageHeading from "../../components/PageHeading";

const SOPs = () => {
  useEffect(() => {
    document.title = "GeoCave - SOPs";
  }, []);
  return (
    <div>
      <PageHeading heading={"SOPs"} />
      <div>Sorry, this page is currently unavailable for the public.</div>
    </div>
  );
};

export default SOPs;
