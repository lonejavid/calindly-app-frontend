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

const ProtectedRoute = () => {
  const { accessToken, user } = useStore();
  const location = useLocation();

  // If no access token, redirect to login
  if (!accessToken) return <Navigate to="/" replace />;

  // Allow access to setup page for unapproved users
  if (location.pathname === "/app/setup") {
    return <Outlet />;
  }

  // For all other protected routes, user must be approved
  if (user && user.isApproved) {
    return <Outlet />;
  }

  // If user is not approved and trying to access other protected routes
  return <Navigate to="/app/setup" replace />;
};

export default ProtectedRoute;