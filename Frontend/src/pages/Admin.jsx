import { Link } from "react-router-dom";
import Users from "../components/Users";
import { useEffect } from "react";
import PageHeading from "../components/PageHeading";

const Admin = () => {
  useEffect(() => {
    document.title = "GeoCave - Admin Dashboard";
  }, []);

  return (
    <section>
      <PageHeading heading={"Admin Dashboard"} />
      <br />
      <Users />
      <br />
      <div className="">
        <Link to="/">Home</Link>
      </div>
      <div className="">
        <Link to="/dash">dash</Link>
      </div>
    </section>
  );
};

export default Admin;
