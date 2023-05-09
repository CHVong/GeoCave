import { Link } from "react-router-dom";
import Users from "../components/Users";
import { useEffect } from "react";
import PageHeading from "../components/PageHeading";
import AdminStatCard from "../components/AdminStatCard";

const Admin = () => {
  useEffect(() => {
    document.title = "GeoCave - Admin Dashboard";
  }, []);

  return (
    <section>
      <PageHeading heading={"Admin Dashboard"} />
      <div className="flex justify-center flex-wrap gap-8">
        <AdminStatCard title={"Users"} url={"/user"} />
        <AdminStatCard title={"Equipments"} url={"/equipment"} />
        <AdminStatCard title={"Safety"} url={"/safety"} />
        <AdminStatCard title={"Check-Ins"} url={"checkin"} />
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
