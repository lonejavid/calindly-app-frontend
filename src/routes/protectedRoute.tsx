// import { Navigate, Outlet } from "react-router-dom";
// import { useStore } from "@/store/store";

// const ProtectedRoute = () => {
//   const { accessToken } = useStore();

//   if (accessToken) return <Outlet />;

//   return <Navigate to="/" replace />;
// };

// export default ProtectedRoute;

import { Navigate, Outlet } from "react-router-dom";
import { useStore } from "@/store/store";

const ProtectedRoute = () => {
  const { accessToken, user } = useStore();

  // If no access token, redirect to login
  if (!accessToken) return <Navigate to="/" replace />;
  
  // If user exists but is not approved, allow access to setup page only
  if (user && !user.isApproved) {
    return window.location.pathname === "/app/setup" ? <Outlet /> : <Navigate to="/app/setup" replace />;
  }

  // For approved users with access token, allow access to all protected routes
  return <Outlet />;
};

export default ProtectedRoute;