import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import jwt_decode from "jwt-decode";
import DashboardLinks from "../../components/DashboardLinks";
import PageHeading from "../../components/PageHeading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faPaste,
  faFileCircleCheck,
  faEnvelope,
  faChartPie,
} from "@fortawesome/free-solid-svg-icons";

const Office = () => {
  const { auth } = useAuth();
  const decoded = auth?.accessToken ? jwt_decode(auth.accessToken) : undefined;
  const username = decoded?.UserInfo.username || [];

  useEffect(() => {
    document.title = "GeoCave - Office";
  }, []);
  return (
    <div className="animate-fadeIn">
      <PageHeading heading={"Office Work Resources"} />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-1 max-w-[50vh] md:max-w-[75vh] m-auto">
        <DashboardLinks
          url={"/dash/checkin"}
          name={"Check In"}
          icon={faHeart}
          iconColor={"group-hover:text-red-500 group-focus:text-red-500"}
        />
        <DashboardLinks
          url={"/dash/dataanalysis"}
          name={"Data Analysis"}
          icon={faChartPie}
          iconColor={"group-hover:text-cyan-400 group-focus:text-cyan-400"}
        />
        <DashboardLinks
          url={"/dash/permits"}
          name={"Permits"}
          icon={faFileCircleCheck}
          iconColor={"group-hover:text-green-500 group-focus:text-green-500"}
        />
        <DashboardLinks
          url={"/dash/proposals"}
          name={"Proposals"}
          icon={faEnvelope}
          iconColor={"group-hover:text-rose-400 group-focus:text-rose-400"}
        />

        <DashboardLinks
          url={"/dash/templates"}
          name={"Templates"}
          icon={faPaste}
          iconColor={"group-hover:text-amber-500 group-focus:text-amber-500"}
        />
      </div>
    </div>
  );
};

export default Office;
