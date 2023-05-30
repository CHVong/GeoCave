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
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

const COUNT_URL = "/count";

const Admin = () => {
  const navigate = useNavigate();

  const [showManage, setShowManage] = useState("");
  const [data, setData] = useState({});
  const { auth } = useAuth();

  useEffect(() => {
    document.title = "GeoCave - Admin Dashboard";
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(COUNT_URL, {
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${auth.accessToken}`,
        },
        withCredentials: true,
      });
      setData(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    }
  };

  const changeManage = (title) => {
    setShowManage(title);
    // console.log(showManage);
  };

  const navigateManage = (link) => {
    navigate(`/dash/admin${link}`);
  };

  return (
    <section>
      <PageHeading heading={"Admin Dashboard"} />
      <div className="flex justify-center flex-wrap gap-8 p-1 animate-fadeIn">
        <AdminStatCard
          title={"Users"}
          count={data.userCount}
          link={"/manageusers"}
          icon={
            <FontAwesomeIcon icon={faAddressCard} size="lg" className="group-hover:text-blue-500" />
          }
          onClick={navigateManage}
        />
        <AdminStatCard
          title={"Equipment"}
          count={data.equipmentCount}
          link={"/manageequipment"}
          icon={
            <FontAwesomeIcon icon={faToolbox} size="lg" className="group-hover:text-orange-500" />
          }
          onClick={navigateManage}
        />
        <AdminStatCard
          title={"Safety Incidents"}
          count={data.safetyCount}
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
          count={data.checkInCount}
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
