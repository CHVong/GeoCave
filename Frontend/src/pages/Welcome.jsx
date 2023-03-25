import { useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import jwt_decode from "jwt-decode";
import DashboardLinks from "../components/DashboardLinks";
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
} from "@fortawesome/free-solid-svg-icons";

const Welcome = () => {
  const { auth } = useAuth();
  const decoded = auth?.accessToken ? jwt_decode(auth.accessToken) : undefined;
  const username = decoded?.UserInfo.username || [];

  useEffect(() => {
    document.title = "GeoCave - Dashboard";
  }, []);
  return (
    <>
      <h1 className="text-3xl p-6 font-medium">Welcome {username}!</h1>
      <div className="grid grid-cols-2 gap-1 max-w-[50vh] m-auto">
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
          url={"/dash/equipment"}
          name={"Equipment"}
          icon={faToolbox}
          iconColor={"group-hover:text-orange-500 group-focus:text-orange-500"}
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
          url={"/dash/Safety"}
          name={"Safety"}
          icon={faHelmetSafety}
          iconColor={"group-hover:text-yellow-500 group-focus:text-yellow-500"}
        />

        <DashboardLinks
          url={"/dash/supplies"}
          name={"Supplies"}
          icon={faBoxesStacked}
          iconColor={"group-hover:text-orange-300 group-focus:text-orange-300"}
        />

        <DashboardLinks
          url={"/dash/templates"}
          name={"Templates"}
          icon={faPaste}
          iconColor={"group-hover:text-amber-500 group-focus:text-amber-500"}
        />
      </div>
    </>
  );
};

export default Welcome;
