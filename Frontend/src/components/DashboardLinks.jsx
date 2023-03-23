import { Link } from "react-router-dom";

const DashboardLinks = ({ url, name }) => {
  return (
    <Link to={url} className="h-[10vh]">
      {name}
    </Link>
  );
};

export default DashboardLinks;
