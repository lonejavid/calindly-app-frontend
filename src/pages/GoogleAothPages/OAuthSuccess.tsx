/// src/pages/OAuthSuccess.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const accessToken = queryParams.get("accessToken");
    const userJson = queryParams.get("user");

    if (accessToken && userJson) {
      const user = JSON.parse(decodeURIComponent(userJson));

      // Save to localStorage or context
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect to dashboard or any protected route
     navigate("/app/event_types");


    } else {
      console.error("Missing token or user data");
    }
  }, [navigate]);

  return (
    <div className="text-center text-white mt-20 text-xl">
      Redirecting, please wait...
    </div>
  );
};

export default OAuthSuccess;
