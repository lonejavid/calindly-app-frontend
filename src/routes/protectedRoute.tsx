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

  console.log("=== ProtectedRoute Debug ===");
  console.log("accessToken:", accessToken);
  console.log("user:", user);
  console.log("location.pathname:", location.pathname);
  console.log("PROTECTED_ROUTES.SETUP:", PROTECTED_ROUTES.SETUP);
  console.log("user?.isApproved:", user?.isApproved);

  if (!accessToken) {
    console.log("No accessToken - redirecting to login");
    return <Navigate to="/login" replace />;
  }

  // If user is not approved but trying to access routes other than /setup → redirect them
  if (user && user.isApproved === false && location.pathname !== PROTECTED_ROUTES.SETUP) {
    console.log("User not approved and not on setup page - redirecting to setup");
    return <Navigate to={PROTECTED_ROUTES.SETUP} replace />;
  }

  console.log("Rendering Outlet");
  return <Outlet />;
};

export default ProtectedRoute;