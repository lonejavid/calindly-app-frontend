import { useStore } from "@/store/store";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AUTH_ROUTES, PROTECTED_ROUTES } from "./common/routePaths";

/** Renders landing/login/signup. Redirects to app only when logged in and on login/signup pages (so they can still visit landing). */
const AuthRoute = () => {
  const accessToken = useStore((s) => s.accessToken);
  const location = useLocation();
  const pathname = location.pathname;

  const isLoginOrSignUp =
    pathname === AUTH_ROUTES.SIGN_IN || pathname === AUTH_ROUTES.SIGN_UP;
  if (accessToken && isLoginOrSignUp) {
    return <Navigate to={PROTECTED_ROUTES.EVENT_TYPES} replace />;
  }
  return <Outlet />;
};

export default AuthRoute;
