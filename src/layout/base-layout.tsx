import { Outlet, useLocation, matchPath } from "react-router-dom";
import { FooterProvider } from "@/contexts/FooterContext";
import Footer from "@/components/Footer";
import { CanonicalLink } from "@/components/CanonicalLink";
import { AUTH_ROUTES, PUBLIC_ROUTES } from "@/routes/common/routePaths";

/** Guest booking page /:username/:slug — hide marketing footer (same path shape as /services/... is excluded). */
function isPublicGuestBookingPath(pathname: string): boolean {
  const m = matchPath({ path: PUBLIC_ROUTES.USER_SINGLE_EVENT, end: true }, pathname);
  if (!m) return false;
  if (
    pathname.startsWith("/services/") ||
    pathname.startsWith("/app/") ||
    pathname.startsWith("/blog") ||
    pathname.startsWith("/resources")
  ) {
    return false;
  }
  return true;
}

const BaseLayout = () => {
  const location = useLocation();
  const hideFooter =
    location.pathname === AUTH_ROUTES.SIGN_IN ||
    location.pathname === AUTH_ROUTES.SIGN_UP ||
    isPublicGuestBookingPath(location.pathname);

  return (
    <FooterProvider>
      <CanonicalLink />
      <div className="flex flex-col w-full min-h-screen">
        <div className="w-full flex-1" key={location.key}>
          <Outlet />
        </div>
        {!hideFooter && <Footer />}
      </div>
    </FooterProvider>
  );
};

export default BaseLayout;
