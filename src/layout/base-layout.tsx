import { Outlet, useLocation } from "react-router-dom";
import { FooterProvider } from "@/contexts/FooterContext";
import Footer from "@/components/Footer";
import { AUTH_ROUTES } from "@/routes/common/routePaths";

const BaseLayout = () => {
  const location = useLocation();
  const hideFooter =
    location.pathname === AUTH_ROUTES.SIGN_IN ||
    location.pathname === AUTH_ROUTES.SIGN_UP;

  return (
    <FooterProvider>
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
