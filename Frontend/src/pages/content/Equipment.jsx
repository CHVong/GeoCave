import { useEffect } from "react";

const Equipment = () => {
  useEffect(() => {
    document.title = "GeoCave - Equipment";
  }, []);

  return (
    <div>
      <h1>Equipment</h1>
    </div>
  );
};

export default Equipment;
