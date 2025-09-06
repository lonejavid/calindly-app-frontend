// import { useStore } from "@/store/store";
// import { Navigate, Outlet } from "react-router-dom";
// import { PROTECTED_ROUTES } from "./common/routePaths";

// const AuthRoute = () => {
//   const { accessToken, user } = useStore();

//   if (!accessToken && !user) return <Outlet />;

//   return <Navigate to={PROTECTED_ROUTES.EVENT_TYPES} replace />;
// };

// export default AuthRoute;

import { useStore } from "@/store/store";
import { Navigate, Outlet } from "react-router-dom";
import { PROTECTED_ROUTES } from "./common/routePaths";

const AuthRoute = () => {
  const { accessToken, user } = useStore();

  // If no access token, show auth pages
  if (!accessToken && !user) return <Outlet />;
  
  // If user is not approved, redirect to setup
  if (user && !user.isApproved) {
    return <Navigate to={PROTECTED_ROUTES.SETUP} replace />;
  }

  // For approved users, redirect to event types
  return <Navigate to={PROTECTED_ROUTES.EVENT_TYPES} replace />;
};

export default AuthRoute;