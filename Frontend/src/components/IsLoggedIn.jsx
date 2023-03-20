import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const IsLoggedIn = () => {
  const { auth } = useAuth();
  const location = useLocation();
  return auth?.accessToken ? <Navigate to="/dash" /> : <Outlet />;

  //   return roles?.find((role) => allowedRoles?.includes(role)) ? (
  //     <Navigate to="/dash" {/*state={{ from: location }} replace*/} />
  //   ) : auth?.accessToken ? (
  //     <Navigate to="/unauthorized" state={{ from: location }} replace />
  //   ) : (
  //     <Navigate to="/login" state={{ from: location }} replace />
  //   );
};

export default IsLoggedIn;
