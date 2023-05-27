import { useState, useEffect } from "react";
import PageHeading from "../components/PageHeading";
import AdminStatCard from "../components/AdminStatCard";
import {
  faAddressCard,
  faToolbox,
  faHelmetSafety,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ManageSafety from "../components/ManageSafety";
import ManageUsers from "../components/ManageUsers";
import ManageEquipment from "../components/ManageEquipment";
import ManageCheckIn from "../components/ManageCheckIn";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();

  const [showManage, setShowManage] = useState("");

  useEffect(() => {
    document.title = "GeoCave - Admin Dashboard";
  }, []);

  const changeManage = (title) => {
    setShowManage(title);
    // console.log(showManage);
  };

  const navigateManage = (url) => {
    navigate(`/dash/admin${url}`);
  };

  return (
    <section>
      <PageHeading heading={"Admin Dashboard"} />
      {/* {showManage === "Users" ? (
        <ManageUsers onClick={changeManage} />
      ) : showManage === "Equipment" ? (
        <ManageEquipment onClick={changeManage} />
      ) : showManage === "Safety Incidents" ? (
        <ManageSafety onClick={changeManage} />
      ) : showManage === "Check-Ins" ? (
        <ManageCheckIn onClick={changeManage} />
      ) : ( */}
      <div className="flex justify-center flex-wrap gap-8 p-1 animate-fadeIn">
        <AdminStatCard
          title={"Users"}
          url={"/user"}
          link={"/manageusers"}
          icon={
            <FontAwesomeIcon icon={faAddressCard} size="lg" className="group-hover:text-blue-500" />
          }
          onClick={navigateManage}
        />
        <AdminStatCard
          title={"Equipment"}
          url={"/equipment"}
          link={"/manageequipment"}
          icon={
            <FontAwesomeIcon icon={faToolbox} size="lg" className="group-hover:text-orange-500" />
          }
          onClick={navigateManage}
        />
        <AdminStatCard
          title={"Safety Incidents"}
          url={"/safety"}
          link={"/managesafety"}
          icon={
            <FontAwesomeIcon
              icon={faHelmetSafety}
              size="lg"
              className="group-hover:text-yellow-500"
            />
          }
          onClick={navigateManage}
        />
        <AdminStatCard
          title={"Check-Ins"}
          url={"/checkin"}
          link={"/managecheckins"}
          icon={<FontAwesomeIcon icon={faHeart} size="lg" className="group-hover:text-red-500" />}
          onClick={navigateManage}
        />
      </div>
      {/* )} */}

      {/* <br />
      <Users />
      <br />
      <div className="">
        <Link to="/">Home</Link>
      </div>
      <div className="">
        <Link to="/dash">dash</Link>
      </div> */}
    </section>
  );
};

export default Admin;
