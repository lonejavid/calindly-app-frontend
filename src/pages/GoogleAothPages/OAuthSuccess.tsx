import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/store/store"; // ✅ import your Zustand store

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);
  const setAccessToken = useStore((state) => state.setAccessToken);

  useEffect(() => {
    console.log("🔍 OAuthSuccess - Starting OAuth callback processing");
    console.log("🔍 Current URL:", window.location.href);
    
    const queryParams = new URLSearchParams(window.location.search);
    const accessToken = queryParams.get("accessToken");
    const userJson = queryParams.get("user");

    console.log("🔍 accessToken exists:", !!accessToken);
    console.log("🔍 userJson exists:", !!userJson);

    if (accessToken && userJson) {
      try {
        console.log("🔍 Parsing user data...");
        const user = JSON.parse(decodeURIComponent(userJson));
        console.log("✅ Parsed user:", user);

        // Save to Zustand store
        setUser(user);
        setAccessToken(accessToken);

       
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", JSON.stringify(user));

        // Debugging
        console.log("✅ Stored in Zustand:", { accessToken, user });
        console.log("✅ Stored in localStorage");

        console.log("🔍 user.isApproved:", user.isApproved);
         if (user.isApproved) {
          console.log("✅ User approved - navigating to /app/event_types");
          navigate("/app/event_types");
        } else {
          console.log("⚠️ User NOT approved - navigating to /app/event_types anyway");
          navigate("/app/event_types");
        }
      } catch (err) {
        console.error("❌ Failed to parse or store data:", err);
        console.error("❌ userJson value:", userJson);
      }
    } else {
      console.error("❌ Missing token or user data");
      console.error("❌ accessToken:", accessToken);
      console.error("❌ userJson:", userJson);
      console.error("❌ Full URL:", window.location.href);
    }
  }, [navigate, setUser, setAccessToken]);

  return (
    <div className="text-center text-white mt-20 text-xl">
      Redirecting, please wait...
    </div>
  );
};

export default OAuthSuccess;
