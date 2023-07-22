import { useEffect } from "react";
import PageHeading from "../../components/PageHeading";
import DeniedAccessNotification from "../../components/DeniedAccessNotification";

const Proposals = () => {
  useEffect(() => {
    document.title = "GeoCave - Proposals";
  }, []);
  return (
    <div>
      <PageHeading heading={"Proposals"} />
      <DeniedAccessNotification />
    </div>
  );
};

export default Proposals;
