import { Link } from "react-router-dom";
import Users from "../components/Users";
import { useEffect } from "react";
import PageHeading from "../components/PageHeading";
import AdminStatCard from "../components/AdminStatCard";
import {
  faAddressCard,
  faToolbox,
  faHelmetSafety,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Admin = () => {
  useEffect(() => {
    document.title = "GeoCave - Admin Dashboard";
  }, []);

  return (
    <section>
      <PageHeading heading={"Admin Dashboard"} />
      <div className="flex justify-center flex-wrap gap-8">
        <AdminStatCard
          title={"Users"}
          url={"/user"}
          icon={<FontAwesomeIcon icon={faAddressCard} className="group-hover:text-blue-500" />}
        />
        <AdminStatCard
          title={"Equipments"}
          url={"/equipment"}
          icon={<FontAwesomeIcon icon={faToolbox} className="group-hover:text-orange-500" />}
        />
        <AdminStatCard
          title={"Safety Incidents"}
          url={"/safety"}
          icon={<FontAwesomeIcon icon={faHelmetSafety} className="group-hover:text-yellow-500" />}
        />
        <AdminStatCard
          title={"Check-Ins"}
          url={"checkin"}
          icon={<FontAwesomeIcon icon={faHeart} className="group-hover:text-red-500" />}
        />
      </div>

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
