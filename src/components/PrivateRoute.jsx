import { Outlet, Navigate, useLocation } from "react-router-dom";

import { useUser } from "../context/UserContext";

const PrivateRoute = () => {
  const location = useLocation();
  const { user } = useUser();

  return user ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} replace state={{ from: location }} />
  );
};

export default PrivateRoute;
