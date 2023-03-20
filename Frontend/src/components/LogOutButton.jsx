import { Link, useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";

const LogOutButton = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate("/");
  };

  return (
    <button
      onClick={signOut}
      className="font-medium px-4 py-2 border-2 border-secondary rounded-lg shadow-md shadow-black transition duration-500 ease-in-out text-tertiary hover:bg-tertiary hover:text-primary hover:shadow-none text-md w-40"
    >
      Sign out
    </button>
  );
};

export default LogOutButton;
