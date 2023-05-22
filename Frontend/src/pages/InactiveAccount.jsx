import { useEffect } from "react";
import { Link } from "react-router-dom";
import LinkButton from "../components/LinkButton";
const InactiveAccount = () => {
  useEffect(() => {
    document.title = "GeoCave - Inactive Account";
  }, []);

  return (
    <div className="flex flex-col items-center gap-10 animate-fadeIn p-4">
      <h1 className="text-5xl font-bold">Error 403: Forbidden</h1>
      <h2>
        Sorry, your account has been marked as inactive and you do not have authorization to access
        this page. Please contact one of our admins to resolve this issue.
      </h2>
      <LinkButton path={""} name={"Go Back Home"} />
    </div>
  );
};

export default InactiveAccount;
