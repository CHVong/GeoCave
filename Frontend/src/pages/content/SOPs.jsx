import { useEffect } from "react";
import PageHeading from "../../components/PageHeading";
import DeniedAccessNotification from "../../components/DeniedAccessNotification";

const SOPs = () => {
  useEffect(() => {
    document.title = "GeoCave - SOPs";
  }, []);
  return (
    <div>
      <PageHeading heading={"SOPs"} />
      <DeniedAccessNotification />
    </div>
  );
};

export default SOPs;
