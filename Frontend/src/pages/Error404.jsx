import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LinkButton from "../components/LinkButton";
import mountainbgIcon from "../assets/images/mountainbgfavicon2.svg";

const Error404 = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "GeoCave - Error 404";
  }, []);
  return (
    <div className="flex flex-col items-center gap-10 animate-fadeIn">
      <img
        src={mountainbgIcon}
        alt="SVG image of a mountain top"
        className="w-14 p-2 cursor-pointer hoverScale hover:bg-primary rounded-lg m-auto mb-4"
        onClick={() => {
          navigate("/");
        }}
      />
      <h1 className="text-5xl font-bold">Error 404</h1>
      <h2>Sorry, the page you have requested does not exist!</h2>
      <LinkButton path={""} name={"Go Back Home"} />
    </div>
  );
};

export default Error404;
