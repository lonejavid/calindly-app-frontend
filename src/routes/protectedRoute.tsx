// import { Navigate, Outlet } from "react-router-dom";
// import { useStore } from "@/store/store";

// const ProtectedRoute = () => {
//   const { accessToken } = useStore();

//   if (accessToken) return <Outlet />;

//   return <Navigate to="/" replace />;
// };

// export default ProtectedRoute;
// ProtectedRoute.js - Fixed version
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useStore } from "@/store/store";
import { PROTECTED_ROUTES } from "./common/routePaths";

const ProtectedRoute = () => {
  const { accessToken, user } = useStore();
  const location = useLocation();

  // If no access token, redirect to login
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  // If user is not approved and not already on setup page, redirect to setup
  if (user && user.isApproved === false && location.pathname !== PROTECTED_ROUTES.SETUP) {
    return <Navigate to={PROTECTED_ROUTES.SETUP} replace />;
  }

  // If user is not approved but on setup page, allow access
  if (user && user.isApproved === false && location.pathname === PROTECTED_ROUTES.SETUP) {
    return <Outlet />;
  }

  // If user is approved, allow access to all protected routes
  return <Outlet />;
};

export default ProtectedRoute;