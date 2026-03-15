import { useEffect } from "react";
import AppRoutes from "./routes";
import { useStore } from "@/store/store";
import { getAuthMe } from "@/lib/api";

/** Restore user from backend when we have a token (e.g. after page refresh). */
function AuthRestore() {
  const accessToken = useStore((s) => s.accessToken);
  const setUser = useStore((s) => s.setUser);

  useEffect(() => {
    if (!accessToken) return;
    getAuthMe()
      .then((data) => {
        if (data.user) setUser(data.user);
      })
      .catch(() => {
        // 401 clears auth and redirects via axios interceptor
      });
  }, [accessToken, setUser]);

  return null;
}

function App() {
  return (
    <>
      <AuthRestore />
      <AppRoutes />
    </>
  );
}

export default App;
