import { Link } from "react-router-dom";
import Users from "../components/Users";
import { useEffect } from "react";

const Admin = () => {
  useEffect(() => {
    document.title = "GeoCave - Admin Dashboard";
  }, []);

  return (
    <section>
      <h1>Admins Page</h1>
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
