import { useStore } from "@/store/store";
import { Navigate, Outlet } from "react-router-dom";
import { PROTECTED_ROUTES } from "./common/routePaths";

const AuthRoute = () => {
  const { accessToken, user } = useStore();

  // If no token/user, allow access to auth pages
  if (!accessToken && !user) return <Outlet />;

  // If user exists but is not approved, redirect to setup
  if (user && user.isApproved === false) {
    return <Navigate to={PROTECTED_ROUTES.SETUP} replace />;
  }

  // If user is approved, redirect to event types
  return <Navigate to={PROTECTED_ROUTES.EVENT_TYPES} replace />;
};

export default AuthRoute;
