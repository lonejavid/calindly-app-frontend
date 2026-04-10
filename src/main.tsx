import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";
import { Toaster } from "sonner";
import { AlertCircle, Check, Info, Loader2, X } from "lucide-react";
import QueryProvider from "./context/query-provider.tsx";
import "./index.css";
/* Setup wizard animations after Tailwind so .setup-wizard rules win */
import "./pages/event_type/_components/setup.css";
import App from "./App.tsx";

/** Compact circle + glyph; semantic fill per toast type (global Sonner). */
const toastIconShell =
  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white";
const toastIconSize = "h-3 w-3";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <NuqsAdapter>
        <App />
      </NuqsAdapter>
      <Toaster
        position="bottom-right"
        theme="light"
        richColors={false}
        offset={{ bottom: "1rem", right: "1rem" }}
        toastOptions={{
          duration: 4000,
          classNames: {
            toast:
              "!items-center !gap-2.5 !rounded-xl !border !border-neutral-200 !bg-white !p-3.5 !shadow-lg !text-neutral-900",
            title: "!text-base !font-semibold !text-neutral-900",
            description: "!text-sm !text-neutral-600",
            success: "!bg-white",
            error: "!bg-white",
            warning: "!bg-white",
            info: "!bg-white",
          },
        }}
        icons={{
          success: (
            <span className={`${toastIconShell} bg-emerald-600`} aria-hidden>
              <Check className={toastIconSize} strokeWidth={2.75} />
            </span>
          ),
          error: (
            <span className={`${toastIconShell} bg-red-600`} aria-hidden>
              <X className={toastIconSize} strokeWidth={2.75} />
            </span>
          ),
          warning: (
            <span className={`${toastIconShell} bg-amber-500`} aria-hidden>
              <AlertCircle className={toastIconSize} strokeWidth={2.75} />
            </span>
          ),
          info: (
            <span
              className={`${toastIconShell} bg-[color:var(--blue)]`}
              aria-hidden
            >
              <Info className={toastIconSize} strokeWidth={2.75} />
            </span>
          ),
          loading: (
            <Loader2
              className="h-5 w-5 shrink-0 animate-spin text-[color:var(--blue)]"
              aria-hidden
            />
          ),
        }}
      />
    </QueryProvider>
  </StrictMode>
);
