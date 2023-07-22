import { useEffect } from "react";
import PageHeading from "../../components/PageHeading";
import DeniedAccessNotification from "../../components/DeniedAccessNotification";

const Permits = () => {
  useEffect(() => {
    document.title = "GeoCave - Permits";
  }, []);
  return (
    <div>
      <PageHeading heading={"Permits"} />
      <DeniedAccessNotification />
    </div>
  );
};

export default Permits;
