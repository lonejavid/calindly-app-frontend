import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/store/store";
import { PROTECTED_ROUTES } from "@/routes/common/routePaths";

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);
  const setAccessToken = useStore((state) => state.setAccessToken);
  const setExpiresAt = useStore((state) => state.setExpiresAt);
  const didRun = useRef(false);

  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;

    const hashQuery = window.location.hash.slice(1);
    const searchQuery = window.location.search.slice(1);
    const params = new URLSearchParams(hashQuery || searchQuery);
    const accessToken = params.get("accessToken");
    const userJson = params.get("user");

    const clearUrlAndGo = (path: string) => {
      window.history.replaceState({}, document.title, path);
      navigate(path, { replace: true });
    };

    if (!accessToken || !userJson) {
      clearUrlAndGo("/login");
      return;
    }

    try {
      const user = JSON.parse(decodeURIComponent(userJson));
      const expiresAtParam = params.get("expiresAt");
      setUser(user);
      setAccessToken(accessToken);
      setExpiresAt(
        expiresAtParam
          ? Number(expiresAtParam)
          : Math.floor(Date.now() / 1000) + 7 * 24 * 3600
      );
      const target =
        user.isApproved === true
          ? PROTECTED_ROUTES.EVENT_TYPES
          : PROTECTED_ROUTES.SETUP;
      requestAnimationFrame(() => {
        clearUrlAndGo(target);
      });
    } catch {
      clearUrlAndGo("/login");
    }
  }, [navigate, setUser, setAccessToken, setExpiresAt]);

  return (
    <div className="text-center text-white mt-20 text-xl">
      Redirecting to dashboard…
    </div>
  );
};

export default OAuthSuccess;
