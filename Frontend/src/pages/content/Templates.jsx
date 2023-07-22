import { useEffect } from "react";
import PageHeading from "../../components/PageHeading";
import DeniedAccessNotification from "../../components/DeniedAccessNotification";

const Templates = () => {
  useEffect(() => {
    document.title = "GeoCave - Templates";
  }, []);
  return (
    <div>
      <PageHeading heading={"Templates"} />
      <DeniedAccessNotification />
    </div>
  );
};

export default Templates;
