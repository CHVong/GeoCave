import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LinkButton from "../components/LinkButton";
import mountainbgIcon from "../assets/images/mountainbgfavicon2.svg";

const InactiveAccount = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "GeoCave - Inactive Account";
  }, []);

  return (
    <div className="flex flex-col items-center gap-10 animate-fadeIn p-4">
      <img
        src={mountainbgIcon}
        alt="SVG image of a mountain top"
        className="w-14 p-2 cursor-pointer hoverScale hover:bg-primary rounded-lg m-auto mb-4"
        onClick={() => {
          navigate("/");
        }}
      />
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
