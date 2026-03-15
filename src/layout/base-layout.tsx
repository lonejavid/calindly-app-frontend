import { Outlet, useLocation } from "react-router-dom";
import { FooterProvider } from "@/contexts/FooterContext";
import Footer from "@/components/Footer";

const BaseLayout = () => {
  const location = useLocation();

  return (
    <FooterProvider>
      <div className="flex flex-col w-full min-h-screen">
        <div className="w-full flex-1" key={location.key}>
          <Outlet />
        </div>
        <Footer />
      </div>
    </FooterProvider>
  );
};

export default BaseLayout;
