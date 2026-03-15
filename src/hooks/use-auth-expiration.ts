import { useEffect } from "react";
import { useStore } from "@/store/store";

const useAuthExpiration = () => {
  const { accessToken, expiresAt, clearAuth } = useStore();

  useEffect(() => {
    const handleLogout = () => {
      console.log("Token expired, logging out...");
      clearAuth();
    };

    if (accessToken && expiresAt) {
      // Backend returns expiresAt as Unix timestamp in seconds
      const expiryMs = expiresAt * 1000;
      const timeUntilExpiration = expiryMs - Date.now();

      if (timeUntilExpiration <= 0) {
        // Token is already expired
        handleLogout();
      } else {
        // Set a timeout to log out the user when the token expires
        const timer = setTimeout(handleLogout, timeUntilExpiration);
        // Cleanup the timer on component unmount or token change
        return () => clearTimeout(timer);
      }
    }
  }, [accessToken, clearAuth, expiresAt]);
};

export default useAuthExpiration;
