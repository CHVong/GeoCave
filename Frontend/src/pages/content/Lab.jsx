import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import jwt_decode from "jwt-decode";
import DashboardLinks from "../../components/DashboardLinks";
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
  faBook,
} from "@fortawesome/free-solid-svg-icons";

const Lab = () => {
  const { auth } = useAuth();
  const decoded = auth?.accessToken ? jwt_decode(auth.accessToken) : undefined;
  const username = decoded?.UserInfo.username || [];

  useEffect(() => {
    document.title = "GeoCave - Lab";
  }, []);
  return (
    <div className="animate-fadeIn">
      <h1 className="text-3xl p-6 font-medium">Lab Work Resources</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-1 max-w-[50vh] md:max-w-[75vh] m-auto">
        <DashboardLinks
          url={"/dash/checkin"}
          name={"Check In"}
          icon={faHeart}
          iconColor={"group-hover:text-red-500 group-focus:text-red-500"}
        />

        <DashboardLinks
          url={"/dash/safety"}
          name={"safety"}
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

export default Lab;
