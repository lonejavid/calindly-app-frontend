import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls window to top whenever the route pathname changes.
 * Place inside BrowserRouter so it runs on every page navigation and refresh.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

export default ScrollToTop;
