import { useEffect } from "react";
import PageHeading from "../../components/PageHeading";

const DataAnalysis = () => {
  useEffect(() => {
    document.title = "GeoCave - Data Analysis";
  }, []);

  return (
    <div className="animate-fadeIn">
      <PageHeading heading={"Data Analysis"} />
      <p>Please check back at another time for updates on this page.</p>
    </div>
  );
};

export default DataAnalysis;
