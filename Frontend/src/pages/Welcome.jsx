import { useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import jwt_decode from "jwt-decode";
import DashboardLinks from "../components/DashboardLinks";
import PageHeading from "../components/PageHeading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faHelmetSafety,
  faListCheck,
  faToolbox,
  faBoxesStacked,
  faFlaskVial,
  faHouseLaptop,
  faPaste,
  faPersonHiking,
  faMicroscope,
  faFileCircleCheck,
  faEnvelope,
  faBook,
  faChartPie,
} from "@fortawesome/free-solid-svg-icons";

const Welcome = () => {
  const { auth } = useAuth();
  const decoded = auth?.accessToken ? jwt_decode(auth.accessToken) : undefined;
  const username = decoded?.UserInfo.username || [];

  useEffect(() => {
    document.title = "GeoCave - Dashboard";
  }, []);
  return (
    <div className="animate-fadeIn" id="scroller">
      <PageHeading heading={`Welcome ${username}!`} />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-1 max-w-[50vh] md:max-w-[75vh] m-auto">
        <DashboardLinks
          url={"/dash/checkin"}
          name={"Check In"}
          icon={faHeart}
          iconColor={"group-hover:text-red-500 group-focus:text-red-500"}
        />
        <DashboardLinks
          url={"/dash/checklist"}
          name={"Checklist"}
          icon={faListCheck}
          iconColor={"group-hover:text-blue-500 group-focus:text-blue-500"}
        />
        <DashboardLinks
          url={"/dash/dataanalysis"}
          name={"Data Analysis"}
          icon={faChartPie}
          iconColor={"group-hover:text-cyan-400 group-focus:text-cyan-400"}
        />
        <DashboardLinks
          url={"/dash/equipment"}
          name={"Equipment"}
          icon={faToolbox}
          iconColor={"group-hover:text-orange-500 group-focus:text-orange-500"}
        />
        <DashboardLinks
          url={"/dash/field"}
          name={"Field"}
          icon={faPersonHiking}
          iconColor={"group-hover:text-teal-300 group-focus:text-teal-300"}
        />
        <DashboardLinks
          url={"/dash/lab"}
          name={"Lab"}
          icon={faFlaskVial}
          iconColor={"group-hover:text-violet-500 group-focus:text-violet-500"}
        />
        <DashboardLinks
          url={"/dash/office"}
          name={"Office"}
          icon={faHouseLaptop}
          iconColor={"group-hover:text-slate-400 group-focus:text-slate-400"}
        />
        <DashboardLinks
          url={"/dash/safety"}
          name={"Safety"}
          icon={faHelmetSafety}
          iconColor={"group-hover:text-yellow-400 group-focus:text-yellow-400"}
        />

        <DashboardLinks
          url={"/dash/training"}
          name={"Training"}
          icon={faBoxesStacked}
          iconColor={"group-hover:text-orange-300 group-focus:text-orange-300"}
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
          url={"/dash/SOPs"}
          name={"SOPs"}
          icon={faBook}
          iconColor={"group-hover:text-stone-400 group-focus:text-stone-400"}
        />
        <DashboardLinks
          url={"/dash/templates"}
          name={"Templates"}
          icon={faPaste}
          iconColor={"group-hover:text-amber-500 group-focus:text-amber-500"}
        />
        <DashboardLinks
          url={"/dash/tests"}
          name={"Tests"}
          icon={faMicroscope}
          iconColor={"group-hover:text-blue-500 group-focus:text-blue-500"}
        />
      </div>
    </div>
  );
};

export default Welcome;
