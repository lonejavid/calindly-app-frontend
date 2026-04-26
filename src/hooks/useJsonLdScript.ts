import { useEffect } from "react";

/**
 * Injects or updates a single JSON-LD script in document.head (SPA-safe).
 * Pass `dataJson` from `useMemo(() => JSON.stringify(obj), [deps])` so the effect only runs when content changes.
 */
export function useJsonLdScript(id: string, dataJson: string | null) {
  useEffect(() => {
    if (!dataJson) return;
    let el = document.getElementById(id) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement("script");
      el.id = id;
      el.type = "application/ld+json";
      document.head.appendChild(el);
    }
    el.textContent = dataJson;
    return () => {
      document.getElementById(id)?.remove();
    };
  }, [id, dataJson]);
}
