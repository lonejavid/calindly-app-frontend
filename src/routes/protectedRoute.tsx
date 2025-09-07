// import { Navigate, Outlet } from "react-router-dom";
// import { useStore } from "@/store/store";

// const ProtectedRoute = () => {
//   const { accessToken } = useStore();

//   if (accessToken) return <Outlet />;

//   return <Navigate to="/" replace />;
// };

// export default ProtectedRoute;
// ProtectedRoute.tsx - Enhanced debug version
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useStore } from "@/store/store";
import { PROTECTED_ROUTES } from "./common/routePaths";

const ProtectedRoute = () => {
  const { accessToken, user } = useStore();
  const location = useLocation();

  // Enhanced logging
  console.log("=== ProtectedRoute Debug ===");
  console.log("accessToken exists:", !!accessToken);
  console.log("user:", user);
  console.log("user?.isApproved:", user?.isApproved);
  console.log("user?.isApproved === false:", user?.isApproved === false);
  console.log("current pathname:", location.pathname);
  console.log("PROTECTED_ROUTES.SETUP:", PROTECTED_ROUTES.SETUP);
  console.log("pathname !== SETUP:", location.pathname !== PROTECTED_ROUTES.SETUP);

  // No token check
  if (!accessToken) {
    console.log("❌ No accessToken - redirecting to login");
    return <Navigate to="/login" replace />;
  }

  // User approval check - CRITICAL SECTION
  if (user) {
    console.log("✅ User exists, checking approval status...");
    
    // Check if user is not approved
    if (user.isApproved === false) {
      console.log("⚠️ User is NOT approved");
      
      // If not on setup page, redirect to setup
      if (location.pathname !== PROTECTED_ROUTES.SETUP) {
        console.log("🔄 Redirecting to setup page");
        return <Navigate to={PROTECTED_ROUTES.SETUP} replace />;
      } else {
        console.log("✅ Already on setup page, allowing access");
      }
    } else {
      console.log("✅ User is approved, allowing access to all routes");
    }
  } else {
    console.log("⚠️ User object is null/undefined");
  }

  console.log("🎯 Rendering Outlet");
  return <Outlet />;
};

export default ProtectedRoute;