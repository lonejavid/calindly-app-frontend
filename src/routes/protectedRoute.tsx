// import { Navigate, Outlet } from "react-router-dom";
// import { useStore } from "@/store/store";

// const ProtectedRoute = () => {
//   const { accessToken } = useStore();

//   if (accessToken) return <Outlet />;

//   return <Navigate to="/" replace />;
// };

// export default ProtectedRoute;

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useStore } from "@/store/store";
import { PROTECTED_ROUTES } from "./common/routePaths";

const ProtectedRoute = () => {
  const { accessToken, user } = useStore();
  const location = useLocation();

  if (!accessToken) {
    return <Navigate to="/" replace />;
  }

  // If user is not approved but trying to access routes other than /setup → redirect them
  if (user && user.isApproved === false && location.pathname !== PROTECTED_ROUTES.SETUP) {
    return <Navigate to={PROTECTED_ROUTES.SETUP} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
