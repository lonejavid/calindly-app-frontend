import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/store/store"; // ✅ import your Zustand store

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);
  const setAccessToken = useStore((state) => state.setAccessToken);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const accessToken = queryParams.get("accessToken");
    const userJson = queryParams.get("user");

    if (accessToken && userJson) {
      try {
        const user = JSON.parse(decodeURIComponent(userJson));
        console.log("this is the user which is with approved satatus ",user);

        
        setUser(user);
        setAccessToken(accessToken);

        // Optional: Save to localStorage for persistence
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", JSON.stringify(user));

        // navigate("/app/event_types");
          if (user.isApproved) {
          navigate("/app/event_types");
        } else {
          navigate("/app/setup");
        }
      } catch (err) {
        console.error("❌ Failed to parse or store data", err);
      }
    } else {
      console.error("❌ Missing token or user data");
    }
  }, [navigate, setUser, setAccessToken]);

  return (
    <div className="text-center text-white mt-20 text-xl">
      Redirecting, please wait...
    </div>
  );
};

export default OAuthSuccess;
