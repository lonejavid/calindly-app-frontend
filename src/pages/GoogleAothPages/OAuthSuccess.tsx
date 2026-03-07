import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/store/store";
import { PROTECTED_ROUTES } from "@/routes/common/routePaths";

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);
  const setAccessToken = useStore((state) => state.setAccessToken);
  const setExpiresAt = useStore((state) => state.setExpiresAt);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const accessToken = queryParams.get("accessToken");
    const userJson = queryParams.get("user");

    if (accessToken && userJson) {
      try {
        const user = JSON.parse(decodeURIComponent(userJson));
        const expiresAtParam = queryParams.get("expiresAt");
        setUser(user);
        setAccessToken(accessToken);
        setExpiresAt(expiresAtParam ? Number(expiresAtParam) : Math.floor(Date.now() / 1000) + 7 * 24 * 3600);

        if (user.isApproved) {
          navigate(PROTECTED_ROUTES.EVENT_TYPES);
        } else {
          navigate(PROTECTED_ROUTES.SETUP);
        }
      } catch {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate, setUser, setAccessToken, setExpiresAt]);

  return (
    <div className="text-center text-white mt-20 text-xl">
      Redirecting, please wait...
    </div>
  );
};

export default OAuthSuccess;
