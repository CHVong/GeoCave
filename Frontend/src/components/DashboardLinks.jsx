import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DashboardLinks = ({ url, name, icon, iconColor }) => {
  return (
    <>
      <Link
        to={url}
        className={`h-[15vh] rounded-lg border-4 border-primary flex flex-col items-center justify-center hover:bg-primary focus:bg-primary hover:border-secondary focus:border-secondary hoverScaleBig focusScaleBig group m-2`}
      >
        <p>{name}</p>
        <FontAwesomeIcon icon={icon} className={`text-xl ${iconColor} `} />
      </Link>
    </>
  );
};

export default DashboardLinks;
