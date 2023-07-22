import { useEffect } from "react";
import PageHeading from "../../components/PageHeading";
import DeniedAccessNotification from "../../components/DeniedAccessNotification";

const Tests = () => {
  useEffect(() => {
    document.title = "GeoCave - Tests";
  }, []);
  return (
    <div>
      <PageHeading heading={"Tests"} />
      <DeniedAccessNotification />
    </div>
  );
};

export default Tests;
