import { useEffect } from "react";

const equipment = () => {
  useEffect(() => {
    document.title = "GeoCave - Equipment";
  }, []);

  return (
    <div>
      <h1>equipment</h1>
    </div>
  );
};

export default equipment;
