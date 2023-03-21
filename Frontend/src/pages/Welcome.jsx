import { useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import jwt_decode from "jwt-decode";
import CurrentTime from "../components/CurrentTime";

const Welcome = () => {
  const { auth } = useAuth();
  const decoded = auth?.accessToken ? jwt_decode(auth.accessToken) : undefined;
  const username = decoded?.UserInfo.username || [];

  useEffect(() => {
    document.title = "GeoCave - Dashboard";
  }, []);
  return (
    <div>
      <h1>Welcome {username}!</h1>
      <CurrentTime />
      <p>
        <Link to="/dash/checklist">View Checklist</Link>
      </p>
      <p>
        <Link to="/dash/equipment">View Equipment</Link>
      </p>
    </div>
  );
};

export default Welcome;
