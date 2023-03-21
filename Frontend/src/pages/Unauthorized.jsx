import { useEffect } from "react";
import { Link } from "react-router-dom";
import LinkButton from "../components/LinkButton";
const Unauthorized = () => {
  useEffect(() => {
    document.title = "GeoCave - Unauthorized";
  }, []);

  return (
    <div className="flex flex-col items-center gap-10 animate-fadeIn">
      <h1 className="text-5xl font-bold">Error 401: Unauthorized</h1>
      <h2>Sorry, you do not have authorization to access this page</h2>
      <LinkButton path={"dash"} name={"Go Back Home"} />
    </div>
  );
};

export default Unauthorized;
