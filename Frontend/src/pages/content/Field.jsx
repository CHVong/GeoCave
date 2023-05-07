import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import jwt_decode from "jwt-decode";
import DashboardLinks from "../../components/DashboardLinks";
import PageHeading from "../../components/PageHeading";
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
  faBook,
} from "@fortawesome/free-solid-svg-icons";

const Field = () => {
  const { auth } = useAuth();
  const decoded = auth?.accessToken ? jwt_decode(auth.accessToken) : undefined;
  const username = decoded?.UserInfo.username || [];

  useEffect(() => {
    document.title = "GeoCave - Field";
  }, []);
  return (
    <div className="animate-fadeIn">
      <PageHeading heading={"Field Work Resources"} />
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
          url={"/dash/equipment"}
          name={"Equipment"}
          icon={faToolbox}
          iconColor={"group-hover:text-orange-500 group-focus:text-orange-500"}
        />
        <DashboardLinks
          url={"/dash/safety"}
          name={"Safety"}
          icon={faHelmetSafety}
          iconColor={"group-hover:text-yellow-400 group-focus:text-yellow-400"}
        />
        <DashboardLinks
          url={"/dash/SOPs"}
          name={"SOPs"}
          icon={faBook}
          iconColor={"group-hover:text-stone-400 group-focus:text-stone-400"}
        />

        <DashboardLinks
          url={"/dash/training"}
          name={"Training"}
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
    </div>
  );
};

export default Field;
