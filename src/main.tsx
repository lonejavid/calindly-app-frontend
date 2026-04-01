import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";
import { Toaster } from "sonner";
import QueryProvider from "./context/query-provider.tsx";
import "./index.css";
/* Setup wizard animations after Tailwind so .setup-wizard rules win */
import "./pages/event_type/_components/setup.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <NuqsAdapter>
        <App />
      </NuqsAdapter>
      <Toaster />
    </QueryProvider>
  </StrictMode>
);
