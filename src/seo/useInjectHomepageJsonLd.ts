import { useEffect } from "react";
import { homepageJsonLdScripts } from "@/seo/homepageJsonLd";

/** Injects homepage JSON-LD into document head; removes on unmount (client navigation). */
export function useInjectHomepageJsonLd() {
  useEffect(() => {
    const nodes: HTMLScriptElement[] = [];
    for (const { id, data } of homepageJsonLdScripts) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = id;
      script.textContent = JSON.stringify(data);
      document.head.appendChild(script);
      nodes.push(script);
    }
    return () => {
      for (const n of nodes) {
        n.remove();
      }
    };
  }, []);
}
