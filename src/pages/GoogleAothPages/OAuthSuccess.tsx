// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useStore } from "@/store/store"; // ✅ import your Zustand store

// const OAuthSuccess = () => {
//   const navigate = useNavigate();
//   const setUser = useStore((state) => state.setUser);
//   const setAccessToken = useStore((state) => state.setAccessToken);

//   useEffect(() => {
//     const queryParams = new URLSearchParams(window.location.search);
//     const accessToken = queryParams.get("accessToken");
//     const userJson = queryParams.get("user");

//     if (accessToken && userJson) {
//       try {
//         const user = JSON.parse(decodeURIComponent(userJson));
//         console.log("user is: ",user);

//         // Save to Zustand store
//         setUser(user);
//         setAccessToken(accessToken);

  
//         localStorage.setItem("accessToken", accessToken);
//         localStorage.setItem("user", JSON.stringify(user));

//         navigate("/app/event_types");
     

//       } catch (err) {
//         console.error("❌ Failed to parse or store data", err);
//       }
//     } else {
//       console.error("❌ Missing token or user data");
//     }
//   }, [navigate, setUser, setAccessToken]);

//   return (
//     <div className="text-center text-white mt-20 text-xl">
//       Redirecting, please wait...
//     </div>
//   );
// };

// export default OAuthSuccess;


import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/store/store";
import { PROTECTED_ROUTES } from "@/routes/common/routePaths";
// Import your route constants

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
        console.log("user is: ", user);

        // Save to Zustand store
        setUser(user);
        setAccessToken(accessToken);

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", JSON.stringify(user));

        // Check if user is approved and redirect accordingly
        if (user.isApproved === false) {
          console.log("User not approved, redirecting to setup");
          navigate(PROTECTED_ROUTES.SETUP);
        } else {
          console.log("User approved, redirecting to event types");
          navigate(PROTECTED_ROUTES.EVENT_TYPES);
        }

      } catch (err) {
        console.error("❌ Failed to parse or store data", err);
        // Redirect to home on error
        navigate("/");
      }
    } else {
      console.error("❌ Missing token or user data");
      // Redirect to home if missing data
      navigate("/");
    }
  }, [navigate, setUser, setAccessToken]);

  return (
    <div className="text-center text-white mt-20 text-xl">
      Redirecting, please wait...
    </div>
  );
};

export default OAuthSuccess;