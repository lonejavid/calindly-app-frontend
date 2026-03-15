import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useStore } from "@/store/store";
import { PROTECTED_ROUTES } from "./common/routePaths";
import useAuthExpiration from "@/hooks/use-auth-expiration";

const ProtectedRoute = () => {
  const { accessToken, user } = useStore();
  const location = useLocation();
  useAuthExpiration();

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  if (user?.isApproved === false && location.pathname !== PROTECTED_ROUTES.SETUP) {
    return <Navigate to={PROTECTED_ROUTES.SETUP} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;