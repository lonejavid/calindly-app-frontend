import { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {
  authenticationRoutePaths,
  protectedRoutePaths,
  publicRoutePaths,
} from "./common/routes";
import AppLayout from "@/layout/app-layout";
import BaseLayout from "@/layout/base-layout";
import AuthRoute from "./authRoute";
import ProtectedRoute from "./protectedRoute";
import ScrollToTop from "@/components/ScrollToTop";
import { RoutePageFallback } from "@/components/route-page-fallback";

function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<RoutePageFallback />}>
      <Routes>
        <Route path="/" element={<AuthRoute />}>
          <Route element={<BaseLayout />}>
            {authenticationRoutePaths.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>
        </Route>

        <Route path="/" element={<BaseLayout />}>
          {publicRoutePaths.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>

        {/* Protected Route */}
        <Route path="/" element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            {protectedRoutePaths.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>
        </Route>

      
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRoutes;
