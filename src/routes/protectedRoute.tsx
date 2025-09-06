import { Navigate, Outlet } from "react-router-dom";
import { useStore } from "@/store/store";
import { PROTECTED_ROUTES } from "./common/routePaths";

// const ProtectedRoute = () => {
//   const { accessToken } = useStore();

//   if (accessToken) return <Outlet />;

//   return <Navigate to="/" replace />;
// };

const ProtectedRoute = () => {
  const { accessToken, user } = useStore();

  if (!accessToken) return <Navigate to="/" replace />;
  
  // If user is not approved and trying to access non-setup pages
  if (user && !user.isApproved && !window.location.pathname.includes('/setup')) {
    return <Navigate to={PROTECTED_ROUTES.SETUP} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
